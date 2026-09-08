import { SectionHeading } from "@/components/ui/SectionHeading";
import { whyReasons } from "@/lib/data/home";

export function Why() {
  return (
    <section className="bg-teal py-[70px] text-paper md:py-24">
      <div className="mx-auto max-w-[1200px] px-6">
        <SectionHeading
          eyebrow="Why Iconic"
          tone="dark"
          title={
            <>
              Recognition earned through <span className="accent">quality.</span>
            </>
          }
          lead="Our reputation is built on designs that meet the highest standards of precision and reliability — combining expert knowledge with the latest technology to earn the trust of our partners."
        />
        <div className="mt-[52px] flex gap-4 overflow-x-auto pb-4 pt-1 snap-x snap-mandatory no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden sm:grid sm:grid-cols-2 sm:overflow-hidden sm:rounded-[20px] sm:border sm:border-white/15 sm:gap-0 sm:pb-0 sm:pt-0 lg:grid-cols-4">
          {whyReasons.map((r, i) => (
            <div
              key={r.num}
              className={`w-[82%] min-w-[260px] max-w-[300px] shrink-0 snap-start rounded-2xl border border-white/15 bg-white/[.03] p-[38px_30px] transition-colors hover:bg-white/[.04] sm:w-auto sm:min-w-0 sm:max-w-none sm:shrink sm:rounded-none sm:bg-transparent ${
                i < whyReasons.length - 1 ? "sm:border-b sm:lg:border-b-0 lg:border-r" : ""
              } ${i % 2 === 0 ? "sm:border-r sm:lg:border-r" : ""}`}
            >
              <div className="mb-6 text-[.72rem] tracking-[0.16em] text-aqua">{r.num}</div>
              <h3 className="mb-3 text-[1.2rem] font-medium text-white">{r.title}</h3>
              <p className="text-[.92rem] text-white/60">{r.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
