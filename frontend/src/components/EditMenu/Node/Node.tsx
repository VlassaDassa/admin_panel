import { FC, ChangeEvent, useState } from "react";
import styles from './../menuTree.module.scss';



interface NodeProps {
    type: 'main' | 'with_link' | 'main__with_link' | 'without_link' | 'main__without_link';
    node_text: string;
    link?: string;
}

const Node: FC<NodeProps> = ({ type, node_text, link }) => {
    const [nodeLink, setNodeLink] = useState(link || '');
    const [nodeText, setNodeText] = useState(node_text || '');

    function changeLink(e: ChangeEvent<HTMLInputElement>) {
        setNodeLink(e.target.value);
    }

    function changeText(e: ChangeEvent<HTMLInputElement>) {
        setNodeText(e.target.value);
    }

    const isMain = type.includes('main');
    const hasLink = type.includes('with_link');
    const conditionType = `${isMain ? styles.mainNode : ''} 
                            ${hasLink ? styles.nodeWithLink : ''} 
                            ${type === 'main' ? styles.lonelyNode : ''} 
                        `
    

    return (
        <div className={`${styles.node} ${conditionType} `}>
            <input type="text" value={nodeText} className={styles.nodeText} onChange={changeText} />
            {hasLink && (
                <div className={styles.linkContainer}>
                    <p className={styles.linkText}>Ссылка:</p>
                    <input type="text" value={nodeLink} className={styles.nodeLink} onChange={changeLink} />
                </div>
            )}
        </div>
    );
};

export default Node;
