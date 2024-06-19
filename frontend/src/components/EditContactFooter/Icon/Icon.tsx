import { FC, useEffect, useState } from 'react';

import InputSrc from '../InputSrc/InputSrc';
import Portal from '../../general/Portal/Portal';

import styles from './icon.module.scss';






interface IconProps {
    src: string;
    name: string;
    setSrc: (arg: string) => void;
}

const Icon: FC<IconProps> = ({ src, name, setSrc }) => {
    const [showInput, setShowInput] = useState(false)

    useEffect(() => {
        setSrc(src)
    }, [])

    const toggleInput = () => {
        setShowInput(prev => !prev)
    }

    return (
        <div className={styles.icon}>
            <div className={styles.wrapper}>
                <p className={styles.name}>{ name }</p>
                <img className={styles.ico} src={src} alt="Иконка" />
            </div>
            <button className={styles.btn} onClick={toggleInput}>изменить</button>
            
            {
                showInput ? 
                    <Portal parentId="root">
                        <InputSrc src={src} setSrc={setSrc} toggleInput={toggleInput} />
                    </Portal>
                :
                    null
            }
            
        </div>
    )
}

export default Icon;