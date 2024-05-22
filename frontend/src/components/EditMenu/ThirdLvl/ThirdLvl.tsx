import React, { FC, ReactNode } from 'react';

import styles from './../menuTree.module.scss';




interface MultiComponentProps {
    children: ReactNode;
}

const ThirdLvl: FC<MultiComponentProps> = ({ children }) => {
    const childrenArray = React.Children.toArray(children);

    return (
        <div className={styles.subSubSquare}>
            {childrenArray.map((child, index) => (
                <React.Fragment key={index}>
                    {child}
                </React.Fragment>
            ))}
        </div>
    );
};

export default ThirdLvl;

// Исключительно ради читаемости FirstLVL, SecondLvl и ThirdLvl одинаковые