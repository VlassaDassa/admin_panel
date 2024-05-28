import { ChangeEvent, FC, useEffect, useState, useRef  } from 'react';
import styles from './paragraph.module.scss';



interface ParagraphProps {
    text?: string;
    children?: React.ReactNode;
}

interface Value {
    value?: string;
}


const Paragraph: FC<ParagraphProps> = ({ text, children }) => {
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
                        className={`${styles.stringInput} ${styles.paragraph}`}
                    />
                :
                    children
                    
            }
        </>
    )
}

export default Paragraph;