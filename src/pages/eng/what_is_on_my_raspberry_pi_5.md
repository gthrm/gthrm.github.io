---
title: "What's on My Raspberry Pi 5"
date: "2024-09-22 21:09:00"
lang: "eng"
type: "main"
description: "Raspberry Pi 5 usage experience: purchasing from an official distributor, setting up personal services, and a home media server. I'll share my impressions and useful tips."
keywords: "Raspberry Pi 5, buy Raspberry Pi 5, Raspberry Pi 5 review, Raspberry Pi 5 setup, GalagoMarket Raspberry Pi, Raspberry Pi 5 delivery to Serbia, home server on Raspberry Pi, self-hosted services Raspberry Pi, Ubuntu on Raspberry Pi, media server on Raspberry Pi, Raspberry Pi installation, Raspberry Pi 5 usage, Raspberry Pi experience"
---

![](https://i.vas3k.club/9a1e3df2b7fcdc64c8086f33eb76a5b652d87aabe6bd7b85d775fd2b78053c86.jpg)

A couple of months ago I bought a Raspberry Pi 5. Here's what came out of it.

## About the goals

I didn't have a specific goal. The main idea was to stop using cloud VDS (I had 3 on **DigitalOcean**), thereby slightly reducing monthly costs.

Since I have a static IP, I decided to move some of my personal services onto it.

But the Raspberry Pi 5 even exceeded my expectations.

Now, let's go in order.


## Where and how I ordered

I ordered it from the official distributor, who delivers to Serbia - [GalagoMarket](https://www.rs.galagomarket.com//item/display/3746?src=raspberrypi). Delivery from Slovenia took a little more than 2 weeks.

*P.s. At the time, I didn’t know that the import tax to Serbia is 30% if the item's price exceeds 50 euros.*

## Package Contents

I decided to order the full set so I wouldn't have to deal with additional parts:

- **[RASPBERRY PI 5, 8GB](https://www.rs.galagomarket.com//item/display/3746?src=raspberrypi);**
- **Case [RASPBERRY PI 5 CASE, WHITE/RED](https://www.rs.galagomarket.com/item/display/3750)** *(P.S. It's better not to put on the top cover to prevent overheating);*
- **Power supply [RASPBERRY PI 27W USB-C POWER SUPPLY, EU PLUG, WHITE](https://www.rs.galagomarket.com/item/display/3748);**
- **Official HDMI cable** **[MICRO-HDMI TO HDMI CABLE 1M, WHITE](https://www.rs.galagomarket.com/item/display/1865);**
- **Cooler [ACTIVE COOLER](https://www.rs.galagomarket.com/item/display/3751)** *(There is a built-in cooler in the case, but it's quite useless and very loud. This one is much quieter and more efficient).*

The whole set cost 115 euros plus DHL shipping — 30 euros.

I paid the tax and the bill for the services of the company that processes the documents at the border.

In total, it came to around **170 euros**.

Thus, the total cost of the set was equivalent to 8.5 months of VDS rental.

So, what is it for?

## Main Pet Services

The first thing I installed was **Ubuntu 24**, not the server version, but with a graphical interface. Why? I'll explain later.

**Main pet services I use in daily life:**

- A custom-made cloud for quickly uploading images and files to the cloud and getting a link to insert them somewhere, based on **nodejs** and [DigitalOcean Spaces](https://www.digitalocean.com/products/spaces) (I won’t give a link to the code, it's really bad).
- [image-converter](https://github.com/gthrm/image-converter) a converter and resizer for web images, allowing you to compress photos and decode them into jpeg, webp, or aif using **ffmpeg** quickly and easily, optimized for mobile devices;
- Telegram bots ranging from simple ones like:

  - [get_my_data_bot](https://t.me/get_my_data_bot) - lets you get information about your user;

    to more complex ones like:

  - [sub_track_bot](https://t.me/sub_track_bot) - analyzes the attendance of Telegram groups and monitors user activity in the group. It gives the owner the ability to get data for analysis. Access is currently by request only;
  - [SrpskiPrijateljBot](https://t.me/SrpskiPrijateljBot) - a bot that translates between Serbian and Russian with the ability to recognize text from an image and voice the text using OpenAI.
  - [Air Quality Monitoring Bot](https://github.com/gthrm/air-quality-monitoring-bot) - a bot that notifies about increased temperature or air pollution in the apartment based on [ThingSpeak](https://thingspeak.com/) and [nodemcu](https://www.nodemcu.com/index_en.html).

## Self-hosted Solutions

- [n8n](https://docs.n8n.io/hosting/) *([for example, a flow for monitoring resource availability](https://n8n.io/workflows/2327-host-your-own-uptime-monitoring-with-scheduled-triggers/))*;
- [Jenkins](https://www.jenkins.io/download/);
- [Postgres](https://www.docker.com/blog/how-to-use-the-postgres-docker-official-image/);
- [ClickHouse](https://clickhouse.com/docs/en/install).

## Architecture

To run my services, I use **[pm2](https://pm2.keymetrics.io/),** **[Docker](https://www.docker.com/)** and **[nginx](https://nginx.org/en/)**.

For CI/CD [Jenkins](https://www.jenkins.io/) and [github](https://github.com/).

For quick automations [n8n](https://docs.n8n.io/hosting/).

For backups **[rclone](https://rclone.org/install/)** and **[DigitalOcean Spaces](https://www.digitalocean.com/products/spaces)**.

For protection against attacks, I set up **[Cloudflare](https://www.cloudflare.com/)** (free plan), which proxies requests to my domains to nginx.

By the way, DNS record management is also done through Cloudflare, which is much more convenient than the registrar’s dashboard.

Next, **nginx** on the Raspberry Pi receives the requests and proxies them to the appropriate Raspberry Pi ports.

But that's not all.

## Home Media Server

At the same time, my **Raspberry Pi 5** is used as a home media server.

Since the rented apartment has an old, inexpensive TV without the ability to install apps, I connected the **Raspberry Pi** to it, which is where the graphical interface comes in handy.

Thus, you can watch movies, listen to music, and browse YouTube right from the couch.

For easy switching between movies, I quickly assembled a solution in the form of a one-pager based on **[airtable](https://www.airtable.com/)**, **[airtable API](https://airtable.com/developers/web/api/introduction),** **js** and [Omdbapi API](https://www.omdbapi.com/), so when adding a link to the movie and its title in the table, the poster and description are automatically loaded and displayed on the home page of Chromium on the Raspberry when opened.

In addition, the Raspberry Pi 5 has Bluetooth, making it easy to connect to an audio system.

In the end, it turns into a media solution for watching movies and listening to music while also running the services.

How do you use your Raspberry Pi?
