type IconType = string; 


export interface NavigationField {
    name: string;
    link?: string;
    fields?: NavigationField[];
}


export interface PageObjects {
    children: any;
    type: string;
    class: string;
    text?: string;
    href?: string;
    alt?: string;
    src?:string;
    child: PageObjects[];
}



export default IconType;