import { FC } from 'react';

import PgnButton from '../PgnButton/PgnButton';

import styles from './footer.module.scss';


interface FooterProps {
    setCurPage: React.Dispatch<React.SetStateAction<number>>;
    countPages: number;
}

const Footer: FC<FooterProps> = ({ setCurPage, countPages }) => {


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
            <div className={styles.pgnButtons}>
                <PgnButton type='left' handler={prevPage} />
                <PgnButton type='right' handler={nextPage} />
            </div>

        </div>
    )
}

export default Footer;