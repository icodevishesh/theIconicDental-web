import { SectionHeading } from "@/components/ui/SectionHeading";
import { impactStats } from "@/lib/data/home";

export function Impact() {
  return (
    <section className="bg-teal py-[70px] text-paper md:py-24">
      <div className="mx-auto max-w-[1200px] px-6">
        <SectionHeading
          eyebrow="Our impact in numbers"
          tone="dark"
          title={
            <>
              Trust, measured <span className="accent">case by case.</span>
            </>
          }
          lead="We take pride in the partnerships our dental labs place in us — and the milestones we've reached together as a community."
          className="mb-[52px]"
        />
        <div className="flex gap-[18px] overflow-x-auto pb-4 pt-1 snap-x snap-mandatory no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden sm:grid sm:grid-cols-2 sm:overflow-visible sm:pb-0 sm:pt-0 lg:grid-cols-4">
          {impactStats.map((s) => (
            <div
              key={s.tag}
              className="grad-stat-pale relative w-[82%] min-w-[260px] max-w-[290px] shrink-0 snap-start overflow-hidden rounded-3xl border border-teal/25 p-[30px_26px] shadow-[0_20px_45px_-34px_rgba(0,83,76,.42)] sm:w-auto sm:min-w-0 sm:max-w-none sm:shrink"
            >
              <span className="absolute right-5 top-5 rounded-full border border-teal/30 px-2 py-[3px] text-[.62rem] tracking-[0.1em] text-teal">
                {s.tag}
              </span>
              <div className="text-[clamp(2.4rem,4vw,3.1rem)] font-semibold leading-none tracking-tight text-teal">
                {s.value}
              </div>
              <div className="mt-2.5 text-[.95rem] text-teal">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
