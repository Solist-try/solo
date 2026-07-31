import express from "express";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, "..");
const distDir = path.join(rootDir, "dist");
const publicDir = path.join(__dirname, "public");

const serveReact =
  process.env.SERVE_REACT === "1" || process.argv.includes("--react");
const hasReactBuild = fs.existsSync(path.join(distDir, "index.html"));
const uiRoot = serveReact && hasReactBuild ? distDir : publicDir;

app.get("/health", (_req, res) => {
  res.json({ ok: true });
});

app.get("/api/data", (_req, res) => {
  res.json({
    data: [1, 2, 3],
    features: [
      {
        id: "community",
        title: "Community",
        description: "Circles and members who get the solo stretch.",
      },
      {
        id: "resources",
        title: "Resources",
        description: "Guides, checklists, and calm packing rituals.",
      },
      {
        id: "events",
        title: "Events",
        description: "Walks, meetups, and quiet nights planned for one—or a few.",
      },
    ],
  });
});

app.use(express.static(uiRoot));

app.get("*", (req, res, next) => {
  if (req.path.startsWith("/api") || req.path === "/health") {
    return next();
  }
  res.sendFile(path.join(uiRoot, "index.html"), (err) => {
    if (err) next(err);
  });
});

const isDirectRun = process.argv[1] === fileURLToPath(import.meta.url);

if (isDirectRun) {
  const port = Number(process.env.PORT) || 3000;
  const mode =
    serveReact && hasReactBuild ? "React app" : "interactive HTML/CSS UI";
  app.listen(port, () => {
    console.log(`Go Solo ${mode} listening on http://localhost:${port}`);
  });
}

export default app;
