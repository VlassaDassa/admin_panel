import { FC, useEffect, useState } from 'react';
import styles from './message.module.scss';
import Fade from '../Fade/Fade';



interface MessageProps {
    show: boolean;
    message: string;
    type: 'error' | 'success';
}

const Message: FC<MessageProps> = ({ show, message, type }) => {
    const [visible, setVisible] = useState(show);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (show) {
            setVisible(true);
            timer = setTimeout(() => {
                setVisible(false);
            }, 1000);
        } 
        else {
            setVisible(false);
        }

        return () => clearTimeout(timer);
    }, [show]);
    
    return (
        <Fade show={visible}>
            <div className={styles.message + ' ' + styles[type]}>
                {message}
            </div>
        </Fade>
    );
};

export default Message;