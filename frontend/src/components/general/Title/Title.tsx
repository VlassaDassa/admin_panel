import { FC } from 'react';
import styles from './title.module.scss';


interface TitleProps {
    text: string;
    addClass?: string;
}


const Title: FC<TitleProps> = ({ text, addClass='' }) => {
    return (
        <h1 className={`${styles.title} ${styles[addClass]}`} >
            { text }
        </h1>
    )
}

export default Title;
