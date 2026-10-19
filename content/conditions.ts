export interface ConditionCategory {
  id: string;
  index: string;
  category: string;
  subtitle: string;
  conditions: Array<{
    name: string;
    description: string;
    clinicalNote?: string;
  }>;
}

export const conditionsData: ConditionCategory[] = [
  {
    id: "pulmonary",
    index: "01",
    category: "Pulmonary & Airway",
    subtitle: "Chronic airway resistance, oxygen transport, and pulmonary function.",
    conditions: [
      {
        name: "Asthma & Reactive Airway Disease",
        description: "Differential diagnosis between eosinophilic and non-eosinophilic airway inflammation with bronchial challenge testing.",
        clinicalNote: "[SPIROMETRY CRITERIA PLACEHOLDER]",
      },
      {
        name: "Chronic Obstructive Pulmonary Disease (COPD)",
        description: "Emphysema and chronic bronchitis management with long-acting bronchodilator optimization and exacerbation prevention.",
      },
      {
        name: "Unexplained Chronic Cough & Dyspnea",
        description: "Stepwise clinical investigation of unexplained shortness of breath spanning post-nasal, GERD, and vocal cord dysfunction.",
      },
      {
        name: "Post-Viral & Post-COVID Respiratory Sequelae",
        description: "Targeted pulmonary rehabilitation protocols for persistent exercise intolerance and micro-vascular inflammation.",
      },
      {
        name: "Interstitial Lung Pattern Monitoring",
        description: "Early detection and high-resolution chest CT surveillance for idiopathic pulmonary fibrosis patterns.",
        clinicalNote: "[SPECIALIST REFERRAL PROTOCOL PLACEHOLDER]",
      },
    ],
  },
  {
    id: "sleep",
    index: "02",
    category: "Sleep & Circadian Physiology",
    subtitle: "Airway collapse, neurological sleep architecture, and nocturnal hypoxia.",
    conditions: [
      {
        name: "Obstructive Sleep Apnea (OSA)",
        description: "Quantification of apnea-hypopnea index (AHI) through home and laboratory polysomnography.",
      },
      {
        name: "Central Sleep Apnea & Cheyne-Stokes",
        description: "Evaluation of ventilatory instability and nocturnal oxygen desaturation correlated with cardiovascular strain.",
      },
      {
        name: "Chronic Sleep-Onset & Sleep-Maintenance Insomnia",
        description: "Physiological sleep staging and evidence-based non-pharmacological behavioral reconditioning.",
      },
      {
        name: "Circadian Rhythm Phase Delay / Advance",
        description: "Targeted chronotherapy and timed photonic exposure to stabilize biological clock pacemakers.",
      },
      {
        name: "Restless Legs Syndrome (RLS) & Periodic Limb Movements",
        description: "Serum ferritin investigation, dopamine receptor considerations, and nocturnal sensorimotor management.",
      },
    ],
  },
  {
    id: "metabolic",
    index: "03",
    category: "Metabolic & Endocrine Balance",
    subtitle: "Insulin resistance, hormonal signaling, and cellular energy turnover.",
    conditions: [
      {
        name: "Type 2 Diabetes & Pre-Diabetes",
        description: "HOMA-IR calculation, continuous interstitial glucose mapping, and beta-cell preservation strategies.",
      },
      {
        name: "Metabolic Syndrome & Visceral Adiposity",
        description: "Triad management of elevated waist circumference, hypertriglyceridemia, and systemic insulin insensitivity.",
      },
      {
        name: "Thyroid Dysfunction (Hypo / Hyper / Hashimoto’s)",
        description: "Comprehensive Free T3, Free T4, Reverse T3, and anti-TPO antibody panels.",
      },
      {
        name: "Non-Alcoholic Fatty Liver (NAFLD / MASLD)",
        description: "Hepatic steatosis evaluation via FIB-4 index, specialized lipid subfractions, and dietary reversal.",
      },
    ],
  },
  {
    id: "cardiovascular",
    index: "04",
    category: "Cardiovascular & Hemodynamic Health",
    subtitle: "Arterial stiffness, endothelial health, and blood pressure control.",
    conditions: [
      {
        name: "Essential & Secondary Hypertension",
        description: "24-hour ambulatory blood pressure monitoring and evaluation of renal artery or endocrine drivers.",
      },
      {
        name: "Atherogenic Dyslipidemia",
        description: "Advanced Apolipoprotein B (ApoB) and Lipoprotein(a) risk stratification beyond standard total cholesterol.",
      },
      {
        name: "Pre-Clinical Coronary Artery Disease",
        description: "Coronary Artery Calcium (CAC) score coordination and aggressive plaque-stabilizing therapeutics.",
      },
      {
        name: "Orthostatic & Autonomic Dysregulation",
        description: "Postural orthostatic tachycardia (POTS) and vasovagal symptom workup.",
      },
    ],
  },
  {
    id: "preventive",
    index: "05",
    category: "Preventive & Systematic Longevity",
    subtitle: "Proactive biological age preservation, screening, and baseline security.",
    conditions: [
      {
        name: "Comprehensive Executive Health Baseline",
        description: "Deep biomarker audit combining 80+ distinct blood, urinary, and physiological metrics.",
      },
      {
        name: "Family Cancer Risk Stratification",
        description: "Genetic screening coordination and tailored multi-modal cancer surveillance plans.",
      },
      {
        name: "Age-Stratified Osteopenia & Bone Density",
        description: "DEXA scan evaluation, Vitamin D/K2 metabolism, and targeted resistance load prescriptions.",
      },
      {
        name: "Immunological & Micronutrient Deficiency",
        description: "Precision intracellular nutrient analysis and individualized physiological supplementation.",
      },
    ],
  },
];
