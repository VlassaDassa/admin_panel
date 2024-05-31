import { FC } from 'react';

import Button from '../../general/Button/Button';
import PgnButton from '../PgnButton/PgnButton';

import styles from './footer.module.scss';


interface FooterProps {
    setCurPage: React.Dispatch<React.SetStateAction<number>>;
    countPages: number;
}

const Footer: FC<FooterProps> = ({ setCurPage, countPages }) => {

    const addPage = () => {
        console.log('Add page')
    }

    const nextPage = () => {
        setCurPage((prev) => {
            if (prev + 1 <= countPages) {
                return prev + 1
            }
            return prev
        })
    }

    const prevPage = () => {
        setCurPage((prev) => {
            if (prev - 1 > 0) {
                return prev - 1
            }
            return prev
        })
    }

    return (
        <div className={styles.footer}>
            <Button text={'Добавить'} handler={addPage} />

            <div className={styles.pgnButtons}>
                <PgnButton type='left' handler={prevPage} />
                <PgnButton type='right' handler={nextPage} />
            </div>

        </div>
    )
}

export default Footer;