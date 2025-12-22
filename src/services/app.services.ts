import {spam} from "../repo/app.repo.js";
let services ={
  pingService: ()=>({pong:"PONG"}),
  timeService: ()=>({serverTime:new Date().toLocaleString()}),
  echoService: (data:any)=>data,
  spamService:async(username:string)=>{
    let response=await fetch(`http://localhost:${process.env.PORT}/api/questions`);
    let questions:string[]=await response.json();
    return spam(username,questions?.questions);
  }
}

export default services;
