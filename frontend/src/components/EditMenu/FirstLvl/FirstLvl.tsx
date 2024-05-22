import React, { FC, ReactNode } from 'react';

import styles from './../menuTree.module.scss';




interface MultiComponentProps {
    children: ReactNode;
}

const FirstLvl: FC<MultiComponentProps> = ({ children }) => {
    const childrenArray = React.Children.toArray(children);

    return (
        <div className={styles.square}>
            {childrenArray.map((child, index) => (
                <React.Fragment key={index}>
                    {child}
                </React.Fragment>
            ))}
        </div>
    );
};

export default FirstLvl;

// Исключительно ради читаемости FirstLVL, SecondLvl и ThirdLvl одинаковые