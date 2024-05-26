import React, { FC, ReactNode } from 'react';

import styles from './../menuTree.module.scss';




interface MultiComponentProps {
    children: ReactNode;
    level: number;
}

const Level: FC<MultiComponentProps> = ({ children, level }) => {
    const childrenArray = React.Children.toArray(children);
    
    const classNameLevel: { [key in MultiComponentProps['level']]: string } = {
        1: 'square',
        2: 'subSquare',
        3: 'subSubSquare',
    };


    return (
        <div className={styles[classNameLevel[level]]}>
            {childrenArray.map((child, index) => (
                <React.Fragment key={index}>
                    {child}
                </React.Fragment>
            ))}
        </div>
    );
};

export default Level;
