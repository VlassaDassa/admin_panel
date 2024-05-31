import { ChangeEvent, FC, useEffect, useState } from 'react';
import styles from './strong.module.scss';
import { PageObjects } from '../../../types';
import { EditPageManager } from '../../../services';



interface StrongProps {
    text?: string;
    children?: React.ReactNode;
    pageObjects: PageObjects[];
    setPageObject: React.Dispatch<React.SetStateAction<PageObjects[]>>
}

interface Value {
    value?: string;
}

let debounceTimer: NodeJS.Timeout;



const Strong: FC<StrongProps> = ({ text, children, pageObjects, setPageObject }) => {
    const [value, setValue] = useState<Value>({
        value: text,
    });

    useEffect(() => {
        setValue({
            value: text
        })
    }, [text]);


    const changeInput = (e: ChangeEvent<HTMLTextAreaElement> ) => {
        setValue({
            value: e.target.value,
        })

        e.target.style.height = 'auto';
        e.target.style.height = `${e.target.scrollHeight}px`;

        interface SaveNodeArgs {
            oldText: string;
            pageObjects: PageObjects[];
            newValue: string;
            href?: string;
            src?: string;
            type: string;
        }

        if (text) {
            var args: SaveNodeArgs = {
                oldText: text,
                pageObjects: pageObjects,
                newValue: e.target.value,
                type: 'boldText'
            };
        }
        
        clearTimeout(debounceTimer);

        debounceTimer = setTimeout(() => {
            const newPageObject = EditPageManager.saveNode(args);
            setPageObject(newPageObject);
        }, 2000);
    }


    return (
        <>
            {
                text ? 
                    <textarea 
                        rows={1} 
                        value={value.value} 
                        onChange={changeInput} 
                        className={`${styles.stringInput} ${styles.strong}`}
                    />
                :
                <strong className={styles.strong}>
                    { children }
                </strong>
            }
        </>
       
    )
}

export default Strong;