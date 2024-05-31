import { ChangeEvent, FC, useEffect, useState } from 'react';

import styles from './link.module.scss';
import { PageObjects } from '../../../types';
import { AddNewElement } from '../../../services';


interface LinkProps {
    text: string,
    href: string,
    pageObjects: PageObjects[];
    setPageObject: React.Dispatch<React.SetStateAction<PageObjects[]>>;
}

interface Value {
    value: string;
    href: string;
}

let debounceTimer: NodeJS.Timeout;

const Link: FC<LinkProps> = ({ text, href, pageObjects, setPageObject }) => {
    const [value, setValue] = useState<Value>({
        value: text,
        href: href
    });


    useEffect(() => {
        setValue({
            value: text,
            href: href,
        })
    }, [text, href]);



    interface SaveNodeArgs {
        oldText: string;
        pageObjects: PageObjects[];
        newValue: string;
        href?: string;
        src?: string;
        type: string;
    }

    const changeInput = (e: ChangeEvent<HTMLTextAreaElement> ) => {
        setValue({
            value: e.target.value,
            href: href
        })

        e.target.style.height = 'auto';
        e.target.style.height = `${e.target.scrollHeight}px`;

        const args: SaveNodeArgs = {
            oldText: text,
            pageObjects: pageObjects,
            newValue: e.target.value,
            href: href,
            type: 'link'
        };

        clearTimeout(debounceTimer);

        debounceTimer = setTimeout(() => {
            const newPageObject = AddNewElement.saveNode(args);
            setPageObject(newPageObject);
        }, 500);
    }

    return (
        <textarea 
            rows={1} 
            value={value.value} 
            onChange={changeInput} 
            className={`${styles.stringInput} ${styles.link}`}
        />
    )
}

export default Link;