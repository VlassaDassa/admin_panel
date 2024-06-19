import { ChangeEvent, FC, useEffect, useState } from 'react';

import styles from './field.module.scss';





interface FieldProps {
    value: string;
    label: string;
    name: string;

    setPhoneNumber?: (arg: string) => void;
    setHref?: (arg: string) => void;
}

const Field: FC<FieldProps> = ({ value, label, name, setPhoneNumber, setHref }) => {
    const [val, setVal] = useState(value)    


    useEffect(() => {
        saveChanges(value)
    }, [])

    
    const saveChanges = (value: string) => {
        if (name == 'phoneNumber' && setPhoneNumber) {
            setPhoneNumber(value)
        }
        else if (setHref) {
            setHref(value)
        }
    }

    const changeValueHandler = (e: ChangeEvent<HTMLInputElement> ) => {
        setVal(e.target.value)
        saveChanges(e.target.value)
    }

    return (
        <div className={styles.field}>
            <label className={styles.label} htmlFor={name}>{ label }</label>
            <input 
                className={styles.input} 
                type="text" 
                value={val} 
                name={name} 
                id={name} 
                onChange={changeValueHandler} 
            />
        </div>
    )
}

export default Field;