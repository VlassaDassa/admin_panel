import { Dispatch, FC, SetStateAction, useState } from 'react';
import Button from '../../general/Button/Button';

import { saveColors } from '../../../api/api';

import styles from './buttons.module.scss';
import { Color } from '../../../types';
import Message from '../../general/Message/Message';





interface ButtonsProps {
    colors: Color[]
    setColors: Dispatch<SetStateAction<Color[]>>;
    darkTheme: boolean;
    setDarkTheme: Dispatch<SetStateAction<boolean>>
}

const Buttons: FC<ButtonsProps> = ({ colors, setColors, darkTheme, setDarkTheme }) => {
    const [successShow, setSuccessShow] = useState(false)
    const [errorShow, setErrorShow] = useState(false)
    
    

    const resetColors = () => {
        const defaultColors = [
            {
                "name": "base",
                "displayName": "Базовый",
                "color": "rgb(255, 255, 255)",
                "dark_theme": "#212121"
            },
            {
                "name": "accent",
                "displayName": "Акцентный",
                "color": "#2F82FF",
                "dark_theme": "#4744C6"
            },
            {
                "name": "secondary",
                "displayName": "Второстепенный",
                "color": "#F6F6F6",
                "dark_theme": "#2F2F2F"
            },
            {
                "name": "textColor",
                "displayName": "Цвет текста",
                "color": "#2F2F2F",
                "dark_theme": "#C9C9C9"
            }
        ]

        setColors(defaultColors)
    } 

    const saveColorsHandler = () => {
        const newColors = [...colors]

        saveColors(newColors)
        .then((response) => {
            if (!response) {
                setErrorShow(true)
                setTimeout(() => {
                    setErrorShow(false)
                }, 1000)

                
                return 
            } 

            setSuccessShow(true)
            setTimeout(() => {
                setSuccessShow(false)
            }, 1000)
        })
        .catch((error) => {
            setErrorShow(true)
            setTimeout(() => {
                setErrorShow(false)
            }, 1000)
            console.error(error)
        })
    }

    const themeChangeHandler = () => {
        // const newColors = [...colors]
        // newColors.forEach(theme => {
        //     [theme.color, theme.dark_theme] = [theme.dark_theme, theme.color];
        // });
        // setColors(newColors)

        setDarkTheme(prev => !prev)
    }
   
    return (
        <div className={styles.buttonsWrapper}>
            <Message show={successShow}  message='Успешное сохранение' type='success' />
            <Message show={errorShow}  message='Что-то пошло не так' type='error' />

            <Button 
                text={darkTheme ? 'Тёмная' : 'Светлая'} 
                handler={themeChangeHandler} 
                addClass={darkTheme ? 'themeChange' : 'lightTheme'} 
            />
            <Button text='Сбросить' handler={resetColors} />
            <Button text='Сохранить' handler={saveColorsHandler} />
        </div>
    )
}

export default Buttons;