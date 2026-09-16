import Link from "next/link";
import Image from "next/image";
import { contact, socialLinks } from "@/lib/data/navigation";
import logo from "@/public/logo.png";
import { Building, House, Mail, Phone, Warehouse } from "lucide-react";

const columns = [
  {
    heading: "Services",
    links: [
      { label: "Design Services", href: "/design-services" },
      { label: "Dental Lab", href: "/dental-lab-services" },
      { label: "Fixed Prosthesis", href: "/services/fixed-prosthesis" },
      { label: "Digital Dentures", href: "/services/digital-dentures" },
      { label: "Implants", href: "/services/implants" },
      
    ],
  },
  {
    heading: "Learnings & Company",
    links: [
      { label: "Articles", href: "/articles" },
      { label: "Customer Reviews", href: "/customer-reviews" },
      { label: "About Us", href: "/#about" },
      {
        label: "Iconic Connect",
        href: "https://connectapp.theiconicdental.com/auth/sign-in",
        target: "_blank",
      },
      { label: "Contact Us", href: "/contact-us" },
    ],
  },
];

const socials = [
  {
    label: "Facebook",
    href: socialLinks.facebook,
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M14 8h3V4h-3c-2.2 0-4 1.8-4 4v2H7v4h3v8h4v-8h3l1-4h-4V8c0-.6.4-1 1-1Z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: socialLinks.instagram,
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: socialLinks.linkedin,
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M6.5 8A1.5 1.5 0 1 0 6.5 5a1.5 1.5 0 0 0 0 3ZM5 10h3v9H5v-9Zm5 0h3v1.3c.5-.9 1.6-1.5 2.8-1.5 2.3 0 3.2 1.5 3.2 4V19h-3v-4.5c0-1.1-.4-1.9-1.4-1.9s-1.6.8-1.6 1.9V19h-3v-9Z" />
      </svg>
    ),
  },
];

export function Footer() {
  return (
    <footer className="bg-paper pb-8 pt-[72px] text-teal border-t border-[#e0e0e0]">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="grid gap-10 border-b border-line pb-12 md:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1.3fr]">
          {/* Brand */}
          <div>
            <Link href="/" aria-label="Iconic Dental home">
              <Image
                src={logo}
                alt="Iconic Dental"
                className="mb-6 h-auto w-[114px] mix-blend-multiply"
              />
            </Link>
            <p className="mb-5 max-w-[34ch] text-[.92rem] leading-relaxed">
              We understand what a dental design lab needs: precise, dependable, and beautifully
              executed designs — delivered on time.
            </p>
            <div className="flex gap-2.5">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="grid h-[38px] w-[38px] place-items-center rounded-full border border-teal/30 text-teal transition-colors hover:border-teal hover:bg-teal hover:text-paper"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {columns.map((col) => (
            <div key={col.heading}>
              <h4 className="mb-[18px] text-[.72rem] font-semibold uppercase tracking-[0.16em]">
                {col.heading}
              </h4>
              {col.links.map((link) => {
                const target = (link as { target?: string }).target ?? (link.href.startsWith("http") ? "_blank" : undefined);
                const rel = target === "_blank" ? "noopener noreferrer" : undefined;
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    target={target}
                    rel={rel}
                    className="mb-[11px] block text-[.9rem] transition-colors hover:text-teal2"
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
          ))}

          {/* Contact */}
          <div>
            <h4 className="mb-[18px] text-[.72rem] font-semibold uppercase tracking-[0.16em]">
              Get in touch
            </h4>
            <a href={contact.phoneHref} className="flex items-center gap-2 mb-[11px] block text-[.9rem] hover:text-teal2">
              <Phone className="w-4 h-4"/>
              {contact.phone}
            </a>
            <a
              href={contact.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 mb-[11px] block text-[.9rem] hover:text-teal2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-whatsapp" viewBox="0 0 16 16">
                  <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/>
              </svg>
              WhatsApp: {contact.whatsapp}
            </a>
            <a href={contact.ukLineHref} className="flex items-center gap-2 mb-[11px] block text-[.9rem] hover:text-teal2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-line" viewBox="0 0 16 16">
                <path d="M8 0c4.411 0 8 2.912 8 6.492 0 1.433-.555 2.723-1.715 3.994-1.678 1.932-5.431 4.285-6.285 4.645-.83.35-.734-.197-.696-.413l.003-.018.114-.685c.027-.204.055-.521-.026-.723-.09-.223-.444-.339-.704-.395C2.846 12.39 0 9.701 0 6.492 0 2.912 3.59 0 8 0M5.022 7.686H3.497V4.918a.156.156 0 0 0-.155-.156H2.78a.156.156 0 0 0-.156.156v3.486c0 .041.017.08.044.107v.001l.002.002.002.002a.15.15 0 0 0 .108.043h2.242c.086 0 .155-.07.155-.156v-.56a.156.156 0 0 0-.155-.157m.791-2.924a.156.156 0 0 0-.156.156v3.486c0 .086.07.155.156.155h.562c.086 0 .155-.07.155-.155V4.918a.156.156 0 0 0-.155-.156zm3.863 0a.156.156 0 0 0-.156.156v2.07L7.923 4.832l-.013-.015v-.001l-.01-.01-.003-.003-.011-.009h-.001L7.88 4.79l-.003-.002-.005-.003-.008-.005h-.002l-.003-.002-.01-.004-.004-.002-.01-.003h-.002l-.003-.001-.009-.002h-.006l-.003-.001h-.004l-.002-.001h-.574a.156.156 0 0 0-.156.155v3.486c0 .086.07.155.156.155h.56c.087 0 .157-.07.157-.155v-2.07l1.6 2.16a.2.2 0 0 0 .039.038l.001.001.01.006.004.002.008.004.007.003.005.002.01.003h.003a.2.2 0 0 0 .04.006h.56c.087 0 .157-.07.157-.155V4.918a.156.156 0 0 0-.156-.156zm3.815.717v-.56a.156.156 0 0 0-.155-.157h-2.242a.16.16 0 0 0-.108.044h-.001l-.001.002-.002.003a.16.16 0 0 0-.044.107v3.486c0 .041.017.08.044.107l.002.003.002.002a.16.16 0 0 0 .108.043h2.242c.086 0 .155-.07.155-.156v-.56a.156.156 0 0 0-.155-.157H11.81v-.589h1.525c.086 0 .155-.07.155-.156v-.56a.156.156 0 0 0-.155-.157H11.81v-.589h1.525c.086 0 .155-.07.155-.156Z"/>
              </svg>
              UK line: {contact.ukLine}
            </a>
            <a
              href={`mailto:${contact.email}`}
              className="flex items-center gap-2 mb-[11px] block text-[.9rem] hover:text-teal2"
            >
              <Mail className="w-4 h-4"/>
              {contact.email}
            </a>
            <a href="#" className="flex items-start gap-2 mb-[11px] block text-[.9rem] hover:text-teal2">
              <Building className="w-4 h-4"/>
                17131-53 Ave NW, Edmonton,<br/> AB T5T 2K1
            </a>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-[26px] text-[.78rem] tracking-[0.03em]">
          <span>© 2026 Iconic Dental Designs — All rights reserved.</span>
          <span>Designing smiles daily.</span>
          <Link className="hover:text-teal2" href="/privacy-policy">Privacy & Policy</Link>
        </div>
      </div>
    </footer>
  );
}
