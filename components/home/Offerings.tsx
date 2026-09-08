import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { offerings } from "@/lib/data/home";

const Check = () => (
  <span className="mt-px grid h-[23px] w-[23px] flex-none place-items-center rounded-full bg-white/15">
    <svg viewBox="0 0 14 14" className="h-3 w-3" fill="none" stroke="#c9ebe5" strokeWidth="2.4">
      <path d="M2 7.5l3.2 3.2L12 3.5" />
    </svg>
  </span>
);

export function Offerings() {
  return (
    <section id="services" className="bg-paper py-[70px] md:py-24">
      <div className="mx-auto max-w-[1200px] px-6">
        <SectionHeading
          eyebrow="Our offerings"
          title={
            <>
              Two ways we <span className="accent">power your lab.</span>
            </>
          }
          lead="From pixel-perfect CAD design to finished restorations, Iconic becomes the extended arm of your digital workflow — precise, dependable and built to scale."
          className="mb-[52px]"
        />

        <div className="grid gap-6 md:grid-cols-2">
          {offerings.map((o) => (
            <div
              key={o.title}
              className="grad-card-teal flex flex-col overflow-hidden rounded-3xl text-paper shadow-[var(--shadow-card)] transition-transform duration-500 hover:-translate-y-2 md:aspect-[1/0.8]"
            >
              <div className="flex h-full flex-col p-[34px]">
                <span className="eyebrow text-[#c9ebe5]">{o.tag}</span>
                {/* Full-bleed pale title panel */}
                <h3 className="grad-stat-pale -mx-[34px] my-5 px-[34px] py-5 text-center text-[clamp(1.9rem,3vw,2.5rem)] font-medium leading-[1.05] tracking-tight text-teal">
                  {o.title}
                </h3>
                <p className="mb-6 max-w-[40ch] text-[1.02rem] text-white/85">{o.sub}</p>
                <ul className="mb-8 grid gap-3.5">
                  {o.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-[.97rem] text-white/90">
                      <Check />
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto flex w-full justify-center">
                  <Button href={o.href} className="border border-aqua bg-teal text-white hover:bg-deep">
                    {o.cta}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
