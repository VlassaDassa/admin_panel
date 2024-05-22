import { FC } from 'react';

import styles from './../menuTree.module.scss';

import plusIco from './../../../assets/images/general/plus.svg';



interface NodePlusProps {
    lvl: 'lvl_1' | 'lvl_2';
}


const NodePlus: FC<NodePlusProps> = ({ lvl }) => {

    if (lvl == 'lvl_2') {
        return (
            <div className={styles.subSquare}>
                <div className={`${styles.secondaryNode}`}>
                    <div className={styles.imgContainer}>
                        <img className={`${styles.node} ${styles.plusIcon}`} src={plusIco} />
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className={styles.square}>
            <div className={styles.imgContainer}>
                <img className={`${styles.node} ${styles.plusIcon}`} src={plusIco} />
            </div>
        </div>
    )
}


export default NodePlus;
