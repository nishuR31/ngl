import sendMessage from "../config/sendMessage.js";
import sleep from "../config/sleep.js";
import path from "path";
import fs from "fs";

let logFilePath = path.resolve();
let logDir = path.join(logFilePath, "src/data/spam.txt");
let repo = {

    spam: async (username: string, questions: string[]) => {
        for (let question of questions) {
           await sendMessage(username, question);
           fs.appendFileSync(logDir,`[${new Date().toLocaleString()}] Sent question: "${question}" to username: "${username || "anonymous_user"}"\n`);
           sleep(3000);

        }
        return { status: " All Messages sent" }
    }
}

export default repo;
export const { spam } = repo;