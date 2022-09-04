import {
    DiscordWebhookAuthor as Author,
    DiscordWebhookContent as WebhookContent,
    DiscordWebhook as Webhook,
} from "./typings";
import fetch from "node-fetch";

export class DiscordWebhook {
    webhookUrl: string;
    webhookData: {};
    constructor(webhookUrl: string) {
        this.webhookUrl = webhookUrl;
        this.webhookData = {};
    }

    async modify(data: Author) {
        const webhookData = this.webhookData;
        this.webhookData = { ...webhookData, ...data };
        return this.webhookData as Author;
    }

    async send(data: WebhookContent) {
        const webhookData = this.webhookData;
        fetch(this.webhookUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...webhookData, ...data }),
        });
    }

    async get(): Promise<Webhook | null> {
        return new Promise<Webhook | null>(async (resolve, reject) => {
            const response = await fetch(this.webhookUrl);
            if (!response.ok) {
                return reject("Webhook doesn't exist");
            }
            resolve(response.json() as Webhook | any);
        });
    }

    isValid(): Promise<boolean> {
        return this.get()
            .then(() => true)
            .catch(() => false);
    }
}
