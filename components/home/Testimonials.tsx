import { SectionHeading } from "@/components/ui/SectionHeading";
import { testimonials } from "@/lib/data/home";

export function Testimonials() {
  return (
    <section id="testimonials" className="bg-teal py-[70px] text-paper md:py-24">
      <div className="mx-auto max-w-[1200px] px-6">
        <SectionHeading
          eyebrow="Testimonials"
          tone="dark"
          title={
            <>
              What they say <span className="accent">about us.</span>
            </>
          }
          lead="Our partners share stories of collaboration built on accuracy, reliability and trust."
        />
        <div className="mt-[52px] grid gap-5 md:grid-cols-3">
          {testimonials.map((t) => (
            <figure
              key={t.name}
              className="grad-card-light rounded-3xl border border-aqua/50 p-[30px] text-teal"
            >
              <div className="h-[26px] text-[2.6rem] leading-[.6] text-aqua">&ldquo;</div>
              <blockquote className="my-2 mb-[22px] text-[.98rem] text-teal">{t.quote}</blockquote>
              <figcaption className="flex items-center gap-3">
                <span className="grid h-10 w-10 flex-none place-items-center rounded-full bg-teal text-[.8rem] text-paper">
                  {t.initials}
                </span>
                <span>
                  <b className="block text-[.9rem] font-semibold text-teal">{t.name}</b>
                  <span className="text-[.78rem] text-slate">{t.role}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
