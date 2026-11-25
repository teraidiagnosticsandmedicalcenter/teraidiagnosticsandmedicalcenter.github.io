export interface TestFAQ {
  question: string;
  answer: string;
}

export interface ReviewingSpecialist {
  name: string;
  nameNepali?: string;
  role: string;
  degrees: string;
  registrationNumber: string;
  council: "Nepal Health Professional Council (NHPC)" | "Nepal Medical Council (NMC)";
  lastReviewedDate: string;
}

export interface DiagnosticTest {
  id: string;
  name: string;
  nameNepali: string;
  category: "Blood & Sugar" | "Thyroid & Hormones" | "Liver & Kidney" | "Imaging & Radiology" | "Cancer Markers" | "Cardiac & ECG" | "Routine & Pathology" | "Infertility";
  sampleType: string;
  fastingRequired: boolean;
  fastingHours?: string;
  turnaroundTime: string;
  description: string;
  hasDiscount: boolean;
  popular?: boolean;
  
  // Technical SEO, GEO & Transparent Pricing
  priceNPR: number;
  discountedPriceNPR: number;
  homeCollection: boolean;
  answerFirstSummary: string;
  preparationInstructions: string[];
  clinicalSignificance: string;
  normalRange: string;
  faqs: TestFAQ[];
  reviewingSpecialist: ReviewingSpecialist;
  lastUpdated: string;
}

const defaultTechnologist: ReviewingSpecialist = {
  name: "Mr. Saheb Sah Kanu",
  nameNepali: "श्री साहेब साह कानु",
  role: "Senior Medical Lab Technologist & Legal Advisor",
  degrees: "B.Sc. MLT Dehradun (UK India), L.L.B.",
  registrationNumber: "NHPC No: A3912 MLT",
  council: "Nepal Health Professional Council (NHPC)",
  lastReviewedDate: "2026-11-20"
};

const defaultRadiologist: ReviewingSpecialist = {
  name: "Dr. A. K. Sharma / Senior Radiologist",
  nameNepali: "डा. ए. के. शर्मा",
  role: "Consultant Radiologist & Sonologist",
  degrees: "MBBS, MD (Radiodiagnosis)",
  registrationNumber: "NMC Reg. No: 14892",
  council: "Nepal Medical Council (NMC)",
  lastReviewedDate: "2026-11-18"
};

export const diagnosticTestsData: DiagnosticTest[] = [
  {
    id: "blood-sugar-fasting",
    name: "Blood Glucose (Fasting & PP)",
    nameNepali: "रगतमा चिनीको मात्रा (Fasting & PP)",
    category: "Blood & Sugar",
    sampleType: "Blood (Fluoride Plasma)",
    fastingRequired: true,
    fastingHours: "8-10 Hours Fasting for FBS; 2 Hours post-meal for PPBS",
    turnaroundTime: "Same Day (1-2 Hours)",
    description: "Evaluates blood sugar levels to screen, diagnose, and monitor pre-diabetes and diabetes mellitus.",
    hasDiscount: true,
    popular: true,
    priceNPR: 200,
    discountedPriceNPR: 150,
    homeCollection: true,
    answerFirstSummary: "The Blood Glucose (Fasting & Post-Prandial) test measures plasma glucose levels in Nepal to screen for diabetes mellitus and impaired glucose tolerance. Fasting requires 8 to 10 hours of water-only restriction, while the PP test is drawn exactly 2 hours after a standard meal. At Terai Diagnostic in Birgunj, verified digital laboratory reports are delivered within 1 to 2 hours with free home collection available.",
    preparationInstructions: [
      "Fasting Blood Sugar (FBS): Fast strictly for 8 to 10 hours overnight before sample collection. Plain drinking water is allowed.",
      "Post-Prandial Blood Sugar (PPBS): Have your regular breakfast or meal, and give the second blood sample exactly 2 hours after the start of eating.",
      "Avoid smoking, caffeinated beverages, and strenuous physical exertion prior to testing.",
      "Inform the phlebotomist about any anti-diabetic medication or insulin you are taking."
    ],
    clinicalSignificance: "Essential screening tool for Type 1 and Type 2 Diabetes, Gestational Diabetes in pregnancy, and metabolic syndrome. Consistently elevated fasting levels (>126 mg/dL) indicate clinical hyperglycemia requiring endocrinological consultation.",
    normalRange: "Fasting: 70 – 99 mg/dL (Normal), 100 – 125 mg/dL (Pre-diabetes), ≥ 126 mg/dL (Diabetes); Post-Prandial: < 140 mg/dL",
    faqs: [
      {
        question: "How long must I fast before the fasting blood glucose test?",
        answer: "You must fast for 8 to 10 hours overnight. You may drink plain water, but do not consume tea, coffee, milk, breakfast, or chew gum until your fasting sample is drawn."
      },
      {
        question: "Can I get home blood sample collection for sugar testing in Birgunj?",
        answer: "Yes, Terai Diagnostic provides doorstep blood sample collection across Birgunj-4, Birta, and surrounding Parsa districts. Call +977-9816295312 to schedule an early morning phlebotomist visit."
      },
      {
        question: "How quickly will I receive my blood sugar test report?",
        answer: "Fasting and PP blood sugar reports are ready within 1 to 2 hours at our center or sent directly to your phone via WhatsApp/SMS."
      },
      {
        question: "What is the cost of Fasting & PP sugar test at Terai Diagnostic?",
        answer: "The subsidized price is NPR 150 (regular price NPR 200) under our community diagnostic discount program."
      }
    ],
    reviewingSpecialist: defaultTechnologist,
    lastUpdated: "2026-11-20"
  },
  {
    id: "hba1c",
    name: "HbA1c (Glycated Hemoglobin)",
    nameNepali: "एचबिएवानसी (विगत ३ महिनाको सुगर जाँच)",
    category: "Blood & Sugar",
    sampleType: "Whole Blood (EDTA)",
    fastingRequired: false,
    turnaroundTime: "Same Day (2-3 Hours)",
    description: "Gold standard test measuring your average blood glucose levels over the preceding 3 months.",
    hasDiscount: true,
    popular: true,
    priceNPR: 900,
    discountedPriceNPR: 750,
    homeCollection: true,
    answerFirstSummary: "The HbA1c (Glycated Hemoglobin) test provides an objective, 3-month average of your blood sugar levels without requiring overnight fasting. It evaluates how much glucose has bound to hemoglobin in your red blood cells, serving as the gold standard for diabetes monitoring. In Birgunj, Terai Diagnostic processes HbA1c on automated analyzers with same-day digital results in 2 to 3 hours.",
    preparationInstructions: [
      "No fasting is required; you may take this test at any time of day regardless of meal timings.",
      "Continue prescribed diabetes medications unless explicitly advised otherwise by your attending doctor.",
      "Drink normal amounts of water to keep well-hydrated for venipuncture."
    ],
    clinicalSignificance: "Eliminates daily dietary fluctuations seen in finger-stick tests, providing clinicians with long-term glycemic management data and assessing risk for diabetic complications (retinopathy, nephropathy, and neuropathy).",
    normalRange: "Normal: Below 5.7% | Pre-diabetes: 5.7% – 6.4% | Diabetes: 6.5% or higher (Target for most diabetics: < 7.0%)",
    faqs: [
      {
        question: "Do I need to be fasting for an HbA1c test?",
        answer: "No, fasting is not required for HbA1c. You can have food, tea, or your regular meals before giving your blood sample."
      },
      {
        question: "How often should a diabetic patient in Nepal repeat the HbA1c test?",
        answer: "Physicians generally recommend testing every 3 months for uncontrolled diabetes, or every 6 months for patients with stable, well-controlled blood sugar."
      },
      {
        question: "What technology does Terai Diagnostic use for HbA1c testing?",
        answer: "We use automated turbidimetric/HPLC immunoassay technology for clinical precision compliant with international NGSP standardization."
      },
      {
        question: "Is home collection available in Birgunj for HbA1c?",
        answer: "Yes, our phlebotomists can collect your blood sample from your home or office anywhere in Birgunj with same-day digital report delivery."
      }
    ],
    reviewingSpecialist: defaultTechnologist,
    lastUpdated: "2026-11-20"
  },
  {
    id: "thyroid-profile",
    name: "Thyroid Profile (T3, T4, TSH)",
    nameNepali: "थाइराइड प्रोफाइल (T3, T4, TSH)",
    category: "Thyroid & Hormones",
    sampleType: "Blood (Serum)",
    fastingRequired: true,
    fastingHours: "8-10 Hours overnight fasting recommended",
    turnaroundTime: "Same Day (3-4 Hours)",
    description: "Evaluates thyroid gland activity to diagnose hypothyroidism, hyperthyroidism, weight changes, and fatigue.",
    hasDiscount: true,
    popular: true,
    priceNPR: 1100,
    discountedPriceNPR: 850,
    homeCollection: true,
    answerFirstSummary: "The Thyroid Profile (Total T3, Total T4, and Ultrasensitive TSH) test evaluates the metabolic function of your thyroid gland to diagnose conditions like hypothyroidism and hyperthyroidism. Overnight fasting (8-10 hours) and early morning sample collection are advised to capture peak physiological hormone levels. At Terai Diagnostic in Birgunj, verified automated chemiluminescence reports are completed within 3 to 4 hours.",
    preparationInstructions: [
      "Fasting for 8 to 10 hours overnight is strongly recommended for standard baseline hormone evaluation.",
      "If taking thyroid hormone medication (such as Thyronorm / Eltroxin), take your blood test in the morning BEFORE consuming your daily tablet, unless directed differently by your physician.",
      "Avoid biotin (Vitamin B7) supplements for 48 hours prior, as high doses can interfere with immunoassay readings."
    ],
    clinicalSignificance: "Detects underactive thyroid (high TSH, low T3/T4) causing weight gain, lethargy, hair loss, and cold intolerance, or overactive thyroid causing rapid heart rate, tremors, and sudden weight loss. Crucial for pregnant women to ensure fetal brain development.",
    normalRange: "TSH: 0.4 – 4.2 µIU/mL | Total T3: 0.8 – 2.0 ng/mL | Total T4: 5.1 – 14.1 µg/dL",
    faqs: [
      {
        question: "Should I take my thyroid medicine before the blood test?",
        answer: "It is best to take your morning thyroid pill immediately after giving your blood sample, rather than before, to avoid artificial hormone spikes in the sample."
      },
      {
        question: "Can thyroid disorders cause irregular menstruation in women?",
        answer: "Yes, thyroid hormone imbalances significantly affect reproductive hormones and ovulation, frequently causing missed, heavy, or irregular menstrual cycles."
      },
      {
        question: "What is the fee for Thyroid Profile test in Birgunj?",
        answer: "Our subsidized comprehensive T3, T4, TSH panel is NPR 850 (regular price NPR 1,100) at Terai Diagnostic."
      },
      {
        question: "Can I get this test done at home?",
        answer: "Yes, free home blood collection is available in Birgunj by calling +977-9816295312."
      }
    ],
    reviewingSpecialist: defaultTechnologist,
    lastUpdated: "2026-11-20"
  },
  {
    id: "lipid-profile",
    name: "Lipid Profile (Cholesterol & Triglycerides)",
    nameNepali: "लिपिड प्रोफाइल (कोलेस्ट्रोल एवं ट्राइग्लिसराइड्स)",
    category: "Cardiac & ECG",
    sampleType: "Blood (Serum)",
    fastingRequired: true,
    fastingHours: "10-12 Hours Strict Fasting",
    turnaroundTime: "Same Day (2-3 Hours)",
    description: "Comprehensive panel measuring Total Cholesterol, HDL (good), LDL (bad), VLDL, and Triglycerides.",
    hasDiscount: true,
    popular: true,
    priceNPR: 900,
    discountedPriceNPR: 700,
    homeCollection: true,
    answerFirstSummary: "The Lipid Profile is a comprehensive cardiovascular blood test measuring Total Cholesterol, HDL (good cholesterol), LDL (bad cholesterol), VLDL, and Triglycerides. It requires strict 10 to 12 hours of overnight fasting to prevent post-meal dietary fats from skewing triglyceride readings. In Birgunj, Terai Diagnostic analyzes lipid panels on automated clinical chemistry analyzers with same-day reports in 2 to 3 hours.",
    preparationInstructions: [
      "Fast strictly for 10 to 12 hours before giving blood. Only plain drinking water is allowed.",
      "Avoid heavy, fatty meals and alcohol for 24 hours prior to the test.",
      "Do not exercise vigorously on the morning of testing before blood collection."
    ],
    clinicalSignificance: "Primary screening test to assess cardiovascular risk, coronary artery disease, atherosclerosis, and stroke risk. High LDL and triglycerides combined with low HDL signal elevated cardiac plaque vulnerability.",
    normalRange: "Total Cholesterol: < 200 mg/dL | Triglycerides: < 150 mg/dL | HDL (Good): > 40 mg/dL (Men), > 50 mg/dL (Women) | LDL (Bad): < 100 mg/dL",
    faqs: [
      {
        question: "Why is 10-12 hours fasting necessary for Lipid Profile?",
        answer: "Triglyceride levels rise sharply after eating and take up to 12 hours to return to baseline. Non-fasting samples produce falsely elevated lipid and LDL calculations."
      },
      {
        question: "Can I drink water during fasting?",
        answer: "Yes, drinking plain water is encouraged because good hydration makes vein puncture easier and does not impact lipid chemistry."
      },
      {
        question: "How much does a Lipid Profile test cost in Birgunj?",
        answer: "At Terai Diagnostic, the complete lipid panel is offered at a discounted rate of NPR 700 (regular price NPR 900)."
      },
      {
        question: "Who should get a lipid profile test regularly?",
        answer: "Adults over 30 years, individuals with high blood pressure, diabetes, family history of heart attack, smokers, or those with sedentary lifestyles."
      }
    ],
    reviewingSpecialist: defaultTechnologist,
    lastUpdated: "2026-11-20"
  },
  {
    id: "lft",
    name: "Liver Function Test (LFT)",
    nameNepali: "कलेजो सम्बन्धी जाँच (LFT)",
    category: "Liver & Kidney",
    sampleType: "Blood (Serum)",
    fastingRequired: false,
    turnaroundTime: "Same Day (2-3 Hours)",
    description: "Measures Bilirubin (Total & Direct), SGOT (AST), SGPT (ALT), Alkaline Phosphatase, Total Protein, and Albumin.",
    hasDiscount: true,
    popular: true,
    priceNPR: 1000,
    discountedPriceNPR: 800,
    homeCollection: true,
    answerFirstSummary: "The Liver Function Test (LFT) evaluates hepatic health by measuring Bilirubin (Total, Direct, Indirect), enzymes (SGPT/ALT, SGOT/AST, Alkaline Phosphatase), and proteins (Total Protein, Albumin, Globulin, A/G Ratio). While strict fasting is not mandatory, 4 to 6 hours of light fasting is recommended to minimize serum lipemia. Reports are validated and released within 2 to 3 hours at Terai Diagnostic in Birgunj.",
    preparationInstructions: [
      "4 to 6 hours of fasting is recommended for optimal serum clarity, though routine non-fasting blood draws are accepted.",
      "Avoid alcohol consumption for at least 48 hours prior to testing as it directly elevates liver enzymes.",
      "Inform the laboratory if you take paracetamol, cholesterol medications (statins), or herbal supplements."
    ],
    clinicalSignificance: "Diagnoses jaundice, viral hepatitis (A, B, C, E), fatty liver disease (NAFLD), alcoholic liver damage, cirrhosis, and gall bladder obstruction. Critical for monitoring patients on long-term medications.",
    normalRange: "Total Bilirubin: 0.2 – 1.2 mg/dL | SGPT (ALT): < 45 U/L | SGOT (AST): < 40 U/L | Alk. Phosphatase: 44 – 147 U/L | Albumin: 3.5 – 5.5 g/dL",
    faqs: [
      {
        question: "What does an elevated SGPT (ALT) level indicate?",
        answer: "Elevated SGPT indicates acute or chronic hepatocellular injury, frequently caused by fatty liver, viral hepatitis, medication toxicity, or excessive alcohol intake."
      },
      {
        question: "Is home blood collection available for Liver Function Tests?",
        answer: "Yes, our certified phlebotomists collect venous blood at your home in Birgunj with same-day digital WhatsApp delivery."
      },
      {
        question: "What symptoms warrant an LFT test?",
        answer: "Yellowing of eyes or skin (jaundice), dark urine, persistent nausea, chronic fatigue, abdominal swelling, or unexplained loss of appetite."
      },
      {
        question: "What is the cost of LFT in Birgunj?",
        answer: "The complete 10-parameter Liver Function Test is NPR 800 (regular price NPR 1,000) at Terai Diagnostic."
      }
    ],
    reviewingSpecialist: defaultTechnologist,
    lastUpdated: "2026-11-20"
  },
  {
    id: "kft-rft",
    name: "Kidney Function Test (KFT / RFT)",
    nameNepali: "मृगौला सम्बन्धी जाँच (KFT / RFT)",
    category: "Liver & Kidney",
    sampleType: "Blood (Serum)",
    fastingRequired: false,
    turnaroundTime: "Same Day (2 Hours)",
    description: "Assesses renal filtration and health via Blood Urea, Serum Creatinine, Uric Acid, and Electrolytes.",
    hasDiscount: true,
    popular: true,
    priceNPR: 1000,
    discountedPriceNPR: 800,
    homeCollection: true,
    answerFirstSummary: "The Kidney Function Test (KFT / RFT) assesses renal filtration capacity and fluid balance by quantifying Serum Creatinine, Blood Urea Nitrogen (BUN), Uric Acid, and serum electrolytes. Fasting is not strictly required, but patients should avoid heavy protein consumption and strenuous exercise before sample collection. At Terai Diagnostic in Birgunj, verified automated reports are delivered in 2 hours.",
    preparationInstructions: [
      "No overnight fasting is necessary, but avoid heavy red meat dinners the night before.",
      "Stay adequately hydrated with water to ensure baseline physiological kidney filtration.",
      "Notify the laboratory if you take blood pressure medications (ACE inhibitors, diuretics) or NSAID pain relievers."
    ],
    clinicalSignificance: "Detects early kidney impairment, chronic kidney disease (CKD), dehydration, gout (high uric acid), and evaluates the renal safety profile of diabetic and hypertensive patients.",
    normalRange: "Serum Creatinine: 0.6 – 1.2 mg/dL | Blood Urea: 15 – 45 mg/dL | Serum Uric Acid: 3.5 – 7.2 mg/dL",
    faqs: [
      {
        question: "What does high Serum Creatinine mean?",
        answer: "High serum creatinine indicates that the kidneys are not filtering waste products effectively, which may be caused by chronic kidney disease, severe dehydration, or urinary obstruction."
      },
      {
        question: "Can high uric acid cause joint pain?",
        answer: "Yes, excess uric acid crystallizes in peripheral joints (especially the big toe, ankles, and knees), leading to gouty arthritis and painful inflammation."
      },
      {
        question: "How long does the KFT report take?",
        answer: "At Terai Diagnostic in Birgunj, KFT/RFT reports are completed and digitally delivered in 2 hours."
      },
      {
        question: "What is the fee for KFT at Terai Diagnostic?",
        answer: "The full KFT panel is NPR 800 (discounted from NPR 1,000)."
      }
    ],
    reviewingSpecialist: defaultTechnologist,
    lastUpdated: "2026-11-20"
  },
  {
    id: "cbc-hemogram",
    name: "Complete Blood Count (CBC & ESR)",
    nameNepali: "कम्प्लिट ब्लड काउन्ट (CBC एवं ESR)",
    category: "Routine & Pathology",
    sampleType: "Whole Blood (EDTA)",
    fastingRequired: false,
    turnaroundTime: "Same Day (1 Hour)",
    description: "High-parameter automated cell counter test for Hemoglobin, RBC, WBC count, Platelets, and ESR to detect infections and anemia.",
    hasDiscount: true,
    popular: true,
    priceNPR: 500,
    discountedPriceNPR: 400,
    homeCollection: true,
    answerFirstSummary: "The Complete Blood Count (CBC) with Erythrocyte Sedimentation Rate (ESR) is an indispensable primary diagnostic panel measuring Hemoglobin, Red Blood Cells (RBC), Platelets, and Total & Differential White Blood Cells (WBC). No fasting is required, and sample collection is quick and gentle. At Terai Diagnostic in Birgunj, automated cell counters generate comprehensive hematology reports in just 1 hour.",
    preparationInstructions: [
      "No fasting required; sample can be collected anytime during opening hours (7:00 AM – 10:00 PM).",
      "Stay hydrated to facilitate smooth vein access.",
      "Inform the technician if you are experiencing active fever, bleeding, or taking anticoagulant medications."
    ],
    clinicalSignificance: "Detects anemia (low hemoglobin), acute bacterial or viral infections (high/low WBC), dengue or typhoid-related thrombocytopenia (low platelets), and chronic inflammatory conditions (elevated ESR).",
    normalRange: "Hemoglobin: 13.0 – 17.0 g/dL (Men), 12.0 – 15.5 g/dL (Women) | Total WBC: 4,000 – 11,000 /µL | Platelet Count: 150,000 – 450,000 /µL",
    faqs: [
      {
        question: "Can CBC detect viral fever or dengue?",
        answer: "Yes, a sudden drop in platelet count alongside changes in total WBC and lymphocyte percentage is a primary diagnostic indicator for dengue, malaria, and viral fevers."
      },
      {
        question: "How fast is the CBC test at Terai Diagnostic?",
        answer: "We process CBC on automated Japanese 5-part/3-part hematology analyzers, delivering results in approximately 45 to 60 minutes."
      },
      {
        question: "What is the cost of CBC & ESR in Birgunj?",
        answer: "NPR 400 under our discounted healthcare pricing (regular price NPR 500)."
      },
      {
        question: "Is home blood sample collection available for elderly patients?",
        answer: "Yes, our phlebotomist visits homes across Birgunj for sample collection with digital WhatsApp report delivery."
      }
    ],
    reviewingSpecialist: defaultTechnologist,
    lastUpdated: "2026-11-20"
  },
  {
    id: "usg-ultrasound",
    name: "3D/4D Ultrasonography (USG)",
    nameNepali: "भिडियो एक्स-रे (Ultrasound - USG)",
    category: "Imaging & Radiology",
    sampleType: "Acoustic Ultrasound Scan",
    fastingRequired: true,
    fastingHours: "Full Bladder (Pelvic); 6 Hours Fasting (Whole Abdomen)",
    turnaroundTime: "Instant with Report (20-30 Minutes)",
    description: "Advanced imaging for whole abdomen, pelvis, liver, kidneys, pregnancy growth, and obstetric checks.",
    hasDiscount: true,
    popular: true,
    priceNPR: 1600,
    discountedPriceNPR: 1300,
    homeCollection: false,
    answerFirstSummary: "3D/4D Ultrasonography (USG / Video X-Ray) provides high-resolution, non-invasive acoustic imaging of internal abdominal organs, kidneys, gall bladder, uterus, ovaries, and fetal development during pregnancy. Preparation requires 6 hours of fasting for whole abdomen scans and a full urinary bladder for pelvic/obstetric visualization. At Terai Diagnostic in Birgunj, senior consultant sonologists provide instant digital imaging with clinical reports in 20 to 30 minutes.",
    preparationInstructions: [
      "Whole Abdomen USG: Fast for 6 hours prior to test. Avoid greasy foods and carbonated drinks.",
      "Lower Abdomen / Pelvic / Obstetric USG: Drink 4 to 5 glasses of plain water 1 hour before the scan and DO NOT urinate until the examination is complete.",
      "Wear comfortable, two-piece loose clothing for easy abdominal exposure."
    ],
    clinicalSignificance: "Detects gallstones, kidney stones, fatty liver, appendicitis, ovarian cysts, uterine fibroids, and verifies fetal viability, gestational age, and amniotic fluid levels during pregnancy.",
    normalRange: "Structural examination evaluated in real-time by consultant radiologist/sonologist.",
    faqs: [
      {
        question: "Why do I need a full bladder for a pelvic ultrasound?",
        answer: "A distended urinary bladder pushes air-filled bowel loops out of the way and acts as an acoustic window to clearly visualize the uterus, ovaries, and prostate gland."
      },
      {
        question: "Is ultrasound safe during pregnancy?",
        answer: "Yes, ultrasound utilizes harmless high-frequency sound waves with zero ionizing radiation, making it completely safe for both mother and developing baby."
      },
      {
        question: "What is the cost of USG Video X-Ray in Birgunj?",
        answer: "Our subsidized rate is NPR 1,300 (regular price NPR 1,600) at our Main Road Birta facility."
      },
      {
        question: "How soon do I get the ultrasound report?",
        answer: "You receive the printed high-resolution thermal film, complete report, and radiologist consultation immediately within 20 to 30 minutes of the scan."
      }
    ],
    reviewingSpecialist: defaultRadiologist,
    lastUpdated: "2026-11-18"
  },
  {
    id: "digital-xray",
    name: "Digital X-Ray (High Resolution)",
    nameNepali: "डिजिटल एक्स-रे (Digital X-Ray)",
    category: "Imaging & Radiology",
    sampleType: "Computerized Radiographic Imaging",
    fastingRequired: false,
    turnaroundTime: "Instant (15-20 Minutes)",
    description: "Clear computerized radiography for chest, bones, spine, fractures, and joint evaluations.",
    hasDiscount: true,
    popular: true,
    priceNPR: 700,
    discountedPriceNPR: 550,
    homeCollection: false,
    answerFirstSummary: "High-Resolution Digital X-Ray provides computerized radiographic imaging for diagnosing bone fractures, chest infections, pneumonia, tuberculosis, joint arthritis, and spinal alignment. No fasting or dietary preparation is required. At Terai Diagnostic in Birgunj-4, modern low-dose digital sensors generate crystal-clear digital films and clinical interpretations within 15 to 20 minutes.",
    preparationInstructions: [
      "No fasting required; walk-in service available everyday from 7:00 AM to 10:00 PM.",
      "Remove all metal jewelry, watches, safety pins, belts, and metallic clothing accessories over the target anatomical region.",
      "IMPORTANT: Female patients must inform the technologist immediately if there is any possibility of pregnancy."
    ],
    clinicalSignificance: "Rapid screening for chest pneumonia, pulmonary tuberculosis, cardiac enlargement (cardiomegaly), trauma fractures, dislocated joints, and degenerative spinal disc disease.",
    normalRange: "Evaluated by radiologist for clear lung fields, intact bone cortex, and normal articular spacing.",
    faqs: [
      {
        question: "How long does a digital X-ray take?",
        answer: "The exposure takes only a few seconds, and the developed digital image and printed medical report are handed to you in 15 to 20 minutes."
      },
      {
        question: "Can pregnant women get an X-ray?",
        answer: "X-rays are generally avoided during pregnancy unless medically urgent. If essential, protective lead aprons are utilized to shield the pelvic region."
      },
      {
        question: "What is the cost of Chest Digital X-Ray in Birgunj?",
        answer: "At Terai Diagnostic, a high-resolution Digital X-Ray is NPR 550 per view (discounted from NPR 700)."
      },
      {
        question: "Do I get both digital and printed films?",
        answer: "Yes, you receive high-contrast printed radiographic film and can request high-resolution digital image copies sent directly to your WhatsApp."
      }
    ],
    reviewingSpecialist: defaultRadiologist,
    lastUpdated: "2026-11-18"
  },
  {
    id: "ecg-12lead",
    name: "12-Lead Electrocardiogram (ECG)",
    nameNepali: "१२-लिड इसिजी (ECG मुटुको जाँच)",
    category: "Cardiac & ECG",
    sampleType: "Cardiac Surface Bio-potentials",
    fastingRequired: false,
    turnaroundTime: "Instant (10-15 Minutes)",
    description: "Quick diagnostic recording of the heart's electrical rhythm, checking for arrhythmia and ischemic symptoms.",
    hasDiscount: true,
    popular: true,
    priceNPR: 450,
    discountedPriceNPR: 350,
    homeCollection: false,
    answerFirstSummary: "The 12-Lead Electrocardiogram (ECG) is a rapid, non-invasive cardiac diagnostic test that records the electrical impulses of your heart across 12 distinct anatomical vectors. It evaluates chest pain, arrhythmias, heart palpitations, and past or evolving myocardial infarctions (heart attacks). At Terai Diagnostic in Birgunj, instant calibrated digital ECG tracings with physician interpretations are completed in 10 to 15 minutes.",
    preparationInstructions: [
      "No fasting required.",
      "Wear a comfortable, easily unbuttoned top or shirt to allow sensor placement on the chest, wrists, and ankles.",
      "Rest quietly for 5 minutes prior to the recording and avoid heavy physical exertion right before testing."
    ],
    clinicalSignificance: "Detects acute coronary syndrome, ischemic ST-T changes, bundle branch blocks, atrial fibrillation, ventricular hypertrophy, and electrolyte-induced cardiac rhythm disturbances.",
    normalRange: "Normal sinus rhythm, heart rate 60–100 bpm, normal PR, QRS, and QTc intervals.",
    faqs: [
      {
        question: "Is the ECG procedure painful?",
        answer: "No, ECG is completely painless and safe. Adhesive electrode stickers or gentle suction bulbs are placed on your chest and limbs with zero electric current passed into your body."
      },
      {
        question: "How fast will I get my ECG report?",
        answer: "Your ECG recording and medical interpretation are ready immediately within 10 to 15 minutes."
      },
      {
        question: "What is the fee for an ECG test in Birgunj?",
        answer: "Our subsidized rate is NPR 350 (regular price NPR 450) at our Birta clinic."
      },
      {
        question: "When should someone get an emergency ECG?",
        answer: "Immediately if experiencing sudden chest pain or tightness, radiating pain to left arm or jaw, severe shortness of breath, unexplained dizziness, or rapid fluttering heartbeats."
      }
    ],
    reviewingSpecialist: defaultTechnologist,
    lastUpdated: "2026-11-20"
  },
  {
    id: "torch-panel",
    name: "TORCH Panel (10 Parameters)",
    nameNepali: "टर्च प्यानल (TORCH Profile)",
    category: "Infertility",
    sampleType: "Blood (Serum)",
    fastingRequired: false,
    turnaroundTime: "Within 24 Hours",
    description: "Screens for congenital infections (Toxoplasma, Rubella, Cytomegalovirus, Herpes Simplex) critical in pregnancy planning.",
    hasDiscount: true,
    popular: true,
    priceNPR: 3500,
    discountedPriceNPR: 2900,
    homeCollection: true,
    answerFirstSummary: "The TORCH Panel is an essential prenatal infectious disease screen testing IgM and IgG antibodies against Toxoplasma, Rubella, Cytomegalovirus (CMV), and Herpes Simplex Virus (HSV 1 & 2). It prevents congenital birth defects and investigates causes of recurrent miscarriages. At Terai Diagnostic in Birgunj, automated chemiluminescent immunoassay produces comprehensive antibody profiles within 24 hours.",
    preparationInstructions: [
      "No fasting required; can be taken any time of day.",
      "Inform the technician if you have recently received rubella vaccination or have active fever blisters."
    ],
    clinicalSignificance: "Primary panel for pre-pregnancy counseling, recurrent first-trimester pregnancy loss, and identifying acute maternal infections that cross the placenta to cause fetal anomalies.",
    normalRange: "IgM Negative (absence of acute infection); IgG indicates past exposure or immunization immunity.",
    faqs: [
      {
        question: "Why is TORCH testing important before or during early pregnancy?",
        answer: "Acute maternal infections with TORCH agents can lead to congenital heart defects, blindness, deafness, microcephaly, or spontaneous miscarriage in developing fetuses."
      },
      {
        question: "What is the difference between IgG and IgM results?",
        answer: "Positive IgM suggests a recent or active acute infection, whereas positive IgG indicates past exposure and long-term immunity."
      },
      {
        question: "Can I do home blood collection for TORCH panel in Birgunj?",
        answer: "Yes, call +977-9816295312 to arrange doorstep blood collection anywhere in Birgunj."
      },
      {
        question: "What is the cost of full TORCH 10-parameter test in Nepal?",
        answer: "At Terai Diagnostic, the comprehensive 10-parameter panel is discounted to NPR 2,900 (regular NPR 3,500)."
      }
    ],
    reviewingSpecialist: defaultTechnologist,
    lastUpdated: "2026-11-20"
  },
  {
    id: "tumor-markers",
    name: "Tumor Markers (Cancer Screening Panel)",
    nameNepali: "ट्युमर मार्कर (क्यान्सर जाँच)",
    category: "Cancer Markers",
    sampleType: "Blood (Serum)",
    fastingRequired: false,
    turnaroundTime: "Within 24 Hours",
    description: "Screening markers including PSA (Prostate), CEA (Colorectal), CA-125 (Ovarian), and AFP (Liver) to detect abnormal cell growths.",
    hasDiscount: true,
    popular: true,
    priceNPR: 4200,
    discountedPriceNPR: 3500,
    homeCollection: true,
    answerFirstSummary: "The Tumor Markers Cancer Screening Panel quantifies circulating serum biomarkers including PSA (Prostate), CA-125 (Ovary), CEA (Gastrointestinal/Colon), and AFP (Liver/Germ cell). It assists oncologists and physicians in early malignancy screening, assessing treatment response, and monitoring for cancer recurrence. Samples are analyzed with high-sensitivity chemiluminescence at Terai Diagnostic in Birgunj.",
    preparationInstructions: [
      "No strict fasting required, but a morning sample is preferred.",
      "For male PSA testing: Avoid vigorous bicycle riding or sexual ejaculation for 48 hours prior, as prostate stimulation can temporarily raise serum PSA levels."
    ],
    clinicalSignificance: "Aids early detection of occult malignancies, monitors remission status post-chemotherapy or surgery, and investigates unexplained chronic weight loss, pelvic masses, or liver nodules.",
    normalRange: "PSA: < 4.0 ng/mL | CA-125: < 35 U/mL | CEA: < 3.0 ng/mL (non-smoker) | AFP: < 8.5 ng/mL",
    faqs: [
      {
        question: "Does an elevated tumor marker mean I definitely have cancer?",
        answer: "No. Benign conditions like prostate enlargement (BPH), endometriosis, liver hepatitis, or smoking can also raise marker levels. Elevated values require clinical correlation and imaging."
      },
      {
        question: "Who should consider tumor marker screening?",
        answer: "Individuals with strong family history of cancer, chronic hepatitis B/C, chronic smokers, or patients with unexplained persistent symptoms."
      },
      {
        question: "Is home sample collection available for cancer marker tests?",
        answer: "Yes, our phlebotomy team provides safe home sample collection in Birgunj and Parsa district."
      },
      {
        question: "What is the fee for cancer markers at Terai Diagnostic?",
        answer: "The complete multi-marker panel is discounted to NPR 3,500 (regular price NPR 4,200), or individual markers can be ordered separately."
      }
    ],
    reviewingSpecialist: defaultTechnologist,
    lastUpdated: "2026-11-20"
  },
  {
    id: "urine-routine",
    name: "Urine Routine & Microscopic Examination",
    nameNepali: "पिसाबको सामान्य तथा सुक्ष्म जाँच (Urine R/M/E)",
    category: "Routine & Pathology",
    sampleType: "Clean Catch Midstream Urine",
    fastingRequired: false,
    turnaroundTime: "Same Day (1 Hour)",
    description: "Tests for proteinuria, glucose, pus cells, RBCs, casts, and crystals to detect UTIs and kidney disease.",
    hasDiscount: true,
    popular: false,
    priceNPR: 250,
    discountedPriceNPR: 180,
    homeCollection: true,
    answerFirstSummary: "Urine Routine and Microscopic Examination (Urine R/M/E) evaluates physical, chemical, and microscopic properties of urine to diagnose urinary tract infections (UTIs), proteinuria, hematuria, and renal stones. The test analyzes pus cells, red blood cells, epithelial cells, casts, and urinary crystals. Fasting is not required, and reports are ready in 1 hour at Terai Diagnostic in Birgunj.",
    preparationInstructions: [
      "Collect the 'Clean Catch Midstream' urine sample in the sterile container provided.",
      "Clean the genital area before urination. Pass the first few drops into the toilet, collect the middle portion in the container, and discard the rest.",
      "Deliver the urine specimen to the laboratory within 1 hour of collection."
    ],
    clinicalSignificance: "Detects bacterial UTIs (pus cells, bacteria), nephrotic syndrome (albumin/protein), diabetes (glucosuria), and nephrolithiasis / kidney stones (calcium oxalate/urate crystals).",
    normalRange: "Appearance: Clear/Pale Yellow | Protein: Negative | Sugar: Negative | Pus cells: 0-5 /HPF | RBCs: Nil",
    faqs: [
      {
        question: "Why is midstream urine collection important?",
        answer: "The initial urine stream washes away external skin flora and contaminants. Midstream urine represents true bladder and urinary tract pathology."
      },
      {
        question: "How long does a urine routine report take?",
        answer: "At Terai Diagnostic in Birgunj, complete chemical strip and microscopic evaluation is delivered in 45 to 60 minutes."
      },
      {
        question: "What is the fee for Urine R/M/E test?",
        answer: "The subsidized fee is NPR 180 (regular price NPR 250)."
      },
      {
        question: "Can urine collection be done at home?",
        answer: "Yes, our team can drop off a sterile container and pick up the fresh sample from your home in Birgunj."
      }
    ],
    reviewingSpecialist: defaultTechnologist,
    lastUpdated: "2026-11-20"
  },
  {
    id: "stool-occult",
    name: "Stool Routine & Occult Blood Test",
    nameNepali: "दिशा जाँच एवं सुक्ष्म परीक्षण",
    category: "Routine & Pathology",
    sampleType: "Fresh Stool Specimen",
    fastingRequired: false,
    turnaroundTime: "Same Day (1-2 Hours)",
    description: "Detects intestinal parasites, amoeba, occult gastrointestinal bleeding, and digestive abnormalities.",
    hasDiscount: true,
    popular: false,
    priceNPR: 300,
    discountedPriceNPR: 220,
    homeCollection: true,
    answerFirstSummary: "The Stool Routine and Occult Blood (FOB) examination tests for intestinal parasites (Giardia, Entamoeba, worms), undigested food particles, microscopic bleeding, and digestive infections. It is a critical test for diagnosing persistent diarrhea, dysentery, abdominal cramps, and hidden GI blood loss. Terai Diagnostic in Birgunj provides same-day microscopic analysis within 1 to 2 hours.",
    preparationInstructions: [
      "Collect a fresh stool sample in the sterile screw-cap container provided by the laboratory.",
      "Ensure the sample is not contaminated with urine or toilet bowl water.",
      "Avoid red meat and iron supplements for 48 hours if specifically undergoing Occult Blood (FOB) testing."
    ],
    clinicalSignificance: "Identifies parasitic infestations, amoebic/bacillary dysentery, inflammatory bowel conditions, and occult bleeding associated with peptic ulcers or colorectal polyps.",
    normalRange: "Color: Brownish | Consistency: Formed | Parasites / Cysts / Ova: Not Seen | Occult Blood: Negative",
    faqs: [
      {
        question: "What does Occult Blood in stool mean?",
        answer: "Occult blood means microscopic bleeding in the digestive tract that is not visible to the naked eye, pointing to ulcers, polyps, piles, or intestinal inflammation."
      },
      {
        question: "How fresh must the stool sample be?",
        answer: "The specimen should be brought to the laboratory within 1 to 2 hours of passage to ensure parasite trophozoites remain identifiable under microscopy."
      },
      {
        question: "What is the price of stool examination in Birgunj?",
        answer: "NPR 220 under our discounted healthcare pricing at Terai Diagnostic (regular price NPR 300)."
      },
      {
        question: "Can this test identify amoeba infections?",
        answer: "Yes, saline and iodine wet-mount microscopy immediately identifies Entamoeba histolytica cysts and active trophozoites."
      }
    ],
    reviewingSpecialist: defaultTechnologist,
    lastUpdated: "2026-11-20"
  },
  {
    id: "infertility-hormones",
    name: "Infertility & Reproductive Hormones (FSH, LH, PRL, AMH)",
    nameNepali: "निसन्तान तथा प्रजनन हर्मोन जाँच",
    category: "Infertility",
    sampleType: "Blood (Serum) & Semen",
    fastingRequired: false,
    turnaroundTime: "Within 24 Hours",
    description: "Evaluates ovarian reserve, male semen motility and morphology, prolactin, and ovulation hormones.",
    hasDiscount: true,
    popular: true,
    priceNPR: 3800,
    discountedPriceNPR: 3100,
    homeCollection: true,
    answerFirstSummary: "The Infertility & Reproductive Hormone Panel comprehensively evaluates ovarian reserve and male/female fertility hormones, including Anti-Müllerian Hormone (AMH), Follicle Stimulating Hormone (FSH), Luteinizing Hormone (LH), and Prolactin (PRL). It identifies ovulatory failure, PCOS, diminished ovarian reserve, and hyperprolactinemia. Automated chemiluminescence analysis at Terai Diagnostic in Birgunj delivers verified reports within 24 hours.",
    preparationInstructions: [
      "Female Hormone Tests: FSH and LH are typically collected on Day 2 or Day 3 of the menstrual bleeding cycle for baseline evaluation.",
      "AMH can be drawn on any day of the menstrual cycle.",
      "Prolactin should be drawn 2 to 3 hours after waking up in the morning, while well-rested."
    ],
    clinicalSignificance: "Fundamental diagnostic workup for couples facing conception delays, irregular cycles, polycystic ovarian syndrome (PCOS), and assessing ovarian biological clock / reserve prior to fertility treatments.",
    normalRange: "FSH (Early Follicular): 3.5 – 12.5 mIU/mL | LH: 2.4 – 12.6 mIU/mL | Prolactin: < 25 ng/mL | AMH: 1.5 – 4.0 ng/mL",
    faqs: [
      {
        question: "On which day of my period should I take the FSH/LH test?",
        answer: "Doctors recommend taking baseline FSH and LH on Day 2 or Day 3 of menstrual bleeding to accurately assess baseline pituitary-ovarian communication."
      },
      {
        question: "Does Anti-Müllerian Hormone (AMH) require fasting?",
        answer: "No, AMH does not require fasting and does not fluctuate significantly with the menstrual cycle; it can be tested on any day."
      },
      {
        question: "What is the cost of Reproductive Hormone testing in Birgunj?",
        answer: "The complete fertility panel is discounted to NPR 3,100 (regular price NPR 3,800) at Terai Diagnostic."
      },
      {
        question: "Is semen analysis also available at Terai Diagnostic?",
        answer: "Yes, automated and manual semen analysis for sperm count, motility, and morphology is available with prompt same-day reporting."
      }
    ],
    reviewingSpecialist: defaultTechnologist,
    lastUpdated: "2026-11-20"
  },
  {
    id: "culture-sensitivity",
    name: "Culture & Sensitivity (Blood / Urine / Sputum)",
    nameNepali: "कल्चर एण्ड सेन्सिटिभिटी (C/S Test)",
    category: "Routine & Pathology",
    sampleType: "Biological Specimen",
    fastingRequired: false,
    turnaroundTime: "48-72 Hours (Incubation)",
    description: "Identifies specific bacterial pathogens causing chronic infections and determines effective antibiotic sensitivity.",
    hasDiscount: true,
    popular: false,
    priceNPR: 1200,
    discountedPriceNPR: 950,
    homeCollection: true,
    answerFirstSummary: "Culture and Sensitivity (C/S) is the definitive microbiological test to isolate bacterial or fungal pathogens from blood, urine, sputum, pus, or wound swabs and determine the exact antibiotic sensitivity profile. It prevents treatment failure and combats antibiotic resistance in recurrent infections. At Terai Diagnostic in Birgunj, incubation in specialized growth media produces precise antibiotic sensitivity charts in 48 to 72 hours.",
    preparationInstructions: [
      "Crucial: Collect specimen BEFORE initiating new antibiotic therapy whenever possible. If already on antibiotics, inform the laboratory.",
      "Urine C/S requires clean-catch midstream collection in a sterile container.",
      "Sputum C/S requires deep morning bronchial phlegm/cough, not superficial oral saliva."
    ],
    clinicalSignificance: "Identifies multi-drug resistant organisms (MRSA, ESBL E. coli, Pseudomonas) in persistent fevers, non-healing ulcers, chronic respiratory infections, and recurrent UTIs, guiding targeted antimicrobial therapy.",
    normalRange: "No pathogenic bacterial growth after 48 to 72 hours of aerobic incubation at 37°C.",
    faqs: [
      {
        question: "Why does Culture & Sensitivity take 48 to 72 hours?",
        answer: "Bacteria must be cultured in biological nutrient media for 24 to 48 hours to grow colonies, followed by 24 hours of antibiotic disk diffusion to measure precise zones of inhibition."
      },
      {
        question: "Can I do a culture test if I am already taking antibiotics?",
        answer: "Current antibiotics can inhibit bacterial growth in vitro, causing false negative cultures. Always notify the lab technologist about current medications."
      },
      {
        question: "What is the cost of Culture & Sensitivity test in Birgunj?",
        answer: "NPR 950 (discounted from NPR 1,200) for standard automated antibiotic sensitivity profiles at Terai Diagnostic."
      },
      {
        question: "Is home specimen collection available?",
        answer: "Yes, sterile collection vials and instructions can be delivered to your home by our team in Birgunj."
      }
    ],
    reviewingSpecialist: defaultTechnologist,
    lastUpdated: "2026-11-20"
  }
];
