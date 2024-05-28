import { FC, useEffect, useState } from 'react';
import React from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';

import Item from '../Item/Item';

import styles from './content.module.scss';



interface SettingsObject {
    settings: boolean;
}

interface ContentProps {
    objects: (React.ReactNode | SettingsObject)[];
}

const Content: FC<ContentProps> = ({ objects }) => {
    const [items, setItems] = useState(objects);

    useEffect(() => {
        if (objects) {
            const newObject = [...objects, {'settings': true }]
            setItems(newObject)
        }
    }, [objects])


    const onDragEnd = (result: DropResult) => {
        if (!result.destination) return;

        const newItems = Array.from(items);
        const [removed] = newItems.splice(result.source.index, 1);
        newItems.splice(result.destination.index, 0, removed);

        setItems(newItems);
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
                                    <Item item={item} provided={provided} />
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