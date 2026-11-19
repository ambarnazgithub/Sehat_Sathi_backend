import express from "express";

import {
  analyzeHealth,
  getHealthHistory,
  getHealthAnalysisById,
  deleteHealthAnalysis
} from "../controllers/health.controller.js";

const router = express.Router();

router.post("/analyze", analyzeHealth);

router.get("/history", getHealthHistory);

router.get("/history/:id", getHealthAnalysisById);

router.delete("/history/:id", deleteHealthAnalysis);

export default router;