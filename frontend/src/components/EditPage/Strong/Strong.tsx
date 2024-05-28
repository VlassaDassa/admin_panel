import { ChangeEvent, FC, useEffect, useState, useRef  } from 'react';
import styles from './strong.module.scss';



interface StrongProps {
    text?: string;
    children?: React.ReactNode;
}

interface Value {
    value?: string;
}

const Strong: FC<StrongProps> = ({ text, children }) => {
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
        <>
            {
                text ? 
                    <textarea 
                        ref={textareaRef}
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