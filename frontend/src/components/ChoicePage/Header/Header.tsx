import { FC } from 'react';
import Title from '../../general/Title/Title';
import SearchField from '../SearchField/SearchField';

import styles from './header.module.scss';


interface HeaderProps {
    setFindName: React.Dispatch<React.SetStateAction<string>>;
}


const Header: FC<HeaderProps> = ({ setFindName }) => {
    return (
        <div className={styles.header}>
            <Title text="Выберите страницу" />
            <SearchField setFindName={setFindName} />
        </div>
    )
}

export default Header;