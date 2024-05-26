import { ReactNode } from "react";
import { createPortal } from "react-dom";



interface ButtonPortalProps {
    children: ReactNode;
    parentId: string;
}

const ButtonPortal = ({ children, parentId }: ButtonPortalProps) => {
    const portalRoot = document.getElementById(parentId);

    if (!portalRoot) return null;

    return createPortal(children, portalRoot);
};

export default ButtonPortal;