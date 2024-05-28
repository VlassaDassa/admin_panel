import { ChangeEvent, FC, useEffect, useState, useRef  } from 'react';

import styles from './link.module.scss';


interface LinkProps {
    text: string,
    href: string,
}

interface Value {
    value: string;
    href: string;
}


const Link: FC<LinkProps> = ({ text, href }) => {
    const [value, setValue] = useState<Value>({
        value: text,
        href: href
    });
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (textareaRef.current) {
            const textarea = textareaRef.current;
            textarea.style.height = 'auto';
            textarea.style.height = `${textarea.scrollHeight}px`;
        }
    }, []);


    const changeInput = (e: ChangeEvent<HTMLTextAreaElement> ) => {
        setValue({
            value: e.target.value,
            href: href
        })

        e.target.style.height = 'auto';
        e.target.style.height = `${e.target.scrollHeight}px`;
    }

    return (
        <textarea 
            ref={textareaRef}
            rows={1} 
            value={value.value} 
            onChange={changeInput} 
            className={`${styles.stringInput} ${styles.link}`}
        />
    )
}

export default Link;