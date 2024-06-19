import { ChangeEvent, FC, useEffect, useState } from 'react';

import styles from './inputSrc.module.scss';





interface InputSrcProps {
    src: string;
    toggleInput: () => void;
    setSrc: (arg: string) => void;
}

const InputSrc: FC<InputSrcProps> = ({ src, toggleInput, setSrc }) => {
    const [val, setVal] = useState(src)    

    const changeValueHandler = (e: ChangeEvent<HTMLInputElement> ) => {
        setVal(e.target.value)
        setSrc(e.target.value)
    }

    const stopPropagationHandler = (e: React.MouseEvent<HTMLInputElement>) => {
        e.stopPropagation();
    }

    return (
        <div className={styles.container}>
            <div className={styles.background} onClick={toggleInput}>
                <input 
                    className={styles.input} 
                    type="text" 
                    value={val} 
                    onChange={changeValueHandler} 
                    onClick={stopPropagationHandler} 
                    placeholder='Введите ссылку на иконку'
                />
            </div>
        </div>
    )
    
}

export default InputSrc;