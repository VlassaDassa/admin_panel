// Расширение для игнорирования регистра при поиске по фамилии на странице "Контакты"
$.extend($.expr[":"], {
    "contains-ci": function(elem, i, match, array) {
        return (elem.textContent || elem.innerText || "").toLowerCase().indexOf((match[3] || "").toLowerCase()) >= 0;
    }
});

try {
    var navigations = JSON.parse(navigations_str)
}
catch {}

$(document).ready(() => {
    function showError(text) {
        $('.errorMessage').text(text)
        $('.errorMessage').addClass('errorMessage--show')

        setTimeout(() => {
            $('.errorMessage').removeClass('errorMessage--show')
        }, 3000)
    }

    function showSuccess(text) {
        $('.successMessage').text(text)
        $('.successMessage').addClass('successMessage--show')

        setTimeout(() => {
            $('.successMessage').removeClass('successMessage--show')
        }, 3000)
    }


    // Пагинация по новостям
    $(document).ready(function () {
        let currentPage = 3;
        const newsPerPage = 3;

        function loadMoreNews() {
            $.ajax({
                url: 'load_more_news.php',
                type: 'POST',
                data: { page: currentPage, perPage: newsPerPage },
                success: function (data) {
                    $('.newsWrapper').append(data);
                    currentPage++;
                },
                error: function () {
                    alert('Что-то пошло не так...');
                }
            });
        }

        $('.showMore--index').on('click', function () {
            loadMoreNews();
        });
    });


    // Пагинация по отзывам
    $(document).ready(function () {
        let curPage = 2;
        const feedbacksPerPage = 3;

        function loadMoreFeedbacks() {
            $.ajax({
                url: 'load_more_feedbacks.php',
                type: 'POST',
                data: { page: curPage, perPage: feedbacksPerPage },
                success: function (data) {
                    // Разбиваем строку на HTML и флаг
                    let parts = data.split('#####');
                    let html = parts[0];
                    let hasNextData = parts[1];

                    $('div[align="justify"]').after(html);
                    curPage++;

                    // Проверяем, есть ли следующая порция данных
                    if (hasNextData === '0') {
                        $('.messagesShowMore').hide();
                    }
                },
                error: function () {
                    alert('Что-то пошло не так...');
                }
            });
        }

        $('.messagesShowMore').on('click', function () {
            loadMoreFeedbacks();
        });
    });


    // Отправка отзыва
    $(".guestBook-ShowMore").click(function(e){
        e.preventDefault()
        if(validateForm()){
            sendDataToServer();
        }
        else {
            showError('Данные введены некорректно!')
        }
    });


    // Проверка формы для отправки отзыва
    function validateForm(){
        var name = $("#name").val();
        var email = $("#email").val();
        var text = $("#text").val();

        if (name === "" || email === "" || text === "" || !isValidEmail(email) || name.length < 3 || email.length < 3 || text.length < 20){
            return false;
        }
        return true;
    }

    // Проверка email
    function isValidEmail(email) {
        var emailPattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
        return emailPattern.test(email);
    }


    // Отправка отзыва
    function sendDataToServer(){
        var name = encodeURIComponent($("#name").val());
        var email = encodeURIComponent($("#email").val());
        var text = encodeURIComponent($("#text").val());

        // Преобразование в кодировку Windows-1251
        name = unescape(encodeURIComponent(name));
        email = unescape(encodeURIComponent(email));
        text = unescape(encodeURIComponent(text));

        var formData = "name=" + name + "&email=" + email + "&text=" + text;
    
        $.ajax({
            type: "POST",
            url: "contacts_send_feedback.php",
            data: formData,
            contentType: "application/x-www-form-urlencoded; charset=windows-1251",
            success: function(response){
                showSuccess('Отзыв успешно отправлен!');
                $("#name").val("")
                $("#email").val("")
                $("#text").val("")
            },
            error: function(error){
                showError('Что-то пошло не так...');
            }
        });
    }


    // Данные для страницы "Контакты"
    const contactsData = [
        {
            'fullname': '-',
            'position': 'Начальник Управления образования администрации Конаковского района',
            'phoneNumber': '-',
            'internalPhoneNumber': '501',
            'office': '408',
        },

        {
            'fullname': 'Клюшанова Светлана Викторовна',
            'position': 'Заместитель начальника Управления образования администрации Конаковского района',
            'phoneNumber': '-',
            'internalPhoneNumber': '509',
            'office': '408',
        },

        {
            'fullname': 'Архипова Ольга Викторовна',
            'position': 'Заместитель начальника Управления образования администрации Конаковского района',
            'phoneNumber': '4-97-95',
            'internalPhoneNumber': '508',
            'office': '408', 
        },

        {
            'fullname': 'Соколова Ирина Юрьевна',
            'position': 'Директор',
            'phoneNumber': '4-97-95',
            'internalPhoneNumber': '540',
            'office': '408', 
        },

        {
            'fullname': 'Пустынникова Маргарита Геннадьевна',
            'position': 'Главный специалист',
            'phoneNumber': '-',
            'internalPhoneNumber': '505',
            'office': '402', 
        },

        {
            'fullname': 'Болоненкова Елена Петровна',
            'position': 'Главный специалист',
            'phoneNumber': '-',
            'internalPhoneNumber': '537',
            'office': '402', 
        },

        {
            'fullname': 'Петухова Светлана Юрьевна',
            'position': 'Главный специалист',
            'phoneNumber': '-',
            'internalPhoneNumber': '538',
            'office': '409', 
        },

        {
            'fullname': 'Ферлей Татьяна Юрьевна',
            'position': 'Главный специалист',
            'phoneNumber': '-',
            'internalPhoneNumber': '523',
            'office': '409',
        },

        {
            'fullname': 'Гормаш Екатерина Геннадьевна',
            'position': 'Заместитель заведующего отделом',
            'phoneNumber': '4-97-99',
            'internalPhoneNumber': '510',
            'office': '406',
        },

        {
            'fullname': 'Брусова Елена Константиновна',
            'position': 'Главный специалист',
            'phoneNumber': '-',
            'internalPhoneNumber': '510',
            'office': '406',
        },

        {
            'fullname': 'Шарапова Мария Владимировна',
            'position': 'Главный специалист',
            'phoneNumber': '-',
            'internalPhoneNumber': '519',
            'office': '403',
        },

        {
            'fullname': 'Рачкина Наталья Александровна',
            'position': 'Секретарь',
            'phoneNumber': '-',
            'internalPhoneNumber': '500',
            'office': '408',
        },

        {
            'fullname': 'Гурьянова Людмила Юрьевна',
            'position': 'Заведующий отделом',
            'phoneNumber': '4-97-95-',
            'internalPhoneNumber': '506',
            'office': '404',
        },

        {
            'fullname': 'Гучмазова Маргарита Борисовна',
            'position': 'Главный специалист',
            'phoneNumber': '-',
            'internalPhoneNumber': '507',
            'office': '402',
        },

        {
            'fullname': 'Степанова Ирина Анатольевна',
            'position': 'Заместитель заведующего отделом',
            'phoneNumber': '-',
            'internalPhoneNumber': '539',
            'office': '404',
        },

        {
            'fullname': 'Иванова Олеся Юрьевна',
            'position': 'Главный специалист',
            'phoneNumber': '-',
            'internalPhoneNumber': '518',
            'office': '403',
        },

        {
            'fullname': 'Мирошниченко Ольга Алексеевна',
            'position': 'Главный специалист',
            'phoneNumber': '-',
            'internalPhoneNumber': '521',
            'office': '409',
        },
    ]

    // Количество контактов, отображаемых на странице
    const itemsPerPage = 3; 
    let currentPage = 1;

    // Заполнение таблицы с контактами
    function fillContacts() {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        const contactsRow = $('.contactsRow').eq(1);

        if (currentPage === 1) {
            $('.contactsRow:not(.contactsRow--header)').remove();
        }

        $.each(contactsData.slice(startIndex, endIndex), function(index, contact) {
            var newRow = contactsRow.clone()

            newRow.find('.contactsText-name').text(contact.fullname);
            newRow.find('.contactsText-position').text(contact.position);
            newRow.find('.contacts-text').eq(0).text(contact.phoneNumber);
            newRow.find('.contacts-text').eq(1).text(contact.internalPhoneNumber);
            newRow.find('.contacts-text').eq(2).text(contact.office);

            $('.contactsWrapper').append(newRow);
            newRow.hide().fadeIn(500);
        });

        if (endIndex < contactsData.length) {
            $('.contactsShowMore').show();
        } else {
            $('.contactsShowMore').hide();
        }
    }

    // Пагинация по таблице с контактами
    $('.contactsShowMore').on('click', function() {
        currentPage++;
        fillContacts();
        $('.highlighted').removeClass('highlighted')
    });
    
    // Заполнение таблицы с контактами, если это страница контактов
    var fullUrl = window.location.href;
    if (fullUrl.includes('contacts')) {
        fillContacts(contactsData);
    }

    // Поиск по фамилии на странице "Контакты"
    const findLastName = (lastName) => {
        var targetElement = $(`.contactsText-name:contains-ci("${lastName}"):first`).closest('.contactsRow')
        
        // Применение эффектов к найденому элементу
        if (targetElement.length === 0 || lastName === '') {
            // Поиск индекса объекта в массиве контактов
            var index = contactsData.findIndex(function(contact) {
                return contact.fullname.toLowerCase().includes(lastName.toLowerCase());
            });


            if (index !== -1 && index !== 0) {
                var steps = Math.ceil((index - currentPage) / itemsPerPage);
                for (var i = 0; i < steps; i++) {
                    currentPage ++
                    fillContacts()
                }
                var targetElement = $(`.contactsText-name:contains-ci("${contactsData[index].fullname}"):first`).closest('.contactsRow')
            } else {
                $('.highlighted').removeClass('highlighted')
                return
            }
        }

        $('.highlighted').removeClass('highlighted')
        targetElement.addClass('highlighted')

        var offsetTop = targetElement.offset().top;
        var windowHeight = $(window).height();
        $('html, body').animate({
            scrollTop: offsetTop - (windowHeight / 2)
        }, 500);
    }
    
    var delayTimer;

    $('.findInput').on('input', function() {
        clearTimeout(delayTimer);

        delayTimer = setTimeout(function() {
            findLastName($('.findInput').val());
        }, 500);
    });

        
    // Изменение масштаба
    const bigZoom = (btn) => {
        $(btn).addClass('settingVision-btn--selected')
        $('.defaultScale').removeClass('settingVision-btn--selected')

        document.body.style.zoom = 1.5;
        var originalStyles = {};

        function setStyles(selector, styles) {
            originalStyles[selector] = $(selector).attr('style') || '';
            $(selector).css(styles);
        }

        function resetStyles() {
            document.body.style.zoom = 1;
            $('.defaultScale').addClass('settingVision-btn--selected')
            $('.bigScale').removeClass('settingVision-btn--selected')

            for (var selector in originalStyles) {
                $(selector).attr('style', originalStyles[selector]);
            }
        }

        setStyles('.container', {
            'max-width': '1440px',
            'padding': '0 50px',
            'margin': '0 auto'
        });

        setStyles('.guestBookArrow', {
            'display': 'none'
        }); 

        setStyles('.messageIco', {
            'display': 'none'
        });


        setStyles('.headerIconWrapper', {
            'display': 'none'
        });

        setStyles('.emblemWrapper', {
            'display': 'none'
        });

        setStyles('.headerWrapper', {
            'height': '200px'
        });

        setStyles('.headerText', {
            'font-size': '32px'
        });


        setStyles('.menu_item', {
            'font-size': '16px'
        });

        setStyles('.extendedMenu-titleWrapper', {
            'display': 'none'
        });

        setStyles('.extendedMenu-linkWrapper', {
            'border-left': 'none',
            'padding-left': '0px',
            'display': 'flex',
            'justify-content': 'space-around',
            'align-items': 'start',
            'width': '100%'
        });

        setStyles('.extendedMenu-linkColumn', {
            'width': '40%'
        });

        setStyles('.extendedMenu-link + .extendedMenu-link', {
            'margin-top': '20px'
        });

        setStyles('.linkName, .extendedMenu-link', {
            'font-size': '18px'
        });

        setStyles('.wifiIcon', {
            'display': 'none'
        });

        setStyles('.aboutUsIcon, .aboutUsItem', {
            'display': 'none'
        });

        setStyles('.aboutUs-mobileText', {
            'display': 'block'
        });

        setStyles('.aboutUsItem-text + .aboutUsItem-text', {
            'margin-top': '30px'
        });

        setStyles('.aboutUsTitle', {
            'font-size': '32px'
        });

        setStyles('.aboutUs', {
            'margin-top': '50px'
        });

        setStyles('.newsItem-link', {
            'display': 'none'
        });

        setStyles('.phoneImg', {
            'display': 'none'
        });

        setStyles('.phoneItems', {
            'width': '100%'
        });


        setStyles('.settingVision-title', {
            'font-size': '20px'
        })

        setStyles('.settingVision-row', {
            'row-gap': '20px',
            'margin-top': '20px',
        })

        setStyles('.settingVision-btn', {
            'font-size': '20px',
            'padding': '7px 12px',
        })

        setStyles('.settingVision', {
            'width': '500px'
        })


        // Обработчик нажатия на кнопку
        $('.defaultScale, .resetOptions').on('click', function () {
            resetStyles();
        });
    }
    $('.bigScale').on('click', () => bigZoom(event.target))


    // Открыть версию для слабовидящих
    $('.visionBtn').on('click', () => {
       $('.settingVision').addClass('settingVision--show')
       $('.overlay').addClass('overlay--showww')
    })

    // Закрыть версию для слабовидящих
    $('.overlay').on('click', () => {
        $('.settingVision').removeClass('settingVision--show')
        $('.overlay').removeClass('overlay--showww')
    })

    $('.settingVisionCloseBtn').on('click', () => {
        $('.settingVision').removeClass('settingVision--show')
        $('.overlay').removeClass('overlay--showww')
    })


    // Версия для слабовидящих
    const setSettingVis = (btn) => {
        const attrData = $(btn).attr('data-setVis') 

        if (attrData === "serif") {
            document.documentElement.setAttribute('data-font-type', 'serif')
            $('.font-type').removeClass('settingVision-btn--selected')
            $(btn).addClass('settingVision-btn--selected')
        }

        else if (attrData === "notSerif") {
            document.documentElement.setAttribute('data-font-type', 'notSerif')
            $('.font-type').removeClass('settingVision-btn--selected')
            $(btn).addClass('settingVision-btn--selected')
        }

        else if (attrData === "spacingSmall") {
            document.documentElement.setAttribute('data-letter-spacing', 'small')
            $('.letter-space').removeClass('settingVision-btn--selected')
            $(btn).addClass('settingVision-btn--selected')
        }

        else if (attrData === "spacingMedium") {
            document.documentElement.setAttribute('data-letter-spacing', 'medium')
            $('.letter-space').removeClass('settingVision-btn--selected')
            $(btn).addClass('settingVision-btn--selected')
        }

        else if (attrData === "spacingBig") {
            document.documentElement.setAttribute('data-letter-spacing', 'big')
            $('.letter-space').removeClass('settingVision-btn--selected')
            $(btn).addClass('settingVision-btn--selected')
        }

        else if (attrData === "imageHide") {
            document.documentElement.setAttribute('data-hide-image', 'hide')
            $('.imgHideShow').removeClass('settingVision-btn--selected')
            $(btn).addClass('settingVision-btn--selected')
        }

        else if (attrData === "imageShow") {
            document.documentElement.setAttribute('data-hide-image', 'show')
            $('.imgHideShow').removeClass('settingVision-btn--selected')
            $(btn).addClass('settingVision-btn--selected')
        }
        
    }
    $('.settingVision-btn').on('click', () => setSettingVis(event.target))



    // Сброс всех опций
    $('.resetOptions').on('click', () => {
        document.documentElement.setAttribute('data-hide-image', 'hide')
        document.documentElement.setAttribute('data-font-type', 'notSerif')
        document.documentElement.setAttribute('data-letter-spacing', 'small')

        $('.settingVision-btn').removeClass('settingVision-btn--selected');

        $('[data-setVis="notSerif"]').addClass('settingVision-btn--selected')
        $('[data-setVis="spacingSmall"]').addClass('settingVision-btn--selected')
        $('[data-setVis="imageHide"]').addClass('settingVision-btn--selected')
        $('.defaultScale').addClass('settingVision-btn--selected')
    })


    // Смена темы
    document.querySelector('.themeBtn').addEventListener('click', switchTheme, false);
    function switchTheme(e) {
        const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : 'light';

        document.documentElement.setAttribute('data-theme', currentTheme)
        if (currentTheme === 'light') {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        }
        
        else {
                document.documentElement.setAttribute('data-theme', 'light');
                localStorage.setItem('theme', 'light');
        }

        themeChangePictuge()
    }


    // Данные для заполнения расширенного меню
    const navigations = [
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
    
    // На всякий
    try {
        navigations = JSON.parse(navigations_str)
    }
    catch {}

    // Заполняемость расширенного меню
    function fillExtendedMenu(name) {
        // Меняет заголовок
        $('.extendedMenu-title').text(name)

        // Генерация списка
        var data = navigations.find(item => item.name === name).fields;

        const column1 = $('#column1');
        const column2 = $('#column2');

        column1.empty();
        column2.empty();

        data.forEach(function (item, index) {
            if (item.fields) {
                const linkItem = $('<li>', {'class': 'extendedMenu-link'});
                const linkName = $('<h1>', {'class': 'linkName'}).text(item.name);
                const extendedLinks = $('<ul>', {'class': 'extendedLinks'});

                item.fields.forEach(function (field) {
                    const extendedLinksItem = $('<li>', {'class': 'extendedLinks-item'})
                    const extendedLinksItemLink = $('<a>', {'href': field.link}).text(field.name);
                    extendedLinksItem.append(extendedLinksItemLink)
                    extendedLinks.append(extendedLinksItem);
                });

                linkItem.append(linkName).append(extendedLinks);

                if (index % 2 === 0) {
                    column1.append(linkItem);
                } else {
                    column2.append(linkItem);
                }
            } else {
                const listItem = $('<li>', {'class': 'extendedMenu-link'})
                const listItemLink = $('<a>', {'href': item.link}).text(item.name);
                listItem.append(listItemLink)

                if (index % 2 === 0) {
                    column1.append(listItem);
                } else {
                    column2.append(listItem);
                }
            }
        });

    }
    
    // Заполнение первого уровня меню
    function fillFirstLevel() {
        var parent = $('.menuWrapper')
        $('.menu_item').remove()
        var main_item = $('<div>', {
            class: 'menu_item menu_item--mainPage',
        }).append($('<a>', {
            href: 'http://www.uob-konakovo.ru',
            text: 'Главная',
        }))
        parent.append(main_item)

        navigations.map((item) => {
            var menu_item =  $('<div>', {
                class: `menu_item`,
            })

            if (item.link) {
                menu_item.append($('<a>', {
                    href: item.link,
                    text: item.name
                }))
                menu_item.addClass('menu_item--mainPage')
            }
            else {
                menu_item.text(item.name)
            }

            parent.append(menu_item)
        })
    }

    fillFirstLevel()

    // Закрытие расширенного меню
    function closeExtendedMenu() {
        $('.extendedMenu').removeClass('extendedMenu--show')
        $('.menu_item').removeClass('menu_item--selected')
        $('.overlay').removeClass('overlay--show')
    }


    // Открытие расширенного меню и заполнение его
    $(document).on('click', '.menu_item:not(.menu_item--mainPage)', function() {
        // Закрытие расширенного меню
        if ($(this).hasClass('menu_item--selected')) {
            closeExtendedMenu()
            return
        }


        // Выбор элементов меню
        $('.menu_item').removeClass('menu_item--selected')
        $(this).addClass('menu_item--selected')


        // Меняем заполнение расширенного меню
        var menuName = $(this).text().trim()
        fillExtendedMenu(menuName)


        // Открытие расширенного меню
        var isOpen = $('.extendedMenu').hasClass('extendedMenu--show')
        if (isOpen) {return}

        else {
            $('.extendedMenu').addClass('extendedMenu--show')
            $('.overlay').addClass('overlay--show')
        }
    })


    // Закрытие расширенного меню
    $('.overlay, .menu_item--mainPage').on('click', function() {
        var isOpen = $('.extendedMenu').hasClass('extendedMenu--show')
        if (isOpen) {
            closeExtendedMenu()
        }

        var mobileMenuIsOpen = $('.mobileMenu').hasClass('mobileMenu--show')
        if (mobileMenuIsOpen) {
            $('.mobileMenu').removeClass('mobileMenu--show')
        }

        $('.overlay').removeClass('overlay--show')
        $('body').css('overflow', 'auto');
    })


    // Открытие/закрытие вложенного списка
    $('.extendedMenu-linkWrapper').on('click', '.extendedMenu-link:not(.extendedLinks-item)', function(event) {
        if (!$(this).find('.linkName').length > 0) { return }
    
        if ($(this).hasClass('extendedMenu-link--selected')) {
            $(this).removeClass('extendedMenu-link--selected')
            $(this).find('.linkName').removeClass('linkName--selected')
            $(this).find('.extendedLinks').removeClass('extendedLinks--selected')
        } else {
            $(this).addClass('extendedMenu-link--selected')
            $(this).find('.linkName').addClass('linkName--selected')
            $(this).find('.extendedLinks').addClass('extendedLinks--selected')
        }
    });


    // Перехват
    $('.extendedMenu-linkWrapper').on('click', '.extendedLinks-item', function(event) {
        event.stopPropagation();
    });


    // Открытие мобильного меню
    $('#menu').on('click', function() {
        $('.mobileMenu').addClass('mobileMenu--show')
        $('.overlay').addClass('overlay--show')

        document.documentElement.style.overflowY = 'hidden';
    })


    // Закрытие мобильного меню
    $('.mobileMenuClose').on('click', function() {
        $('.mobileMenu').removeClass('mobileMenu--show')
        $('.overlay').removeClass('overlay--show')
        
        document.documentElement.style.overflowY = 'auto';
    })


    // Заполнение мобильного меню
    function fillMobileMenu(fields) {
        var parent = $('.mobileMenuWrapper')
        
        $('.mobileLink').remove()

        fields.forEach((field) => {
            if (field.fields) {
                parent.append(
                    `
                        <div class="mobileLink mobileLink--extended">
                            <p class="mobileLink--text">${field['name']}</p>
                            <img src="./assets/images/menuArrow.svg" class="mobileLink--img">
                        </div>
                    `
                )
            }

            else {
                parent.append(
                    `
                        <a href=${field['link']} class="mobileLink">${field['name']}</a>
                    `
                )
            }
        })
    }


    // Начальное заполнение мобильного меню
    function startFillMobileMenu() {
        var parent = $('.mobileMenuWrapper')
        $('.mobileLink').remove()

        // Объявление уровня вложенности
        $('.mobileMenu-title').data('lvl', '1')

        navigations.forEach((item) => {
            if (item['fields']) {
                parent.append(
                    `
                        <div class="mobileLink mobileLink--extended">
                            <p class="mobileLink--text">${item['name']}</p>
                            <img src="./assets/images/menuArrow.svg" class="mobileLink--img">
                        </div>
                    `
                )
            }
        })
    }
    startFillMobileMenu()


    // Картинка в зависимости от темы
    const themeChangePictuge = () => {
        const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : 'light';
        document.documentElement.setAttribute('data-theme', currentTheme)

        const imagePath = './assets/images/'
        const theme = document.documentElement.getAttribute('data-theme')

        const headerImage = theme === 'dark' ? 'headerIconDark.svg' : 'headerIcon.svg';
        document.querySelector('.headerIconWrapper').querySelector('img').src = imagePath + headerImage;

        const themeBtn = theme === 'dark' ? 'lightTheme.svg' : 'darkTheme.svg';
        document.querySelector('.themeBtn').src = imagePath + themeBtn;

        const closeBtn = theme === 'dark' ? 'closeIcoDark.svg' : 'closeIco.svg';
        document.querySelector('.settingVisionCloseBtn').src = imagePath + closeBtn;
        document.querySelector('.mobileMenuClose').src = imagePath + closeBtn;

        const menuArrow = theme === 'dark' ? 'menuArrowDark.svg' : 'menuArrow.svg'
        $('.mobileLink--img').attr('src', imagePath + menuArrow)

        const contactsLoup = theme === 'dark' ? 'darkLoup.svg' : 'loup.svg'
        $('.findLoupIco').attr('src', imagePath + contactsLoup)
    }
    themeChangePictuge()


    // Заполнение мобильного меню вторым уровнем
    function secondLvlMobileMenu(name) {
        if ($('.mobileMenu-title').data().lvl === '1') {
            $('.mobileMenu-title').data('lvl', '2')

            const item = navigations.find(item => item.name === name)
            fillMobileMenu(item.fields)
        }

        else if ($('.mobileMenu-title').data('lvl') === '2') {
            $('.mobileMenu-title').data('lvl', '3')
             
            const parentItem = navigations.find(item => item.name === $('.mobileMenu-title').text().trim())
            const item = parentItem.fields.find(item => item.name === name)
            fillMobileMenu(item.fields)
        }

         // Установка заголовка
         $('.mobileMenu-titleText').text(name)
         $('.mobileMenu-title').addClass('mobileMenu-title--show')
    }


    // Обработчик нажатия на элемент мобильного меню
    $('.mobileMenuWrapper').on('click', '.mobileLink--extended', function() {
        secondLvlMobileMenu($(this).find('.mobileLink--text').text())
        themeChangePictuge()
    })


    // Обработчик кнопки "Назад" в мобильном меню
    $('.mobileMenu-backBtn').on('click', function() {
        startFillMobileMenu()
        $('.mobileMenu-title').removeClass('mobileMenu-title--show')
        themeChangePictuge()
    }) 
    
    
   // Слайдер
   const slides = $(".slide");
    const pgnItems = $(".pgnItem");

    let currentIndex = 0;
    let intervalId;

    function showSlide(index) {
      slides.css("opacity", 0);
      slides.eq(index).css("opacity", 1);

      pgnItems.removeClass("pgnItemCurrent").eq(index).addClass("pgnItemCurrent");
    }

    function nextSlide() {
      currentIndex = (currentIndex + 1) % slides.length;
      showSlide(currentIndex);
    }

    function startAutoSlide() {
      intervalId = setInterval(nextSlide, 3000);
    }

    function stopAutoSlide() {
      clearInterval(intervalId);
    }

    pgnItems.on("click", function() {
      currentIndex = $(this).index();
      showSlide(currentIndex);
      stopAutoSlide();
      
      startAutoSlide();
    });

    showSlide(currentIndex);
    startAutoSlide();


    // Подвал
    $(document).ready(function() {
        $('.mobile_footer_wrapper__title').click(function(event) {
            $(this).toggleClass('active').next().slideToggle(300);
        })
    })


    
})