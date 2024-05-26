type IconType = string; 


export interface NavigationField {
    name: string;
    link?: string;
    fields?: NavigationField[];
}



export default IconType;