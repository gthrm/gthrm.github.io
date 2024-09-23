---
title: "Что на моем Raspberry Pi 5"
date: "2024-09-22 21:09:00"
lang: "rus"
type: "main"
description: "Опыт использования Raspberry Pi 5: покупка у официального представителя, настройка личных сервисов и домашнего медиа-сервера. Поделюсь впечатлениями и полезными советами."
keywords: "Raspberry Pi 5, купить Raspberry Pi 5, Raspberry Pi 5 обзор, настройка Raspberry Pi 5, GalagoMarket Raspberry Pi, Raspberry Pi 5 доставка в Сербию, домашний сервер на Raspberry Pi, self-hosted сервисы Raspberry Pi, Ubuntu на Raspberry Pi, медиа-сервер на Raspberry Pi, установка Raspberry Pi, использование Raspberry Pi 5, опыт использования Raspberry Pi"
---

![](https://i.vas3k.club/9a1e3df2b7fcdc64c8086f33eb76a5b652d87aabe6bd7b85d775fd2b78053c86.jpg)

Пару месяцев назад я приобрел Raspberry Pi 5. И вот что из этого вышло.

## О целях

У меня не было какой-то конкретной цели. Основная идея заключалась в том, чтобы отказаться от облачных vds (у меня их было 3 в **DigitalOcean**). Тем самым немного сократить ежемесячные затраты.

Так как у меня белый ip, я решил перенести на него часть своих сервисов, которые я использую в личных целях.

Но Raspberry Pi 5 даже превзошел мои ожидания.

Но сейчас все по-порядку.


## Где и как заказывал

Заказывал у официального представителя, который доставляет в Сербию - [GalagoMarket](https://www.rs.galagomarket.com//item/display/3746?src=raspberrypi). Доставка из Словении заняла чуть больше 2-х недель.

*P.s. На тот момент я не знал, что налог на ввоз в Сербию составляет 30%, если стоимость товара превышает 50 евро)*.

## Комплектация

Я решил заказать полный комплект, чтобы не заморачиваться с доп. частями;

- **[RASPBERRY PI 5, 8GB](https://www.rs.galagomarket.com//item/display/3746?src=raspberrypi);**
- **Кейс [RASPBERRY PI 5 CASE, WHITE/RED](https://www.rs.galagomarket.com/item/display/3750)** *(p.s. Верхнюю крышку надевать не стоит, для предотвращения перегрева);*
- **Блок питания [RASPBERRY PI 27W USB-C POWER SUPPLY, EU PLUG, WHITE](https://www.rs.galagomarket.com/item/display/3748);**
- **Официальный кабель HDMI** **[MICRO-HDMI TO HDMI CABLE 1M, WHITE](https://www.rs.galagomarket.com/item/display/1865);**
- **Куллер [ACTIVE COOLER](https://www.rs.galagomarket.com/item/display/3751)** *(в корпусе есть встроенный куллер, но он довольно бесполезный и очень громкий, этот в разы тише и эффективнее).*

Весь комплект обошелся в 115 евро плюс доставка DHL — 30 евро.

Оплатил налог и счет за услуги компании, которая оформляет документы на границе.

Итого получилось около **170 евро**.

Таким образом стоимость всего комплекта составила 8.5 месяцев аренды vds.

Так для чего же он нужен?

## Основные пет-сервисы

Первым делом я установил на него **Ubuntu 24**, не сервер, а с графической оболочкой. Почему? Расскажу позже.

**Основные пет-сервисы, которые использую в повседневной жизни:**

- самописный клауд для быстрой загрузки картинок и файлов в облако и получения на них ссылки для вставки куда-либо на основе **nodejs** и [DigitalOcean Spaces](https://www.digitalocean.com/products/spaces)  (ссылку на код не дам, уж очень он ужасный.
- [image-converter](https://github.com/gthrm/image-converter) конвертер и ресайзер картинок для веба, который позволяет сжимать фото и декодировать в jpeg, webp или aif на базе **ffmpeg** быстро и просто, адаптирован для мобильных устройсв;
- боты телеграмм от простых, вроде:

  - [get_my_data_bot](https://t.me/get_my_data_bot) - позволяет получить информацию о своем пользователе;

    до сложных, вроде:

  - [sub_track_bot](https://t.me/sub_track_bot) -  анализирует посещаемость групп тг и мониторит активность пользователей в группе. Дает возможность овнеру получить данные для анализа. Доступ к нему сейчас только по запросу;
  - [SrpskiPrijateljBot](https://t.me/SrpskiPrijateljBot) -  бот переводчик с сербского на русский и обратно с возможностью распознавания текста с картинки, а так же озвучки текста на базе OpenAI.
  - [Air Quality Monitoring Bot](https://github.com/gthrm/air-quality-monitoring-bot) - бот который уведомляет о повышении температуры или загрязнении воздуха в квартире на базе [ThingSpeak](https://thingspeak.com/) и [nodemcu](https://www.nodemcu.com/index_en.html).

## Селф-хостед решения

- [n8n](https://docs.n8n.io/hosting/) *([например, флоу для мониторинга доступности своих ресурсов](https://n8n.io/workflows/2327-host-your-own-uptime-monitoring-with-scheduled-triggers/))*;
- [Jenkins](https://www.jenkins.io/download/);
- [Postgres](https://www.docker.com/blog/how-to-use-the-postgres-docker-official-image/);
- [ClickHouse](https://clickhouse.com/docs/en/install).

## Архитектура

Для запуска своих сервисов я использую **[pm2](https://pm2.keymetrics.io/),** **[Docker](https://www.docker.com/)** и **[nginx](https://nginx.org/en/)**.

Для CI/CD [jenkins](https://www.jenkins.io/) и [github](https://github.com/).

Для быстрых автоматизаций [n8n](https://docs.n8n.io/hosting/).

Для бэкапа **[rclone](https://rclone.org/install/)** и **[DigitalOcean Spaces](https://www.digitalocean.com/products/spaces)**

Для защиты от атак настроил **[Сloudflare](https://www.cloudflare.com/)** (бесплатный тариф), он проксирует запросы к моим доменам до nginx.

Кстати, управление DNS записями так же осуществляться через Cloudflare, что намного удобнее, чем в дашборде регистратора.

Дальше запросы принимает **nginx** на raspberry и проксирует на нужные порты Raspbery Pi.

Но это еще не все.

## Домашний медиа-сервер

Мой **Raspberry Pi 5**, в это же время, используется как домашний медиа сервис.

Так как в арендной квартире совсем не новый и не дорогой телевизор без возможности установки на него приложений, я подключил **Raspberry Pi** к нему, вот где понадобится графическая оболочка.

Таким образом, можно смотреть фильмы, слушать музыку, залипать в youtube и тд прямо с дивана.

Для удобного переключения между фильмами я собрал быстрое решение в виде одностраничника на основе **[airtable](https://www.airtable.com/)**, **[airtable api](https://airtable.com/developers/web/api/introduction),** **js** и [Omdbapi API](https://www.omdbapi.com/), таким образом, при добавлении ссылки на фильм и его названия в таблицу, автоматически подгружается постер и описание и отображается на домашней станице Chromium на Raspberry при открытии.

Кроме того, у Raspberry Pi 5 есть Bluetooth, таким образом его легко подключить к аудио системе.

В итоге получается медиа решение для просмотра фильмов и прослушивание музыки одновременно с работой сервисов.

А как вы используете свой Raspberry Pi?