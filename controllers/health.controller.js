
import { analyzeSymptoms } from "../services/api.service.js";
import HealthAnalysis from "../models/healthAnalysis.model.js";


/* =====================================================
   ANALYZE HEALTH
   POST /api/health/analyze
===================================================== */

export async function analyzeHealth(req, res) {
  try {
    const { symptoms } = req.body;

    // Validate user input
    if (
      !symptoms ||
      typeof symptoms !== "string" ||
      !symptoms.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: "Symptoms are required."
      });
    }

    const userSymptoms = symptoms.trim();

    // AI analysis
    const result = await analyzeSymptoms(userSymptoms);

    // Save analysis in MongoDB
    const savedAnalysis = await HealthAnalysis.create({
      userSymptoms: userSymptoms,
      ...result
    });

    return res.status(200).json({
      success: true,
      data: savedAnalysis
    });

  } catch (error) {
    console.error("========== HEALTH ERROR ==========");
    console.error(error);
    console.error("Message:", error.message);
    console.error("Stack:", error.stack);
    console.error("==================================");

    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
}


/* =====================================================
   GET HEALTH HISTORY
   GET /api/health/history
===================================================== */

export async function getHealthHistory(req, res) {
  try {
    const history = await HealthAnalysis.find()
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: history.length,
      data: history
    });

  } catch (error) {
    console.error("========== HISTORY ERROR ==========");
    console.error(error);
    console.error("Message:", error.message);
    console.error("===================================");

    return res.status(500).json({
      success: false,
      message: "Failed to fetch health history."
    });
  }
}


/* =====================================================
   GET SINGLE HEALTH ANALYSIS
   GET /api/health/history/:id
===================================================== */

export async function getHealthAnalysisById(req, res) {
  try {
    const { id } = req.params;

    const analysis = await HealthAnalysis.findById(id);

    if (!analysis) {
      return res.status(404).json({
        success: false,
        message: "Health analysis not found."
      });
    }

    return res.status(200).json({
      success: true,
      data: analysis
    });

  } catch (error) {
    console.error("========== SINGLE ANALYSIS ERROR ==========");
    console.error(error);
    console.error("Message:", error.message);
    console.error("============================================");

    return res.status(500).json({
      success: false,
      message: "Failed to fetch health analysis."
    });
  }
}

export async function deleteHealthAnalysis(req, res) {
  try {
    const { id } = req.params;

    const deletedAnalysis = await HealthAnalysis.findByIdAndDelete(id);

    if (!deletedAnalysis) {
      return res.status(404).json({
        success: false,
        message: "Health analysis not found."
      });
    }

    return res.status(200).json({
      success: true,
      message: "Health analysis deleted successfully."
    });

  } catch (error) {
    console.error("========== DELETE HEALTH ERROR ==========");
    console.error(error);
    console.error("Message:", error.message);
    console.error("=========================================");

    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
}