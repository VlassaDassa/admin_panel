import MenuTree from "../components/EditMenu/MenuTree/MenuTree";

import { useRef } from "react";
import { useDraggable } from "react-use-draggable-scroll";





const EditMenu = () => {
    const ref = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
    const { events } = useDraggable(ref);
    
    return (
        <div 
            className="page page--editMenu"
            {...events}
            ref={ref}
        >
            <MenuTree />
        </div>
       
    )
}

export default EditMenu;