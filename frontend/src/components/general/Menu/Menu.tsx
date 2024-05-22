import { useState, useEffect } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import MenuItems from './MenuItems/MenuItems';

import styles from './menu.module.scss';
import menuIco from './../../../assets/images/menu/menu.svg';
import fileIco from './../../../assets/images/menu/file.svg';
import newsIco from './../../../assets/images/menu/news.svg';
import pageIco from './../../../assets/images/menu/page.svg';

import { Items, Section } from './types';




const items: Items = {
    general: {
        displayName: 'Общие',
        btns: [
            {
                ico: menuIco,
                displayName: 'Редактировать меню',
                name: 'edit_menu',
            },
            {
                ico: fileIco,
                displayName: 'Добавить файл',
                name: 'add_file',
            },
            {
                ico: newsIco,
                displayName: 'Новости',
                name: 'edit_news',
            },
            {
                ico: pageIco,
                displayName: 'Редактировать страницу',
                name: 'edit_page',
            },
        ]
    },

    contacts: {
        displayName: 'Контакты',
            btns: [
                {
                    ico: menuIco,
                    displayName: 'Список контактов',
                    name: 'edit_list_contacts',
                },
                {
                    ico: fileIco,
                    displayName: 'Комментарии',
                    name: 'edit_comments',
                },
                {
                    ico: newsIco,
                    displayName: 'Адрес и реквизиты',
                    name: 'edit_address',
                },
            ]
    },

    index: {
        displayName: 'Главная',
            btns: [
                {
                    ico: menuIco,
                    displayName: 'Редактировать банер',
                    name: 'edit_baner',
                },
                {
                    ico: fileIco,
                    displayName: 'Отображение новостей',
                    name: 'edit_display_news',
                },
                {
                    ico: newsIco,
                    displayName: 'Новости',
                    name: 'edit_news',
                },
                {
                    ico: pageIco,
                    displayName: 'Текст в приветствии',
                    name: 'edit_welcome_text',
                },
                {
                    ico: pageIco,
                    displayName: 'Горячая линия',
                    name: 'edit_hot_line',
                },
            ]
    }
}

const sections: string[] = [
    'general',
    'contacts',
    'index'
]


const Menu = () => {
    const [section, setSection] = useState<Section>(items['general']);
    const [counterChoiceSection, setCounterChoiceSection] = useState<number>(1);
    const [inProp, setInProp] = useState<boolean>(true);

    const choiseSection = () => {
        setInProp(false);
    };

    useEffect(() => {
        if (!inProp) {
            if (counterChoiceSection === sections.length - 1) {
                setCounterChoiceSection(0);
            } else {
                setCounterChoiceSection(prev => prev + 1);
            }

            const newChoiceSection = sections[counterChoiceSection];
            setSection(items[newChoiceSection as keyof Items]);
            setInProp(true);
        }
    }, [inProp]);

    return (
        <div className={styles.container}>
            <TransitionGroup>
                <CSSTransition
                    key={section.displayName}
                    timeout={300}
                    classNames={{
                        enter: styles.enter,
                        enterActive: styles.enterActive,
                        exit: styles.exit,
                        exitActive: styles.exitActive,
                    }}
                >
                    <div>
                        <div className={styles.titleWrapper}>
                            <p className={styles.title}>
                                { section.displayName }
                            </p>
                        </div>
                        
                        <MenuItems buttons={section.btns} choiseSection={choiseSection} />
                    </div>
                </CSSTransition>
            </TransitionGroup>
        </div>
    );
}

export default Menu;