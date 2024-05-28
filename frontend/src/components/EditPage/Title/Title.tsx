import { ChangeEvent, FC, useEffect, useState, useRef  } from 'react';
import styles from './title.module.scss';



interface TitleProps {
    text: string;
}

interface Value {
    value?: string;
}

const Title: FC<TitleProps> = ({ text }) => {
    const [value, setValue] = useState<Value>({
        value: text,
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
            className={`${styles.stringInput} ${styles.title}`}
        />
    )
}

export default Title;