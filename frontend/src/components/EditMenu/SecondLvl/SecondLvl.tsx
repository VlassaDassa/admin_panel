import React, { FC, ReactNode } from 'react';

import styles from './../menuTree.module.scss';




interface MultiComponentProps {
    children: ReactNode;
}

const SecondLvl: FC<MultiComponentProps> = ({ children }) => {
    const childrenArray = React.Children.toArray(children);

    return (
        <div className={styles.subSquare}>
            {childrenArray.map((child, index) => (
                <React.Fragment key={index}>
                    {child}
                </React.Fragment>
            ))}
        </div>
    );
};

export default SecondLvl;



// Исключительно ради читаемости FirstLVL, SecondLvl и ThirdLvl одинаковые