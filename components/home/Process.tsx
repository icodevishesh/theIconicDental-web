import { SectionHeading } from "@/components/ui/SectionHeading";
import { processSteps } from "@/lib/data/home";

export function Process() {
  return (
    <section id="process" className="bg-paper py-[70px] md:py-24">
      <div className="mx-auto max-w-[1200px] px-6">
        <SectionHeading
          eyebrow="How it works"
          title={
            <>
              Three steps. <span className="accent">Zero friction.</span>
            </>
          }
          lead="From scan upload to final files, we've removed every point of friction between your bench and your designer."
        />
        <div className="mt-[52px] grid gap-[26px] md:grid-cols-3">
          {processSteps.map((s) => (
            <div key={s.idx}>
              <div className="mb-[22px] flex items-center gap-3.5">
                <span className="grid h-[38px] w-[38px] flex-none place-items-center rounded-full border border-teal bg-paper text-[.8rem] text-teal">
                  {s.idx}
                </span>
                <span className="h-px flex-1 bg-line" />
              </div>
              <h3 className="mb-2.5 text-[1.3rem] font-medium text-teal">{s.title}</h3>
              <p className="text-[.96rem] text-slate">{s.text}</p>
              <span className="mt-3.5 inline-block rounded-full bg-mint px-[11px] py-1 text-[.68rem] tracking-[0.08em] text-teal">
                {s.chip}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
