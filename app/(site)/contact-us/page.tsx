import React from 'react';
import type { Metadata } from "next";
import FormSection from './FormSection';
export const metadata: Metadata = {
  title: "Contact Iconic Dental Designs | 24/7 Support",
  description:
    "Get in touch with Iconic Dental for inquiries and service requests. Our team is available 24/7 to support dental labs and clinics across the globe.",
  keywords: [
    "dental design lab",
    "digital dental design services",
    "design dental lab",
    "3shape design services",
    "digital smile design lab",
    
  ],
  openGraph: {
    title: "Contact Iconic Dental Designs | 24/7 Support",
    description:
      "Get in touch with Iconic Dental for inquiries and service requests. Our team is available 24/7 to support dental labs and clinics across the globe.",
    url: "https://iconicdentaldesigns.com/contact-us",
    siteName: "Iconic Dental Designs",
    images: [
      {
        url: "https://res.cloudinary.com/dbwuxxypx/image/upload/about_us_img_yautl7.png",
        width: 1200,
        height: 630,
        alt: "Iconic Dental Designs",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Iconic Dental Designs | 24/7 Support",
    description:
      "Get in touch with Iconic Dental for inquiries and service requests. Our team is available 24/7 to support dental labs and clinics across the globe.",
    images: [
      "https://res.cloudinary.com/dbwuxxypx/image/upload/about_us_img_yautl7.png"
    ],
  },
  alternates: {
    canonical: "https://iconicdentaldesigns.com/contact-us",
    
  },
};



export default function ContactPage() {

  return (
    <main className="w-full">
      {/* Contact Form Section */}
      <FormSection />
    </main>
  );
}




