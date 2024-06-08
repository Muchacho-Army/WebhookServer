import { Router } from "express";
// @ts-ignore
import YouTubeNotifier from "youtube-notification";

import Cache from "../cache";
import Logger from "../logger";
import { YouTubeSubscription, YouTubeVideo } from "../typings";
import DiscordWebhook from "../webhook";

export default class YouTube {
    private notifier: YouTubeNotifier;
    public webhook: DiscordWebhook;
    public channels: Array<String>;
    private cache: Cache;
    private logger: Logger;
    constructor({ base_url, webhook, channels }: { base_url: string, webhook: DiscordWebhook | string, channels: Array<string> }) {
        this.notifier = new YouTubeNotifier({
            hubCallback: `${base_url}/youtube/notifications`,
        });
        this.webhook = typeof webhook === "string" ? new DiscordWebhook(webhook) : webhook;
        this.channels = channels;
        this.cache = new Cache();
        this.logger = new Logger("YouTube");

        this.notifier.subscribe(channels);
        this.setupEvents();
    }

    private setupEvents() {
        this.notifier.on("subscribe", (data: YouTubeSubscription) => {
            setTimeout(() => this.notifier.subscribe(data.channel), (Number(data.lease_seconds) - 5) * 1000);
            this.logger.write(`Subscribed to ${data.channel}: ${JSON.stringify(data)}`);
        });

        this.notifier.on("notified", (data: YouTubeVideo) => {
            if (
                !this.channels.includes(data.channel.id) ||
                this.cache.getItem(data.video.id) !== undefined
            ) return;

            this.logger.write(`${data.channel.name} published ${data.video.title}`);
            this.webhook.send({
                username: "YouTube",
                avatar_url: "https://cdn.discordapp.com/app-assets/769568156309389332/1015627360156008448.png",
                content: `Hey <@&880108096788234300>,\n**${data.channel.name}** hat ein neues Video hochgeladen! 🤙\n${data.video.link}`
            });
            this.cache.setItem(data.video.id, data);
        });
    }

    public middleware() {
        const router = Router();
        router.use("/youtube/notifications", this.notifier.listener());
        return router;
    }
}
