import { FC, useEffect } from 'react';

import Item from './../Item/Item';
import { MenuManager } from '../../../services';

import styles from './content.module.scss';
import { NavigationField } from '../../../types';





interface ContentProps {
    pages: NavigationField[];
    curPage: number;
    perPage: number;
    setCountPages: React.Dispatch<React.SetStateAction<number>>;
}

const Content: FC<ContentProps> = ({ pages, curPage, perPage, setCountPages }) => {
    const menuManager = new MenuManager(pages)
    const newPages = menuManager.getNodesWithLink()
    
    let start = perPage*curPage-perPage
    let end = perPage*curPage

    useEffect(() => {
        setCountPages(Math.ceil(newPages.length / perPage))
    }, [newPages, perPage])


    return (
        <div className={styles.content}>
            {
                newPages.slice(start, end).map((item) => (
                    <Item name={item.name} link={item.link} key={item.name} />
                ))
            }
        </div>
    )
}

export default Content;