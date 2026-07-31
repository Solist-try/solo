import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, "public");

app.get("/health", (_req, res) => {
  res.json({ ok: true });
});

app.use(express.static(publicDir));

app.get("/", (_req, res) => {
  res.sendFile(path.join(publicDir, "index.html"));
});

const isDirectRun = process.argv[1] === fileURLToPath(import.meta.url);

if (isDirectRun) {
  const port = Number(process.env.PORT) || 3000;
  app.listen(port, () => {
    console.log(`Go Solo API + UI listening on http://localhost:${port}`);
  });
}

export default app;
