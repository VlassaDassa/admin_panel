import NodePlus from '../NodePlus/NodePlus';
import Node from '../Node/Node';
import ThirdLvl from '../ThirdLvl/ThirdLvl';
import SecondLvl from '../SecondLvl/SecondLvl';
import FirstLvl from '../FirstLvl/FirstLvl';

import styles from './../menuTree.module.scss';



interface NavigationField {
    name: string;
    link?: string;
    fields?: NavigationField[];
}

const navigations:NavigationField[] = [
    {
        'name': 'Управление',
        'fields': [
            {
                'name': 'Положение об Управлении',
                'link': '404.php',
            },
            

            {
                'name': 'Структура Управления',
                'fields': [
                    {
                        'name': 'Начальник и заместители',
                        'link': '404.php',
                    },

                    {
                        'name': 'МКУ ЦМХО',
                        'link': '404.php',
                    }
                ]
            },

            {
                'name': 'Планы и отчеты',
                'link': '404.php',
            },

            {
                'name': 'Противодействие коррупции',
                'link': './anticorruption.php',
            },
        ]
    },

    {
        'name': 'Деятельность',
        'fields': [
            {
                'name': 'Муниципальные услуги',
                'fields': [
                    {
                        'name': 'Административные регламенты',
                        'link': '404.php',
                    },
                ]
            },

            {
                'name': 'Постановка на очередь в детский сад',
                'link': './priem_v_dou.php',
            },

            {
                'name': 'Перевод из одного детского сада в другой',
                'link': './priem_v_dou.php',
            },

            {
                'name': 'Предоставление места в детском саду',
                'link': './priem_v_dou.php',
            },
            
            {
                'name': 'Государственная итоговая аттестация',
                'fields': [
                    {
                        'name': 'Основной государственный экзамен (ОГЭ)',
                        'link': '404.php',
                    },

                    {
                        'name': 'Единый государственный экзамен (ЕГЭ)',
                        'link': '404.php',
                    },

                    {
                        'name': 'Акции в рамках подготовки к ГИА',
                        'link': '404.php',
                    },
                ]
            },

            {
                'name': 'Работа с кадрами',
                'fields': [
                    {
                        'name': 'Аттестация педагогических работников',
                        'link': '404.php',
                    },

                    {
                        'name': 'Профессиональные конкурсы',
                        'link': '404.php',
                    },

                    {
                        'name': 'Кадровый резерв руководителей',
                        'link': '404.php',
                    },

                    {
                        'name': 'Конкурсный прием руководителей',
                        'link': '404.php',
                    },

                    {
                        'name': 'Вакансии',
                        'link': '404.php',
                    },
                ]
            },

            {
                'name': 'Дополнительное образование',
                'link': '404.php',
            },

            {
                'name': 'Семейное образвоание и самообразование',
                'link': '404.php',
            },

            {
                'name': 'Образование детей с особыми образовательными потребностями',
                'link': '404.php',
            },

            {
                'name': 'Организация питания детей',
                'link': '404.php',
            },

            {
                'name': 'Воспитательная работа',
                'link': '404.php',
            },

            {
                'name': 'Организация летнего отдыха и оздоровления детей',
                'link': '404.php',
            },

            {
                'name': 'Профилактика асоциального поведения несовершеннолетних',
                'link': '404.php',
            },

            {
                'name': 'Оценка качества образования',
                'fields': [
                    {
                        'name': 'Результативность школ',
                        'link': '404.php',
                    },

                    {
                        'name': 'МУМы',
                        'link': '404.php',
                    },

                    {
                        'name': 'НОКО',
                        'link': '404.php',
                    },

                    {
                        'name': 'ВПР',
                        'link': '404.php',
                    },

                    {
                        'name': 'Функциональная грамотность',
                        'link': '404.php',
                    },
                ]
            },

            {
                'name': 'Безопасность',
                'fields': [
                    {
                        'name': 'Пожарная безопасность',
                        'link': './pojar_besopas.php',
                    },

                    {
                        'name': 'Безопасность на воде',
                        'link': '404.php',
                    },

                    {
                        'name': 'Дорожная безопасность',
                        'link': './doroj_besopas.php',
                    },

                    {
                        'name': 'Информационная безопасность',
                        'link': './inform_besopas.php',
                    },

                    {
                        'name': 'Противодействие экстремизму и терроризму',
                        'link': './antiekstremism.php',
                    },
                ]
            },

        ]
    },

    {
        'name': 'Документы',
        'fields': [
            {
                'name': 'Федеральные документы',
                'link': '404.php',
            },


            {
                'name': 'Региональные документы',
                'link': '404.php',
            },


            {
                'name': 'Муниципальные документы',
                'link': '404.php',
            },
            
        ]
    },

    {
        'name': 'Подведомственные организации',
        'fields': [
            {
                'name': 'Школы ',
                'link': 'schools.php',
            },


            {
                'name': 'Детские сады',
                'link': 'detSad.php',
            },


            {
                'name': 'Учреждения дополнительного образования',
                'link': '404.php',
            },
            
        ]
    },

    {
        'name': 'Приёмная',
        'fields': [
            {
                'name': 'Личный прием',
                'link': '404.php',
            },


            {
                'name': 'Часто задаваемые вопросы',
                'link': '404.php',
            },


            {
                'name': 'Задать вопрос',
                'link': '404.php',
            },
            

            {
                'name': 'Горячие линии',
                'link': '404.php',
            },
        ]
    },

    {
        'name': 'Контакты',
        'link': './contacts.php',
    },
]

const MenuTree = () => {
    return (
        <div className={styles.menuTree}>
            <>
                {
                    navigations.map((item) => {
                        return (
                            <>
                                <FirstLvl>
                                    {
                                        item.fields ?
                                            <>
                                                <Node type='main__without_link' node_text={item.name} link={item.link} />
                                                <SecondLvl>
                                                    {
                                                        item.fields.map((second_item) => {
                                                            return (
                                                                <>
                                                                        {
                                                                            second_item.fields ?
                                                                                <>
                                                                                    <Node type='without_link' node_text={second_item.name} link={second_item.link} />
                                                                                    <ThirdLvl>
                                                                                        {
                                                                                            second_item.fields.map((third_item) => {
                                                                                                return (
                                                                                                    <Node type='with_link' node_text={third_item.name} link={third_item.link} />
                                                                                                )
                                                                                            })
                                                                                        }
                                                                                        <NodePlus lvl={'lvl_2'} />
                                                                                    </ThirdLvl>
                                                                                    
                                                                                </>
                                                                            :
                                                                                <Node type='with_link' node_text={second_item.name} link={second_item.link} />
                                                                        }
                                                                        
                                                                </>
                                                            )
                                                        })
                                                    }
                                                    
                                                    <NodePlus lvl={'lvl_2'} />
                                                </SecondLvl>
                                            </>
                                        :
                                        <Node type='main__with_link' node_text={item.name} link={item.link} />
                                    }
                                </FirstLvl>
                                
                            </>
                        )
                            
                    })
                }
                <NodePlus lvl={'lvl_1'} />
            </>
        </div>
    )
}
export default MenuTree;

