---
title: "Как настроить и подключить Amplitude в проект на React Native - Expo"
date: "2020-05-26"
---
![alt text](https://cloud.cdroma.ru/upload/a73a6017268863bc3232eff836c3ec251590507684094.png "Expo + Amplitude")


Эта статья описывает моё виденье того, как можно подключить [Amplitude](https://amplitude.com/) — комплексное программное обеспечение для анализа продуктов для web и мобильных устройств в проект React Native созданные с использованием [Expo CLI](https://expo.io/learn).

## 1. Настройка проекта ##
-----------------------------------

### 1.1 Установка зависимостей ###

Установим Amplitude в проект, созданный на Expo CLI:
```
expo install expo-analytics-amplitude
```

### 1.2 Настройка окружения amplitude в проекте ###

1.2.1 Перейдем в корень проекта и создадим там папку **amplitude**

---

1.2.2 В папке **amplitude** создадим 4 файла:
- ***index.js***
- ***config.js***
- ***events.js***
- ***utils.js***

---

1.2.3 В **config.js** экспортируем константу **apiKey**, пока ей будет присвоена пустая строка, мы вернемся к ней ниже

![// amplitude/config.js export const apiKey = '';](https://cloud.cdroma.ru/upload/5cc0869b1a747462c2cb48c1b8bca8951590508715755.png "// amplitude/config.js export const apiKey = ''")

---

1.2.4 В **utils.js** пропишем функцию **normalizeTrackingOptions**.

Эта функция служит для создания объекта - опции, который содержит дополнительную информации о событии, передаваемом в Amplitude.

Именно такой код рекомендует Expo в своем [примере](https://github.com/expo/expo/blob/master/home/api/Analytics.ts)

![normalizeTrackingOptions](https://cloud.cdroma.ru/upload/173a6117019feff888cf74ee4b8dfb111590508947263.png "normalizeTrackingOptions")

---

1.2.5 Файл **events.js** необходим для хранения и стандартизации наименований тех событий, которые мы хотим логировать в Amplitude.

Например, мы хотим логировать вход пользователя в приложение, для этого создадим константу **LOG_IN**, которою будем передавать в функцию логирования (ниже).

Таким же образом можно логировать ошибки.

![amplitude/events.js](https://cloud.cdroma.ru/upload/00d297e0dc9455e67ac9633dafd088281590509141543.png "amplitude/events.js")

---

1.2.6 В файл **index.js** импортируем

- **Amplitude** из *expo-analytics-amplitude*,

- **apiKey** из *config.js*,

- **normalizeTrackingOptions** из *utils.js*

и **eventAction** из *events.js*

![amplitude/index.js](https://cloud.cdroma.ru/upload/f8b320d7cb58a9c6d42cdfb691fb839b1590509442327.png "amplitude/index.js")

И ниже экспортируем events, это нужно для удобного доступа к ним.

![amplitude/index.js](https://cloud.cdroma.ru/upload/9877b33b90aa40a8e4ba289415494e031590509588590.png "amplitude/index.js")

---

1.2.7 Теперь создадим фикцию **initialize** для инициализации Amplitude, она необходима для авторизации в сервисе по apiKey

Она будет вызывать метод initialize у Amplitude с нашим apiKey, это выглядит так:

![amplitude/index.js](https://cloud.cdroma.ru/upload/5024a14c01a794a7a60deb0d129c5ace1590510408687.png "amplitude/index.js")

---

1.2.8 Создадим функцию **identify** для идентификации наших пользователей приложения в Amplitude по их данным, например, получаемых с api

Она будет принимать **id** пользователя *(id, который присвоен вашему пользователю при регистрации в вашем приложении, если такой есть)* и **options** *(дополнительная информация о пользователе, например имя, email, дата рождения и др.)*.

Выглядит следующим образом:

![amplitude/index.js](https://cloud.cdroma.ru/upload/767e03e360a91f9f6c4ffaf1150b51101590510555332.png "amplitude/index.js")

---

1.2.9 Создадим фикцию **logEvent** для логирования событий в приложении

![amplitude/index.js](https://cloud.cdroma.ru/upload/5db520dd48141c52f26514d075f7e0a61590510724047.png "amplitude/index.js")

---

1.2.10 В завершении, экспортируем **events**, **initialize**, **identify**, **logEvent** из ***index.js***


![amplitude/index.js](https://cloud.cdroma.ru/upload/073dea3d94a21270de34387c1bcc10961590510826996.png "amplitude/index.js")

Целиком **index.js** выглядит так:

![amplitude/index.js](https://cloud.cdroma.ru/upload/841ac12d4c681422f753099e55d0c03b1590510898814.png "amplitude/index.js")

---

### 1.3 Подключение логера Amplitude в компонент ###

1.3.1 Импортируем **logEvent** и **events** в компонент, действия которого необходимо логировать, например в **App.js**

![App.js](https://cloud.cdroma.ru/upload/9d9b8df2cb926ad1bcdaa99790f888451590511083596.png "App.js")

---

1.3.2 В **App.js** создадим тестовую кнопки **LogIn** и **Error**.

**LogIn** будет имитировать вход в приложение.

**Error** -  соответственно, будет имитировать ошибку.

А так же создадим хендлер **onPressHandler** для **LogIn** и **errorHandler** для **Error**.

В них мы будем вызывать **logEvent** с событиями, которые мы подготовили в файле **events.js**

![App.js](https://cloud.cdroma.ru/upload/cbc7e840fcd6ecef4f884f1bf5bcb77d1590511391427.png "App.js")

---

## 2 Настройка Amplitude ##
-----------------------------------

### 2.1 Создание и настройка аккаунта ###

2.1.1 Переходим на сайт https://amplitude.com/ и жмём **Explore demo now**

![Переходим на сайт https://amplitude.com/ и жмём **Explore demo now**](https://cloud.cdroma.ru/upload/fbf7de218b23f68fdf378f2784f664df1590511548379.png "Переходим на сайт https://amplitude.com/ и жмём **Explore demo now**")

---

2.1.2 Вводим email

![Вводим email](https://cloud.cdroma.ru/upload/4e0f5813311b05421bbb71c00c0a04b41590511582694.png "Вводим email")

---

2.1.3 Выбираем направленность вашего приложения, например **Media** и жмём **Next**

![Выбираем направленность вашего приложения](https://cloud.cdroma.ru/upload/ef7c4cf8aec226615d57daac4e44b43d1590511664969.png "Выбираем направленность вашего приложения")

---

2.1.4 Вводим свои данные

![Вводим свои данные](https://cloud.cdroma.ru/upload/d2b94b89bac6404a973a0a415fa236501590511712055.png "Вводим свои данные")

---

На данный момент открыта демо версия с различными метриками. Метрики подобраны под направленность компании, которая была выбрана ранее (Media).

Тут можно изучить как работает Amplitude, потыкать разные кнопки, увидеть систему в рабочем состоянии на demo данных.

![демо версия с различными метриками](https://cloud.cdroma.ru/upload/446c8ff68faea4c7874730c97b33b3751590511784799.png "демо версия с различными метриками")

---

2.1.5 Идем в почту, находим письмо от Amplitude, переходим по ссылке, вводим данные в форму и жмём **Activate**

![Activate](https://cloud.cdroma.ru/upload/217438033c3672a72dc07876801be5dd1590511855826.png "Activate")

---

2.1.6 Теперь, когда мы уже все проверили, изучили и подтвердили, в самом верху страницы жмём кнопку **Set up on the Free Plan**

![Set up on the Free Plan](https://cloud.cdroma.ru/upload/453674a4918d37a31c9ded2b9db70ad31590511925197.png "Set up on the Free Plan")

---

2.1.7 Далее, вводим имя организации (будет отображаться в системе) и url по которому будет доступен ваш аккаунт Amplitude, и жмём **Create**

![Create](https://cloud.cdroma.ru/upload/8ab933098f8e3a02cc54d3f544310d8b1590513017669.png "Create")

---

Поздравляю, теперь у вас есть аккаунт на Amplitude

---


### 2.2 Создание и настройка проекта ###

2.2.1 На появившемся экране жмём **Create Project**, вводим имя проекта и жмём **Create**

![Create Project](https://cloud.cdroma.ru/upload/78c077f1e7db771eb9cc5fc3451e8ed51590513175963.png "Create Project")

![Create Project](https://cloud.cdroma.ru/upload/9eb555cf6184a91c4a7cfbeeacf9d2cc1590513235774.png "Create Project")

---

2.2.2 После сохдания проекта открылась главная его страница, на ней нас интересует **API Key**.

Копируем его в файл **сonfig.js** и жмём **Add Data Source**

![Add Data Source](https://cloud.cdroma.ru/upload/66391f4ab3af4820391abed1ea0ce9611590513353394.png "Add Data Source")

---

2.2.3 Выбираем iOS SDK и жмём **Next** и снова **Next**

![iOS SDK](https://cloud.cdroma.ru/upload/27fc24a1f6073df92eba6b412f672c401590513419484.png "iOS SDK")

![iOS SDK](https://cloud.cdroma.ru/upload/364c6209edc9a1258486a85175c657e91590513471040.png "iOS SDK")

Сейчас Amplitude ждёт события от приложения.

Как только событие будет отправлено, Amplitude получит его и укажет здесь.

![Amplitude ждёт события от приложения](https://cloud.cdroma.ru/upload/6ba084544cad9fddc5a28386609b3ad01590513527355.png "Amplitude ждёт события от приложения")

---

2.2.4 Теперь запускаем наше приложение в симуляторе iPhone и жмём кнопку **Login**, чтобы отправить первый ивент после чего Amplitude получит наше событие из приложения и выведет такое окно. Жмём **Finish**

![Amplitude получит наше событие из приложения](https://cloud.cdroma.ru/upload/11bf25f5d20e1fdb237b46c8c32dcfe81590513671203.png "Amplitude получит наше событие из приложения")

---

2.2.5 Чтобы добавить поддержку Android, проделайте подобное (2.2.3–2.2.5) для Android SDK и симулятором Android

---


На этом всё, Amplitude добавлен в ваш проект на React Native - Expo.

Теперь вам остаётся только настроить нужные для вас метрики и мониторинг.

*Например, чтобы посмотреть информация о событии* **LOG_IN** *или* **ERROR_EVENT** *, которые мы создали выше,можно перейти на страницу*

*https://analytics.amplitude.com/ИМЯ_ВАШЕЙ_КОМПАНИИ/activity и увидеть статистику во времени*

## На этом всё. ##
### Спасибо всем, кто прочитал! ###
Буду рад обратной связи.

Ссылка на репозиторий с кодом: https://github.com/gthrm/amplitude_to_react_native_expo_example