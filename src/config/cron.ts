
import cron from "node-cron";
import path from "path";
import fs from "fs";

let logFilePath = path.resolve();
let logDir = path.join(logFilePath, "spam.txt");

export function cronJob(
  time: string,
  username: string
) {
  let counter = 0;
  cron.schedule(time, async () => {
    try {
      const response = await fetch(
        `http://localhost:${process.env.PORT}/api/questions`
      );

      if (!response.ok) {
        console.error("Failed to fetch questions");
        return;
      }

      const questions: string[] = await response.json();

      if (!questions[counter]) {
        console.log("No more questions to send");
        return "No more questions to send";
      }

      const result = await sendMessage(username, questions[counter]);

      if (result) {
        counter++;
        console.log(`Question ${counter} sent to ${username}`);
        fs.appendFileSync(logDir,`[${new Date().toLocaleString()}] Sent question: "${question}" to username: "${username || "anonymous_user"}"\n`);

      }
    } catch (err) {
      console.error("Cron job error:", err);
    }
  });
}
