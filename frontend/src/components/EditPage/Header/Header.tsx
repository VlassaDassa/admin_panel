import { FC } from 'react';
import styles from './header.module.scss';



interface HeaderProps {
    pageName: string;
}

const Header: FC<HeaderProps> = ({ pageName }) => {

    return (
        <div className={styles.header}>
            <div className={styles.titleWrapper}>
                <p className={styles.title}>Редактировать страницу</p>
                <p className={styles.pageName}>{ pageName }</p>
            </div>

            <p className={styles.btn}>
                Редактировать код
            </p>
        </div>
    )
}

export default Header;