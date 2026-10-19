export interface InsuranceNetwork {
  name: string;
  status: "In-Network" | "Coordinated";
  tier?: string;
}

export const insuranceData = {
  eyebrow: "TRANSPARENT COVERAGE",
  title: "We work directly with major commercial networks and Medicare.",
  body: "Insurance should never be an afterthought or an obstacle to clear clinical care. Our intake coordinators verify your individual benefit schedule, co-pays, and prior authorizations before your first appointment.",
  ctaText: "Verify your specific coverage",
  ctaHref: "#booking",
  rowOne: [
    { name: "Blue Cross Blue Shield", status: "In-Network" as const },
    { name: "Medicare Part B", status: "In-Network" as const },
    { name: "Aetna Choice POS", status: "In-Network" as const },
    { name: "UnitedHealthcare Choice", status: "In-Network" as const },
    { name: "Cigna HealthCare", status: "In-Network" as const },
    { name: "Humana Choice", status: "In-Network" as const },
  ],
  rowTwo: [
    { name: "Kaiser Permanente (PPO Network)", status: "In-Network" as const },
    { name: "Oxford Health Plans", status: "In-Network" as const },
    { name: "Medicare Advantage Plans", status: "In-Network" as const },
    { name: "MultiPlan PHCS", status: "In-Network" as const },
    { name: "GEHA Health Plans", status: "In-Network" as const },
    { name: "[REGIONAL PAYER PLACEHOLDER]", status: "Coordinated" as const },
  ],
  disclaimer:
    "[INSURANCE DISCLAIMER PLACEHOLDER: Verification of benefits is not a guarantee of payment. Final coverage determinations rest with your insurance provider. Self-pay and transparent fee schedules are readily available.]",
};
