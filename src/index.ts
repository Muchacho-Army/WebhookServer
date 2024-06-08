import dotenv from "dotenv";
import express from "express";

import Logger from "./logger";
import YouTube from "./platforms/youtube";

dotenv.config();

const app = express();
const port = process.env.PORT || 443;
const baseUrl = `${process.env.SERVER}:${port}`;

const logger = new Logger("App");

const YT_LUSOR = "UCutxBsHkawd5e_0rsWNYHpw";
const YT_EHRENLORD = "UCAAG4XG6FI6WtfJX0e5HTxg";
const YT_CHANNELS = [YT_LUSOR, YT_EHRENLORD];

const youtube = new YouTube({ base_url: baseUrl, channels: YT_CHANNELS, webhook: process.env.DISCORD_WEBHOOK as string });

app.use(youtube.middleware());

app.get("/health", (req, res) => {
    res.status(200).json({ status: "ok", uptime: Math.floor(process.uptime()) });
});
app.listen(port, () => logger.write(`Listening at ${baseUrl}`));
