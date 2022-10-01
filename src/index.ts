import express from "express";
import dotenv from "dotenv";
import DiscordWebhook from "./webhook";
import { YouTubeSubscription, YouTubeVideo } from "./typings";
// @ts-ignore
import YouTubeNotifier from "youtube-notification";
import Cache from "./cache";
import Logger from "./logger";
dotenv.config();

const app = express();
const port = process.env.PORT;
const baseUrl = `${process.env.SERVER}:${port}`;

const YT_LUSOR = "UCutxBsHkawd5e_0rsWNYHpw";
const YT_EHRENLORD = "UCAAG4XG6FI6WtfJX0e5HTxg";
const channels = [YT_LUSOR, YT_EHRENLORD];

const yt_webhook = new DiscordWebhook(process.env.WEBHOOK_URL as string);
yt_webhook.modify({
    username: "YouTube",
    avatar_url: "https://cdn.discordapp.com/app-assets/769568156309389332/1015627360156008448.png",
});

const notifier = new YouTubeNotifier({
    hubCallback: `${baseUrl}/youtube/notifications`
});

const cache = new Cache();
const logger = new Logger();

app.use("/youtube/notifications", notifier.listener());
app.listen(port, () => {
    logger.write(`App listening at http://localhost:${port}`);
});

notifier.subscribe(channels);
notifier.on("subscribe", (data: YouTubeSubscription) => {
    setTimeout(() => {
        notifier.unsubscribe(data.channel);
        notifier.subscribe(data.channel);
    }, (Number(data.lease_seconds) - 5) * 1000);
    logger.write(`Subscribed to ${data.channel}: ${JSON.stringify(data)}`);
});
notifier.on("notified", (data: YouTubeVideo) => {
    if (cache.getItem(data.video.id) !== undefined || (new Date(data.published) < new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 7))) return;
    logger.write(`${data.channel.name} published ${data.video.title}`);
    yt_webhook.send({
        content: `Hey <@&880108096788234300>,\n**${data.channel.name}** hat ein neues Video hochgeladen! 🤙\n${data.video.link}`,
    });
    cache.setItem(data.video.id, data);
});
