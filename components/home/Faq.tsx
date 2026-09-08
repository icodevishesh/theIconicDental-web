import { SectionHeading } from "@/components/ui/SectionHeading";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { homeFaqs } from "@/lib/data/home";

export function Faq() {
  return (
    <section id="faq" className="bg-paper py-[70px] md:py-24">
      <div className="mx-auto max-w-[1200px] px-6">
        <SectionHeading
          eyebrow="Frequently asked questions"
          align="center"
          title={
            <>
              Good to <span className="accent">know.</span>
            </>
          }
          className="mb-[52px]"
        />
        <FaqAccordion items={homeFaqs} className="mx-auto max-w-[820px]" />
      </div>
    </section>
  );
}
