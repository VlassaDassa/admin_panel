import React from 'react';
import styles from './globalLoader.module.scss'; 



const GlobalLoader: React.FC = () => {
    return (
        <div className={styles.loaderContainer}>
            <div className={styles.loader}></div>
        </div>
    );
};

export default GlobalLoader;