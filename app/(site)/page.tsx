import { Hero } from "@/components/home/Hero";
import { Marquee } from "@/components/home/Marquee";
import { Impact } from "@/components/home/Impact";
import { Offerings } from "@/components/home/Offerings";
import { Why } from "@/components/home/Why";
import { Process } from "@/components/home/Process";
import { Personas } from "@/components/home/Personas";
import { About } from "@/components/home/About";
import { Testimonials } from "@/components/home/Testimonials";
import { Faq } from "@/components/home/Faq";
import { FinalCta } from "@/components/home/FinalCta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <Impact />
      <Offerings />
      <Why />
      <Process />
      <Personas />
      <About />
      <Testimonials />
      <Faq />
      <FinalCta />
    </>
  );
}
