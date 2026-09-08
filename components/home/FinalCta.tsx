import { Button } from "@/components/ui/Button";
import { ctaStats } from "@/lib/data/home";
import { contact } from "@/lib/data/navigation";

export function FinalCta() {
  return (
    <section id="contact" className="bg-teal py-[70px] text-center text-paper md:py-24">
      <div className="mx-auto max-w-[1200px] px-6">
        <span className="eyebrow justify-center text-aqua">Start today</span>
        <h2 className="mx-auto mb-[18px] mt-4 max-w-[20ch] text-[clamp(2rem,4.4vw,3.3rem)] font-semibold leading-[1.08] tracking-tight text-white">
          Start your first case <span className="accent">today.</span>
        </h2>
        <p className="mx-auto mb-8 max-w-[52ch] text-white/80">
          Send us a scan and let our designers handle the rest — precise, dependable designs
          delivered on time, backed by 24/7 support.
        </p>
        <div className="flex flex-wrap justify-center gap-3.5">
          <Button href={contact.phoneHref} variant="aqua">
            Call {contact.phone}
          </Button>
          <Button href={contact.whatsappHref} variant="ghost-light" external>
            Message on WhatsApp
          </Button>
        </div>
        <div className="mt-[52px] flex flex-wrap justify-center gap-x-11 gap-y-6 border-t border-white/20 pt-10">
          {ctaStats.map((s) => (
            <div key={s.label}>
              <b className="block text-[2rem] font-semibold">{s.value}</b>
              <span className="text-[.72rem] uppercase tracking-[0.12em] text-white/70">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
