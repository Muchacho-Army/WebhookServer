import fs from "fs";
import path from "path";

const timestamp = () => new Date().toISOString().replace("T", " ").replace("Z", "");

export default class Logger {
    private static file: fs.WriteStream = fs.createWriteStream(path.join(__dirname, "../debug.log"));
    public module: string;

    constructor(module: string) {
        this.module = module;
    }

    write(message: string): void {
        const out = `[${timestamp()}] [${this.module}] ${message}`;
        console.log(out);
        Logger.file.write(`${out}\n`);
    }
}
