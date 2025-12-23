import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

const fileDir = path.join(process.cwd(), "src/data/questions.json");

// Load JSON
const raw = fs.readFileSync(fileDir, "utf-8");
const parsed = JSON.parse(raw);
let questions: string[] = parsed.questions;

// High-UTF pool
const UNICODE_POOL = [
  "🌌",
  "✨",
  "🧠",
  "💭",
  "🧬",
  "🔥",
  "💥",
  "🎭",
  "🎶",
  "🫀",
  "🫁",
  "🦠",
  "🧫",
  "🧪",
  "⚗️",
  "मैं",
  "तुम",
  "भावना",
  "अनुभूति",
  "العقل",
  "القلب",
  "مشاعر",
  "心",
  "渴望",
  "逻辑",
  "无法",
  "𓆰",
  "𓂀",
  "𓇌",
  "𓅓",
  "𝕬",
  "𝖓",
  "𝖔",
  "𝖓",
  "𝖞",
  "𝖒",
  "𝖔",
  "𝖚",
  "𝖘",
];

const INVISIBLE = ["\u200B", "\u200C", "\u200D", "\u0301", "\u034F"];

function randomUnicodeChunk(length = 300): string {
  let out = "";
  for (let i = 0; i < length; i++) {
    const pick =
      Math.random() > 0.85
        ? INVISIBLE[Math.floor(Math.random() * INVISIBLE.length)]
        : UNICODE_POOL[Math.floor(Math.random() * UNICODE_POOL.length)];
    out += pick;
  }
  return out;
}

function entropyNoise(bytes = 32): string {
  return crypto.randomBytes(bytes).toString("hex");
}

function buildPayload(blocks: number = 2000): string {
  let text: string = "";
  for (let i = 0; i < blocks; i++) {
    text += `${randomUnicodeChunk(1000)}${entropyNoise(100)}"\n"`;
  }
  return text;
}

// 🔥 Apply abuse to each question
const stressed = questions.map((q) => {
  return q + " " + buildPayload(100);
});

// Write back to JSON
parsed.questions = stressed;
fs.writeFileSync(fileDir, JSON.stringify(parsed, null, 2), "utf8");

// Log file size
const stats = fs.statSync(fileDir);

