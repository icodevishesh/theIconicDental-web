import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { CatalogGrid } from "@/components/catalog/CatalogGrid";

export const metadata: Metadata = {
  title: "Dental Lab Products",
  description:
    "Explore Iconic Dental's precision restorations, implant solutions, appliances and printed models.",
};

export default function DentalLabServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-teal py-[70px] text-paper md:py-[92px]">
        <div className="pointer-events-none absolute -right-[180px] -top-[260px] h-[520px] w-[520px] rounded-full border border-aqua/25" />
        <div className="relative mx-auto max-w-[1220px] px-6">
          <div className="text-[.68rem] uppercase tracking-[0.16em] text-aqua">
            <Link href="/" className="hover:text-paper">
              Home
            </Link>{" "}
            &nbsp;›&nbsp; Dental Lab
          </div>
          <h1 className="my-5 max-w-[12ch] text-[clamp(3.2rem,7vw,5.8rem)] font-medium leading-[1.06] tracking-tight">
            Our <span className="accent font-normal text-aqua">restoration</span> menu.
          </h1>
          <p className="max-w-[650px] text-[1.08rem] text-white/80">
            Precision restorations, implant solutions, appliances and printed models—designed around
            dependable fit, functional performance and an efficient digital workflow.
          </p>
        </div>
      </section>

      {/* Catalog */}
      <section className="bg-paper py-[70px] md:py-[100px]">
        <div className="mx-auto max-w-[1220px] px-6">
          <CatalogGrid />
        </div>
      </section>

      {/* CTA */}
      <section className="bg-teal py-[70px] text-paper md:py-[76px]">
        <div className="mx-auto flex max-w-[1220px] flex-col items-start justify-between gap-9 px-6 md:flex-row md:items-center">
          <h2 className="max-w-[13ch] text-[clamp(2.4rem,5vw,4rem)] font-medium leading-[1.05] tracking-tight">
            Ready to send your <span className="accent font-normal text-aqua">next case?</span>
          </h2>
          <div>
            <p className="mb-3 max-w-[500px] text-white/80">
              Share the prescription and scan. Our team will help you select the right restoration
              and workflow.
            </p>
            <Button href="/#contact" variant="aqua">
              Start a case →
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
