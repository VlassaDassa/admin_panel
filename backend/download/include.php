<!-- Шаблонный код -->
<!-- Верхняя часть -->
<?php
    function topSide ($title) {
        echo
        
        '
            <!DOCTYPE html>
<html data-font-type="notSerif" data-hide-image="hide" data-letter-spacing="small" data-size="small" lang="ru">
<head>
<meta charset="utf-8"/>
<meta content="width=device-width,initial-scale=1.0,viewport-fit=cover,maximum-scale=1,user-scalable=0" name="viewport"/>
<link href="./assets/styles/reset.css" rel="stylesheet"/>
<link href="./assets/styles/toUp.css" rel="stylesheet"/>
<link href="./assets/styles/index.css" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&amp;display=swap" rel="stylesheet"/>
<script src="https://code.jquery.com/jquery-3.6.4.min.js"></script>
<title>'.$title.'</title>
</head>
<body>
<div class="settingVision">
<img alt="Закрыть" class="settingVisionCloseBtn" src="./assets/images/closeIco.svg"/>
<div class="settingVision-row">
<div class="settingVision-item">
<h1 class="settingVision-title">Шрифт</h1>
<div class="settingVision-itemWrapper">
<button class="font-type settingVision-btn settingVision-btn--selected" data-setvis="notSerif">Без засечек</button>
<button class="font-type settingVision-btn" data-setvis="serif">С засечками</button>
</div>
</div>
<div class="settingVision-item">
<h1 class="settingVision-title">Расстояние между буквами</h1>
<div class="settingVision-itemWrapper">
<button class="letter-space settingVision-btn settingVision-btn--selected" data-setvis="spacingSmall">Маленькое</button>
<button class="letter-space settingVision-btn" data-setvis="spacingMedium">Среднее</button>
<button class="letter-space settingVision-btn" data-setvis="spacingBig">Большое</button>
</div>
</div>
<div class="settingVision-item">
<h1 class="settingVision-title">Скрывать изображения</h1>
<div class="settingVision-itemWrapper">
<button class="imgHideShow settingVision-btn" data-setvis="imageShow">Скрывать</button>
<button class="imgHideShow settingVision-btn settingVision-btn--selected" data-setvis="imageHide">Не скрывать</button>
</div>
</div>
<div class="settingVision-item">
<h1 class="settingVision-title">Масштаб</h1>
<div class="settingVision-itemWrapper">
<button class="defaultScale settingVision-btn settingVision-btn--selected">Обычный</button>
<button class="bigScale settingVision-btn">Большой</button>
</div>
</div>
</div>
<button class="resetOptions">Сбросить</button>
</div>
<div class="overlay"></div>
<div class="mobileMenu">
<img alt="Закрыть" class="mobileMenuClose" src="./assets/images/closeIco.svg"/>
<div class="mobileMenuWrapper">
<div class="mobileMenu-title">
<div class="mobileMenu-backBtn">
<img class="backBtn-img" src="./assets/images/menuArrowLeft.svg"/>
</div>
<h1 class="mobileMenu-titleText">Управление</h1>
</div>
</div>
</div> <!-- ./mobileMenu -->
<section class="mobileHeader">
<div class="container">
<div class="mobileHeaderWrapper">
<div class="headerBtnsWrapper">
<a class="headerBtn" href="./index.php">Главная</a>
<div class="headerBtn" id="menu">Меню</div>
</div>
<a class="headerItem" href="./contacts.php">Контакты</a>
</div>
</div>
</section> <!-- ./mobileHeader -->
<header class="headerWrapper">
<div class="header container">
<p class="headerText">УПРАВЛЕНИЕ ОБРАЗОВАНИЯ КОНАКОВСКОГО МУНИЦИПАЛЬНОГО ОКРУГА</p>
<div class="headerIconWrapper">
<img class="imgVis" src="./assets/images/headerIcon.svg"/>
</div>
<div class="emblemWrapper">
<img class="imgVis" src="./assets/images/emblem.svg"/>
</div>
</div> <!-- ./contaner -->
</header> <!-- ./headerWrapper -->
<section class="container">
<div class="menu line"></div>
</section> <!-- ./menu line -->
<section class="menu">
<ul class="container menuWrapper">
<li class="menu_item menu_item--mainPage">
<a href="./index.php">Главная</a>
</li>
<li class="menu_item">
                            Управление
                        </li>
<li class="menu_item">
                            Деятельность
                        </li>
<li class="menu_item">
                            Документы
                        </li>
<li class="menu_item">
                            Подведомственные организации
                        </li>
<li class="menu_item">
                            Приёмная
                        </li>
<li class="menu_item menu_item--mainPage">
<a href="./contacts.php">Контакты</a>
</li>
</ul> <!-- ./container menuWrapper -->
</section> <!-- ./menu -->
<section class="extendedMenu">
<div class="container extendedMenuWrapper">
<div class="extendedMenu-titleWrapper">
<h1 class="extendedMenu-title">Управление</h1>
</div>
<div class="extendedMenu-linkWrapper">
<ul class="extendedMenu-linkColumn" id="column1">
</ul>
<ul class="extendedMenu-linkColumn" id="column2">
</ul>
</div>
</div>
</section> <!-- ./extendedMenu -->
        ';
    }
?>

<?
    function downSide() {
        echo    
            '
                        <footer class="footer">
<div class="radiusFooter"></div>
<div class="container">
<div class="footerContainer">
<div class="navigationsColumn">
<h1 class="navigationsColumn-title">Управление</h1>
<a class="navigationsColumn-item" href="./404.php">Положение об управлении</a>
<a class="navigationsColumn-item" href="./404.php">Начальник и заместители</a>
<a class="navigationsColumn-item" href="./404.php">МКУ ЦМХО</a>
<a class="navigationsColumn-item" href="./404.php">Планы и отчёты</a>
<a class="navigationsColumn-item" href="./anticorruption.php">Противодействие коррупции</a>
</div>
<div class="navigationsColumn">
<h1 class="navigationsColumn-title">Документы</h1>
<a class="navigationsColumn-item" href="./404.php">Федеральные документы</a>
<a class="navigationsColumn-item" href="./404.php">Региональные документы</a>
<a class="navigationsColumn-item" href="./404.php">Муниципальные документы</a>
</div>
<div class="navigationsColumn">
<h1 class="navigationsColumn-title">Подведомственные организации</h1>
<a class="navigationsColumn-item" href="./schools.php">Школы</a>
<a class="navigationsColumn-item" href="./detSad.php">Детские сады</a>
<a class="navigationsColumn-item" href="./404.php">Учреждения дополнительного образования</a>
</div>
<div class="navigationsColumn">
<h1 class="navigationsColumn-title">Приемная</h1>
<a class="navigationsColumn-item" href="./404.php">Личный прием</a>
<a class="navigationsColumn-item" href="./404.php">Часто задаваемые вопросы</a>
<a class="navigationsColumn-item" href="./404.php">Задать вопрос</a>
<a class="navigationsColumn-item" href="./404.php">Горячие линии</a>
</div>
<div class="navigationsColumn">
<h1 class="navigationsColumn-title">Контакты</h1>
<a class="navigationsColumn-item" href="./contacts.php">Контакты</a>
</div>
<div class="navigationsColumn">
<h1 class="navigationsColumn-title">Деятельность</h1>
<a class="navigationsColumn-item" href="./404.php">Деятельность</a>
</div>
</div> <!-- ./Desktop footer -->
<div class="mobile_footer_wrapper">
<div class="mobile_footer_wrapper__item">
<div class="mobile_footer_wrapper__title">Управление</div>
<ul class="mobile_footer_wrapper__list">
<li class="mobile_footer_wrapper__link"><a href="./404.php">Положение об Управлении</a></li>
<li class="mobile_footer_wrapper__link"><a href="./404.php">Планы и отчеты</a></li>
<li class="mobile_footer_wrapper__link"><a href="./404.php">Структура Управления</a></li>
</ul>
</div> <!-- ./mobile_footer_wrapper__item -->
<div class="mobile_footer_wrapper__item">
<div class="mobile_footer_wrapper__title">ДЕЯТЕЛЬНОСТЬ</div>
<ul class="mobile_footer_wrapper__list">
<li class="mobile_footer_wrapper__link"><a href="./404.php">Муниципальные услуги</a></li>
<li class="mobile_footer_wrapper__link"><a href="./404.php">Государственная итоговая аттестация</a></li>
<li class="mobile_footer_wrapper__link"><a href="./404.php">Дополнительное образование</a></li>
<li class="mobile_footer_wrapper__link"><a href="./404.php">Образование детей с особыми образовательными потребностями</a></li>
<li class="mobile_footer_wrapper__link"><a href="./404.php">Воспитательная работа</a></li>
<li class="mobile_footer_wrapper__link"><a href="./404.php">Профилактика асоциального поведения несовершеннолетних</a></li>
<li class="mobile_footer_wrapper__link"><a href="./404.php">Безопасность</a></li>
<li class="mobile_footer_wrapper__link"><a href="./404.php">Прием в образовательные организации</a></li>
<li class="mobile_footer_wrapper__link"><a href="./404.php">Работа с кадрами</a></li>
<li class="mobile_footer_wrapper__link"><a href="./404.php">Семейное образвоание и самообразование</a></li>
<li class="mobile_footer_wrapper__link"><a href="./404.php">Организация питания детей</a></li>
<li class="mobile_footer_wrapper__link"><a href="./404.php">Организация летнего отдыха и оздоровления детей</a></li>
<li class="mobile_footer_wrapper__link"><a href="./404.php">Оценка качества образования</a></li>
</ul>
</div> <!-- ./mobile_footer_wrapper__item -->
<div class="mobile_footer_wrapper__item">
<div class="mobile_footer_wrapper__title">ДОКУМЕНТЫ</div>
<ul class="mobile_footer_wrapper__list">
<li class="mobile_footer_wrapper__link"><a href="./404.php">Федеральные документы</a></li>
<li class="mobile_footer_wrapper__link"><a href="./404.php">Муниципальные документы</a></li>
<li class="mobile_footer_wrapper__link"><a href="./404.php">Региональные документы</a></li>
</ul>
</div> <!-- ./mobile_footer_wrapper__item -->
<div class="mobile_footer_wrapper__item">
<div class="mobile_footer_wrapper__title">ПОДВЕДОМСТВЕННЫЕ ОРГАНИЗАЦИИ</div>
<ul class="mobile_footer_wrapper__list">
<li class="mobile_footer_wrapper__link"><a href="./404.php">Школы</a></li>
<li class="mobile_footer_wrapper__link"><a href="./404.php">Учреждения дополнительного образования</a></li>
<li class="mobile_footer_wrapper__link"><a href="./404.php">Детские сады</a></li>
</ul>
</div> <!-- ./mobile_footer_wrapper__item -->
<div class="mobile_footer_wrapper__item">
<div class="mobile_footer_wrapper__title">ПРИЁМНАЯ</div>
<ul class="mobile_footer_wrapper__list">
<li class="mobile_footer_wrapper__link"><a href="./404.php">Личный прием</a></li>
<li class="mobile_footer_wrapper__link"><a href="./404.php">Задать вопрос</a></li>
<li class="mobile_footer_wrapper__link"><a href="./404.php">Часто задаваемые вопросы</a></li>
<li class="mobile_footer_wrapper__link"><a href="./404.php">Горячие линии</a></li>
</ul>
</div> <!-- ./mobile_footer_wrapper__item -->
</div> <!-- ./mobile_footer_wrapper -->
<div class="contacts">
<a href="https://vk.com/club215676668"><img class="socialNetWorkIcon" src="http://www.uob-konakovo.ru/assets/images/vk.svg"/></a>
<p class="contactsPhoneNumber">8(48242)4-97-95</p>
</div>
</div>
<button class="scroll-to-top-btn" title="Наверх"></button>
<img alt="Выбор темы" class="themeBtn" src="./assets/images/darkTheme.svg" title="Выбор темы"/>
<img alt="Версия для слабовидящих" class="visionBtn" src="./assets/images/visionBtn.svg" title="Версия для слабовидящих"/>
<script src="./assets/js/index.js"></script>
<script src="./assets/js/to_up.js"></script>
</body>
</html>
            ';
    }

?>