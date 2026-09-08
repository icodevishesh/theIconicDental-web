import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { services, getService, serviceFaqs } from "@/lib/data/services";
import { contact } from "@/lib/data/navigation";

export function generateStaticParams() {
  return services.map((s) => ({ service: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ service: string }>;
}): Promise<Metadata> {
  const { service } = await params;
  const data = getService(service);
  if (!data) return {};
  return {
    title: `${data.title} Design`,
    description: data.intro,
  };
}

const overviewChecks = [
  { b: "Precise", t: "Case-specific design" },
  { b: "Compatible", t: "Leading CAD workflows" },
  { b: "Dependable", t: "Quality-controlled files" },
];

const processSteps = [
  { n: "/ 01", title: "Submit", text: "Upload scans, prescription and lab preferences." },
  { n: "/ 02", title: "Design & QC", text: "Our designers build and review the case." },
  { n: "/ 03", title: "Receive", text: "Get production-ready files through your workflow." },
];

export default async function ServicePage({
  params,
}: {
  params: Promise<{ service: string }>;
}) {
  const { service } = await params;
  const data = getService(service);
  if (!data) notFound();

  const faqs = serviceFaqs(data);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-teal text-paper">
        <div className="pointer-events-none absolute -right-[180px] -top-[280px] h-[540px] w-[540px] rounded-full border border-aqua/25" />
        <div className="relative mx-auto grid max-w-[1200px] items-center gap-[38px] px-6 py-20 lg:grid-cols-[1.08fr_.92fr] lg:gap-[70px]">
          <div>
            <div className="text-[.68rem] uppercase tracking-[0.15em] text-aqua">
              Design Services / {data.title}
            </div>
            <h1 className="my-[22px] text-[clamp(3rem,6vw,5.3rem)] font-medium leading-[1.08] tracking-tight">
              {data.title}
            </h1>
            <p className="max-w-[62ch] text-[1.08rem] text-white/75">{data.intro}</p>
            <div className="mt-[30px] flex flex-wrap gap-3">
              <Button href="#products" variant="aqua">
                Explore products →
              </Button>
              <Button href="#contact" variant="ghost-light">
                Send a case
              </Button>
            </div>
          </div>

          {/* Visual panel */}
          <div className="grad-card-light flex min-h-[390px] flex-col justify-between rounded-[28px] border border-line p-[25px] text-teal">
            <span className="text-[.68rem] uppercase tracking-[0.15em] text-teal2">
              Precision design category
            </span>
            <div className="relative my-3 h-[250px] w-full overflow-hidden rounded-[18px]">
              <Image
                src={data.heroImage}
                alt={data.title}
                fill
                sizes="(max-width:1024px) 100vw, 45vw"
                className="object-cover"
              />
            </div>
            <div className="flex justify-between border-t border-line pt-[18px] text-[.8rem] text-slate">
              <span>Exocad + 3Shape</span>
              <span>Quality controlled</span>
            </div>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="bg-paper py-[70px] md:py-24">
        <div className="mx-auto grid max-w-[1200px] gap-[40px] px-6 lg:grid-cols-[.75fr_1.25fr] lg:gap-[80px]">
          <div>
            <span className="eyebrow text-teal2">Service overview</span>
            <h2 className="mt-3.5 text-[clamp(2rem,4.4vw,3.6rem)] font-medium leading-[1.1] tracking-tight text-teal">
              Engineered around your workflow.
            </h2>
          </div>
          <div className="text-[1.04rem] text-slate">
            <p>{data.overview}</p>
            <p className="mt-4">
              Every case is reviewed for accuracy and aligned to your lab preferences before
              delivery.
            </p>
            <div className="mt-[34px] grid gap-3.5 sm:grid-cols-3">
              {overviewChecks.map((c) => (
                <div
                  key={c.b}
                  className="grad-card-teal rounded-2xl border border-white/20 p-[18px] text-[.87rem] text-paper"
                >
                  <b className="mb-1 block">{c.b}</b>
                  {c.t}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Products */}
      <section id="products" className="bg-teal py-[70px] text-paper md:py-24">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="mb-12 max-w-[720px]">
            <span className="eyebrow text-aqua">Product range</span>
            <h2 className="mt-3.5 text-[clamp(2rem,4.4vw,3.6rem)] font-medium leading-[1.1] tracking-tight text-paper">
              Design options for every case.
            </h2>
            <p className="mt-3 text-white/80">
              Choose the product type that matches your prescription and production workflow.
            </p>
          </div>

          <div className="grid gap-7">
            {data.products.map((p, i) => (
              <article
                key={p.name}
                className="grad-card-light grid overflow-hidden rounded-[24px] border border-line md:grid-cols-2"
              >
                <div
                  className={`relative m-[18px] min-h-[210px] overflow-hidden rounded-[17px] md:min-h-[280px] ${
                    i % 2 === 1 ? "md:order-2" : ""
                  }`}
                >
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    sizes="(max-width:768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
                <div className={`flex flex-col justify-center p-[30px] md:p-[36px_44px] ${i % 2 === 1 ? "md:order-1" : ""}`}>
                  <span className="text-[.68rem] tracking-[0.13em] text-teal2">
                    / {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="my-3 text-[clamp(1.65rem,2.5vw,2.15rem)] font-medium text-teal">
                    {p.name}
                  </h3>
                  <p className="max-w-[52ch] text-[.94rem] leading-[1.55] text-slate">
                    {p.description} Each case is interpreted around the prescription, available
                    restorative space and your laboratory preferences, creating a consistent path
                    from digital approval to final production.
                  </p>
                  <ul className="mt-4 grid gap-1.5 border-t border-line pt-4">
                    {data.features.map((f) => (
                      <li key={f} className="flex items-center gap-2.5 text-[.88rem] text-slate">
                        <span className="h-1.5 w-1.5 flex-none rounded-full bg-teal shadow-[0_0_0_4px_rgba(116,193,180,.3)]" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#contact"
                    className="group mt-[22px] inline-flex items-center gap-2 text-[.72rem] uppercase tracking-[0.11em] text-teal2"
                  >
                    Enquire now
                    <span aria-hidden className="transition-transform group-hover:translate-x-1.5">
                      →
                    </span>
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-paper py-[70px] md:py-24">
        <div className="mx-auto max-w-[1200px] px-6">
          <span className="eyebrow text-teal2">How it works</span>
          <h2 className="mt-3.5 text-[clamp(2rem,4.4vw,3.6rem)] font-medium leading-[1.1] tracking-tight text-teal">
            From scan to production-ready.
          </h2>
          <div className="mt-[42px] grid gap-5 md:grid-cols-3">
            {processSteps.map((s) => (
              <div key={s.n} className="grad-card-teal rounded-2xl border border-white/20 p-7 text-paper">
                <b className="text-[.72rem] tracking-[0.1em] text-aqua">{s.n}</b>
                <h3 className="mb-2 mt-4 text-[1.25rem] font-medium">{s.title}</h3>
                <p className="text-[.92rem] text-paper/85">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-teal py-[70px] text-paper md:py-24">
        <div className="mx-auto grid max-w-[1200px] gap-[40px] px-6 lg:grid-cols-[.8fr_1.2fr] lg:gap-[80px]">
          <div>
            <span className="eyebrow text-aqua">FAQ</span>
            <h2 className="mt-3.5 text-[clamp(2rem,4.4vw,3.6rem)] font-medium leading-[1.1] tracking-tight text-paper">
              Good to know.
            </h2>
          </div>
          <FaqAccordion items={faqs} tone="dark" defaultOpen={0} />
        </div>
      </section>

      {/* Final CTA */}
      <section id="contact" className="bg-teal px-6 pb-[90px] pt-0 text-center text-paper">
        <div className="mx-auto max-w-[1200px] border-t border-white/15 pt-[70px]">
          <h2 className="mx-auto mb-[18px] max-w-[18ch] text-[clamp(2rem,4.4vw,3.3rem)] font-medium leading-[1.1] tracking-tight">
            Ready to send your next case?
          </h2>
          <p className="mx-auto mb-[30px] max-w-[600px] text-white/75">
            Connect with our design team and build a workflow tailored to your lab.
          </p>
          <Button href={contact.phoneHref} variant="aqua">
            Talk to our team →
          </Button>
        </div>
      </section>
    </>
  );
}
