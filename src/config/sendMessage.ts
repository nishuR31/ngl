import {randomUUID} from "crypto";


const sendMessage:(username:string,question:string)=>{} = async (username,question) => {
  const res = await fetch("https://ngl.link/api/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    },
    body: JSON.stringify({
      question,
      username: username || "anonymous_user",
      deviceId: randomUUID(),
      gameSlug: "",
      referrer: ""
    })
  });

  return res.json();
};
export default sendMessage;