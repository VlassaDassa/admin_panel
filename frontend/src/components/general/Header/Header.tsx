import { Link } from "react-router-dom";
import homeIco from './../../../assets/images/general/home.svg';

import styles from './header.module.scss';



const Header = () => {
    return (
        <header className={styles.header}>
            <nav className={styles.headerNav}>

                <Link to={'/'} className={styles.logo}>
                    Панель администрации
                </Link>

                <div className={styles.navWrapper}>
                    <a href="http://www.uob-konakovo.ru">
                        <img src={homeIco} alt="основной сайт" />
                    </a>
                    <a href="http://www.uob-konakovo.ru">основной сайт</a>
                </div>
            </nav>
        </header>

    )
}



export default Header;