import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ServiceIcon } from "@/components/services/ServiceIcon";
import { contact } from "@/lib/data/navigation";

export const metadata: Metadata = {
  title: "Design Services",
  description:
    "Precision digital dental design services for crowns, bridges, implants, dentures, night guards and removable restorations.",
};

const capabilities = [
  {
    no: "/ 01",
    slug: "fixed-prosthesis",
    title: "Fixed Prosthesis",
    text: "Crowns, bridges and implant-supported restorations designed for dependable fit, durability and natural-looking aesthetics.",
  },
  {
    no: "/ 02",
    slug: "digital-dentures",
    title: "Digital Dentures",
    text: "Digitally planned denture designs developed for accuracy, patient comfort, balanced occlusion and efficient fabrication.",
  },
  {
    no: "/ 03",
    slug: "night-guards-and-splints",
    title: "Night Guards & Splints",
    text: "Protective appliance designs created for secure fit, even contacts, controlled guidance and lasting comfort.",
  },
  {
    no: "/ 04",
    slug: "implants",
    title: "Implants",
    text: "Accurate implant-supported designs engineered for stability, functional emergence profiles and predictable production.",
  },
  {
    no: "/ 05",
    slug: "cosmetic-dentistry",
    title: "Cosmetic Dentistry",
    text: "Smile-focused wax-ups and aesthetic restoration designs balancing proportion, symmetry, anatomy and natural appearance.",
  },
  {
    no: "/ 06",
    slug: "models",
    title: "Models",
    text: "Accurate digital dental models prepared for reliable printing, case verification and streamlined laboratory workflows.",
  },
];

const support = [
  {
    num: "01",
    title: "Rush crown & bridge",
    text: "Priority turnaround for time-sensitive fixed cases.",
  },
  {
    num: "02",
    title: "Restoration adjustments",
    text: "Responsive design updates when clinical requirements change.",
  },
  {
    num: "03",
    title: "Replacement design support",
    text: "Fast assistance for lost, damaged or remade prosthetics.",
  },
];

export default function DesignServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-teal px-6 py-[92px] text-center text-paper md:py-[100px]">
        <div className="pointer-events-none absolute -right-[130px] -top-[190px] h-[360px] w-[360px] rounded-full border border-aqua/25" />
        <div className="pointer-events-none absolute -bottom-[140px] -left-[90px] h-[220px] w-[220px] rounded-full border border-aqua/25" />
        <div className="relative mx-auto max-w-[1200px]">
          <span className="eyebrow justify-center text-aqua">Iconic CAD Design Studio</span>
          <h1 className="mb-[22px] mt-[18px] text-[clamp(3rem,6vw,5rem)] font-medium leading-[1.08] tracking-tight">
            Design <span className="accent text-aqua">Services</span>
          </h1>
          <p className="mx-auto max-w-[720px] text-[1.1rem] text-white/80">
            Production-ready dental designs created for dependable fit, natural aesthetics and an
            efficient lab workflow—from single units to complex removable cases.
          </p>
        </div>
      </section>

      {/* Capabilities grid */}
      <section id="services" className="bg-paper py-[70px] md:py-[100px]">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="mx-auto mb-[52px] max-w-[720px] text-center">
            <span className="eyebrow justify-center text-teal2">Our capabilities</span>
            <h2 className="mb-3.5 mt-3.5 text-[clamp(2rem,4vw,3.3rem)] font-medium leading-[1.1] tracking-tight text-teal">
              Precision for every <em className="not-italic text-teal2">restoration.</em>
            </h2>
            <p className="text-slate">
              A flexible design team for the cases your lab handles every day, compatible with
              leading scanners, CAD platforms and production workflows.
            </p>
          </div>
          <div className="flex gap-5 overflow-x-auto pb-4 pt-1 snap-x snap-mandatory no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden sm:grid sm:grid-cols-2 sm:overflow-visible sm:pb-0 sm:pt-0 lg:grid-cols-3">
            {capabilities.map((c) => (
              <Link
                key={c.slug}
                href={`/services/${c.slug}`}
                className="group grad-card-teal relative flex w-[82%] min-w-[270px] max-w-[320px] shrink-0 snap-start flex-col overflow-hidden rounded-3xl border border-white/20 p-[30px] text-paper transition-all duration-300 hover:-translate-y-2 hover:shadow-[var(--shadow-card)] sm:w-auto sm:min-w-0 sm:max-w-none sm:shrink"
              >
                <span className="absolute right-[22px] top-[18px] text-[.68rem] tracking-[0.12em] text-paper/80">
                  {c.no}
                </span>
                <span className="mb-6 grid h-12 w-12 place-items-center rounded-[14px] bg-aqua text-teal transition-transform duration-300 group-hover:scale-105">
                  <ServiceIcon slug={c.slug} className="h-[25px] w-[25px]" />
                </span>
                <h3 className="mb-2.5 text-[1.42rem] font-medium">{c.title}</h3>
                <p className="mb-[22px] text-[.94rem] text-paper/90">{c.text}</p>
                <span className="mt-auto inline-flex items-center gap-1.5 text-[.72rem] uppercase tracking-[0.11em]">
                  Learn more
                  <span aria-hidden className="transition-transform group-hover:translate-x-1.5">
                    →
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Offer strip */}
      <section className="bg-paper py-[34px]">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="grad-card-teal flex flex-col items-start justify-between gap-8 rounded-[24px] p-[42px_48px] text-paper md:flex-row md:items-center">
            <div>
              <small className="text-[.69rem] uppercase tracking-[0.16em] text-paper/80">
                New lab partner offer
              </small>
              <h2 className="mt-1.5 text-[clamp(2rem,4vw,3rem)] font-medium">
                Start with a complimentary design trial.
              </h2>
            </div>
            <Button href="/#contact" variant="aqua" className="flex-none">
              Claim your trial →
            </Button>
          </div>
        </div>
      </section>

      {/* Priority support */}
      <section className="bg-paper py-[70px] md:py-[100px]">
        <div className="mx-auto grid max-w-[1200px] items-center gap-[72px] px-6 lg:grid-cols-[.92fr_1.08fr]">
          <div>
            <span className="eyebrow text-teal2">Priority support</span>
            <h2 className="mb-[18px] mt-3.5 text-[clamp(2rem,4vw,3.4rem)] font-medium leading-[1.1] tracking-tight text-teal">
              When a case <em className="not-italic text-teal2">cannot wait.</em>
            </h2>
            <p className="mb-7 text-slate">
              Our extended-hour design team helps keep urgent cases moving with clear communication
              and prioritized production.
            </p>
            <div className="grid gap-3">
              {support.map((s) => (
                <div
                  key={s.num}
                  className="grad-card-teal flex items-start gap-4 rounded-2xl border border-white/20 p-5 text-paper"
                >
                  <span className="grid h-[34px] w-[34px] flex-none place-items-center rounded-full bg-aqua text-[.72rem] text-teal">
                    {s.num}
                  </span>
                  <div>
                    <h3 className="mb-0.5 text-[1.08rem] font-medium">{s.title}</h3>
                    <p className="text-[.9rem] text-paper/85">{s.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grad-card-light relative min-h-[420px] overflow-hidden rounded-[28px] border border-line p-11 md:min-h-[510px]">
            <span className="text-[.68rem] uppercase tracking-[0.14em] text-teal2">
              ● Design desk online
            </span>
            <blockquote className="mt-6 max-w-[13ch] text-[clamp(1.7rem,3vw,2.5rem)] font-normal leading-[1.25] text-teal">
              Precise help for the cases that need attention now.
            </blockquote>
            <div className="absolute inset-x-11 bottom-11 flex gap-9 border-t border-line pt-[22px]">
              <div>
                <b className="block text-[2rem] font-medium text-teal">24/7</b>
                <span className="text-[.78rem] text-slate">Order assistance</span>
              </div>
              <div>
                <b className="block text-[2rem] font-medium text-teal">24h</b>
                <span className="text-[.78rem] text-slate">Rush service available</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section id="contact" className="bg-teal px-6 py-[70px] text-center text-paper md:py-[92px]">
        <div className="mx-auto max-w-[1200px]">
          <h2 className="mx-auto mb-[18px] max-w-[18ch] text-[clamp(2rem,4.4vw,3.3rem)] font-medium leading-[1.1] tracking-tight">
            Ready to start your next case?
          </h2>
          <p className="mx-auto mb-[30px] max-w-[620px] text-white/80">
            Share your scan and prescription. Our design team will help configure a workflow that
            fits your lab.
          </p>
          <Button href={contact.phoneHref} variant="aqua">
            Talk to our design team →
          </Button>
        </div>
      </section>
    </>
  );
}
