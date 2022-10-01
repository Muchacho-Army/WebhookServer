import fs from "fs";
import path from "path";

const timestamp = () => new Date().toISOString().replace("T", " ").replace("Z", "");

export default class Logger {
    private file: fs.WriteStream;
    constructor() {
        this.file = fs.createWriteStream(path.join(__dirname, "../debug.log"), { flags: "a" });
        this.file.write("==================================================================\n");
    }

    write(message: string): void {
        const out = `${timestamp()} | ${message}`;
        console.log(out);
        this.file.write(`${out}\n`);
    }
}
