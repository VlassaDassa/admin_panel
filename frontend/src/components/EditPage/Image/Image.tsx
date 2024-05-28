import { FC } from 'react';
import styles from './image.module.scss';



interface ImageProps {
    src: string,
    alt: string,
}

const Image: FC<ImageProps> = ({ src, alt }) => {
    const serverUrl = 'http://www.uob-konakovo.ru'

    return (
        <img src={`${serverUrl}/${src}`} alt={alt} className={styles.image} />
    )
}

export default Image;