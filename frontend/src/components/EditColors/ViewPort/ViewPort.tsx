import { FC } from 'react';
import ViewPortItem from '../ViewPortItem/ViewPortItem';
import ViewPortTopSide from '../ViewPortTopSide/ViewPortTopSide';
import { EditColors } from '../../../services';

import styles from './viewPort.module.scss';
import { Colors } from '../../../types';





const ViewPort: FC<Colors> = ({ colors }) => {
    return (
        <div className={styles.viewPort}>
            <ViewPortTopSide colors={colors} />

            <div className={styles.line} style={{ background: EditColors.findColorByType('accent', colors) }}></div>

            <div className={styles.body} style={{ background: EditColors.findColorByType('base', colors) }}>
                {
                    Array.from({ length: 3 }, (_, index) => (
                        <ViewPortItem key={index} colors={colors} />
                    ))
                }
            </div>
        </div>
    )
}

export default ViewPort;