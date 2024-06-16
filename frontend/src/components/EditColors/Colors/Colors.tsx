import { FC } from 'react';
import { Dispatch, SetStateAction } from 'react';
import ColorItem from '../ColorItem/ColorItem';

import styles from './colors.module.scss';
import { Color } from '../../../types';





interface ColorsProps {
    colors: Color[]
    setColors: Dispatch<SetStateAction<Color[]>>;
}

const Colors: FC<ColorsProps> = ({ colors, setColors }) => {

    return (
        <div className={styles.colors}>
            {
                colors.map((item) => (
                    <ColorItem color={item} key={item.name} colors={colors} setColors={setColors} />
                ))  
            }            
        </div>
    )
}

export default Colors;