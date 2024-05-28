import { FC } from 'react';

import styles from './menu.module.scss';
import Draggable from 'react-draggable';
import linkIco from './../../../assets/images/editPage/linkIcon.svg';
import textIco from './../../../assets/images/editPage/textIcon.svg';
import imgIco from './../../../assets/images/editPage/imageIcon.svg';
import boldTextIco from './../../../assets/images/editPage/boldTextIcon.svg';
import titleIco from './../../../assets/images/editPage/titleIcon.svg';
import deleteIco from './../../../assets/images/editPage/deleteIcon.svg';


interface MenuProps {
    menuRef: React.RefObject<HTMLUListElement>;
    newStrMenu: boolean; // <- определяет в каком месте будет показано меню. Добавляет класс со свойством left, которое в начале строки
}

const menuItems = [
    {
        icon: linkIco,
        text: 'Ссылка',
    },

    {
        icon: textIco,
        text: 'Текст',
    },

    {
        icon: imgIco,
        text: 'Изображение',
    },
    
    {
        icon: boldTextIco,
        text: 'Жирный текст',
    },

    {
        icon: titleIco,
        text: 'Заголовок',
    },

    {
        icon: deleteIco,
        text: 'Удалить',
    },
]


const Menu: FC<MenuProps> = ({ menuRef, newStrMenu }) => {
    return (
        <Draggable handle=".handle">
            <ul className={`${styles.menu} ${newStrMenu && styles.left}`} ref={menuRef}>
                <p className={`${styles.handle} handle`}></p>
                {
                    menuItems.map((item) => (
                        <li className={styles.item} key={item.text}>
                            <img src={item.icon} className={styles.ico} alt="Иконка пункта меню" />
                            <p className={styles.text}>{ item.text }</p>
                        </li>
                    ))
                }
            </ul>
        </Draggable>
    )
}


export default Menu;
