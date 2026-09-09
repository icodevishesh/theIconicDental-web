import type { NavItem, NavLink } from "@/lib/types";

/** Lab-product links surfaced directly in the "Dental Lab" submenu. */
const labSubmenu: NavLink[] = [
  { label: "Explore all products", href: "/dental-lab-services" },
  { label: "Zirconia Crowns", href: "/products/zirconia-crowns" },
  { label: "All-on-X Hybrids", href: "/products/all-on-x-hybrids" },
  { label: "e.max Restorations", href: "/products/e-max-restorations" },
  { label: "PFM Crowns", href: "/products/pfm-crowns" },
  { label: "Surgical Guides", href: "/products/surgical-guides" },
  { label: "Night Guards", href: "/products/night-guards" },
  { label: "Printed Models & Dies", href: "/products/printed-models-dies" },
];

const designSubmenu: NavLink[] = [
  { label: "Fixed Prosthesis", href: "/services/fixed-prosthesis" },
  { label: "Digital Dentures", href: "/services/digital-dentures" },
  { label: "Night Guards & Splints", href: "/services/night-guards-and-splints" },
  { label: "Implants", href: "/services/implants" },
  { label: "Cosmetic Dentistry", href: "/services/cosmetic-dentistry" },
  { label: "Models", href: "/services/models" },
];

export const navItems: NavItem[] = [
  {
    label: "Services",
    href: "/design-services",
    groups: [
      { label: "Design Services", href: "/design-services", children: designSubmenu },
      { label: "Dental Lab", href: "/dental-lab-services", children: labSubmenu },
    ],
  },
  {
    label: "Learnings",
    href: "/articles",
    menu: [
      { label: "Articles", href: "/articles" },
      { label: "Customer Reviews", href: "/customer-reviews" },
    ],
  },
  { label: "About Us", href: "/#about" },
  { label: "Iconic Connect", href: "https://connectapp.theiconicdental.com/auth/sign-in", openInNewTab: true },
  {
    label: "Quick Links",
    href: "/#faq",
    menu: [
      { label: "Download Rx Form", href: "/download-rx-form" },
      { label: "Shipping Label", href: "/shipping-label" },
      { label: "Track Case", href: "/track-case" },
    ],
  },
];

export const CTA = { label: "Start a case", href: "/#contact" };

export const contact = {
  phone: "+1 209 751 0975",
  phoneHref: "tel:+12097510975",
  whatsapp: "+1 647 802 8420",
  whatsappHref: "https://wa.me/16478028420",
  ukLine: "+44 203 949 5549",
  ukLineHref: "tel:+442039495549",
  email: "info@theiconicdental.com",
  address: "17131-53 Ave NW, Edmonton, AB T5T 2K1",
};

export const socialLinks = {
  facebook: "https://www.facebook.com/iconicdentaldesigns",
  instagram: "https://www.instagram.com/iconicdentaldesigns",
  linkedin: "https://www.linkedin.com/company/iconic-dental-designs-centre/",
};
