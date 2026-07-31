import express from "express";
import { fileURLToPath } from "node:url";

const app = express();

app.get("/health", (_req, res) => {
  res.json({ ok: true });
});

const isDirectRun = process.argv[1] === fileURLToPath(import.meta.url);

if (isDirectRun) {
  const port = Number(process.env.PORT) || 3000;
  app.listen(port, () => {
    console.log(`Go Solo API listening on ${port}`);
  });
}

export default app;
