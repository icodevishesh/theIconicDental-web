import type { LabProduct, ProductCategory } from "@/lib/types";

const IMG = "/images/products";

/** Ordered exactly as the original catalog renders them. */
export const labProducts: LabProduct[] = (
  [
    ["zirconia-crowns", "Zirconia Crowns", "crown", "Crown & Bridge", "Precision-milled zirconia for dependable strength and natural aesthetics.", "zirconia-crown.0ophtrbbvxtgx.png"],
    ["all-on-x-hybrids", "All-on-X Hybrids", "implant", "Implant Solutions", "Full-arch implant restorations planned for stability, function and confident delivery.", "all-on-x-hybrid.3xi4t9yc-r5tm.png"],
    ["e-max-restorations", "e.max Restorations", "crown", "Ceramics", "Translucent lithium-disilicate restorations for aesthetic anterior and posterior cases.", "emax-restoration.1ou2ua8dmwi0-.png"],
    ["pfm-crowns", "PFM Crowns", "crown", "Ceramics", "Time-tested porcelain-fused-to-metal restorations balancing durability and aesthetics.", "pmf.029a8fej8ofwm.png"],
    ["surgical-guides", "Surgical Guides", "implant", "Implant Solutions", "Restorative-driven digital guides for precise and predictable implant placement.", "surgical-guides.1x08h261bttg9.png"],
    ["night-guards", "Night Guards", "appliance", "Appliances", "Comfort-focused guards developed for protection, even contacts and lasting wear.", "night-gaurds.0rq82bxz3v07o.png"],
    ["printed-models-dies", "Printed Models & Dies", "appliance", "Models & Dies", "High-accuracy study models, working models and removable dies.", "printed-models.2u7cqhlwwzd1n.png"],
    ["zirconia-hybrid-custom-abutment", "Zirconia Hybrid Custom Abutment", "implant", "Implant Solutions", "Titanium-interface strength paired with carefully contoured zirconia aesthetics.", "new-zirconia-hybrid-custom-abutment-poster.2ye-3h7ampryu.png"],
    ["wax-up", "Wax Up", "appliance", "Models & Dies", "Diagnostic previews for evaluating restorative form, proportion and function.", "wax_up_poster.2z1jewb3tzfsk.png"],
    ["titanium-custom-abutments", "Titanium Custom Abutments", "implant", "Implant Solutions", "Patient-specific abutments for stable seating and restorative flexibility.", "new-titanium-custom-abutments-poster.2ofw5992bclqu.png"],
    ["full-contour-zirconia", "Full Contour Zirconia", "crown", "Ceramics", "Robust monolithic restorations suited to demanding posterior occlusion.", "full-contour-zirconia-poster.3a62strm1p6qp.png"],
    ["acrylic-denture", "Acrylic Denture", "appliance", "Appliances", "Complete removable solutions developed for comfort and balanced occlusion.", "new-acrylic-denture-poster.2omzmnqt7pi8_.png"],
    ["acrylic-partial", "Acrylic Partial", "appliance", "Appliances", "Practical removable partial designs for dependable fit and daily comfort.", "acrylic-partial-poster.3305tee2nna6n.png"],
    ["partial-metal-framework", "Partial Metal Framework", "appliance", "Appliances", "Precision framework designs that balance rigidity, retention and patient comfort.", "partial_metal_framework_poster.0dt__q43_c897.png"],
    ["temporaries", "Temporaries", "crown", "Crown & Bridge", "Functional interim crowns and bridges supporting healing and aesthetic continuity.", "Temporaries-poster.2u7cqhlwwzd1n.png"],
    ["screw-retained-zirconia-bridge", "Screw Retained Zirconia Bridge", "implant", "Implant Solutions", "Retrievable full-arch zirconia restorations designed for durable implant function.", "updated_screw_retained_zirconia_bridge_poster.3ci55osfq7jw2.png"],
    ["screw-retained-pmma-bridge", "Screw Retained PMMA Bridge", "implant", "Implant Solutions", "Lightweight full-arch PMMA solutions for provisional and transitional workflows.", "pmma_screw_retained_hybrid_poster.0unhqe8-0_ycn.png"],
    ["process-implant-acrylic-denture", "Process Implant Acrylic Denture", "implant", "Implant Solutions", "Implant-retained acrylic denture workflows developed for stable custom fit.", "updated_process_Implant_poster.3w4ii7k8becml.png"],
    ["porcelain-fused-to-zirconia", "Porcelain Fused to Zirconia", "crown", "Ceramics", "Zirconia support combined with layered porcelain for refined aesthetics.", "Porcelain-Fused-to-Zirconia-poster-1.1qf0t52qir10-.png"],
    ["millable-flexible-partials", "Millable Flexible Partials", "appliance", "Appliances", "Lightweight milled partials combining flexibility, retention and strength.", "rpd_flexi_poster.265-w63f2oq4t.png"],
    ["screwmentable-crown-abutment-with-screw-channel-crown", "Screwmentable Crown & Abutment", "implant", "Implant Solutions", "Custom abutment and retrievable crown design in one coordinated workflow.", "new-screwmentable-crown-poster-1.0gaazxrw9fl8h.png"],
    ["zirconia-screw-retained-crown-with-ti-base", "Zirconia Screw-Retained Crown With Ti Base", "implant", "Implant Solutions", "A zirconia restoration on a titanium interface for stability and retrievability.", "zirconia_screw_retained_crown_w_ti_base_poster-1.1uqy-zj3f9mz3.png"],
    ["flexible-partials", "Flexible Partials", "appliance", "Appliances", "Metal-free removable prosthetics shaped for comfort and discreet retention.", "rpd_flexi_poster.265-w63f2oq4t.png"],
    ["zirconia-hybrid", "Zirconia Hybrid", "implant", "Implant Solutions", "Full-arch zirconia hybrid restorations balancing strength and natural aesthetics.", "zirconia_hybrid_poster.3xi4t9yc-r5tm.png"],
    ["screw-retained-bridge", "Screw Retained Bridge", "implant", "Implant Solutions", "Stable, retrievable implant-supported bridge designs for predictable maintenance.", "updated_screw_retained_bridge_poster.3s7x5wz9argmt.png"],
    ["temporary-bridge", "Temporary Bridge", "crown", "Crown & Bridge", "Short-term bridge solutions supporting function and aesthetics during healing.", "updated_temporary_bridge_poster.2d_4bj0_dwcic.png"],
    ["screwmentable", "Screwmentable", "implant", "Implant Solutions", "A custom-abutment crown workflow designed for secure fit and retrievable access.", "screwmentable-1.png-1.21hkvs0kh4wtn.png"],
  ] as const
).map(([slug, title, cat, category, tagline, file]) => ({
  slug,
  title,
  cat: cat as ProductCategory,
  category,
  tagline,
  image: `${IMG}/${file}`,
}));

export const productCategories: { label: string; value: "all" | ProductCategory }[] = [
  { label: "All", value: "all" },
  { label: "Crown & Bridge", value: "crown" },
  { label: "Implant Solutions", value: "implant" },
  { label: "Appliances & Models", value: "appliance" },
];

export function getProduct(slug: string): LabProduct | undefined {
  return labProducts.find((p) => p.slug === slug);
}

export function getRelatedProducts(product: LabProduct, count = 3): LabProduct[] {
  return labProducts
    .filter((p) => p.slug !== product.slug && p.cat === product.cat)
    .slice(0, count);
}

/** Category-specific dentist FAQs (mirrors the original lab-product-shell logic). */
export function productFaqs(p: LabProduct): { q: string; a: string }[] {
  const t = p.title;
  if (p.cat === "implant") {
    return [
      [`What records should a dentist send for a ${t} case?`, `Send complete intraoral scans or verified models, the opposing arch, bite records, implant system and component details, shade information, photographs, and the prescription. Full-arch or guided cases may also require CBCT/DICOM data and a verified scan body workflow.`],
      [`How much restorative space is needed for ${t}?`, `Required space depends on the restoration, material and implant components. Provide calibrated scans and note any space limitations so the design team can assess framework thickness, tooth setup, hygiene contours and screw-channel access before production.`],
      [`Can ${t} be completed from a fully digital workflow?`, `Yes, when the clinical records accurately capture implant position, soft tissue, occlusion and the opposing arch. Complex full-arch cases may benefit from verification records or a prototype try-in before the definitive restoration.`],
      [`Which implant systems are compatible with ${t}?`, `The workflow supports many major implant systems. Include the exact manufacturer, platform, connection, scan body and restorative component information with the case so compatibility can be confirmed before design.`],
      [`Is a prototype or try-in recommended for ${t}?`, `A prototype is often recommended for complex or full-arch cases to verify passive fit, tooth position, phonetics, occlusion and cleansability. The need is determined by case complexity and the quality of the submitted records.`],
    ].map(([q, a]) => ({ q, a }));
  }
  if (p.cat === "crown") {
    return [
      [`What clinical records are needed for ${t}?`, `Send a clear preparation scan or impression, opposing arch, accurate bite, shade prescription and relevant photographs. Implant-supported units should also include the implant system and component information.`],
      [`What preparation clearance is recommended for ${t}?`, `Clearance varies by material, indication and manufacturer guidance. Provide adequate occlusal and axial reduction with readable margins; the design team will flag areas that may compromise strength or contour before production.`],
      [`How is the shade selected for ${t}?`, `Use the requested shade system and include stump shade and calibrated photographs for aesthetic cases. Material translucency, restoration thickness and the underlying preparation all influence the final result.`],
      [`Can ${t} be made from an intraoral scan?`, `Yes. Submit the prepared arch, opposing arch and bite in an accepted open scan format. The scan should capture the complete margin, adjacent contacts and enough soft tissue and anatomy for reliable articulation.`],
      [`What is the typical turnaround for ${t}?`, `Turnaround depends on case complexity, material and whether additional records or approval are required. The confirmed schedule begins after all usable records and the final prescription have been received.`],
    ].map(([q, a]) => ({ q, a }));
  }
  return [
    [`What records are required for a ${t} case?`, `Send accurate upper and lower scans or models, a stable bite record, the prescription and the intended appliance or model requirements. Add photographs and design notes whenever tooth position or aesthetics are important.`],
    [`Can ${t} be produced from an intraoral scan?`, `Yes, provided the scan captures all required teeth, soft-tissue boundaries and occlusal information without stitching errors or missing anatomy. Open STL or other accepted digital files can be reviewed before production.`],
    [`Which material is used for ${t}?`, `Material selection depends on the indication, desired rigidity or flexibility, thickness and production method. The prescription should identify clinical priorities so the appropriate validated material can be confirmed.`],
    [`How should fit or occlusal adjustments be handled?`, `Evaluate fit and contacts clinically using the appropriate marking and adjustment protocol for the material. If a discrepancy is significant, contact the design team before extensive adjustment and provide photos or updated records.`],
    [`What is the turnaround time for ${t}?`, `Turnaround varies with product type, quantity and case complexity. Production timing is confirmed after the submitted scans, bite and prescription pass the initial record review.`],
  ].map(([q, a]) => ({ q, a }));
}
