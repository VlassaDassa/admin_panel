import { FC } from 'react';
import styles from './infoSection.module.scss';



interface InfoSection {
    type: 'error' | 'empty',
    message: string,
    addClass?: string,
}

const InfoSection: FC<InfoSection> = ({ type, message, addClass='' }) => {


    return (
        <div className={styles.infoSection + ' ' + styles[type] + ' ' + styles[addClass]}>
            { message }
        </div>
    )
}

export default InfoSection;