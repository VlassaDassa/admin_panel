type IconType = string; 


export interface NavigationField {
    name: string;
    link?: string;
    fields?: NavigationField[];
}


export interface PageObjects {
    children?: PageObjects[];
    type: string;
    class: string;
    text?: string;
    href?: string;
    alt?: string;
    src?:string;
}

export interface SettingsObject {
    settings: boolean;
}

export default IconType;