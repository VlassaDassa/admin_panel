import { FC } from "react";
import { Link } from "react-router-dom";

import styles from './item.module.scss';
import { NavigationField } from "../../../types";



const Item: FC<NavigationField> = ({ name, link }) => {
    return (
        <Link to={`/edit/${link}`} className={styles.gridItem} title={ name }>
            <h2 className={styles.title}>{ name }</h2>
            <p className={styles.link}>Ссылка: { link }</p>
        </Link>
    )
}

export default Item;
