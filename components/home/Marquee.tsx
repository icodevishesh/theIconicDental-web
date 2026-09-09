const items = ["3Shape", "exocad", "Medit", "iTero", ".STL", ".PLY", ".DCM"];

export function Marquee() {
  return (
    <div className="grad-marquee border-y border-line py-5 sm:py-[26px]">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col items-center justify-between gap-y-3.5 px-6 md:flex-row md:gap-x-8">
        <span className="text-center text-[.68rem] font-medium uppercase leading-relaxed tracking-[0.14em] text-teal/85 sm:text-[.72rem] sm:tracking-[0.16em] md:text-left shrink-0">
          Works with the software &amp; scan files you already use
        </span>
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-x-7 lg:gap-x-8 sm:gap-y-2 md:justify-end">
          {items.map((i) => (
            <span
              key={i}
              className="inline-flex items-center rounded-full border border-teal/20 bg-white/55 px-3 py-1 text-[0.82rem] font-medium text-teal shadow-[0_2px_8px_-4px_rgba(0,83,76,.12)] backdrop-blur-xs transition-colors hover:border-teal/40 hover:bg-white/70 sm:rounded-none sm:border-0 sm:bg-transparent sm:p-0 sm:text-[1.12rem] lg:text-[1.15rem] sm:shadow-none"
            >
              {i}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
