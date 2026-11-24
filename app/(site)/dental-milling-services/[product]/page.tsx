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
  millingFaqs,
} from "@/lib/data/products";

const PARTNER_URL = "https://connect.fynback.com/";

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
  return {
    title: `${data.title} Milling for Dental Labs`,
    description: data.tagline,
  };
}

const metrics = [
  { label: "Turnaround", value: "48-hr milling" },
  { label: "Quality", value: "Fit & margin QC" },
  { label: "File input", value: "Open STL" },
  { label: "Program", value: "Dental labs only" },
];

const included = [
  "Milled exactly to your design file",
  "Validated materials and blanks",
  "Nesting and toolpath planning",
  "Post-processing to your specification",
  "Fit and margin quality check",
  "Shipped back to your lab",
];

const designFiles = ["exocad", "3Shape Dental System", "inLab", "Dental Wings", "Medit", "Open STL"];

export default async function MillingProductPage({
  params,
}: {
  params: Promise<{ product: string }>;
}) {
  const { product } = await params;
  const data = getProduct(product);
  if (!data) notFound();

  const related = getRelatedProducts(data);
  const faqs = millingFaqs(data);

  return (
    <>
      {/* Hero */}
      <section className="bg-ink text-paper">
        <div className="mx-auto flex min-h-[clamp(300px,34vw,420px)] max-w-[1200px] flex-col justify-center px-6 py-16">
          <div className="text-[.68rem] uppercase tracking-[0.15em] text-aqua">
            <Link href="/" className="hover:text-paper">
              Home
            </Link>{" "}
            &nbsp;›&nbsp;{" "}
            <Link href="/dental-milling-services" className="hover:text-paper">
              Dental Milling
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
              {data.title} Milling
            </h2>
            <p className="text-[1.04rem] text-slate">
              Send us your lab&rsquo;s finished {data.title.toLowerCase()} design and we take care of
              the milling. Every unit is nested, milled, post-processed and quality-checked against
              your design file and material choice, then shipped back to your lab ready for final
              finishing and delivery. This service is available to dental laboratories only.
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
      <section className="bg-ink py-[70px] text-paper md:py-[84px]">
        <div className="mx-auto grid max-w-[1200px] gap-[40px] px-6 lg:grid-cols-[.8fr_1.2fr] lg:gap-[70px]">
          <div>
            <span className="eyebrow text-aqua">What&apos;s included</span>
            <h2 className="mt-3.5 text-[clamp(2rem,4vw,3.5rem)] font-medium leading-[1.1] tracking-tight text-paper">
              Milling your lab can rely on.
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
              <span className="eyebrow text-aqua">Accepted design files</span>
              <div className="mt-3 flex flex-wrap gap-2.5">
                {designFiles.map((s) => (
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
              What labs ask about {data.title} milling.
            </h2>
            <p className="mt-3.5 max-w-[38ch] text-slate">
              Practical answers for dental labs outsourcing milling. Design responsibility and final
              delivery remain with your laboratory.
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
              Related milling services.
            </h2>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/dental-milling-services/${r.slug}`}
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
      <section className="bg-ink py-[70px] text-paper md:py-[74px]">
        <div className="mx-auto flex max-w-[1200px] flex-col items-start justify-between gap-8 px-6 md:flex-row md:items-center">
          <h2 className="max-w-[14ch] text-[clamp(2rem,5vw,3.4rem)] font-medium leading-[1.05] tracking-tight">
            One milling partner. Multiple milling solutions.
          </h2>
          <div className="flex flex-wrap gap-3">
            <Button href={PARTNER_URL} external variant="aqua">
              Become a milling partner →
            </Button>
            <Button href="/dental-milling-services" variant="light">
              Explore milling services
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
