import { FC } from 'react';
import styles from './image.module.scss';
import { PageObjects } from '../../../types';



interface ImageProps {
    src: string;
    alt: string;
    pageObjects: PageObjects[];
    setPageObject: React.Dispatch<React.SetStateAction<PageObjects[]>>
}

const Image: FC<ImageProps> = ({ src, alt, pageObjects, setPageObject }) => {
    // const serverUrl = 'http://www.uob-konakovo.ru'

    return (
        // <img src={`${serverUrl}/${src}`} alt={alt} className={styles.image} />
        <img src={src} alt={alt} className={styles.image} />
    )
}

export default Image;