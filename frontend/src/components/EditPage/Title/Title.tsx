import { ChangeEvent, FC, useEffect, useState  } from 'react';
import styles from './title.module.scss';
import { PageObjects } from '../../../types';
import { EditPageManager } from '../../../services';



interface TitleProps {
    text: string;
    pageObjects: PageObjects[];
    setPageObject: React.Dispatch<React.SetStateAction<PageObjects[]>>;
}

interface Value {
    value?: string;
}

let debounceTimer: NodeJS.Timeout;



const Title: FC<TitleProps> = ({ text, pageObjects, setPageObject }) => {
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

        var args: SaveNodeArgs = {
            oldText: text,
            pageObjects: pageObjects,
            newValue: e.target.value,
            type: 'title'
        };
        
        clearTimeout(debounceTimer);

        debounceTimer = setTimeout(() => {
            const newPageObject = EditPageManager.saveNode(args);
            setPageObject(newPageObject);
        }, 2000);
    }

    return (
        <textarea 
            rows={1} 
            value={value.value} 
            onChange={changeInput} 
            className={`${styles.stringInput} ${styles.title}`}
        />
    )
}

export default Title;