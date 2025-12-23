import sendMessage from "../config/sendMessage.js";
import sleep from "../config/sleep.js";
import axios from "axios"
import path from "node:path";
import fs from "node:fs";
import cronNode from "node-cron";

let logFilePath = path.resolve();
let logDir = path.join(logFilePath, "spam.log");


let repo = {
    spam: async (username: string, questions: string[]) => {
        for (let question of questions) {
           await sendMessage(username, question);
           fs.appendFileSync(logDir,`[${new Date().toLocaleString()}] Sent question: "${question}" to username: "${username || "anonymous_user"}"\n`);
           sleep(3000);

        }
        return { status: " All Messages sent" }
    },
    add: async (fileName: string, payload: string[]) => {
        fs.appendFile(fileName,payload,(err)=> err)
        return { status: `All Messages saved in ${fileName}` }
    },
    cron:async(username:string)=>{

        let counter = 0;
        const response = await axios.get(
            `http://localhost:${process.env.PORT}/api/questions`
        );
         if (!response.status) {
            return "Failed to fetch questions";
        }
        console.log(response.data)
        let questions=response.data?.questions;

        cronNode.schedule("*/5 * * * * *", async () => {
        try {
       
        if (!questions[counter]) {
            counter=0;
        }

        const result = await sendMessage(username, questions[counter]);

        if (result) {
            fs.appendFileSync(logDir,`[${new Date().toLocaleString()}] Sent question: "${questions[counter]}" to username: "${username || "anonymous_user"} "\n`);
            counter++;
        }
        return "All messages sent";

        } catch (err) {
        return `Cron job error : ${err}`;
        }
    });
    }
}

export default repo;
export const { spam ,add, cron} = repo;