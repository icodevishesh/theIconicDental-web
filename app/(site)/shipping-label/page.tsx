import type { Metadata } from "next";
import { UtilityHero, InfoCard } from "@/components/utility/UtilityShell";
import { ShippingForm } from "@/components/utility/ShippingForm";

export const metadata: Metadata = {
  title: "Shipping Label",
  description: "Prepare a shipping label request for an Iconic Dental case.",
};

export default function ShippingLabelPage() {
  return (
    <>
      <UtilityHero eyebrow="Case logistics" title="Shipping Label">
        Enter your practice and case details to prepare a clear, printable shipment label for your
        package.
      </UtilityHero>

      <section className="py-[48px] md:py-[70px] md:pb-[90px]">
        <div className="mx-auto grid w-[min(1120px,calc(100%-48px))] items-start gap-[34px] lg:grid-cols-[.78fr_1.22fr]">
          <InfoCard
            eyebrow="Packing checklist"
            title="Protect every case in transit."
            steps={[
              { n: "1", text: "Place disinfected items in a sealed protective container." },
              { n: "2", text: "Include the completed Rx form and clearly identify the case." },
              { n: "3", text: "Secure the printed label to the outside of the package." },
            ]}
          />
          <ShippingForm />
        </div>
      </section>
    </>
  );
}
