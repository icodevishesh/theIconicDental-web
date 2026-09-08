import type { Metadata } from "next";
import { UtilityHero, InfoCard } from "@/components/utility/UtilityShell";
import { RxForm } from "@/components/utility/RxForm";

export const metadata: Metadata = {
  title: "Download Rx Form",
  description: "Complete and print an Iconic Dental prescription form for your next case.",
};

export default function DownloadRxFormPage() {
  return (
    <>
      <UtilityHero eyebrow="Case resources" title="Download Rx Form">
        Complete the prescription details below, then print or save the finished form as a PDF to
        include with your case.
      </UtilityHero>

      <section className="py-[48px] md:py-[70px] md:pb-[90px]">
        <div className="mx-auto grid w-[min(1120px,calc(100%-48px))] items-start gap-[34px] lg:grid-cols-[.78fr_1.22fr]">
          <InfoCard
            eyebrow="Before you begin"
            title="A clear prescription keeps every case moving."
            steps={[
              { n: "1", text: "Add laboratory, doctor and patient information." },
              { n: "2", text: "Choose the restoration and enter shade, material and case instructions." },
              { n: "3", text: "Print the form or choose “Save as PDF” in the print dialog." },
            ]}
          />
          <RxForm />
        </div>
      </section>
    </>
  );
}
