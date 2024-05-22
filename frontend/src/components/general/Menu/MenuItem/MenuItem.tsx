import { FC } from 'react';
import { NavLink  } from 'react-router-dom';

import styles from './menuItem.module.scss';

import { Button } from '../types';



const MenuItem: FC<Button> = (props) => {
    const { ico, displayName, name } = props
    
    return (
       <NavLink to={name} className={({ isActive }) => isActive ? `${styles.itemWrapper} ${styles.active}` : styles.itemWrapper}>
            <img src={ico} alt={name} className={styles.icon} />
            <p className={styles.displayName}>
                {displayName}
            </p>       
       </NavLink>
    )
}

export default MenuItem;