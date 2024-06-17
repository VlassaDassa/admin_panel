import { FC } from 'react';
import ViewPortItem from '../ViewPortItem/ViewPortItem';
import ViewPortTopSide from '../ViewPortTopSide/ViewPortTopSide';
import { EditColors } from '../../../services';

import styles from './viewPort.module.scss';
import { Colors } from '../../../types';



interface ColorsWithTheme extends Colors {
    darkTheme: boolean;
}

const ViewPort: FC<ColorsWithTheme> = ({ colors, darkTheme }) => {
    return (
        <div className={styles.viewPort}>
            <ViewPortTopSide colors={colors} darkTheme={darkTheme} />

            <div className={styles.line} style={{ background: EditColors.findColorByType('accent', colors, darkTheme) }}></div>

            <div className={styles.body} style={{ background: EditColors.findColorByType('base', colors, darkTheme) }}>
                {
                    Array.from({ length: 3 }, (_, index) => (
                        <ViewPortItem key={index} colors={colors} darkTheme={darkTheme} />
                    ))
                }
            </div>
        </div>
    )
}

export default ViewPort;