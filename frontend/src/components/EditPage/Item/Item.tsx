import { DraggableProvided } from 'react-beautiful-dnd';
import { FC, ReactNode, useState, useEffect, useRef } from 'react';

import Menu from '../Menu/Menu';

import styles from './item.module.scss';
import { EditPageManager } from '../../../services';
import { PageObjects } from '../../../types';
import draggableIco from './../../../assets/images/editPage/draggableIcon.svg';
import settingsIco from './../../../assets/images/editPage/settingsIcon.svg';
import plusIco from './../../../assets/images/general/plus.svg';





interface SettingsObject {
    settings: boolean;
}

interface ItemProps {
    provided: DraggableProvided;
    item: ReactNode | SettingsObject;
    pageObject: PageObjects[];
    setItems: React.Dispatch<React.SetStateAction<(React.ReactNode | SettingsObject)[]>>
    setPageObject: React.Dispatch<React.SetStateAction<PageObjects[]>>;
}

const Item: FC<ItemProps> = ({ item, pageObject, provided, setItems, setPageObject }) => {
    const [showMenu, setShowMenu] = useState<boolean>(false)
    const [newStrMenu, setNewStrMenu] = useState<boolean>(false)
    const menuRef = useRef<HTMLUListElement | null>(null);
    const settingsIcoRef = useRef<HTMLImageElement>(null);
    const settingsPlusIcoRef = useRef<HTMLImageElement>(null);
    const inputHref = useRef<HTMLInputElement>(null);


    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node) &&
                event.target !== settingsIcoRef.current &&
                event.target !== inputHref.current &&
                event.target !== settingsPlusIcoRef.current) {
                closeMenu();
            }
        };
    
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
        
    }, [pageObject]);


    const openMenu = () => {
        setShowMenu(true)
    }

    const addStr = () => {
        setShowMenu(true)
        setNewStrMenu(true)
    }

    const closeMenu = () => {
        setShowMenu(false)
        setNewStrMenu(false)
    }

    return (
        <div
            id='inputHrefPortal'
            ref={provided.innerRef}
            {...provided.draggableProps}
            className={`${styles.draggableBlock} ${styles[EditPageManager.getItemTypeClassName(item)]}`}
        >
            {
                !EditPageManager.isSettingsObject(item) ?
                    <>
                        <img 
                            src={draggableIco} 
                            alt="Ручка для перетягивания блока" 
                            className={styles.dragHandle}
                            {...provided.dragHandleProps}
                        /> 
                        {(item as ReactNode)}
                    </>
                : 
                    <img 
                        className={styles.addStr} 
                        src={plusIco} 
                        alt="Добавить новую строку" 
                        ref={settingsPlusIcoRef}
                        onClick={addStr} 
                    />
            }

            <img 
                src={settingsIco} 
                alt="Конфигурация строки" 
                className={styles.settingsIco}
                onClick={openMenu}
                ref={settingsIcoRef}
            />

            {
                showMenu ? 
                    <Menu 
                        menuRef={menuRef} 
                        newStrMenu={newStrMenu} 
                        setItems={setItems} 
                        item={item} 
                        pageObject={pageObject} 
                        setPageObject={setPageObject}
                        inputHref={inputHref}
                    /> 
                : 
                    null
            }


        </div>
    )
}

export default Item;