import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { getPublishedReviews, type ReviewView } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Customer Video Reviews",
  description:
    "Watch dental laboratories and clinicians share their experience working with Iconic Dental.",
};

export const dynamic = "force-dynamic";

const trust = [
  { value: "100+", label: "Dental lab partners" },
  { value: "30+", label: "Experienced designers" },
  { value: "<2%", label: "Redesign factor" },
  { value: "24/7", label: "Case support" },
];

function YouTubeEmbed({ id, title }: { id: string; title: string }) {
  return (
    <iframe
      className="h-full w-full"
      src={`https://www.youtube-nocookie.com/embed/${id}`}
      title={title}
      loading="lazy"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
  );
}

const PlayButton = ({ size = "md", label }: { size?: "md" | "sm"; label: string }) => (
  <span
    role="img"
    aria-label={label}
    className={`grid place-items-center rounded-full bg-paper pl-1 text-teal ${
      size === "md" ? "h-[82px] w-[82px] text-2xl" : "h-[62px] w-[62px] text-lg"
    }`}
  >
    ▶
  </span>
);

export default async function CustomerReviewsPage() {
  let reviews: ReviewView[] = [];
  try {
    reviews = await getPublishedReviews();
  } catch {
    reviews = [];
  }

  const featured = reviews.find((r) => r.featured) ?? reviews.find((r) => r.youtube) ?? reviews[0];
  const grid = reviews.filter((r) => r.id !== featured?.id);

  return (
    <>
      {/* Hero */}
      <section className="bg-teal py-[64px] text-paper md:py-[84px]">
        <div className="mx-auto max-w-[1200px] px-6">
          <span className="eyebrow text-aqua">Customer stories</span>
          <h1 className="my-[18px] max-w-[14ch] text-[clamp(3.2rem,6vw,5.6rem)] font-medium leading-[1.08] tracking-tight">
            Trusted in every case.
          </h1>
          <p className="max-w-[660px] text-[1.08rem] text-white/82">
            Hear directly from dental laboratories and clinicians about communication, design
            accuracy, turnaround and the day-to-day experience of working with Iconic Dental.
          </p>
        </div>
      </section>

      {/* Featured */}
      <section className="bg-paper py-[70px] md:py-[78px]">
        <div className="mx-auto grid max-w-[1200px] items-center gap-[58px] px-6 lg:grid-cols-[1.15fr_.85fr]">
          <div className="relative grid aspect-[16/10] place-items-center overflow-hidden rounded-[28px] border border-aqua/50 bg-[linear-gradient(180deg,#10977f,#00534c)] shadow-[0_28px_60px_-36px_rgba(0,83,76,.7)]">
            {featured?.youtube ? (
              <YouTubeEmbed id={featured.youtube.youtubeId} title={featured.title || featured.name} />
            ) : (
              <>
                <div className="pointer-events-none absolute -right-[170px] -top-[210px] h-[420px] w-[420px] rounded-full border border-white/15" />
                <PlayButton label="Play featured video" />
                <div className="absolute bottom-6 left-7 text-paper">
                  <span className="block text-[.7rem] uppercase tracking-[0.12em] text-[#c9eee8]">
                    Featured video review
                  </span>
                  <b className="font-medium">{featured?.title || "Lab partnership story"}</b>
                </div>
              </>
            )}
          </div>
          <div>
            <span className="eyebrow text-teal2">Featured review</span>
            <h2 className="my-3.5 text-[clamp(2.4rem,4.5vw,3.8rem)] font-medium leading-[1.1] tracking-tight text-teal">
              {featured?.title || "Clear communication. Consistent designs."}
            </h2>
            <p className="text-[1.08rem] text-[#315f5a]">
              {featured?.quote ||
                "“The design team understands our workflow, responds quickly and gives us confidence before each case moves into production.”"}
            </p>
            <div className="mt-[26px] flex items-center gap-3.5">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-aqua font-semibold text-teal">
                {featured?.initials || "LP"}
              </span>
              <span>
                <b className="block text-teal">{featured?.name || "Laboratory Partner"}</b>
                <span className="text-[.82rem] text-[#52706d]">
                  {featured?.role || "Digital dental laboratory"}
                </span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Video / review grid */}
      {grid.length > 0 && (
        <section className="bg-teal py-[70px] text-paper md:py-[82px]">
          <div className="mx-auto max-w-[1200px] px-6">
            <div className="mb-[42px] max-w-[680px]">
              <span className="eyebrow text-aqua">Video testimonials</span>
              <h2 className="mt-3 text-[clamp(2.3rem,4vw,3.5rem)] font-medium leading-[1.1] tracking-tight text-paper">
                Stories from our partners.
              </h2>
              <p className="mt-3.5 text-[1.05rem] leading-relaxed text-white/80">
                Real experiences from the labs and clinicians who rely on Iconic Dental for
                dependable design support across every case type.
              </p>
            </div>
            <div
              className={
                grid.length > 3
                  ? "flex gap-[22px] overflow-x-auto pb-4 pt-1 snap-x snap-mandatory no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden sm:grid sm:grid-cols-2 sm:overflow-visible sm:pb-0 sm:pt-0 lg:grid-cols-3"
                  : "grid gap-[22px] sm:grid-cols-2 lg:grid-cols-3"
              }
            >
              {grid.map((r) => (
                <article
                  key={r.id}
                  className={`overflow-hidden rounded-[22px] bg-[linear-gradient(145deg,#f7fdfd,#c5e7e2)] text-teal ${
                    grid.length > 3
                      ? "w-[82%] min-w-[270px] max-w-[320px] shrink-0 snap-start sm:w-auto sm:min-w-0 sm:max-w-none sm:shrink"
                      : ""
                  }`}
                >
                  <div className="relative grid h-[225px] place-items-center overflow-hidden bg-[linear-gradient(180deg,#10977f,#00534c)]">
                    {r.youtube ? (
                      <YouTubeEmbed id={r.youtube.youtubeId} title={r.title || r.name} />
                    ) : (
                      <>
                        <span className="grid h-16 w-16 place-items-center rounded-full bg-aqua/90 text-2xl font-semibold text-teal">
                          {r.initials}
                        </span>
                        <span className="absolute bottom-3 right-3.5 rounded-full bg-deep/80 px-2.5 py-1 text-[.65rem] text-white">
                          Review
                        </span>
                      </>
                    )}
                    {r.youtube && (
                      <span className="pointer-events-none absolute bottom-3 right-3.5 rounded-full bg-deep/80 px-2.5 py-1 text-[.65rem] text-white">
                        Video review
                      </span>
                    )}
                  </div>
                  <div className="p-[23px]">
                    <h3 className="mb-2 text-[1.2rem] font-medium">{r.title || r.name}</h3>
                    <p className="text-[.88rem] text-[#315f5a]">{r.role || r.name}</p>
                    {!r.youtube && r.quote && (
                      <p className="mt-2 text-[.88rem] text-[#315f5a]">{r.quote}</p>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Trust */}
      <section className="bg-paper py-10 sm:py-12 md:py-16 lg:py-[72px]">
        <div className="mx-auto max-w-[1200px] 2xl:max-w-[1440px] px-4 sm:px-6">
          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-5 lg:grid-cols-4 lg:gap-6">
            {trust.map((t) => (
              <div
                key={t.label}
                className="rounded-2xl border border-line bg-[linear-gradient(145deg,#f7fdfd,#c5e7e2)] p-3.5 sm:p-5 md:p-6 lg:p-[27px] transition-transform duration-200 hover:-translate-y-0.5"
              >
                <b className="block text-xl sm:text-2xl md:text-[1.85rem] lg:text-[2.2rem] font-semibold leading-tight text-teal">
                  {t.value}
                </b>
                <span className="mt-1 block text-[.74rem] sm:text-[.8rem] md:text-[.84rem] lg:text-[.88rem] leading-snug text-[#315f5a]">
                  {t.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-deep py-[72px] text-paper">
        <div className="mx-auto flex max-w-[1200px] flex-col items-start justify-between gap-9 px-6 md:flex-row md:items-center">
          <h2 className="max-w-[16ch] text-[clamp(2.3rem,4vw,3.7rem)] font-medium leading-[1.05] tracking-tight">
            Ready to experience the workflow?
          </h2>
          <Button href="/#contact" variant="aqua">
            Start a case →
          </Button>
        </div>
      </section>
    </>
  );
}
