import { Dispatch, FC, SetStateAction, useEffect, useRef, useState } from 'react';
import { HexColorPicker } from "react-colorful";

import styles from './colorItem.module.scss';
import { Color } from '../../../types';






interface ColorItemProps {
    color: Color;
    colors: Color[];
    setColors: Dispatch<SetStateAction<Color[]>>;
}

const ColorItem: FC<ColorItemProps> = ({ color, colors, setColors }) => {
    const [showPicker, setShowPicker] = useState(false)
    const [curColor, setCurColor] = useState(color.color)
    const pickerRef = useRef<HTMLDivElement>(null);



    const changeColor = (newColor: string) => {
        colors.forEach((item) => {
            if (item.name == color.name) {
                item.color = newColor
                setCurColor(item.color)
            }
        })
        const newColors = [...colors]

        setColors(newColors)
    }


    const openColorPicker = () => {
        setShowPicker(true)
    }    

    useEffect(() => {
        
        
        // Для закрытия colorPicker при клике в любом месте
        const handleClickOutside = (event: MouseEvent) => {
            if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
                setShowPicker(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className={styles.item}>
            <p className={styles.name}>{ color.displayName }</p>
            <div className={styles.color} style={{ background: curColor }} onClick={openColorPicker}></div>

            {showPicker && (
                <div ref={pickerRef} className={styles.colorPicker}>
                    <HexColorPicker color={curColor || ''} onChange={changeColor} />
                </div>
            )}
        </div>
    )
}

export default ColorItem;