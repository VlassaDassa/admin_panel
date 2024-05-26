import { FC, ChangeEvent, useState } from "react";

import MenuManager from "../../../services";

import { NavigationField } from "../../../types";
import styles from './../menuTree.module.scss';
import minusIco from './../../../assets/images/general/minus.svg';
import plusIco from './../../../assets/images/general/plus.svg';



export interface NodeProps {
    type: 'with_link' | 'main__without_link';
    node_text: string;
    level: number,
    link?: string;
    data: NavigationField[];
    setData: React.Dispatch<React.SetStateAction<NavigationField[]>>;
    addLevel: () => void;
}


const Node: FC<NodeProps> = ({ type, level, node_text, link, data, setData, addLevel }) => {
    const [nodeLink, setNodeLink] = useState(link || '');
    const [nodeText, setNodeText] = useState(node_text || '');


    function changeLink(e: ChangeEvent<HTMLInputElement>) {
        const newNodeLink = e.target.value 
        setNodeLink(newNodeLink);

        const navManager = new MenuManager(data);
        const newData = navManager.findAndModifyNode(nodeText, node_text, (node) => {
            node.link = newNodeLink
        })

        setData(newData)
    }

    function changeText(e: ChangeEvent<HTMLInputElement>) {
        const newNodeName = e.target.value 
        setNodeText(newNodeName);

        const navManager = new MenuManager(data);
        const newData = navManager.findAndModifyNode(nodeText, node_text, (node) => {
            node.name = newNodeName
        })
        
        setData(newData)
    }

    const deleteNode = () => {
        const navManager = new MenuManager(data);
        const newData = navManager.deleteNode(node_text, 'name')
        setData(newData)
    }

    const hasLink = type.includes('with_link');
    const newNode = nodeText === 'Новая страница'
    const conditionType = `${hasLink ? styles.nodeWithLink : ''}`

    return (
        <div className={`${styles.node} ${level === 2 ? styles.mainNode : ''}  ${conditionType} ${newNode ? styles.newNode : ''} `}>
            <input type="text" value={nodeText} className={styles.nodeText} onChange={changeText} />
            {hasLink && (
                    <div className={styles.linkContainer}>
                        <p className={styles.linkText}>Ссылка:</p>
                        <input type="text" value={nodeLink} className={styles.nodeLink} onChange={changeLink} />
                    </div>
            )}
            <div className={styles.plusContainer}>
                {
                  hasLink ?
                        <img 
                            src={plusIco} 
                            className={`${styles.plusLvlIcon} ${styles.plusIcon}`} 
                            alt="Добавить уровень" 
                            onClick={addLevel}
                        />
                    :
                        null
                }
                <img src={minusIco} className={styles.minusIcon} alt="Удалить узел" onClick={deleteNode} />
                
            </div>
        </div>
    );
};

export default Node;
