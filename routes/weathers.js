import express from "express";
const router = express.Router();
import weathersCtrl from "../controllers/weathers.js";

router.post("/weather", weathersCtrl.create);

export default router;
