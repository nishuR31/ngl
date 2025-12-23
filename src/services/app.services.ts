import { spam, add, cron } from "../repo/app.repo.js";
import axios from "axios"

let services = {
  pingService: () => ({ pong: "PONG" }),
  timeService: () => ({ serverTime: new Date().toLocaleString() }),
  echoService: (data: any) => data,
  spamService: async (username: string) => {
    let response = await axios.get(
      `http://localhost:${process.env.PORT}/api/questions`
    );
    let questions: string[] = await response.data;
    return spam(username, questions );
  },
  addservice: async (fileName: string, payload: string[]) => {
    return add(fileName, payload);
  },
  cronService: async (username: string) => {
  
    return cron(username);
  },
};

export default services;
