import { FC, useState } from 'react';

import Button from '../../general/Button/Button';
import Message from '../../general/Message/Message';

import styles from './header.module.scss';
import { savePageChanges } from '../../../api/api';
import { PageObjects } from '../../../types';



interface HeaderProps {
    pageName: string;
    pageObject: PageObjects[];
}

const Header: FC<HeaderProps> = ({ pageName, pageObject }) => {
    const [successShow, setSuccessShow] = useState(false)
    const [errorShow, setErrorShow] = useState(false)
    
    const saveChanges = () => {
        const pageName = window.location.href.split('/')[window.location.href.split('/').length-1]
        savePageChanges(pageObject, pageName)
        .then((response) => {
            if (response) {
                setSuccessShow(true)
                setTimeout(() => {
                    setSuccessShow(false)
                }, 1000)
                return
            }

            setErrorShow(true)
            setTimeout(() => {
                setErrorShow(false)
            }, 1000)

        })
        .catch((error) => {
            console.error(error)
            setErrorShow(true)
            setTimeout(() => {
                setErrorShow(false)
            }, 1000)
        })
    }

    return (
        <div className={styles.header}>
             <Message show={successShow}  message='Успешное сохранение' type='success' />
             <Message show={errorShow}  message='Что-то пошло не так' type='error' />

            <div className={styles.titleWrapper}>
                <p className={styles.title}>Редактировать страницу</p>
                <p className={styles.pageName}>{ pageName }</p>
            </div>

            <Button text='Сохранить изменения' handler={saveChanges} addClass='saveChanges' />
        </div>
    )
}

export default Header;