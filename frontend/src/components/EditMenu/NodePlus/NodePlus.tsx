import { FC } from 'react';

import styles from './../menuTree.module.scss';
import plusIco from './../../../assets/images/general/plus.svg';





interface NodePlusProps {
    lvl: 'lvl_1' | 'lvl_2';
    handler: () => void;
}

const NodePlus: FC<NodePlusProps> = ({ lvl, handler }) => {
    const lvl_condition = lvl === "lvl_2"

    return (
            <div className={lvl_condition ? styles.subSquare : styles.square} onClick={handler}>
                <div className={`${styles.secondaryNode}`}>
                    <div className={styles.imgContainer}>
                        <img className={`${styles.node} ${styles.plusIcon}`} src={plusIco} alt={'Добавить узел'} />
                    </div>
                </div>
            </div>
        )
}


export default NodePlus;
