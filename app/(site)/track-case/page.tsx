import type { Metadata } from "next";
import { UtilityHero, InfoCard } from "@/components/utility/UtilityShell";
import { TrackForm } from "@/components/utility/TrackForm";

export const metadata: Metadata = {
  title: "Track Case",
  description: "Look up an Iconic Dental case or continue to Iconic Connect.",
};

export default function TrackCasePage() {
  return (
    <>
      <UtilityHero eyebrow="Case status" title="Track Case">
        Enter the case ID provided in your confirmation to check its status or continue to Iconic
        Connect for complete case details.
      </UtilityHero>

      <section className="py-[48px] md:py-[70px] md:pb-[90px]">
        <div className="mx-auto grid w-[min(1120px,calc(100%-48px))] items-start gap-[34px] lg:grid-cols-[.78fr_1.22fr]">
          <InfoCard
            eyebrow="Status guide"
            title="Know where your case stands."
            steps={[
              { n: "1", text: "Submitted — files and prescription received." },
              { n: "2", text: "In design — case is being prepared and reviewed." },
              { n: "3", text: "Ready — files or restoration are prepared for delivery." },
            ]}
          />
          <TrackForm />
        </div>
      </section>
    </>
  );
}
