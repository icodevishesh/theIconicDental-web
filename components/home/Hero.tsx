import { Button } from "@/components/ui/Button";

const avatars = [
  { label: "DL", bg: "bg-teal2" },
  { label: "OR", bg: "bg-aqua" },
  { label: "DS", bg: "bg-ink" },
  { label: "+", bg: "bg-teal" },
];

export function Hero() {
  return (
    <section className="relative flex min-h-[85vh] items-center overflow-hidden bg-teal px-0 pb-14 pt-8 sm:pt-12 md:min-h-[92vh] md:pb-20 md:pt-[120px]">
      {/* Background video */}
      <video
        className="absolute inset-0 z-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
      >
        <source src="/hero-bg.mp4" type="video/mp4" />
      </video>

      {/* Mobile dark overlay: ensures high contrast & legibility over bright video */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-[#042a27]/40 via-[#063834]/88 to-[#03211f]/80 md:hidden" />

      {/* Desktop left-to-right dark overlay */}
      <div
        className="hidden md:block absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(80deg,rgba(7,51,48,.95) 0%,rgba(6,57,53,.65) 44%,rgba(6,30,28,.1) 76%,rgba(6,30,28,0) 100%)",
        }}
      />

      <div className="relative z-[2] mx-auto w-full max-w-[1200px] px-6 md:w-[84%] lg:w-full">
        <span className="eyebrow no-rule text-aqua font-semibold tracking-wider">Global Digital Dental Lab</span>
        <h1 className="mb-5 mt-4 max-w-[18ch] text-[clamp(2.4rem,5.6vw,4.6rem)] font-semibold leading-[1.08] tracking-tight text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.55)] md:drop-shadow-none">
          The extended digital design arm dental labs run on
        </h1>
        <p className="mb-7 max-w-[60ch] text-[1.08rem] leading-relaxed text-white/90 drop-shadow-[0_1px_6px_rgba(0,0,0,0.4)] md:text-[1.15rem] md:text-white/85 md:drop-shadow-none">
          Iconic Dental is the design partner behind dental labs worldwide. Fixed &amp; removable
          prosthesis, implants, night guards and cosmetic wax-ups — crafted by expert designers and
          delivered on time, every time.
        </p>
        <div className="flex flex-wrap items-center gap-3.5">
          <Button href="/#contact" variant="aqua">
            Send a case <span aria-hidden>→</span>
          </Button>
          <Button href="/#process" variant="ghost-light">
            See how it works
          </Button>
        </div>
        <div className="mt-7 flex flex-wrap items-center gap-3.5 text-[.85rem] text-white/90">
          <div className="flex">
            {avatars.map((a, i) => (
              <i
                key={a.label}
                className={`grid h-8 w-8 place-items-center rounded-full border-2 border-paper text-[.7rem] not-italic text-white ${a.bg} ${
                  i === 0 ? "" : "-ml-2.5"
                }`}
              >
                {a.label}
              </i>
            ))}
          </div>
          <span>
            Trusted by <strong className="text-white">100+&nbsp;dental&nbsp;labs</strong> across
            North America, the UK &amp; beyond.
          </span>
        </div>
      </div>
    </section>
  );
}
