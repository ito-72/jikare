// /api/postTask.js
import { GAS_URL } from "./config";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).send("Method Not Allowed");
  }

  try {
    const response = await fetch(GAS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });

    const result = await response.text();
    res.status(200).send(result);
  } catch (err) {
    console.error("API Error:", err);
    res.status(500).send("❌ サーバーエラー");
  }
}
