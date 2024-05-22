import IconType from "../../../types";



export interface Button {
    ico: IconType;
    displayName: string;
    name: string;
}

export interface Section {
    displayName: string;
    btns: Button[];
}

export interface Items {
    general: Section;
    contacts: Section;
    index: Section;
}
