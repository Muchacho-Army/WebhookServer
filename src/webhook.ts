import {
    DiscordWebhookAuthor as Author,
    DiscordWebhookContent as WebhookContent,
    DiscordWebhook as Webhook,
} from "./typings";
import fetch from "node-fetch";

export default class DiscordWebhook {
    private webhookUrl: string;
    private webhookData: {};
    constructor(webhookUrl: string) {
        this.webhookUrl = webhookUrl;
        this.webhookData = {};
    }

    async modify(data: Author): Promise<Author> {
        const webhookData = this.webhookData;
        this.webhookData = { ...webhookData, ...data };
        return this.webhookData as Author;
    }

    async send(data: WebhookContent): Promise<void> {
        const webhookData = this.webhookData;
        fetch(this.webhookUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...webhookData, ...data }),
        });
    }

    async get(): Promise<Webhook | null> {
        return new Promise(async (resolve, reject) => {
            const response = await fetch(this.webhookUrl);
            if (!response.ok) {
                return reject("Webhook doesn't exist");
            }
            resolve(response.json() as Webhook | any);
        });
    }

    async isValid(): Promise<boolean> {
        try {
            await this.get();
            return true;
        } catch {
            return false;
        }
    }
}
