import { z } from "zod";

export const healthResponseSchema = z.object({
  urgency: z.enum([
    "Emergency",
    "Doctor Visit",
    "Home Care"
  ]),

  urgencyReason: z.string(),

  possibleSpecialist: z.string(),

  possibleConditions: z.array(z.string()),

  symptoms: z.array(z.string()),

  advice: z.array(z.string()),

  warningSigns: z.array(z.string()),

  emergencyMessage: z.string(),

  disclaimer: z.string()
});