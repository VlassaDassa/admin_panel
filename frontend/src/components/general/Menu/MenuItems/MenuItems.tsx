import { FC } from 'react';

import MenuItem from '../MenuItem/MenuItem'; 

import styles from './menuItems.module.scss';
import nextIco from './../../../../assets/images/general/next.svg';
import { Button } from '../types';


interface MenuItemsProps {
    buttons: Button[],
    choiseSection: () => void,
}

const MenuItems: FC<MenuItemsProps> = ({ buttons, choiseSection }) => {

    return (
        <nav className={styles.menuItems}>
            {
                buttons.map((btn) => {
                    return <MenuItem 
                        ico={btn.ico} 
                        displayName={btn.displayName} 
                        name={btn.name} 
                        
                        key={btn.name} 
                    />
                })
            }

            <img src={nextIco} alt="Дальше" className={styles.nextIcon} onClick={choiseSection} />
        </nav>
    )
}

export default MenuItems;