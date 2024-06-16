import { FC, ReactElement, useEffect, useState } from 'react';
import React from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';

import Item from '../Item/Item';

import { PageObjects, SettingsObject } from '../../../types';
import { EditPageManager } from '../../../services';
import styles from './content.module.scss';





interface ContentProps {
    objects: (React.ReactElement | SettingsObject)[];
    pageObject: PageObjects[];
    setPageObject: React.Dispatch<React.SetStateAction<PageObjects[]>>;
}

const Content: FC<ContentProps> = ({ objects, pageObject, setPageObject }) => {
    const [items, setItems] = useState<(any)[]>(objects);

    useEffect(() => {
        if (objects) {
            const newObjects = objects.map((item, index) => ({
                ...item,
                id: `item_${index}` 
            }));
            newObjects.push({ id: 'settings_id', settings: true });
            setItems(newObjects);
        }

        // Регулировка высоты textarea при вставке с использованием MutationObserver
        const observer = new MutationObserver(() => {
            const textareas = document.querySelectorAll('textarea');
            textareas.forEach(textarea => {
                textarea.style.height = 'auto';
                textarea.style.height = `${textarea.scrollHeight}px`;
            });
        });
        observer.observe(document, { subtree: true, childList: true });

        return () => {
            observer.disconnect();
        };
    }, [objects]);

    const onDragEnd = (result: DropResult) => {
        if (!result.destination) return;

        // Временное обновление порядка элементов
        const newItems = Array.from(items);
        const [removed] = newItems.splice(result.source.index, 1);
        newItems.splice(result.destination.index, 0, removed);
        setItems(newItems);

        // Сохранение порядка в основном объекте PageObjects
        const onlyReactElements = newItems.filter(item => (item as ReactElement)?.hasOwnProperty('type')) as React.ReactElement[];
        const newPageObject = EditPageManager.saveOrder(onlyReactElements);
        setPageObject([...newPageObject]);
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
                            <Draggable key={item.id} draggableId={item.id} index={index}>
                                {(provided) => (
                                    <Item 
                                        item={item as any} 
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
