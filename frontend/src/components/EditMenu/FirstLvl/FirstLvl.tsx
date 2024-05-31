import { useEffect, useState } from 'react';

import NodePlus from '../NodePlus/NodePlus';
import Level from '../Level/Level';
import Loader from '../../general/Loader/Loader';
import Button from '../../general/Button/Button';
import Portal from '../../general/Portal/Portal';
import LevelComponent from '../LevelComponent/LevelComponent';

import { getMenu } from '../../../api/api';
import { updateMenu } from '../../../api/api';
import { useAsyncRequest } from '../../../hooks/useRequest.hook';
import { MenuManager } from '../../../services';

import { NavigationField } from '../../../types';





const FirstLvl = () => {
    const [menu, setMenu] = useState<NavigationField[]>([])
    const { data, loading, error } = useAsyncRequest({
        requestFunction: getMenu
    })

    useEffect(() => {
        if (data) {
            if (typeof data === 'string') {
                const new_data = JSON.parse(data)
                setMenu(new_data)
                return
            }
            
            setMenu(data)
        }

    }, [loading, data]);

    
    const addNode = () => {
        const navManager = new MenuManager(menu);
        const curData = navManager.deleteNode('Новая страница', 'name')
        curData.push({
            'name': 'Новая страница',
            'link': '404.php',
        })
    
        setMenu(curData);
    }

    const saveMenu = () => {
        const navManager = new MenuManager(menu);
        const curData = navManager.deleteNode('Новая страница', 'name')
        updateMenu(curData).then((response) => {
            if (!response) {console.error(response)}
        })
    }
    

    if (loading) {
        return <Loader />
    }

    if (error) {
        return <div>TODO | ERROR</div>
    }

    return (
        <>
            <Portal parentId='buttonPortal'>
                <Button text='Сохранить' handler={saveMenu} addClass='saveMenu' />
            </Portal>

            {menu &&
                menu.map((item, index) => {
                    return (
                        <Level level={1} key={item.name + index}>
                            <LevelComponent
                                item={item} 
                                level={2}

                                data={menu}
                                setData={setMenu}
                            />
                        </Level>
                    )
                        
                })
            }
            <NodePlus lvl={'lvl_1'} handler={addNode} />
        </>
    )
}

export default FirstLvl;