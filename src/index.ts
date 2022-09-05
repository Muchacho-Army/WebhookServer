import express from "express";
import dotenv from "dotenv";
import DiscordWebhook from "./webhook";
import { YouTubeVideo } from "./typings";
// @ts-ignore
import YouTubeNotifier from "youtube-notification";
dotenv.config();

const app = express();
const port = process.env.PORT;
const baseUrl = `${process.env.SERVER}:${port}`;

const YT_LUSOR = "UCutxBsHkawd5e_0rsWNYHpw";
const YT_EHRENLORD = "UCAAG4XG6FI6WtfJX0e5HTxg";
const channels = [YT_LUSOR, YT_EHRENLORD];

const yt_webhook = new DiscordWebhook(process.env.WEBHOOK_URL as string);
yt_webhook.modify({ username: "YouTube", avatar_url: "https://cdn.discordapp.com/app-assets/769568156309389332/1015627360156008448.png" });
const tv_webhook = new DiscordWebhook(process.env.WEBHOOK_URL as string);
tv_webhook.modify({ username: "Twitch", avatar_url: "https://cdn.discordapp.com/app-assets/769568156309389332/1016299248746246195.png" })

const notifier = new YouTubeNotifier({
    hubCallback: `${baseUrl}/youtube/notifications`,
});

app.use("/youtube/notifications", notifier.listener());
app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});

notifier.subscribe(channels);
notifier.on("subscribe", (data: any) => {
    console.log(`Subscribed to ${data.channel}`);
});
notifier.on("notified", (data: YouTubeVideo) => {
    if (new Date(new Date(data.updated).getTime() - 1000 * 60) <= new Date(data.published)) {
        console.log(`${data.channel.name} published ${data.video.title}`);
        yt_webhook.send({
            content: `Hey <@&880108096788234300>,\n${
                data.channel.id === YT_LUSOR ? "die **Lusors** haben" : "**Doppelter Ehrenlord** hat"
            } ein neues Video hochgeladen! 🤙\n${data.video.link}`,
        });
    }
});
