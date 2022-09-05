"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = __importDefault(require("node-fetch"));
class DiscordWebhook {
    constructor(webhookUrl) {
        this.webhookUrl = webhookUrl;
        this.webhookData = {};
    }
    async modify(data) {
        const webhookData = this.webhookData;
        this.webhookData = { ...webhookData, ...data };
        return this.webhookData;
    }
    async send(data) {
        const webhookData = this.webhookData;
        (0, node_fetch_1.default)(this.webhookUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...webhookData, ...data }),
        });
    }
    async get() {
        return new Promise(async (resolve, reject) => {
            const response = await (0, node_fetch_1.default)(this.webhookUrl);
            if (!response.ok) {
                return reject("Webhook doesn't exist");
            }
            resolve(response.json());
        });
    }
    async isValid() {
        try {
            await this.get();
            return true;
        }
        catch {
            return false;
        }
    }
}
exports.default = DiscordWebhook;
