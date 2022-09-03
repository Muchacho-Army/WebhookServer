"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiscordWebhook = void 0;
const fetch = require("node-fetch");
class DiscordWebhook {
    constructor(webhookUrl) {
        this.webhookUrl = webhookUrl;
        this.webhookData = {};
    }
    modify(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const webhookData = this.webhookData;
            this.webhookData = Object.assign(Object.assign({}, webhookData), data);
            return this.webhookData;
        });
    }
    send(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const webhookData = this.webhookData;
            fetch(this.webhookUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(Object.assign(Object.assign({}, webhookData), data)),
            });
        });
    }
    get() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                const response = yield fetch(this.webhookUrl);
                if (!response.ok) {
                    return reject("Webhook doesn't exist");
                }
                resolve(response.json());
            }));
        });
    }
    isValid() {
        return this.get()
            .then(() => true)
            .catch(() => false);
    }
}
exports.DiscordWebhook = DiscordWebhook;
