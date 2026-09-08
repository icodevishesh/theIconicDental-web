import { aboutValues } from "@/lib/data/home";

export function About() {
  return (
    <section id="about" className="bg-paper py-[70px] md:py-24">
      <div className="mx-auto grid max-w-[1200px] items-center gap-14 px-6 lg:grid-cols-2">
        <div>
          <span className="eyebrow">About Us</span>
          <h2 className="mb-[22px] mt-4 text-[clamp(2rem,4.4vw,3.3rem)] font-semibold leading-[1.08] tracking-tight text-teal">
            Designing smiles that <span className="accent">brighten your life.</span>
          </h2>
          <p className="mb-[26px] text-[1.08rem] text-slate">
            Each smile deserves special attention. Our team works with care and precision to deliver
            custom dental solutions that look natural and feel comfortable. From your first case to
            your final results, we&apos;re committed to quality and detail.
          </p>
          <div className="mt-1.5 grid gap-[22px] sm:grid-cols-2">
            {aboutValues.map((v) => (
              <div key={v.title}>
                <h3 className="mb-1.5 flex items-center gap-2.5 text-[1.05rem] font-medium text-teal">
                  <span className="h-2 w-2 flex-none rounded-full bg-aqua" />
                  {v.title}
                </h3>
                <p className="text-[.9rem] text-slate">{v.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Quote panel */}
        <div className="grad-card-teal relative overflow-hidden rounded-[24px] p-11 text-paper">
          <div className="pointer-events-none absolute -bottom-[90px] -right-[90px] h-[280px] w-[280px] rounded-full border border-aqua/30" />
          <div className="pointer-events-none absolute -bottom-10 -right-10 h-[180px] w-[180px] rounded-full border border-white/10" />
          <p className="text-[1.7rem] font-normal leading-[1.3]">
            At Iconic Dental, we understand what a dental design lab needs:{" "}
            <em className="text-paper">precise, dependable, and beautifully executed designs</em> —
            delivered on time.
          </p>
          <div className="mt-[30px] border-t border-white/15 pt-6 text-[.78rem] tracking-[0.1em] text-white/70">
            — THE ICONIC DENTAL TEAM
          </div>
        </div>
      </div>
    </section>
  );
}
