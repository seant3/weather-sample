import * as dotenv from "dotenv";
dotenv.config();
import "dotenv/config.js";

import express from "express";
import { fileURLToPath } from "url";
import path, { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import logger from "morgan";

import "./config/database.js";

// Require controllers here
const app = express();

import weathersRoutes from "./routes/weathers.js";

app.use(logger("dev"));
app.use(express.json());

app.use("/weather", weathersRoutes);
// "catch all" route
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const { PORT = 8000 } = process.env;
app.listen(PORT, () => {
  console.log();
  console.log(`  App running in port ${PORT}`);
  console.log();
  console.log(`  > Local: \x1b[36mhttp://localhost:\x1b[1m${PORT}/\x1b[0m`);
});

