import type { ReactNode } from "react";

export function UtilityHero({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="bg-teal py-[58px] text-paper md:py-[72px] print:hidden">
      <div className="mx-auto w-[min(1120px,calc(100%-48px))]">
        <span className="eyebrow text-aqua">{eyebrow}</span>
        <h1 className="mb-[18px] mt-[15px] text-[2.65rem] font-medium leading-[1.05] md:text-[3.6rem]">
          {title}
        </h1>
        <p className="max-w-[650px] text-white/80">{children}</p>
      </div>
    </section>
  );
}

interface Step {
  n: string;
  text: string;
}

export function InfoCard({
  eyebrow,
  title,
  steps,
}: {
  eyebrow: string;
  title: string;
  steps: Step[];
}) {
  return (
    <aside className="grad-stat-pale rounded-[24px] border border-teal/20 p-[34px] lg:sticky lg:top-[98px] print:hidden">
      <span className="eyebrow text-teal2">{eyebrow}</span>
      <h2 className="mb-4 mt-3 text-[2rem] font-medium leading-[1.15] text-teal">{title}</h2>
      <div className="mt-[27px] grid gap-[17px]">
        {steps.map((s) => (
          <div key={s.n} className="flex gap-3.5">
            <span className="grid h-7 w-7 flex-none place-items-center rounded-full bg-teal text-[.72rem] text-paper">
              {s.n}
            </span>
            <span className="text-[.9rem] text-[#315f5a]">{s.text}</span>
          </div>
        ))}
      </div>
    </aside>
  );
}

/** Shared field styling for utility forms. */
export const fieldInput =
  "w-full rounded-[11px] border border-teal/20 bg-paper px-3.5 py-3 text-teal outline-none transition focus:border-teal2 focus:ring-[3px] focus:ring-teal2/10";
export const fieldLabel = "text-[.75rem] font-semibold tracking-[0.04em] text-teal";
