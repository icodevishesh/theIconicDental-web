import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import {
  labProducts,
  getProduct,
  getRelatedProducts,
  productFaqs,
} from "@/lib/data/products";

export function generateStaticParams() {
  return labProducts.map((p) => ({ product: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ product: string }>;
}): Promise<Metadata> {
  const { product } = await params;
  const data = getProduct(product);
  if (!data) return {};
  return { title: data.title, description: data.tagline };
}

const metrics = [
  { label: "Turnaround", value: "Case dependent" },
  { label: "Design review", value: "Expert QC" },
  { label: "Workflow", value: "Fully digital" },
  { label: "Support", value: "24/7 available" },
];

const included = [
  "Case-specific design and margins",
  "Occlusion and anatomy reviewed",
  "Production-ready digital output",
  "Material-aware design planning",
  "Expert quality-control review",
  "Responsive case communication",
];

const scanners = ["iTero", "3Shape", "Medit", "Carestream", "Dexis", "Sirona", "Planmeca"];

export default async function ProductPage({
  params,
}: {
  params: Promise<{ product: string }>;
}) {
  const { product } = await params;
  const data = getProduct(product);
  if (!data) notFound();

  const related = getRelatedProducts(data);
  const faqs = productFaqs(data);

  return (
    <>
      {/* Hero */}
      <section className="bg-teal text-paper">
        <div className="mx-auto flex min-h-[clamp(300px,34vw,420px)] max-w-[1200px] flex-col justify-center px-6 py-16">
          <div className="text-[.68rem] uppercase tracking-[0.15em] text-aqua">
            <Link href="/" className="hover:text-paper">
              Home
            </Link>{" "}
            &nbsp;›&nbsp;{" "}
            <Link href="/dental-lab-services" className="hover:text-paper">
              Dental Lab
            </Link>{" "}
            &nbsp;›&nbsp; {data.title}
          </div>
          <h1 className="mt-[22px] line-clamp-2 max-w-[22ch] text-[clamp(2.65rem,5vw,4.8rem)] font-medium leading-[1.07] tracking-tight">
            {data.tagline}
          </h1>
        </div>
      </section>

      {/* Detail */}
      <section className="bg-paper py-[62px] md:py-[88px]">
        <div className="mx-auto grid max-w-[1200px] items-center gap-10 px-6 lg:grid-cols-2 lg:gap-[68px]">
          <div className="grad-card-teal grid min-h-[380px] place-items-center overflow-hidden rounded-[28px] md:min-h-[520px]">
            <div className="relative h-[340px] w-[88%] md:h-[460px]">
              <Image
                src={data.image}
                alt={data.title}
                fill
                sizes="(max-width:1024px) 100vw, 50vw"
                className="object-contain drop-shadow-[0_22px_25px_rgba(0,0,0,.18)]"
              />
            </div>
          </div>
          <div>
            <span className="eyebrow text-teal2">{data.category}</span>
            <h2 className="my-3 text-[clamp(2rem,4.5vw,3.4rem)] font-medium leading-[1.08] tracking-tight text-teal">
              {data.title}
            </h2>
            <p className="text-[1.04rem] text-slate">
              Our {data.title.toLowerCase()} workflow combines precise digital planning, carefully
              controlled production and experienced quality review. Every case is prepared around the
              prescription, restorative space and laboratory preferences for a consistent path from
              scan approval to final delivery.
            </p>
            <div className="mt-7 grid grid-cols-2 gap-3">
              {metrics.map((m) => (
                <div
                  key={m.label}
                  className="grad-card-teal rounded-[15px] border border-white/25 p-[17px] text-paper"
                >
                  <span className="block text-[.58rem] uppercase tracking-[0.12em] text-[#c9ebe5]">
                    {m.label}
                  </span>
                  <b className="mt-1 block font-medium">{m.value}</b>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Included */}
      <section className="bg-teal py-[70px] text-paper md:py-[84px]">
        <div className="mx-auto grid max-w-[1200px] gap-[40px] px-6 lg:grid-cols-[.8fr_1.2fr] lg:gap-[70px]">
          <div>
            <span className="eyebrow text-aqua">What&apos;s included</span>
            <h2 className="mt-3.5 text-[clamp(2rem,4vw,3.5rem)] font-medium leading-[1.1] tracking-tight text-paper">
              A complete, dependable workflow.
            </h2>
          </div>
          <div>
            <div className="grid gap-3 sm:grid-cols-2">
              {included.map((c) => (
                <div
                  key={c}
                  className="rounded-[14px] border border-white/20 p-4 text-[.9rem] text-paper/90"
                >
                  <span className="mr-2.5 text-aqua">✓</span>
                  {c}
                </div>
              ))}
            </div>
            <div className="mt-[34px] border-t border-white/20 pt-6">
              <span className="eyebrow text-aqua">Compatible scanners</span>
              <div className="mt-3 flex flex-wrap gap-2.5">
                {scanners.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-white/25 px-3 py-[7px] text-[.8rem]"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-paper py-[70px] md:py-[88px]">
        <div className="mx-auto grid max-w-[1200px] gap-[40px] px-6 lg:grid-cols-[.72fr_1.28fr] lg:gap-[72px]">
          <div>
            <span className="eyebrow text-teal2">Frequently asked questions</span>
            <h2 className="mt-3.5 text-[clamp(2rem,4vw,3.5rem)] font-medium leading-[1.1] tracking-tight text-teal">
              What dentists ask about {data.title}.
            </h2>
            <p className="mt-3.5 max-w-[38ch] text-slate">
              Practical answers for case planning and laboratory submission. Final clinical decisions
              remain with the treating dentist.
            </p>
          </div>
          <FaqAccordion items={faqs} defaultOpen={0} />
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="bg-paper pb-[84px]">
          <div className="mx-auto max-w-[1200px] px-6">
            <span className="eyebrow text-teal2">You might also need</span>
            <h2 className="mt-3.5 text-[clamp(2rem,4vw,3.5rem)] font-medium leading-[1.1] tracking-tight text-teal">
              Related solutions.
            </h2>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/products/${r.slug}`}
                  className="grad-card-teal group overflow-hidden rounded-[20px] text-paper"
                >
                  <div className="relative h-[190px] w-full">
                    <Image
                      src={r.image}
                      alt={r.title}
                      fill
                      sizes="(max-width:768px) 100vw, 33vw"
                      className="object-contain p-[18px] transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-[20px_22px]">
                    <span className="text-[.6rem] uppercase tracking-[0.11em] text-[#c9eee8]">
                      {r.category}
                    </span>
                    <h3 className="mt-1 text-[1.35rem] font-medium">{r.title}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-teal py-[70px] text-paper md:py-[74px]">
        <div className="mx-auto flex max-w-[1200px] flex-col items-start justify-between gap-8 px-6 md:flex-row md:items-center">
          <h2 className="max-w-[14ch] text-[clamp(2rem,5vw,3.4rem)] font-medium leading-[1.05] tracking-tight">
            Ready to order {data.title}?
          </h2>
          <div className="flex flex-wrap gap-3">
            <Button href="/#contact" variant="aqua">
              Start a case →
            </Button>
            <Button href="/dental-lab-services" variant="light">
              Explore all products
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
