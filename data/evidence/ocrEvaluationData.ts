/**
 * OCR EVALUATION EVIDENCE DATASET
 * Extracted directly from verified evaluation artifacts in:
 * OCR Evaluation Pipeline Repository: reports/robustness_results.json
 * Ground Truth: Legal land record (Khasra/Khatauni Title Deed), District Varanasi, UP.
 */

export interface OcrFieldResult {
  expected: string
  actual: string
  match: boolean
  confidence: number
  isCritical?: boolean
}

export interface OcrTestRun {
  id: string
  document: string
  axis: 'blur' | 'noise' | 'jpeg' | 'rotation' | 'contrast'
  level: string
  status: 'PASS' | 'REVIEW' | 'FAIL'
  cer: number
  wer: number
  confidence: number
  fieldAccuracy: number
  criticalFieldAccuracy: number
  criticalFailedFields: string[]
  failedFields: string[]
  fields: Record<string, OcrFieldResult>
  note: string
}

export interface OcrAxisSummary {
  axis: string
  tests: number
  pass: number
  review: number
  fail: number
  accurate: number
  inaccurate: number
  maxAccurateLevel: string
  firstFailureLevel: string
  description: string
}

export const ocrAxisSummaries: OcrAxisSummary[] = [
  {
    axis: 'Blur',
    tests: 4,
    pass: 4,
    review: 0,
    fail: 0,
    accurate: 4,
    inaccurate: 0,
    maxAccurateLevel: 'Kernel 15',
    firstFailureLevel: 'N/A (Tolerant)',
    description: 'Gaussian kernel degradation up to 15x15 radius; characters broaden but retain stroke connectivity.'
  },
  {
    axis: 'Noise',
    tests: 4,
    pass: 3,
    review: 0,
    fail: 1,
    accurate: 3,
    inaccurate: 1,
    maxAccurateLevel: 'Sigma 40',
    firstFailureLevel: 'Sigma 60',
    description: 'Additive Gaussian zero-mean pixel variance; catastrophic segmentation loss at sigma=60.'
  },
  {
    axis: 'JPEG',
    tests: 4,
    pass: 4,
    review: 0,
    fail: 0,
    accurate: 4,
    inaccurate: 0,
    maxAccurateLevel: 'Quality Q=5',
    firstFailureLevel: 'N/A (Tolerant)',
    description: 'DCT compression quantization down to Q=5; high resilience due to sharp high-contrast text edges.'
  },
  {
    axis: 'Rotation',
    tests: 4,
    pass: 1,
    review: 0,
    fail: 3,
    accurate: 1,
    inaccurate: 3,
    maxAccurateLevel: '2° Skew',
    firstFailureLevel: '5° Skew',
    description: 'Geometric rotational skew without deskewing preprocessing; bounding boxes misalign at >= 5°.'
  },
  {
    axis: 'Contrast',
    tests: 4,
    pass: 4,
    review: 0,
    fail: 0,
    accurate: 4,
    inaccurate: 0,
    maxAccurateLevel: 'Extreme',
    firstFailureLevel: 'N/A (Tolerant)',
    description: 'Linear histogram scaling down to low dynamic range; binarization step successfully recovers strokes.'
  }
]

export const ocrTestRuns: OcrTestRun[] = [
  // --- BLUR AXIS ---
  {
    id: 'run-blur-3',
    document: 'blur_3.png',
    axis: 'blur',
    level: 'Kernel 3x3',
    status: 'PASS',
    cer: 0.0,
    wer: 0.0,
    confidence: 94.8,
    fieldAccuracy: 1.0,
    criticalFieldAccuracy: 1.0,
    criticalFailedFields: [],
    failedFields: [],
    fields: {
      owner_name: { expected: 'Daniel James Anderson', actual: 'Daniel James Anderson', match: true, confidence: 95.7, isCritical: true },
      survey_number: { expected: '128/3', actual: '128/3', match: true, confidence: 92.0, isCritical: true },
      area: { expected: '0.2450 Hectare', actual: '0.2450 Hectare', match: true, confidence: 92.0 },
      village: { expected: 'Rampur', actual: 'Rampur', match: true, confidence: 95.0 },
      registration_number: { expected: 'REG-2026-00128', actual: 'REG-2026-00128', match: true, confidence: 91.0, isCritical: true }
    },
    note: 'Mild Gaussian blur. Binarization thresholds preserve full stroke integrity.'
  },
  {
    id: 'run-blur-7',
    document: 'blur_7.png',
    axis: 'blur',
    level: 'Kernel 7x7',
    status: 'PASS',
    cer: 0.0,
    wer: 0.0,
    confidence: 95.0,
    fieldAccuracy: 1.0,
    criticalFieldAccuracy: 1.0,
    criticalFailedFields: [],
    failedFields: [],
    fields: {
      owner_name: { expected: 'Daniel James Anderson', actual: 'Daniel James Anderson', match: true, confidence: 95.5, isCritical: true },
      survey_number: { expected: '128/3', actual: '128/3', match: true, confidence: 92.0, isCritical: true },
      area: { expected: '0.2450 Hectare', actual: '0.2450 Hectare', match: true, confidence: 92.0 },
      village: { expected: 'Rampur', actual: 'Rampur', match: true, confidence: 95.0 },
      registration_number: { expected: 'REG-2026-00128', actual: 'REG-2026-00128', match: true, confidence: 91.0, isCritical: true }
    },
    note: 'Moderate blur. Slight edge diffusion, 100% field match maintained.'
  },
  {
    id: 'run-blur-11',
    document: 'blur_11.png',
    axis: 'blur',
    level: 'Kernel 11x11',
    status: 'PASS',
    cer: 0.0,
    wer: 0.0,
    confidence: 94.8,
    fieldAccuracy: 1.0,
    criticalFieldAccuracy: 1.0,
    criticalFailedFields: [],
    failedFields: [],
    fields: {
      owner_name: { expected: 'Daniel James Anderson', actual: 'Daniel James Anderson', match: true, confidence: 95.0, isCritical: true },
      survey_number: { expected: '128/3', actual: '128/3', match: true, confidence: 91.0, isCritical: true },
      area: { expected: '0.2450 Hectare', actual: '0.2450 Hectare', match: true, confidence: 91.5 },
      village: { expected: 'Rampur', actual: 'Rampur', match: true, confidence: 94.5 },
      registration_number: { expected: 'REG-2026-00128', actual: 'REG-2026-00128', match: true, confidence: 90.0, isCritical: true }
    },
    note: 'Heavy blur. Letter interiors begin closing; Levenshtein distance remains 0.'
  },
  {
    id: 'run-blur-15',
    document: 'blur_15.png',
    axis: 'blur',
    level: 'Kernel 15x15',
    status: 'PASS',
    cer: 0.0,
    wer: 0.0,
    confidence: 94.7,
    fieldAccuracy: 1.0,
    criticalFieldAccuracy: 1.0,
    criticalFailedFields: [],
    failedFields: [],
    fields: {
      owner_name: { expected: 'Daniel James Anderson', actual: 'Daniel James Anderson', match: true, confidence: 94.7, isCritical: true },
      survey_number: { expected: '128/3', actual: '128/3', match: true, confidence: 91.0, isCritical: true },
      area: { expected: '0.2450 Hectare', actual: '0.2450 Hectare', match: true, confidence: 91.0 },
      village: { expected: 'Rampur', actual: 'Rampur', match: true, confidence: 94.0 },
      registration_number: { expected: 'REG-2026-00128', actual: 'REG-2026-00128', match: true, confidence: 89.5, isCritical: true }
    },
    note: 'Maximum tested blur. OCR engine extracts text faithfully despite optical diffusion.'
  },

  // --- NOISE AXIS ---
  {
    id: 'run-noise-10',
    document: 'noise_10.png',
    axis: 'noise',
    level: 'Variance σ=10',
    status: 'PASS',
    cer: 0.0,
    wer: 0.0,
    confidence: 95.0,
    fieldAccuracy: 1.0,
    criticalFieldAccuracy: 1.0,
    criticalFailedFields: [],
    failedFields: [],
    fields: {
      owner_name: { expected: 'Daniel James Anderson', actual: 'Daniel James Anderson', match: true, confidence: 95.0, isCritical: true },
      survey_number: { expected: '128/3', actual: '128/3', match: true, confidence: 92.0, isCritical: true },
      area: { expected: '0.2450 Hectare', actual: '0.2450 Hectare', match: true, confidence: 92.0 },
      village: { expected: 'Rampur', actual: 'Rampur', match: true, confidence: 95.0 },
      registration_number: { expected: 'REG-2026-00128', actual: 'REG-2026-00128', match: true, confidence: 91.0, isCritical: true }
    },
    note: 'Light grain noise. No character segmentation loss.'
  },
  {
    id: 'run-noise-25',
    document: 'noise_25.png',
    axis: 'noise',
    level: 'Variance σ=25',
    status: 'PASS',
    cer: 0.0,
    wer: 0.0,
    confidence: 94.8,
    fieldAccuracy: 1.0,
    criticalFieldAccuracy: 1.0,
    criticalFailedFields: [],
    failedFields: [],
    fields: {
      owner_name: { expected: 'Daniel James Anderson', actual: 'Daniel James Anderson', match: true, confidence: 94.8, isCritical: true },
      survey_number: { expected: '128/3', actual: '128/3', match: true, confidence: 91.5, isCritical: true },
      area: { expected: '0.2450 Hectare', actual: '0.2450 Hectare', match: true, confidence: 91.5 },
      village: { expected: 'Rampur', actual: 'Rampur', match: true, confidence: 94.5 },
      registration_number: { expected: 'REG-2026-00128', actual: 'REG-2026-00128', match: true, confidence: 90.5, isCritical: true }
    },
    note: 'Moderate sensor speckle. Isolated noise pixels rejected by size filter.'
  },
  {
    id: 'run-noise-40',
    document: 'noise_40.png',
    axis: 'noise',
    level: 'Variance σ=40',
    status: 'PASS',
    cer: 0.0,
    wer: 0.0,
    confidence: 95.1,
    fieldAccuracy: 1.0,
    criticalFieldAccuracy: 1.0,
    criticalFailedFields: [],
    failedFields: [],
    fields: {
      owner_name: { expected: 'Daniel James Anderson', actual: 'Daniel James Anderson', match: true, confidence: 95.1, isCritical: true },
      survey_number: { expected: '128/3', actual: '128/3', match: true, confidence: 91.0, isCritical: true },
      area: { expected: '0.2450 Hectare', actual: '0.2450 Hectare', match: true, confidence: 91.0 },
      village: { expected: 'Rampur', actual: 'Rampur', match: true, confidence: 94.0 },
      registration_number: { expected: 'REG-2026-00128', actual: 'REG-2026-00128', match: true, confidence: 90.0, isCritical: true }
    },
    note: 'Highest passing noise level. Preprocessing thresholding holds stroke boundaries.'
  },
  {
    id: 'run-noise-60',
    document: 'noise_60.png',
    axis: 'noise',
    level: 'Variance σ=60',
    status: 'FAIL',
    cer: 1.0,
    wer: 1.0,
    confidence: 0.0,
    fieldAccuracy: 0.0,
    criticalFieldAccuracy: 0.0,
    criticalFailedFields: ['survey_number', 'owner_name', 'registration_number'],
    failedFields: ['owner_name', 'father_name', 'survey_number', 'area', 'village', 'tehsil', 'district', 'registration_number'],
    fields: {
      owner_name: { expected: 'Daniel James Anderson', actual: '', match: false, confidence: 0.0, isCritical: true },
      survey_number: { expected: '128/3', actual: '', match: false, confidence: 0.0, isCritical: true },
      area: { expected: '0.2450 Hectare', actual: '', match: false, confidence: 0.0 },
      village: { expected: 'Rampur', actual: '', match: false, confidence: 0.0 },
      registration_number: { expected: 'REG-2026-00128', actual: '', match: false, confidence: 0.0, isCritical: true }
    },
    note: 'CATASTROPHIC FAILURE: Severe noise obliterates OCR baseline. Zero text detected. Priority risk engine flags FAIL.'
  },

  // --- ROTATION AXIS (CRITICAL DRIFT DEMONSTRATION) ---
  {
    id: 'run-rotation-2',
    document: 'rotation_2.png',
    axis: 'rotation',
    level: '2° Skew',
    status: 'PASS',
    cer: 0.0,
    wer: 0.0,
    confidence: 95.1,
    fieldAccuracy: 1.0,
    criticalFieldAccuracy: 1.0,
    criticalFailedFields: [],
    failedFields: [],
    fields: {
      owner_name: { expected: 'Daniel James Anderson', actual: 'Daniel James Anderson', match: true, confidence: 95.1, isCritical: true },
      survey_number: { expected: '128/3', actual: '128/3', match: true, confidence: 92.0, isCritical: true },
      area: { expected: '0.2450 Hectare', actual: '0.2450 Hectare', match: true, confidence: 92.0 },
      village: { expected: 'Rampur', actual: 'Rampur', match: true, confidence: 95.0 },
      registration_number: { expected: 'REG-2026-00128', actual: 'REG-2026-00128', match: true, confidence: 91.0, isCritical: true }
    },
    note: 'Minor document skew. Tesseract line-tracking handles <= 2 degrees without deskew.'
  },
  {
    id: 'run-rotation-5',
    document: 'rotation_5.png',
    axis: 'rotation',
    level: '5° Skew',
    status: 'FAIL',
    cer: 0.015,
    wer: 0.115,
    confidence: 89.3,
    fieldAccuracy: 0.75,
    criticalFieldAccuracy: 0.5,
    criticalFailedFields: ['survey_number', 'owner_name'],
    failedFields: ['owner_name', 'survey_number'],
    fields: {
      owner_name: { expected: 'Daniel James Anderson', actual: 'Daniel James Andersan', match: false, confidence: 88.0, isCritical: true },
      survey_number: { expected: '128/3', actual: '128/8', match: false, confidence: 78.5, isCritical: true },
      area: { expected: '0.2450 Hectare', actual: '0.2450 Hectare', match: true, confidence: 90.0 },
      village: { expected: 'Rampur', actual: 'Rampur', match: true, confidence: 92.0 },
      registration_number: { expected: 'REG-2026-00128', actual: 'REG-2026-00128', match: true, confidence: 89.0, isCritical: true }
    },
    note: 'VITAL RISK DEMONSTRATION: Aggregate confidence is 89.3% and CER is only 1.5%, but critical Survey Number (128/3 -> 128/8) and Owner Name failed. Priority Risk Gate forces FAIL.'
  },
  {
    id: 'run-rotation-10',
    document: 'rotation_10.png',
    axis: 'rotation',
    level: '10° Skew',
    status: 'FAIL',
    cer: 1.0,
    wer: 1.0,
    confidence: 0.0,
    fieldAccuracy: 0.0,
    criticalFieldAccuracy: 0.0,
    criticalFailedFields: ['survey_number', 'owner_name', 'registration_number'],
    failedFields: ['owner_name', 'father_name', 'survey_number', 'area', 'village', 'tehsil', 'district', 'registration_number'],
    fields: {
      owner_name: { expected: 'Daniel James Anderson', actual: '', match: false, confidence: 0.0, isCritical: true },
      survey_number: { expected: '128/3', actual: '', match: false, confidence: 0.0, isCritical: true },
      area: { expected: '0.2450 Hectare', actual: '', match: false, confidence: 0.0 },
      village: { expected: 'Rampur', actual: '', match: false, confidence: 0.0 },
      registration_number: { expected: 'REG-2026-00128', actual: '', match: false, confidence: 0.0, isCritical: true }
    },
    note: 'Text baseline tilted beyond horizontal slice tracking; bounding boxes fail to form text lines.'
  },
  {
    id: 'run-rotation-15',
    document: 'rotation_15.png',
    axis: 'rotation',
    level: '15° Skew',
    status: 'FAIL',
    cer: 1.0,
    wer: 1.0,
    confidence: 0.0,
    fieldAccuracy: 0.0,
    criticalFieldAccuracy: 0.0,
    criticalFailedFields: ['survey_number', 'owner_name', 'registration_number'],
    failedFields: ['owner_name', 'father_name', 'survey_number', 'area', 'village', 'tehsil', 'district', 'registration_number'],
    fields: {
      owner_name: { expected: 'Daniel James Anderson', actual: '', match: false, confidence: 0.0, isCritical: true },
      survey_number: { expected: '128/3', actual: '', match: false, confidence: 0.0, isCritical: true },
      area: { expected: '0.2450 Hectare', actual: '', match: false, confidence: 0.0 },
      village: { expected: 'Rampur', actual: '', match: false, confidence: 0.0 },
      registration_number: { expected: 'REG-2026-00128', actual: '', match: false, confidence: 0.0, isCritical: true }
    },
    note: 'Extreme skew angle. Bounding box coordinates unmapped.'
  },

  // --- JPEG COMPRESSION AXIS ---
  {
    id: 'run-jpeg-50',
    document: 'jpeg_50.png',
    axis: 'jpeg',
    level: 'Quality Q=50',
    status: 'PASS',
    cer: 0.0,
    wer: 0.0,
    confidence: 94.9,
    fieldAccuracy: 1.0,
    criticalFieldAccuracy: 1.0,
    criticalFailedFields: [],
    failedFields: [],
    fields: {
      owner_name: { expected: 'Daniel James Anderson', actual: 'Daniel James Anderson', match: true, confidence: 95.0, isCritical: true },
      survey_number: { expected: '128/3', actual: '128/3', match: true, confidence: 92.0, isCritical: true },
      area: { expected: '0.2450 Hectare', actual: '0.2450 Hectare', match: true, confidence: 92.0 },
      village: { expected: 'Rampur', actual: 'Rampur', match: true, confidence: 95.0 },
      registration_number: { expected: 'REG-2026-00128', actual: 'REG-2026-00128', match: true, confidence: 91.0, isCritical: true }
    },
    note: 'Standard web compression. Negligible blocking artifacts around typography.'
  },
  {
    id: 'run-jpeg-5',
    document: 'jpeg_5.png',
    axis: 'jpeg',
    level: 'Quality Q=5',
    status: 'PASS',
    cer: 0.0,
    wer: 0.0,
    confidence: 94.5,
    fieldAccuracy: 1.0,
    criticalFieldAccuracy: 1.0,
    criticalFailedFields: [],
    failedFields: [],
    fields: {
      owner_name: { expected: 'Daniel James Anderson', actual: 'Daniel James Anderson', match: true, confidence: 94.5, isCritical: true },
      survey_number: { expected: '128/3', actual: '128/3', match: true, confidence: 91.0, isCritical: true },
      area: { expected: '0.2450 Hectare', actual: '0.2450 Hectare', match: true, confidence: 91.0 },
      village: { expected: 'Rampur', actual: 'Rampur', match: true, confidence: 94.0 },
      registration_number: { expected: 'REG-2026-00128', actual: 'REG-2026-00128', match: true, confidence: 89.0, isCritical: true }
    },
    note: 'Aggressive 8x8 DCT quantization artifacts; high character contrast allows clean thresholding.'
  },

  // --- CONTRAST AXIS ---
  {
    id: 'run-contrast-extreme',
    document: 'contrast_extreme.png',
    axis: 'contrast',
    level: 'Extreme Fade',
    status: 'PASS',
    cer: 0.0,
    wer: 0.0,
    confidence: 94.8,
    fieldAccuracy: 1.0,
    criticalFieldAccuracy: 1.0,
    criticalFailedFields: [],
    failedFields: [],
    fields: {
      owner_name: { expected: 'Daniel James Anderson', actual: 'Daniel James Anderson', match: true, confidence: 95.0, isCritical: true },
      survey_number: { expected: '128/3', actual: '128/3', match: true, confidence: 92.0, isCritical: true },
      area: { expected: '0.2450 Hectare', actual: '0.2450 Hectare', match: true, confidence: 92.0 },
      village: { expected: 'Rampur', actual: 'Rampur', match: true, confidence: 95.0 },
      registration_number: { expected: 'REG-2026-00128', actual: 'REG-2026-00128', match: true, confidence: 91.0, isCritical: true }
    },
    note: 'Low dynamic range thermal print simulation. Otsu binarization preserves character strokes.'
  }
]

