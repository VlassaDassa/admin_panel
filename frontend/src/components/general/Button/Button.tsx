import { FC } from "react";
import styles from './buttons.module.scss';



interface ButtonProps {
    text: string;
    handler: () => void;
    addClass?: string;
}


const Button: FC<ButtonProps> = ({ text, handler, addClass='' }) => {
    return (
        <button className={styles.button + ' ' + styles[addClass]} onClick={handler}>
            { text }
        </button>
    )
}

export default Button;
