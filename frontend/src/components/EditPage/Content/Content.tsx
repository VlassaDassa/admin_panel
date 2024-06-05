import { FC, ReactNode, useEffect, useState } from 'react';
import React from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';

import Item from '../Item/Item';

import { PageObjects, SettingsObject } from '../../../types';
import { EditPageManager } from '../../../services';
import styles from './content.module.scss';





interface ContentProps {
    objects: (React.ReactNode | SettingsObject)[];
    pageObject: PageObjects[];
    setPageObject: React.Dispatch<React.SetStateAction<PageObjects[]>>;
}

const Content: FC<ContentProps> = ({ objects, pageObject, setPageObject }) => {
    const [items, setItems] = useState<(React.ReactNode | SettingsObject)[]>(objects);
    

    useEffect(() => {
        if (objects) {
            const newObject = [...objects, {'settings': true }]
            setItems(newObject)
        }

        // При редактировании textareas изменяется высота
        document.addEventListener('DOMNodeInserted', function(event) {
            const textareas = document.querySelectorAll('textarea');
            textareas.forEach(textarea => {
                textarea.style.height = 'auto';
                textarea.style.height = `${textarea.scrollHeight}px`;
            });
        });

    }, [objects])



    const onDragEnd = (result: DropResult) => {
        if (!result.destination) return;

        // Изменение видимого порядка, одноразово
        // TODO попробовать убрать
        const newItems = Array.from(items);
        const [removed] = newItems.splice(result.source.index, 1);
        newItems.splice(result.destination.index, 0, removed);
        setItems(newItems);

        // Изменение порядка элементов в главном массиве PageObjects
        // Сохранение порядка
        const onlyReactNodes = newItems.filter(item => (item as ReactNode)?.hasOwnProperty('type')) as React.ReactNode[];
        const newPageObject = EditPageManager.saveOrder(onlyReactNodes)
        setPageObject([...newPageObject])
    };


    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
                {(provided) => (
                    <div
                        className={styles.content}
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                    >
                        {items.map((item, index) => (
                            <Draggable key={index} draggableId={String(index)} index={index}>
                                {(provided) => (
                                    <Item 
                                        item={item} 
                                        pageObject={pageObject} 
                                        provided={provided} 
                                        setItems={setItems} 
                                        setPageObject={setPageObject}
                                    />
                                )}
                                
                            </Draggable>
                        ))}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
};

export default Content;