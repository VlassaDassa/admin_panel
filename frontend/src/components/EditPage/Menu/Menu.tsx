import { FC, ReactNode, useState, ReactElement } from 'react';
import Draggable from 'react-draggable';

import InputLink from '../InputLink/InputLink';
import Portal from '../../general/Portal/Portal';

import styles from './menu.module.scss';
import { AddNewElement, EditPageManager } from '../../../services';
import { PageObjects, SettingsObject } from '../../../types';
import linkIco from './../../../assets/images/editPage/linkIcon.svg';
import textIco from './../../../assets/images/editPage/textIcon.svg';
import imgIco from './../../../assets/images/editPage/imageIcon.svg';
import boldTextIco from './../../../assets/images/editPage/boldTextIcon.svg';
import titleIco from './../../../assets/images/editPage/titleIcon.svg';
import deleteIco from './../../../assets/images/editPage/deleteIcon.svg';




interface MenuProps {
    menuRef: React.RefObject<HTMLUListElement>;
    newStrMenu: boolean; // <- определяет в каком месте будет показано меню. Добавляет класс со свойством left, которое в начале строки
    setItems: React.Dispatch<React.SetStateAction<(ReactElement | SettingsObject)[]>>;
    item: ReactElement | SettingsObject;
    pageObject: PageObjects[];
    setPageObject: React.Dispatch<React.SetStateAction<PageObjects[]>>;
    inputHref: React.RefObject<HTMLInputElement>;
}

interface MenuItems {
    icon: string;
    name: string;
    text: string;
    
}

const menuItems: MenuItems[] = [
    {
        icon: linkIco,
        name: 'link',
        text: 'Ссылка',
    },

    {
        icon: textIco,
        name: 'text',
        text: 'Текст',
    },

    {
        icon: imgIco,
        name: 'image',
        text: 'Изображение',
    },
    
    {
        icon: boldTextIco,
        name: 'boldText',
        text: 'Жирный текст',
    },

    {
        icon: titleIco,
        name: 'title',
        text: 'Заголовок',
    },

    {
        icon: deleteIco,
        name: 'delete',
        text: 'Удалить',
    },
]


const Menu: FC<MenuProps> = ({ menuRef, newStrMenu, item, pageObject, setPageObject, inputHref }) => {
    const [showInputHref, setShowInputHref] = useState<boolean>(false)
    const [operationName, setOperationName] = useState<string>()
    const [oldLink, setOldLink] = useState<PageObjects>()
    const [posLink, setPosLink] = useState<number>()

    
    const changeNode = (operationName: string) => {
        setOperationName(operationName);
      
        if (operationName === 'image' && newStrMenu) {
            const result = EditPageManager.deleteImage(pageObject);
            setPageObject([...result]);
        }
      
        if (!newStrMenu) {
            const el = EditPageManager.showType(item, pageObject, operationName);
            if (el?.show && ['link', 'image'].includes(operationName)) {
                setShowInputHref(true);
                if (el.el) {
                    setOldLink(el.el);
                    setPosLink(el.elIndex);
                }
                return;
            }
        }
        
        const newPageObject = operationName === 'delete'
          ? EditPageManager.deleteNode(item as ReactElement, pageObject)
          : AddNewElement.newNode(newStrMenu, pageObject, item, operationName);
      
        if (newPageObject) {
            setPageObject([...newPageObject]);
        }
    }

    return (
        <Draggable handle=".handle">
            <ul className={`${styles.menu} ${newStrMenu && styles.left}`} ref={menuRef}>
                <p className={`${styles.handle} handle`}></p>
                {
                    menuItems.map((item) => (
                        <li className={styles.item} key={item.name} onClick={() => changeNode(item.name)}>
                            <img src={item.icon} className={styles.ico} alt="Иконка пункта меню" />
                            <p className={styles.text}>{ item.text }</p>
                        </li>
                    ))
                }

                {
                    showInputHref && oldLink ? 
                        <Portal parentId='inputHrefPortal'>
                            <InputLink
                                inputHref={inputHref} 
                                oldLink={oldLink} 
                                posLink={posLink ?? 0}
                                pageObject={pageObject}
                                operationName={operationName}
                                setPageObject={setPageObject}
                            />
                        </Portal>
                    :
                        null
                }

            </ul>
        </Draggable>
    )
}


export default Menu;