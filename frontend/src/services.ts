import React, { ReactNode } from 'react';
import _ from 'lodash';

import ElementDOM from './components/EditPage/Element/Element';

import { NavigationField, PageObjects, SettingsObject } from "./types";







interface SaveNodeArgs {
    oldText: string;
    pageObjects: PageObjects[];
    newValue: string;
    href?: string;
    src?: string;
    type: string;
}

interface RenderElementArgs {
    item: PageObjects, 
    index: number, 
    type: keyof typeof RenderManager.types;
    setPageObject: React.Dispatch<React.SetStateAction<PageObjects[]>>;
    pageObjects: PageObjects[]   
}

interface RenderObjectsArgs {
    objects: PageObjects[];
    pageObjects: PageObjects[];
    setPageObject: React.Dispatch<React.SetStateAction<PageObjects[]>>;
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
    static types = {
        '<h1>': 'title',
        '<p>': 'paragraph',
        '<a>': 'link',
        '<strong>': 'strong',
        '<h2>': 'subtitle',
        '<img>': 'image',
    }
    
    static renderObjects = ({ objects, pageObjects, setPageObject }: RenderObjectsArgs): JSX.Element[] => {
        return objects.flatMap((item, index) => {
            return this.renderElementDOM({ item, index, setPageObject, pageObjects, type: item.type as keyof typeof RenderManager.types })
        }).filter(Boolean) as JSX.Element[];
    }

    private static renderElementDOM = ({ item, index, setPageObject, pageObjects, type } : RenderElementArgs) => {
        var children
        if (item.children && Array.isArray(item.children) && item.children.length > 0) {
            children = this.renderObjects({ objects: item.children, pageObjects, setPageObject })
        }
        else {
            children = null
        }
        
        const elementType = this.types[type];
        const elementDOMProps = {
            key: index,
            pageObjects: pageObjects,
            setPageObject,
            type: elementType,
            children: children,
            text: item.text,
            href: item.href,
            src: item.src,
            alt: item.alt
        };
    
        return React.createElement(ElementDOM, elementDOMProps);
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

        const elementType = this.getItemTypeClassName(element)

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

        return item.props?.type?.charAt(0).toUpperCase() + item.props?.type?.slice(1);
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
            if (item && React.isValidElement(item) && item.props.children[0].props.type === 'image') {
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
            paragraph: (text: string) => AddNewElement.createText(text),
            strong: (text: string) => AddNewElement.createBoldText(text),
            subtitle: (text: string) => AddNewElement.createBoldText(text),
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
