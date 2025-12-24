import sendMessage from "../config/sendMessage.js";
import sleep from "../config/sleep.js";
import axios from "axios";
import path from "node:path";
import fs from "node:fs";
import cronNode from "node-cron";

let logDir = path.join(process.cwd(), "spam.log");
let fileDir = path.join(process.cwd(), "file.log");

let repo = {
  spam: async (username: string, questions: string[]) => {
    for (let question of questions) {
      await sendMessage(username, question);
      fs.appendFileSync(
        logDir,
        `[${new Date().toLocaleString()}] Sent question: "${question}" to username: "${
          username || "anonymous_user"
        }"\n`
      );
      sleep(3000);
    }
    return { msg: " All Messages sent" };
  },
  add: async (filename: string, payload: string[]) => {
    const safeName = filename.replace(/[^a-zA-Z0-9_-]/g, "");
    const dataDir = path.join(process.cwd(), "src", "data");
    const filePath = path.join(dataDir, `${safeName}.json`);

    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    let file: { questions: string[] } = { questions: [] };

    if (fs.existsSync(filePath)) {
      const raw = fs.readFileSync(filePath, "utf8").trim();
      if (raw.length > 0) {
        try {
          const parsed = JSON.parse(raw);
          if (Array.isArray(parsed?.questions)) {
            file.questions = parsed.questions;
          }
        } catch {
          throw new Error("Corrupted JSON file");
        }
      }
    }

    // 🔥 Proper merge
    file.questions = [...file.questions, ...payload];

    fs.writeFileSync(filePath, JSON.stringify(file, null, 2), "utf8");
    fs.appendFileSync(
      fileDir,
      `[${new Date().toLocaleString()}] New file added in : "${filePath}"`
    );
    return {
      msg: `Saved ${payload.length} messages in ${safeName}.json`,
    };
  },

  cron: async (username: string, filename: string = "questions") => {
    let counter = 0;
    const response = await axios.get(
      `http://localhost:${process.env.PORT}/api/file/${filename}`
    );
    if (!response.status) {
      return {msg:"Failed to fetch questions"};
    }
    let questions = response.data?.questions ?? [];

    cronNode.schedule("*/5 * * * * *", async () => {
      try {
        if (!questions[counter]) {
          counter = 0;
        }

        const result = await sendMessage(username, questions[counter]);

        if (result) {
          fs.appendFileSync(
            logDir,
            `[${new Date().toLocaleString()}] Sent question: "${
              questions[counter].slice(0, 30) + "..."
            }" to username: "${username || "anonymous_user"} "\n`
          );
          counter++;
        }
        return {msg:"All messages sent"};
      } catch (err) {
        return {msg:`Cron job error : ${err}`};
      }
    });
  },
};

export default repo;
export const { spam, add, cron } = repo;
