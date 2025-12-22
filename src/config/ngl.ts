import crypto from "cryptp";

const sleep:(data:number)=>Promise = (ms) => new Promise((res) => setTimeout(res, ms));

const sendMessage:(data:string)=>{} = async (question) => {
  const res = await fetch("https://ngl.link/api/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    },
    body: JSON.stringify({
      question,
      username: "icfai.confessions.jh",
      deviceId: crypto.randomUUID(),
      gameSlug: "",
      referrer: ""
    })
  });

  return res.json();
};


const run = async () => {
  console.log(`Starting to send ${questions.length}`);

  for (const q of questions) {
    try {
      const result = await sendMessage(q);
      console.log("Sent successfully:", q.substring(0, 50) + "...", "→", result);
    } catch (err) {
      console.error("Failed to send:", q.substring(0, 50) + "...", err.message);
    }

    await sleep(3000); // 3 seconds delay to stay gentle and safe
  }

  console.log("All pure confessions delivered successfully.");
};

run();
