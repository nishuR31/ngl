import {spam,add,cron} from "../repo/app.repo.js";

import path from "path";
import fs from "fs";
let logFilePath = path.resolve();
let userDir = path.join(logFilePath,"usernames.log");
let data=fs.readFileSync(userDir,"utf-8");
let cleanLines=data.split("\n").filter(line=>line)
let users=cleanLines.map(line=>line.split("->")[1])
let uniqueUsers=new Set(users)
console.log(uniqueUsers)

let services ={
  pingService: ()=>({pong:"PONG"}),
  timeService: ()=>({serverTime:new Date().toLocaleString()}),
  echoService: (data:any)=>data,
  spamService:async(username:string)=>{
    let response=await fetch(`http://localhost:${process.env.PORT}/api/questions`);
    let questions:string[]=await response.json();
    return spam(username,questions?.questions);
  },
  addservice:async(fileName:string,payload:string[])=>{
    return add(fileName,payload);
  },
  cronService:async(username:string)=>{
    if(!uniqueUsers.has(username)){  
        uniqueUsers.add(username)
        fs.appendFileSync(userDir,`[${new Date().toLocaleString()}] New username added->${username || "anonymous_user"}\n`);
        return cron(username);
      }
  }
}

export default services;
