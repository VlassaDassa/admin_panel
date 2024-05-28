import Link from "./components/EditPage/Link/Link";
import Paragraph from "./components/EditPage/Paragraph/Paragraph";
import Subtitle from "./components/EditPage/Subtitle/Subtitle";
import Title from "./components/EditPage/Title/Title";
import Strong from "./components/EditPage/Strong/Strong";
import Image from "./components/EditPage/Image/Image";

import { NavigationField, PageObjects } from "./types";
import React from "react";





class MenuManager {
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
export default MenuManager;


export class EditPageManager {

    static getPageName = (objects: PageObjects[]): string => {
        let pageName = 'Без названия';
        for (const item of objects) {
            if (item.class === 'title') {
                pageName = item.text || pageName;
                break
            }
        }
        return pageName
    }

    static renderObjects = (objects: PageObjects[]): JSX.Element[] => {
        return objects.flatMap((item, index) => {
            switch (item.type) {
                case '<h1>':
                    return EditPageManager.renderH1(item, index);
                case '<p>':
                    return EditPageManager.renderParagraph(item, index);
                case '<a>':
                    return EditPageManager.renderLink(item, index);
                case '<strong>':
                    return EditPageManager.renderStrong(item, index);
                case '<h2>':
                    return EditPageManager.renderSubtitle(item, index);
                case '<img>':
                    return EditPageManager.renderImage(item, index);
                default:
                    return null;
            }
        }).filter(Boolean) as JSX.Element[];
    }

    private static renderH1 = (item: PageObjects, index: number): JSX.Element => {
        return React.createElement(Title, { key: index, text: item.text || '' });
    }

    private static renderParagraph = (item: PageObjects, index: number): JSX.Element => {
        if (item.children) {
            return React.createElement(Paragraph, { key: index },
                EditPageManager.renderObjects(item.children)
            );
        } 
        else {
            return React.createElement(Paragraph, { key: index, text: item.text || '' });
        }
    }

    private static renderLink = (item: PageObjects, index: number): JSX.Element => {
        return React.createElement(Link, { key: index, text: item.text || '', href: item.href || '' });
    }

    private static renderStrong = (item: PageObjects, index: number): JSX.Element => {
        return React.createElement(Strong, { key: index, text: item.text || '' });
    }

    private static renderSubtitle = (item: PageObjects, index: number): JSX.Element => {
        if (item.children) {
            return React.createElement(Subtitle, { key: index },
                EditPageManager.renderObjects(item.children)
            );
        } 
        else {
            return React.createElement(Subtitle, { key: index, text: item.text || '' });
        }
    }

    private static renderImage = (item: PageObjects, index: number): JSX.Element => {
        return React.createElement(Image, { key: index, src: item.src || '', alt: item.alt || '' });
    }
}


