import { ChangeEvent, FC, useEffect, useState } from 'react';
import styles from './paragraph.module.scss';
import { PageObjects } from '../../../types';
import { AddNewElement } from '../../../services';



interface ParagraphProps {
    text?: string;
    children?: React.ReactNode;
    pageObjects: PageObjects[];
    setPageObject: React.Dispatch<React.SetStateAction<PageObjects[]>>;
}

interface Value {
    value?: string;
}


let debounceTimer: NodeJS.Timeout;

const Paragraph: FC<ParagraphProps> = ({ text, children, pageObjects, setPageObject }) => {
    const [value, setValue] = useState<Value>({
        value: text,
    });


    useEffect(() => {
        setValue({
            value: text
        })
    }, [text]);

    interface SaveNodeArgs {
        oldText: string;
        pageObjects: PageObjects[];
        newValue: string;
        href?: string;
        src?: string;
        type: string;
    }

    const changeInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setValue({
            value: e.target.value,
        })

        e.target.style.height = 'auto';
        e.target.style.height = `${e.target.scrollHeight}px`;

        if (text) {
            var args: SaveNodeArgs = {
                oldText: text,
                pageObjects: pageObjects,
                newValue: e.target.value,
                type: 'text'
            };
        }
        
        clearTimeout(debounceTimer);

        debounceTimer = setTimeout(() => {
            const newPageObject = AddNewElement.saveNode(args);
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
                        className={`${styles.stringInput} ${styles.paragraph}`}
                    />
                :
                    children
                    
            }
        </>
    )
}

export default Paragraph;