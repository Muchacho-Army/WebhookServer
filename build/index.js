"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const webhook_1 = __importDefault(require("./webhook"));
// @ts-ignore
const youtube_notification_1 = __importDefault(require("youtube-notification"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
const baseUrl = `${process.env.SERVER}:${port}`;
const YT_LUSOR = "UCutxBsHkawd5e_0rsWNYHpw";
const YT_EHRENLORD = "UCAAG4XG6FI6WtfJX0e5HTxg";
const channels = [YT_LUSOR, YT_EHRENLORD];
const yt_webhook = new webhook_1.default(process.env.WEBHOOK_URL);
yt_webhook.modify({ username: "YouTube", avatar_url: "https://cdn.discordapp.com/app-assets/769568156309389332/1015627360156008448.png" });
const tv_webhook = new webhook_1.default(process.env.WEBHOOK_URL);
tv_webhook.modify({ username: "Twitch", avatar_url: "https://cdn.discordapp.com/app-assets/769568156309389332/1016299248746246195.png" });
const notifier = new youtube_notification_1.default({
    hubCallback: `${baseUrl}/youtube/notifications`,
});
app.use("/youtube/notifications", notifier.listener());
app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
notifier.subscribe(channels);
notifier.on("subscribe", (data) => {
    console.log(`Subscribed to ${data.channel}`);
});
notifier.on("notified", (data) => {
    if (new Date(new Date(data.updated).getTime() - 1000 * 60) <= new Date(data.published)) {
        console.log(`${data.channel.name} published ${data.video.title}`);
        yt_webhook.send({
            content: `Hey <@&880108096788234300>,\n${data.channel.id === YT_LUSOR ? "die **Lusors** haben" : "**Doppelter Ehrenlord** hat"} ein neues Video hochgeladen! 🤙\n${data.video.link}`,
        });
    }
});
