import Link from "next/link";
import Image from "next/image";
import type { LabProduct } from "@/lib/types";

export function ProductCard({ product, className = "" }: { product: LabProduct; className?: string }) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className={`group grad-card-teal flex flex-col overflow-hidden rounded-[20px] border border-white/25 text-paper transition-all duration-300 hover:-translate-y-1.5 hover:border-aqua hover:shadow-[var(--shadow-card-hover)] ${className}`}
    >
      <div className="relative h-[230px] overflow-hidden border-b border-white/20 bg-[linear-gradient(180deg,#18a88e_0%,#0b8b79_48%,#00675d_100%)] sm:h-[260px]">
        <Image
          src={product.image}
          alt={product.title}
          fill
          sizes="(max-width:800px) 100vw, 25vw"
          className="object-contain p-[18px] transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-[21px_20px_24px]">
        <span className="text-[.6rem] uppercase tracking-[0.12em] text-[#c8eee7]">
          {product.category}
        </span>
        <h3 className="my-[9px] text-[1.3rem] font-medium">{product.title}</h3>
        <p className="mb-5 line-clamp-2 text-[.84rem] leading-[1.3] text-paper/90">
          {product.tagline}
        </p>
        <span className="mt-auto inline-flex items-center gap-1.5 text-[.64rem] uppercase tracking-[0.1em]">
          View details
          <span aria-hidden className="transition-transform group-hover:translate-x-1.5">
            →
          </span>
        </span>
      </div>
    </Link>
  );
}
