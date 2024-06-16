import { CSSTransition } from 'react-transition-group';
import './fade.scss';
import { FC, ReactElement } from 'react';


interface FadeProps {
    show: boolean,
    children: ReactElement,
}

const Fade: FC<FadeProps> = ({ show, children }) => {
    return (
        <CSSTransition in={show} timeout={300} classNames='fade' unmountOnExit>
            {children}
        </CSSTransition>
    );
};

export default Fade;
