import mongoose from "mongoose";

const healthAnalysisSchema = new mongoose.Schema(
  {
    userSymptoms: {
      type: String,
      required: true,
      trim: true
    },

    symptoms: {
      type: [String],
      default: []
    },

    urgency: {
      type: String,
      enum: ["Emergency", "Doctor Visit", "Home Care"],
      required: true
    },

    urgencyReason: {
      type: String,
      required: true
    },

    possibleSpecialist: {
      type: String,
      required: true
    },

    possibleConditions: {
      type: [String],
      default: []
    },

    advice: {
      type: [String],
      default: []
    },

    warningSigns: {
      type: [String],
      default: []
    },

    emergencyMessage: {
      type: String,
      default: ""
    },

    disclaimer: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

const HealthAnalysis = mongoose.model(
  "HealthAnalysis",
  healthAnalysisSchema
);

export default HealthAnalysis;