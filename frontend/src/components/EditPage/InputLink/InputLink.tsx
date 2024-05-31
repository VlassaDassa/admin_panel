import { ChangeEvent, FC, useEffect, useState } from 'react';

import { AddNewElement } from '../../../services';
import styles from './InputLink.module.scss';
import { PageObjects } from '../../../types';






interface InputHref {
    oldLink: PageObjects;
    posLink: number;
    inputHref: React.RefObject<HTMLInputElement>;
    pageObject: PageObjects[];
    operationName: string | undefined;
    setPageObject: React.Dispatch<React.SetStateAction<PageObjects[]>>;
}

const InputHref: FC<InputHref> = ({ inputHref, oldLink, posLink, pageObject, setPageObject, operationName }) => {
    const [value, setValue] = useState<string | undefined>(oldLink.href)

    useEffect(() => {
        if (operationName === 'image') {
            setValue(oldLink.src)
            return
        }

        setValue(oldLink.href)
    }, [oldLink])

    
    // TODO Ужасное условие
    const inputHrefChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value
        setValue(newValue) 

        if (operationName === 'image') {
            if (oldLink.src) {
                let newElement = AddNewElement.createImage(newValue)
                const newPageObject = [...pageObject]
                newPageObject.splice(posLink, 1, newElement)
                setPageObject([...newPageObject])
                return
            }
        }

        if (oldLink.text) {
            let newElement = AddNewElement.createLink(oldLink.text, newValue)
            const newPageObject = [...pageObject]
            newPageObject.splice(posLink, 1, newElement)
            setPageObject([...newPageObject])
            return
        }
    }



    return (
        <input 
            type="text" 
            ref={inputHref}
            value={value}
            className={styles.input}  
            placeholder='Введите новую ссылку' 
            onChange={inputHrefChange} 
        />
    )
}

export default InputHref;
