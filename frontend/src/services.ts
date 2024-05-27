import { NavigationField } from "./types";





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
}

export default MenuManager;
