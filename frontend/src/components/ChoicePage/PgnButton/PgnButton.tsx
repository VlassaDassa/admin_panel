import { FC } from 'react';
import styles from './pgnButton.module.scss';
import arrowIco from './../../../assets/images/general/next.svg'


interface PgnButtonProps {
    type: 'left' | 'right';
    handler: () => void;
}

const PgnButton: FC<PgnButtonProps> = ({ type, handler }) => {
    return (
        <img 
            src={arrowIco} 
            className={`${styles.pgnButton} ${styles[type]}`} 
            onClick={handler}
            alt={type} 
        />
    )
}

export default PgnButton
