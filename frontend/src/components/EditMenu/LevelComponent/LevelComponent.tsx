import { FC } from "react";

import Node from "../Node/Node";
import Level from "../Level/Level";
import NodePlus from "../NodePlus/NodePlus";

import { MenuManager } from "../../../services";
import { NavigationField } from "../../../types";





interface LvlProps {
    item: NavigationField;
    level: number;

    data: NavigationField[];
    setData: React.Dispatch<React.SetStateAction<NavigationField[]>>;
}

interface LevelConfig {
    renderElement: (item: any, nextLevel: number) => JSX.Element;
}

const LevelComponent: FC<LvlProps> = ({ item, level, data, setData }) => {
    const nextLevel = level + 1
    const levelConfig:Record<number, LevelConfig> = {
        2: {
            renderElement: (item, nextLevel) => <LevelComponent 
                item={item} 
                level={nextLevel} 
                data={data}
                setData={setData}
                key={item.name} 
            />,
        },

        3: {
            renderElement: (item, nextLevel) => <Node 
                type='with_link'
                level={level}
                node_text={item.name} 
                link={item.link} 
                key={item.name} 
                data={data}
                setData={setData}  
                addLevel={addLevel}

            />,
        }
    }
    const { renderElement } = levelConfig[level]

    
    const addNode = () => {
        const addPage = (fields?: NavigationField[]) => {
            if (fields) {
                fields.push({
                    'name': 'Новая страница',
                    'link': '404.php'
                });
            }
        };

        const navManager = new MenuManager(data);
        navManager.deleteNode('Новая страница', 'name')
        const newData = navManager.findAndModifyNode(item.name, 'name', (node) => {
            addPage(node.fields)
        })
    
        setData(newData);
    };

    const addLevel = () => {
        const newData = [...data]
        const navManager = new MenuManager(newData);
        navManager.deleteNode('Новая страница', 'name')

        const curData = navManager.findAndModifyNode(item.name, 'name', (node) => {
            delete node.link
            node.fields = [
                {
                    name: 'Новая страница',
                    link: '404.php'
                }
            ]
        })
        
        setData(curData)
    };

    return (
        <>
            {
                item.fields ?
                    <>  
                        <Node 
                            type={'main__without_link'}
                            level={level}
                            node_text={item.name} 
                            link={item.link} 
                            data={data}
                            setData={setData}
                            addLevel={addLevel}
                        />
                        <Level level={level}>
                            {
                                item.fields.map((item) => (
                                    renderElement(item, nextLevel)
                                ))
                            }
                            <NodePlus lvl={'lvl_2'} handler={addNode} />
                        </Level>
                    </>
                :
                    <Node 
                        type={'with_link'}
                        level={level}
                        node_text={item.name} 
                        link={item.link} 
                        data={data}
                        setData={setData} 
                        addLevel={addLevel}
                    />
            }
        </>
    )
}

export default LevelComponent;