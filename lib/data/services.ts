import type { Service } from "@/lib/types";

const IMG = "/images/services";

/** The 6 design-service categories, mirroring the original service-detail data. */
export const services: Service[] = [
  {
    slug: "fixed-prosthesis",
    title: "Fixed Prosthesis",
    mark: "FP",
    intro:
      "Digitally engineered crowns, bridges and full-arch restorations designed for dependable fit, long-term performance and natural aesthetics.",
    overview:
      "Iconic Dental supports laboratories with a complete fixed-prosthesis design workflow. Every restoration is tailored to the clinical prescription and prepared for predictable production using advanced CAD tools.",
    heroImage: `${IMG}/FIXED_PROSTHESIS_x2akap.png`,
    features: [
      "Case-specific margins and contacts",
      "Occlusion and anatomy reviewed",
      "Production-ready CAD output",
    ],
    products: [
      { name: "Crown & Bridge", description: "Reliable crown and bridge designs created in Exocad and 3Shape with close attention to margins, contacts, occlusion and turnaround.", image: `${IMG}/FIXED_PROSTHESIS-1_fid575.png` },
      { name: "Screw-Retained", description: "Stable, retrievable implant restorations customized around the implant position, access channel and clinical requirements.", image: `${IMG}/Screw-Retained_rjmikx.png` },
      { name: "Anatomical Coping", description: "CAD/CAM copings shaped to follow natural tooth anatomy while supporting functional and aesthetic veneering.", image: `${IMG}/Anatomical_Coping_guichx.png` },
      { name: "Facial Cutback", description: "Facial-only and mamelon cutbacks combining digital precision with room for controlled ceramic characterization.", image: `${IMG}/Facial_Cutback__vycitp.png` },
    ],
  },
  {
    slug: "digital-dentures",
    title: "Digital Dentures",
    mark: "DD",
    intro:
      "Removable prosthodontic designs built for accurate fit, patient comfort, natural aesthetics and efficient digital fabrication.",
    overview:
      "From complete dentures to flexible and removable partials, Iconic Dental designs patient-specific removable solutions that replace missing teeth and soft tissue while integrating smoothly into the lab workflow.",
    heroImage: `${IMG}/Removable_Partial_Dentures_y3ygvi.png`,
    features: [
      "Patient-specific base and tooth setup",
      "Fit, comfort and function considered",
      "Optimized for digital fabrication",
    ],
    products: [
      { name: "Digital Dentures", description: "Fully customized digital denture designs developed for fit, comfort, balanced occlusion and natural appearance.", image: `${IMG}/Digital_Dentures_tpwral.png` },
      { name: "Flexible Partial Dentures", description: "Flexible partial designs shaped to blend with natural dentition while supporting comfortable and secure daily wear.", image: `${IMG}/Flexible_Partial_Dentures_FPD_jzyuzh.png` },
      { name: "Removable Partial Dentures", description: "Digitally designed RPDs tailored for accurate support, retention, function and predictable manufacturing.", image: `${IMG}/Removable_Partial_Dentures_y3ygvi.png` },
    ],
  },
  {
    slug: "night-guards-and-splints",
    title: "Night Guards & Splints",
    mark: "NG",
    intro:
      "Protective appliances digitally designed for precise fit, comfortable wear and reliable defense against grinding, impact and dental stress.",
    overview:
      "Iconic Dental creates custom night guards, bite splints and specialized removable appliances for a wide range of clinical requirements. Each design prioritizes comfort, durability and seamless laboratory production.",
    heroImage: `${IMG}/Appliances_Splints_page_banner_kdotjy.png`,
    features: [
      "Accurate appliance fit",
      "Balanced contacts and guidance",
      "Print-ready digital workflow",
    ],
    products: [
      { name: "Night Guards", description: "Patient-specific guards designed to protect against grinding and clenching while maintaining comfortable wear.", image: `${IMG}/Appliances_Splints_page_banner_kdotjy.png` },
      { name: "Mouth Guards", description: "Custom appliance designs supporting protection for bruxism, TMJ-related requirements and general dental stress.", image: `${IMG}/Mouth_Guards_f5otjy.png` },
      { name: "Sport Guards", description: "Protective sports guards tailored for retention, comfort and impact protection during physical activity.", image: `${IMG}/Sports_Guard_vj8bp4.png` },
      { name: "Snap-On Smile", description: "Removable cosmetic appliance designs created with CAD technology for accurate fit and a natural appearance.", image: `${IMG}/Snap_on_Smile_fdgeuf.png` },
    ],
  },
  {
    slug: "implants",
    title: "Implants",
    mark: "IM",
    intro:
      "Precision implant designs engineered for fit, function and aesthetics across custom abutments, full-arch cases and implant-supported restorations.",
    overview:
      "Iconic Dental works with dental labs to create tailored implant solutions compatible with leading systems. Advanced digital workflows help deliver stable, maintainable and production-ready designs for each clinical situation.",
    heroImage: `${IMG}/IMPLANT_BARS_hmv1lk.png`,
    features: [
      "Implant position and access considered",
      "Restorative space carefully managed",
      "Compatible with leading workflows",
    ],
    products: [
      { name: "Custom Abutments", description: "Patient-specific abutments designed around anatomy, tissue support, restorative space and long-term stability.", image: `${IMG}/Custom_Abutments_fsperx.png` },
      { name: "All-on-X", description: "Full-arch implant designs customized for strength, comfort, hygiene access and natural-looking restorative outcomes.", image: `${IMG}/ALL_ON_X_ypbmev.png` },
      { name: "Implant Bars", description: "Accurate bar designs providing a stable foundation for implant-supported removable and fixed solutions.", image: `${IMG}/IMPLANT_BARS_hmv1lk.png` },
    ],
  },
  {
    slug: "cosmetic-dentistry",
    title: "Cosmetic Dentistry",
    mark: "CD",
    intro:
      "Aesthetic dental designs balancing proportion, symmetry, translucency and anatomy for confident, natural-looking smile transformations.",
    overview:
      "Iconic Dental helps laboratories visualize and produce aesthetic cases with digitally planned wax-ups and veneers. Every design is tailored to surrounding dentition and the intended restorative result.",
    heroImage: `${IMG}/Cosmetic_Dentistry_qpitob.png`,
    features: [
      "Proportion and symmetry refined",
      "Natural anatomy and aesthetics",
      "Designed around the clinical plan",
    ],
    products: [
      { name: "Digital Wax-Up", description: "Highly accurate diagnostic wax-ups that support visualization, treatment planning and controlled adjustment before production.", image: `${IMG}/Digital_Wax-Up_yailto.png` },
      { name: "Veneers", description: "Custom veneer designs developed for fit, natural translucency, harmonious proportions and durable aesthetics.", image: `${IMG}/Veneers_l22fpy.png` },
    ],
  },
  {
    slug: "models",
    title: "Models",
    mark: "MO",
    intro:
      "Accurate, reproducible digital dental models prepared for diagnostics, treatment planning, communication and dependable lab production.",
    overview:
      "Iconic Dental creates detailed digital models that capture the patient’s dentition for reliable printing and clinical-laboratory workflows. Each model is optimized for its intended diagnostic or production purpose.",
    heroImage: `${IMG}/Quadrant_Models_qpiazq.png`,
    features: [
      "Detailed anatomical reproduction",
      "Printability and accuracy reviewed",
      "Reliable diagnostic foundation",
    ],
    products: [
      { name: "Full Arch Models", description: "Complete-arch models accurately representing dentition for comprehensive planning and laboratory use.", image: `${IMG}/Full_Arch_with_articulatorV_qrlonc.png` },
      { name: "Quadrant Models", description: "Focused models of a specific quadrant for targeted diagnostics, restorative planning and communication.", image: `${IMG}/Quadrant_Models_qpiazq.png` },
      { name: "Contact Models", description: "Durable digital models engineered to present interproximal contact relationships with clarity and precision.", image: `${IMG}/Contact_Models_i7ppr4.png` },
    ],
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

/** Generic per-service FAQs (answers are identical in the source). */
export function serviceFaqs(service: Service): { q: string; a: string }[] {
  const t = service.title.toLowerCase();
  const answer =
    "Our team reviews the prescription and scan data, designs the case in leading dental CAD software, applies quality control and returns production-ready files through your agreed workflow.";
  return [
    `What ${t} design services does Iconic Dental provide?`,
    `What is the design process for ${t} cases?`,
    `What turnaround options are available?`,
    `How does Iconic Dental check design quality and accuracy?`,
    `Are the files compatible with leading CAD/CAM workflows?`,
  ].map((q) => ({ q, a: answer }));
}
