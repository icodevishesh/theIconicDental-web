import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { CatalogGrid } from "@/components/catalog/CatalogGrid";

export const metadata: Metadata = {
  title: "Dental Milling Services for Dental Labs",
  description:
    "One milling partner. Multiple milling solutions. Outsourced dental milling for dental laboratories only — zirconia, e.max, PMMA and titanium units with 48-hour milling turnaround.",
};

const PARTNER_URL = "https://connect.fynback.com/";

const steps = [
  {
    num: "01",
    title: "Join as a lab partner",
    text: "Tell us about your lab, monthly volume, materials and CAD software. We set up your partner account.",
  },
  {
    num: "02",
    title: "Upload your designs",
    text: "Send open STL files from exocad, 3Shape or any open CAD system, with material, shade and finishing notes.",
  },
  {
    num: "03",
    title: "We mill & finish",
    text: "Units are nested, milled and post-processed to your specification, then checked for fit and margins.",
  },
  {
    num: "04",
    title: "Shipped to your lab",
    text: "Milled units return to your lab within 48 hours of file approval, ready for your final finishing.",
  },
];

const perks = [
  "Precision 5-axis milling",
  "No mill investment",
  "Extra capacity on demand",
  "Lab-only program",
  "ISO 13485 & HIPAA compliant",
];

export default function DentalMillingServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-ink py-[70px] text-paper md:py-[92px]">
        <div className="pointer-events-none absolute -right-[180px] -top-[260px] h-[520px] w-[520px] rounded-full border border-aqua/25" />
        <div className="relative mx-auto max-w-[1220px] px-6">
          <div className="text-[.68rem] uppercase tracking-[0.16em] text-aqua">
            <Link href="/" className="hover:text-paper">
              Home
            </Link>{" "}
            &nbsp;›&nbsp; Dental Milling
          </div>
          <h1 className="my-5 max-w-[12ch] text-[clamp(3.2rem,7vw,5.8rem)] font-medium leading-[1.06] tracking-tight">
            Milling for <span className="accent font-normal text-aqua">dental labs.</span>
          </h1>
          <span className="inline-flex items-center gap-2 rounded-full border border-aqua/45 px-3.5 py-[7px] text-[.64rem] uppercase tracking-[0.14em] text-aqua">
            For dental laboratories only
          </span>
          <p className="mt-5 max-w-[650px] text-[1.08rem] text-white/80">
            Outsource your milling to Iconic Dental. Send us your finished designs and we return
            precision-milled zirconia, e.max, PMMA and titanium units—so your lab can grow output
            without buying another mill.
          </p>
          <div className="mt-[22px]">
            <Button href={PARTNER_URL} external variant="aqua">
              Become a milling partner →
            </Button>
          </div>
        </div>
      </section>

      {/* Partner program */}
      <section id="partner" className="bg-paper pt-[70px] md:pt-[84px]">
        <div className="mx-auto max-w-[1220px] px-6">
          <div className="mb-[38px] grid items-end gap-6 lg:grid-cols-[1.05fr_1fr] lg:gap-12">
            <div>
              <span className="eyebrow text-teal2">Become a milling partner</span>
              <h2 className="mt-2.5 text-[clamp(2.2rem,4vw,3.4rem)] font-medium leading-[1.1] tracking-tight text-teal">
                One milling partner. Multiple milling solutions.
              </h2>
            </div>
            <p className="text-[1rem] text-slate">
              Zirconia, e.max, PMMA, wax and titanium—crowns, implant components and removables—all
              milled by one team. This program is built only for dental laboratories. You keep the
              design, the dentist relationship and the final delivery—we take on the milling, so you
              can add capacity whenever your caseload needs it.
            </p>
          </div>

          <div className="grid gap-[18px] sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s) => (
              <div key={s.num} className="rounded-[20px] border border-line bg-white p-[26px_22px]">
                <span className="text-[.7rem] uppercase tracking-[0.14em] text-teal2">{s.num}</span>
                <h3 className="mb-2 mt-3 text-[1.3rem] font-medium text-teal">{s.title}</h3>
                <p className="text-[.88rem] text-slate">{s.text}</p>
              </div>
            ))}
          </div>

          <div className="mt-[26px] flex flex-wrap gap-2.5">
            {perks.map((perk) => (
              <span
                key={perk}
                className="rounded-full border border-line bg-white px-4 py-[9px] text-[.82rem] font-semibold text-teal"
              >
                {perk}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Milling catalog */}
      <section className="bg-paper py-[70px] md:py-[100px]">
        <div className="mx-auto max-w-[1220px] px-6">
          <CatalogGrid
            hrefBase="/dental-milling-services"
            eyebrow="Milling menu"
            title="What we mill for your lab."
            countLabel="milling services"
          />
        </div>
      </section>

      {/* CTA */}
      <section className="bg-ink py-[70px] text-paper md:py-[76px]">
        <div className="mx-auto flex max-w-[1220px] flex-col items-start justify-between gap-9 px-6 md:flex-row md:items-center">
          <h2 className="max-w-[13ch] text-[clamp(2.4rem,5vw,4rem)] font-medium leading-[1.05] tracking-tight">
            One milling partner. <span className="accent font-normal text-aqua">Multiple milling solutions.</span>
          </h2>
          <div>
            <p className="mb-3 max-w-[500px] text-white/80">
              Become an Iconic milling partner and send every material and case type to one team.
              Tell us about your lab&rsquo;s volume, materials and CAD software. We&rsquo;ll set up
              your partner account and run your first milled units. Available to dental laboratories
              only.
            </p>
            <Button href={PARTNER_URL} external variant="aqua">
              Become a milling partner →
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
