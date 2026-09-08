import { SectionHeading } from "@/components/ui/SectionHeading";
import { personas } from "@/lib/data/home";

export function Personas() {
  return (
    <section className="bg-teal py-[70px] text-paper md:py-24">
      <div className="mx-auto max-w-[1200px] px-6">
        <SectionHeading
          eyebrow="Built for your bench"
          tone="dark"
          title={
            <>
              One design partner, <span className="accent">every scale.</span>
            </>
          }
          lead="From a single ceramist to a multi-site network, Iconic plugs into your workflow and grows with you."
        />
        <div className="mt-[52px] grid gap-5 md:grid-cols-3">
          {personas.map((p) => (
            <div
              key={p.title}
              className="grad-card-light rounded-3xl border border-line p-[34px_30px] transition-transform duration-300 hover:-translate-y-1.5"
            >
              <div className="mb-4 text-[.68rem] uppercase tracking-[0.14em] text-teal2">
                {p.kicker}
              </div>
              <h3 className="mb-3 text-[1.3rem] font-medium text-teal">{p.title}</h3>
              <p className="mb-5 text-[.95rem] text-slate">{p.text}</p>
              <a
                href={p.href}
                className="group inline-flex items-center gap-1.5 text-[.92rem] font-semibold text-teal"
              >
                {p.cta}
                <span aria-hidden className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
