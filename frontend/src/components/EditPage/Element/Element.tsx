
import { ChangeEvent, FC, useEffect, useState  } from 'react';
import styles from './element.module.scss';
import { PageObjects } from '../../../types';
import { EditPageManager } from '../../../services';



interface ElementProps {
    text?: string,
    href?: string,
    src?: string,
    alt?: string,
    type: string,
    children?: React.ReactNode;
    pageObjects: PageObjects[];
    setPageObject: React.Dispatch<React.SetStateAction<PageObjects[]>>;
}

interface Value {
    value?: string;
    href?: string;
}

let debounceTimer: NodeJS.Timeout;

const ElementDOM: FC<ElementProps> = ({ text, href, src, alt, type, children, pageObjects, setPageObject }) => {
    const [value, setValue] = useState<Value>({
        value: text,
        href: href,
    });

    useEffect(() => {
        setValue({
            value: text,
            href: href,
        })
    }, [text]);


    const changeInput = (e: ChangeEvent<HTMLTextAreaElement> ) => {
        setValue({
            value: e.target.value,
            href: href,
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
            oldText: text || '',
            pageObjects,
            href: href,
            newValue: e.target.value,
            type: type,
        };
        
        clearTimeout(debounceTimer);

        debounceTimer = setTimeout(() => {
            const newPageObject = EditPageManager.saveNode(args);
            setPageObject(newPageObject);
        }, 2000);
    }

    if (type === 'image') {
        return <img src={src} alt={alt} className={styles.image} />
    }


    if (children) {

        switch (type) {
            case 'paragraph':
                return <>{ children }</>
            
            case 'subtitle':
                return (
                    <h2 className={styles.subtitle}>
                        { children }
                    </h2>
                )
            case 'strong':
                return (
                    <strong className={styles.strong}>
                        { children }
                    </strong>
                )
            default:
                return null;
        }
    }


    return (
        <textarea 
            rows={1} 
            value={value.value} 
            onChange={changeInput} 
            className={`${styles[type]}`}
        >    
        </textarea>
    )
}


export default ElementDOM;