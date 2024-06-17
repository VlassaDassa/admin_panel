import { FC } from 'react';
import { EditColors } from '../../../services';

import styles from './viewPortTopSide.module.scss';
import skeletonImage from './../../../assets/images/editColors/skeletonImage.svg';
import { Colors } from '../../../types';

interface ViewPortTopSideWithTheme extends Colors {
    darkTheme: boolean;
  }

const ViewPortTopSide: FC<ViewPortTopSideWithTheme> = ({ colors, darkTheme }) => {
    return (
        <div className={styles.topSide} style={{ background: EditColors.findColorByType('secondary', colors, darkTheme) }}>
            <img src={skeletonImage} className={`${styles.image} ${styles.imageTopSide}`} alt="skeleton image" />
        </div>
    )
}

export default ViewPortTopSide;