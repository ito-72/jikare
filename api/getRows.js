// /api/getRows.js
import { GAS_URL } from "./config";

export default async function handler(req, res) {
  // GET/POSTどちらでも許容（使いやすさ優先）
  const method = req.method || "GET";
  const payload =
    method === "GET"
      ? req.query      // ?view=week&startDate=... など
      : req.body;      // POST JSON

  try {
    const response = await fetch(GAS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...payload, mode: "getRows" }),
    });

    const text = await response.text();
    // GAS側はJSONで返すのでそのままパススルー
    res.status(200).send(text);
  } catch (err) {
    console.error("getRows API Error:", err);
    res.status(500).json({ ok: false, error: "❌ サーバーエラー" });
  }
}
