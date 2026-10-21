// Small local server: Node.js built-ins only, no npm packages to install.
import http from "node:http";
import { readFile } from "node:fs/promises";
import { resolve, extname } from "node:path";
import { fileURLToPath } from "node:url";
import chat from "./api/chat.js";

const root = fileURLToPath(new URL(".", import.meta.url));
const types = { ".html": "text/html", ".css": "text/css", ".js": "text/javascript", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".png": "image/png", ".webp": "image/webp" };
const publicFiles = new Set(["/index.html", "/style.css", "/script.js", "/data.js"]);

http.createServer(async (req, res) => {
  res.status = (code) => { res.statusCode = code; return res; };
  res.json = (data) => { res.setHeader("Content-Type", "application/json"); res.end(JSON.stringify(data)); };
  try {
    const path = decodeURIComponent(new URL(req.url, "http://localhost").pathname);
    if (path === "/api/chat") {
      let body = "";
      for await (const chunk of req) {
        body += chunk;
        if (Buffer.byteLength(body) > 4096) return res.status(413).json({ error: "Request is too large." });
      }
      try { req.body = body ? JSON.parse(body) : {}; }
      catch { return res.status(400).json({ error: "Request must contain valid JSON." }); }
      return await chat(req, res);
    }
    if (req.method !== "GET" && req.method !== "HEAD") return res.status(405).end("Method not allowed");
    const filename = path === "/" ? "/index.html" : path;
    const isImage = /^\/images\/[a-zA-Z0-9 _.-]+\.(png|jpe?g|webp)$/i.test(filename);
    if ((!publicFiles.has(filename) && !isImage) || filename.includes("..")) return res.status(404).end("Not found");
    const content = await readFile(resolve(root, `.${filename}`));
    res.setHeader("Content-Type", `${types[extname(filename).toLowerCase()] || "application/octet-stream"}`);
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.end(req.method === "HEAD" ? undefined : content);
  } catch { res.status(404).end("Not found"); }
}).listen(Number(process.env.PORT) || 3000, "127.0.0.1", () => {
  console.log(`Portfolio: http://localhost:${Number(process.env.PORT) || 3000}`);
  console.log("Edit data.js, then restart this server after changing profile data.");
});
