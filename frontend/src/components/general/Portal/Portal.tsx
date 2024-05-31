import { ReactNode } from "react";
import { createPortal } from "react-dom";



interface PortalProps {
    children: ReactNode;
    parentId: string;
}

const Portal = ({ children, parentId }: PortalProps) => {
    const portalRoot = document.getElementById(parentId);

    if (!portalRoot) return null;

    return createPortal(children, portalRoot);
};

export default Portal;