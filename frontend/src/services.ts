import React, { ReactNode } from 'react';
import _ from 'lodash';

import Link from "./components/EditPage/Link/Link";
import Paragraph from "./components/EditPage/Paragraph/Paragraph";
import Subtitle from "./components/EditPage/Subtitle/Subtitle";
import Title from "./components/EditPage/Title/Title";
import Strong from "./components/EditPage/Strong/Strong";
import Image from "./components/EditPage/Image/Image";

import { NavigationField, PageObjects } from "./types";





interface SettingsObject {
    settings: boolean;
}

interface SaveNodeArgs {
    oldText: string;
    pageObjects: PageObjects[];
    newValue: string;
    href?: string;
    src?: string;
    type: string;
}



export class MenuManager {
    data: NavigationField[];

    constructor(data: NavigationField[]) {
        this.data = data;
    }

    deleteNode(nodeName: string, fieldName: keyof NavigationField): NavigationField[] {
        const deleteNode = (data: NavigationField[]): NavigationField[] => {
            return data.filter(item => {
                if (item[fieldName] === nodeName) {
                    return false;
                }
                if (item.fields) {
                    item.fields = deleteNode(item.fields);
                    if (item.fields.length === 0) {
                        delete item.fields;
                        item.link = '404.php';
                    }
                }
                return true;
            });
        };

        this.data = deleteNode(this.data);
        return this.data;
    }

    findAndModifyNode(nodeName: string, nodeText: string, modifyFn: (node: NavigationField) => void): NavigationField[] {
        const traverseAndModify = (nodes: NavigationField[]): boolean => {
            let found = false;
            for (let node of nodes) {
                if (node.name === nodeName || node.name === nodeText) {
                    modifyFn(node);
                    found = true;
                }
                if (node.fields) {
                    const result = traverseAndModify(node.fields);
                    if (result) {
                        found = true;
                    }
                }
            }
            return found;
        };

        traverseAndModify(this.data);
        return this.data;
    }

    getNodesWithLink = () => {
        let result: NavigationField[] = []
    
        const recurs = (fields: NavigationField[]) => {
            fields.forEach((fields) => {
                if (fields.link) {
                    result.push(fields)
                }
                else if (fields.fields) {
                    recurs(fields.fields)
                }
            })
        }
        recurs(this.data)
        this.data = result
        return this.data
    }

    getNode(nodeName: string): NavigationField[] {
        const findItem: NavigationField[] = []

        const recurs = (fields: NavigationField[]) => {
            fields.forEach((item) => {
                if (this.isMatch(item.name, nodeName)) {
                    findItem.push(item)
                    return
                }
                else if (item.fields) {
                    recurs(item.fields)
                }
            })
        }

        recurs(this.data)
        return findItem
    }

    isMatch = (itemName: string, nodeName: string) => {
        const regex = new RegExp(nodeName.split('').join('.*'), 'i');
        return regex.test(itemName);
    };
}


export class RenderManager {
    
    static renderObjects = (objects: PageObjects[], pageObjects: PageObjects[], setPageObject: React.Dispatch<React.SetStateAction<PageObjects[]>>): JSX.Element[] => {
        return objects.flatMap((item, index) => {
            switch (item.type) {
                case '<h1>':
                    return this.renderH1(item, index, objects, setPageObject, pageObjects);
                case '<p>':
                    return this.renderParagraph(item, index, objects, setPageObject, pageObjects);
                case '<a>':
                    return this.renderLink(item, index, objects, setPageObject, pageObjects);
                case '<strong>':
                    return this.renderStrong(item, index, objects, setPageObject, pageObjects);
                case '<h2>':
                    return this.renderSubtitle(item, index, objects, setPageObject, pageObjects);
                case '<img>':
                    return this.renderImage(item, index, objects, setPageObject, pageObjects);
                default:
                    return null;
            }
        }).filter(Boolean) as JSX.Element[];
    }

    private static renderH1 = (item: PageObjects, index: number, objects: PageObjects[], setPageObject: React.Dispatch<React.SetStateAction<PageObjects[]>>, pageObjects: PageObjects[]): JSX.Element => {
        return React.createElement(Title, { key: index, text: item.text || '', pageObjects: pageObjects, setPageObject: setPageObject });
    }

    private static renderParagraph = (item: PageObjects, index: number, objects: PageObjects[], setPageObject: React.Dispatch<React.SetStateAction<PageObjects[]>>, pageObjects: PageObjects[]): JSX.Element => {
        if (item.children) {
            return React.createElement(Paragraph, { key: index, pageObjects: objects, setPageObject: setPageObject },
                this.renderObjects(item.children, pageObjects, setPageObject)
            );
        } 
        else {
            return React.createElement(Paragraph, { key: index, text: item.text || '', pageObjects: pageObjects, setPageObject: setPageObject });
        }
    }

    private static renderLink = (item: PageObjects, index: number, objects: PageObjects[], setPageObject: React.Dispatch<React.SetStateAction<PageObjects[]>>, pageObjects: PageObjects[]): JSX.Element => {
        return React.createElement(Link, { key: index, text: item.text || '', href: item.href || '', pageObjects: pageObjects, setPageObject: setPageObject });
    }

    private static renderStrong = (item: PageObjects, index: number, objects: PageObjects[], setPageObject: React.Dispatch<React.SetStateAction<PageObjects[]>>, pageObjects: PageObjects[]): JSX.Element => {
        return React.createElement(Strong, { key: index, text: item.text || '', pageObjects: pageObjects, setPageObject: setPageObject });
    }

    private static renderSubtitle = (item: PageObjects, index: number, objects: PageObjects[], setPageObject: React.Dispatch<React.SetStateAction<PageObjects[]>>, pageObjects: PageObjects[]): JSX.Element => {
        if (item.children) {
            return React.createElement(Subtitle, { key: index, pageObjects: objects, setPageObject: setPageObject },
                this.renderObjects(item.children, pageObjects, setPageObject)
            );
        } 
        else {
            return React.createElement(Subtitle, { key: index, text: item.text || '', pageObjects: pageObjects, setPageObject: setPageObject });
        }
    }

    private static renderImage = (item: PageObjects, index: number, objects: PageObjects[], setPageObject: React.Dispatch<React.SetStateAction<PageObjects[]>>, pageObjects: PageObjects[]): JSX.Element => {
        return React.createElement(Image, { key: index, src: item.src || '', alt: item.alt || '', pageObjects: pageObjects, setPageObject: setPageObject });
    }
}


export class EditPageManager {

    static getPageName = (objects: PageObjects[]): string => {
        let pageName = 'Без названия';
        for (const item of objects) {
            if (item.type === '<h1>') {
                pageName = item.text || pageName;
                break
            }
        }
        return pageName
    }

    static extractProps = (element: any): any => {
        const { props, type } = element;

        const types: { [key: string]: string } = {
            'Paragraph': '<p>',
            'Link': '<a>',
            'Strong': '<strong>',
            'Title': '<h1>',
            'Subtitle': '<h2>',
        };

        const elementType = typeof type === 'function' ? type.name : type;

        let pageObject: any = {
            children: null,
            type: types[elementType] || elementType,
            class: props.className,
            text: props.text,
            href: props.href,
            alt: props.alt,
            src: props.src
        };

        if (props.children && Array.isArray(props.children)) {
            pageObject.children = props.children.map((child: any) => {
                if (typeof child === 'object' && child !== null) {
                    return this.extractProps(child);
                } else {
                    return {
                        children: child,
                        type: 'text'
                    };
                }
            });
        } else {
            pageObject.children = props.children || null;
        }

        return pageObject
    }

    static isSettingsObject = (item: any): item is SettingsObject => {
        return (item as SettingsObject).settings !== undefined;
    }

    static getItemTypeClassName = (item: any): string => {
        if (this.isSettingsObject(item)) {
            return 'Paragraph'
        }
        // Нужно для получения типов. По типу определяется класс, а по классу отступы
        // Родные отступы самих компонентов не учитывались из-за кучи обёрток библиотеки 
        // А как прокинуть родные классы я не знал, поэтому класс - это имя компонента (item.type.name)
        return item.type.name
    };

    static deleteImage = (pageObject: PageObjects[], text='Новая строка') => {
        const newImage = this.findElement(text, pageObject, 'src')
        if (newImage) {
            pageObject.splice(newImage[0], 1)
        }

        return pageObject
    }
    
    static findProps = (element: PageObjects, prop: keyof PageObjects): string => {
        var elementText = '';
        if (element.children && element.children.length > 0) {
            elementText = this.findProps(element.children[0], prop);
        }
        else {
            elementText = element[prop] as string;
        }

        return elementText;
    }

    static findElement = (elementText: string, pageObject: PageObjects[], typeField: keyof PageObjects = 'text'): [number, (PageObjects | undefined)] => {
        let elem

        function recursSearch(item: PageObjects): boolean {
            if (item[typeField]) {
                if (item[typeField] === elementText) {
                    elem = item
                    return true;
                }
            }
            if (item.children && item.children.length > 0) {
                for (let child of item.children) {
                    if (recursSearch(child)) {
                        return true;
                    }
                }
            }
            return false;
        }
    
        let counter = 0;
        for (let item of pageObject) {
            if (recursSearch(item)) {
                break
            }
            counter += 1;
        }

        return [counter, elem]
    }

    static deleteNode = (item: ReactNode, pageObject: PageObjects[]) => {
        const formatItem = EditPageManager.extractProps(item);
      
        if (!formatItem) return pageObject;
      
        const handleDeletion = (property: string) => {
            const text = this.findProps(formatItem, property as keyof PageObjects);
            const [oldElementIndex] = this.findElement(text, pageObject);
            if (oldElementIndex !== -1) {
                const updatedPageObject = _.cloneDeep(pageObject);
                updatedPageObject.splice(oldElementIndex, 1);
                return updatedPageObject;
            }
            return pageObject;
        };
      
        try {
            if (item && React.isValidElement(item) && item.props.children[0].type.name === 'Image') {
                const src = this.findProps(formatItem, 'src');
                return this.deleteImage(pageObject, src);
            } 
            else {
                return handleDeletion('text');
            }
        } 
        catch {
            return handleDeletion('text');
        }
    };

    static saveNode = ({ oldText, pageObjects, newValue, href, type }: SaveNodeArgs) => {
        interface ElementCreators {
            [key: string]: (text: string, href?: string) => PageObjects;
        }

        const createElement: ElementCreators = {
            link: (text: string, href?: string) => AddNewElement.createLink(text, href),
            text: (text: string) => AddNewElement.createText(text),
            boldText: (text: string) => AddNewElement.createBoldText(text),
            title: (text: string) => AddNewElement.createTitle(text),
            image: (src: string) => AddNewElement.createImage(src),
        }

        const newElement = type === 'image' ? createElement[type](newValue) : createElement[type](newValue, href);
        const typeField = type === 'image' ? 'src' : 'text'
        const elementIndex = this.findElement(oldText, pageObjects, typeField)[0]
        const newPageObjects = [...pageObjects]
        newPageObjects.splice(elementIndex, 1, newElement)
        return newPageObjects
    }

    static showType = (item: ReactNode | SettingsObject, pageObject: PageObjects[], typeOperation: string) => {
        const types: { [key: string]: string } = {
            'link': '<a>',
            'Image': 'image',
        }
        
        if (!EditPageManager.isSettingsObject(item)) {
            const formatItem = EditPageManager.extractProps(item)

            if (formatItem) {
                const type = this.findProps(formatItem, 'type')
                const text = this.findProps(formatItem, 'text')
                const src = this.findProps(formatItem, 'src')

                let show = type.toLowerCase() === types[typeOperation.toLowerCase()]

                let element = this.findElement(text, pageObject)
                if (typeOperation == 'image') {
                    show = true 
                    element = this.findElement(src, pageObject, 'src')
                }
                const elIndex = element[0]
                const el = element[1]
                
                return {show, elIndex, el}
            }

        }
    }

    static saveOrder = (newItems: ReactNode[]) => {
        const pageObject = []
        for (let item of newItems) {
            const formatItem = EditPageManager.extractProps(item)
            const condition = (formatItem.type == '<p>') && 
                                    (formatItem.children && formatItem.children.length > 0) 
                                    && (formatItem.children[0].type === 'Image')

            if (condition) {
                formatItem.children[0].type = '<img>'
            }
            pageObject.push(formatItem)
        }

        return pageObject
    }
}


export class AddNewElement {

    static createLink = (text: string, href='#') => {
        return {
                type: '<p>',
                class: 'newsParagraph',
                children: [
                    {
                        type: '<a>',
                        class: 'newsLink',
                        text: text,
                        href: href,
                    }
                ]
        }
    }

    static createText = (text: string) => {
        return {
            type: '<p>',
            class: 'newsParagraph',
            text: text,             
        }
    }

    static createBoldText = (text: string) => {
        return {
            type: '<p>',
            class: 'newsParagraph',
            children: [
                {
                    type: '<strong>',
                    class: 'newsJustStrong',
                    text: text,
                }
            ]           
        }
    }

    static createTitle = (text: string) => {
        return {
                    type: '<h1>',
                    class: 'subtitle',
                    text: text, 
                }
    }

    static createImage = (src: string) => {
        return {
            type: '<p>',
            class: 'newsParagraph',
            children: [
                {
                    type: '<img>',
                    class: 'newsPageImage',
                    src: src,
                    alt: 'Изображение'
                }
            ]
        }
    }
    
    static newNode = (newElement: boolean, pageObject: PageObjects[], item: ReactNode | SettingsObject, type: string) => {
        interface ElementCreators {
            [key: string]: (text: string, href?: string) => PageObjects;
        }

        const createElement: ElementCreators = {
            link: (text: string, href?: string) => this.createLink(text, href),
            text: (text: string) => this.createText(text),
            boldText: (text: string) => this.createBoldText(text),
            title: (text: string) => this.createTitle(text),
            image: (src: string) => this.createImage(src),
        }

        if (newElement) {
            const newElement = createElement[type]('Новая строка')
            pageObject.push(newElement)
        }

        else {
            if (!EditPageManager.isSettingsObject(item)) {
                const formatItem = EditPageManager.extractProps(item)

                if (formatItem) {
                    const text = EditPageManager.findProps(formatItem, 'text')
                    const oldElement = EditPageManager.findElement(text, pageObject)
        
                    if (oldElement && oldElement[1]) {
                        const newElement = createElement[type](oldElement[1].text!, oldElement[1].href!);
                        pageObject.splice(oldElement[0], 1, newElement)
                    }
                }
            }
        }
        return pageObject
    }
}
