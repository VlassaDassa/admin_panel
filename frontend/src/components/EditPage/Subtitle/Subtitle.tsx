import { ChangeEvent, FC, useEffect, useState, useRef  } from 'react';
import styles from './subtitle.module.scss';



interface SubtitleProps {
    text?: string;
    children?: React.ReactNode;
}

interface Value {
    value?: string;
}

const Subtitle: FC<SubtitleProps> = ({ text, children }) => {
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
                        className={`${styles.stringInput} ${styles.subtitle}`}
                    />
                :
                    <h2 className={styles.subtitle}>
                        { children }
                    </h2>
            }
        </>
    )
}

export default Subtitle;