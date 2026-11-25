/**
 * Make (Integromat) Webhook Handler & Schema Validator
 * 
 * Enables automated publishing of diagnostic tests, doctor OPD schedules,
 * and health advisories directly from Make scenarios (e.g. Google Sheets, Airtable,
 * AI content generators, or CRM).
 */

export interface MakeWebhookPayload {
  secret: string; // Authentication token to prevent unauthorized submissions
  action: "upsert_test" | "update_hours" | "post_announcement";
  timestamp?: string;
  data: {
    // Diagnostic Test Payload Fields
    test?: {
      id: string; // e.g. "vitamin-d-total"
      name: string; // e.g. "Vitamin D (25-Hydroxy) Total"
      nameNepali: string; // e.g. "भिटामिन डी परीक्षण"
      category: "Blood & Sugar" | "Thyroid & Hormones" | "Liver & Kidney" | "Imaging & Radiology" | "Cancer Markers" | "Cardiac & ECG" | "Routine & Pathology" | "Infertility";
      sampleType: string; // e.g. "Serum Blood (Red Cap)"
      fastingRequired: boolean;
      fastingHours?: string;
      turnaroundTime: string; // e.g. "Same Day (4 Hours)"
      description: string;
      hasDiscount: boolean;
      popular?: boolean;
      priceNPR: number; // e.g. 1800
      discountedPriceNPR: number; // e.g. 1500
      homeCollection: boolean;
      answerFirstSummary: string; // 2-3 sentences for AI search engines
      preparationInstructions: string[];
      clinicalSignificance: string;
      normalRange: string;
      faqs: Array<{
        question: string;
        answer: string;
      }>;
      reviewingSpecialist?: {
        name: string;
        role: string;
        degrees: string;
        registrationNumber: string;
        council: "Nepal Health Professional Council (NHPC)" | "Nepal Medical Council (NMC)";
        lastReviewedDate: string;
      };
    };
    // Emergency or Holiday Hours
    hoursNotice?: {
      active: boolean;
      title: string;
      message: string;
      validUntil: string;
    };
  };
}

/**
 * Validates incoming Make (Integromat) webhook payload
 */
export function validateMakeWebhook(
  payload: any,
  expectedSecret: string
): { isValid: boolean; error?: string } {
  if (!payload || typeof payload !== "object") {
    return { isValid: false, error: "Empty or invalid JSON payload" };
  }

  if (!payload.secret || payload.secret !== expectedSecret) {
    return { isValid: false, error: "Unauthorized: Invalid or missing webhook secret" };
  }

  if (!payload.action || !["upsert_test", "update_hours", "post_announcement"].includes(payload.action)) {
    return { isValid: false, error: `Invalid action: ${payload.action}` };
  }

  if (payload.action === "upsert_test") {
    const test = payload.data?.test;
    if (!test || !test.id || !test.name || !test.category || typeof test.priceNPR !== "number") {
      return {
        isValid: false,
        error: "Missing mandatory test fields: id, name, category, priceNPR"
      };
    }
  }

  return { isValid: true };
}
