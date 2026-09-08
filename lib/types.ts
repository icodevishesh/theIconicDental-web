export interface NavLink {
  label: string;
  href: string;
  target?: string;
  rel?: string;
  openInNewTab?: boolean;
}

export interface NavSubGroup {
  /** Heading link for the group (also clickable). */
  label: string;
  href: string;
  children: NavLink[];
}

export interface NavItem {
  label: string;
  href: string;
  target?: string;
  rel?: string;
  openInNewTab?: boolean;
  /** Flat dropdown of links. */
  menu?: NavLink[];
  /** Nested dropdown with sub-groups (used by "Services"). */
  groups?: NavSubGroup[];
}

/** Design-service category (6 items, /services/[service]). */
export interface Service {
  slug: string;
  title: string;
  /** Two-letter mark shown in the hero visual. */
  mark: string;
  intro: string;
  overview: string;
  /** Hero image name (in /public/images/services). */
  heroImage: string;
  products: ServiceProduct[];
  features: string[];
}

export interface ServiceProduct {
  name: string;
  description: string;
  image: string;
}

export type ProductCategory = "crown" | "implant" | "appliance";

/** Lab product (27 items, /products/[product]). */
export interface LabProduct {
  slug: string;
  title: string;
  cat: ProductCategory;
  category: string;
  tagline: string;
  /** Image file name in /public/images/products. */
  image: string;
}

export interface Article {
  slug: string;
  category: string;
  readDuration: string;
  title: string;
  description: string;
}
