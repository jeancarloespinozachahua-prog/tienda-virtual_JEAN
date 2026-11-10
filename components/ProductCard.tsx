"use client";

import Image from "next/image";
import { ArrowUpRight, Heart, Plus } from "lucide-react";
import { formatPrice, type Product } from "@/lib/products";

type ProductCardProps = {
  product: Product;
  favorite: boolean;
  onAdd: (product: Product) => void;
  onFavorite: (id: string) => void;
};

export default function ProductCard({ product, favorite, onAdd, onFavorite }: ProductCardProps) {
  return (
    <article className="product-card" style={{ "--product-glow": product.color } as React.CSSProperties}>
      <div className="product-image-wrap">
        <Image
          src={product.image}
          alt={`Imagen de ${product.name}`}
          fill
          unoptimized
          sizes="(max-width: 640px) 86vw, (max-width: 1024px) 42vw, 23vw"
          className="product-image"
        />
        {product.badge && <span className="product-badge">{product.badge}</span>}
        <button
          type="button"
          className={`favorite-button ${favorite ? "is-active" : ""}`}
          aria-label={favorite ? `Quitar ${product.name} de favoritos` : `Añadir ${product.name} a favoritos`}
          aria-pressed={favorite}
          onClick={() => onFavorite(product.id)}
        >
          <Heart size={17} fill={favorite ? "currentColor" : "none"} />
        </button>
        <button type="button" className="quick-add" onClick={() => onAdd(product)} aria-label={`Añadir ${product.name} al carrito`}>
          <Plus size={18} />
        </button>
        <span className="product-category">{product.category}</span>
      </div>
      <div className="product-info">
        <div>
          <h3>{product.name}</h3>
          <p>{product.description}</p>
        </div>
        <div className="product-price">
          <span>{formatPrice(product.price)}</span>
          {product.previousPrice && <del>{formatPrice(product.previousPrice)}</del>}
        </div>
      </div>
      <div className="product-rating"><span>★★★★★</span> {product.rating} <ArrowUpRight size={13} /></div>
    </article>
  );
}
