import { DraggableProvided } from 'react-beautiful-dnd';
import { FC, ReactNode, useState, useEffect, useRef } from 'react';

import Menu from '../Menu/Menu';

import styles from './item.module.scss';
import draggableIco from './../../../assets/images/editPage/draggableIcon.svg';
import settingsIco from './../../../assets/images/editPage/settingsIcon.svg';
import plusIco from './../../../assets/images/general/plus.svg';





interface SettingsObject {
    settings: boolean;
}

interface ItemProps {
    provided: DraggableProvided;
    item: ReactNode | SettingsObject;
}

const Item: FC<ItemProps> = ({ item, provided }) => {
    const [showMenu, setShowMenu] = useState<boolean>(false)
    const [newStrMenu, setNewStrMenu] = useState<boolean>(false)
    const menuRef = useRef<HTMLUListElement | null>(null);
    const settingsIcoRef = useRef<HTMLImageElement>(null);
    const settingsPlusIcoRef = useRef<HTMLImageElement>(null);



    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node) &&
                event.target !== settingsIcoRef.current &&
                event.target !== settingsPlusIcoRef.current) {
                closeMenu();
            }
        };
    
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);


    const isSettingsObject = (item: any): item is SettingsObject => {
        return (item as SettingsObject).settings !== undefined;
    }

    const getItemTypeClassName = (item: any): string => {
        if (isSettingsObject(item)) {
            return 'Paragraph'
        }
        // Нужно для получения типов. По типу определяется класс, а по классу отступы
        // Родные отступы самих компонентов не учитывались из-за кучи обёрток библиотеки 
        // А как прокинуть родные классы я не знал, поэтому класс - это имя компонента (item.type.name)
        return item.type.name
    };

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
            ref={provided.innerRef}
            {...provided.draggableProps}
            className={`${styles.draggableBlock} ${styles[getItemTypeClassName(item)]}`}
        >
            {
                !isSettingsObject(item) ?
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
                showMenu ? <Menu menuRef={menuRef} newStrMenu={newStrMenu} /> : null
            }


        </div>
    )
}

export default Item;