"use client";

import { useEffect } from "react";
import Image from "next/image";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { formatPrice, type CartItem } from "@/lib/products";

type CartDrawerProps = {
  open: boolean;
  items: CartItem[];
  onClose: () => void;
  onQuantity: (id: string, change: number) => void;
  onRemove: (id: string) => void;
  onCheckout: () => void;
};

export default function CartDrawer({ open, items, onClose, onQuantity, onRemove, onCheckout }: CartDrawerProps) {
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;
  const subtotal = items.reduce((total, item) => total + item.product.price * item.quantity, 0);

  return (
    <div className="drawer-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <aside className="cart-drawer" role="dialog" aria-modal="true" aria-labelledby="cart-title">
        <div className="drawer-header">
          <div><span className="eyebrow">TU SELECCIÓN</span><h2 id="cart-title">Tu carrito <span>({items.reduce((count, item) => count + item.quantity, 0)})</span></h2></div>
          <button type="button" className="icon-button" aria-label="Cerrar carrito" onClick={onClose}><X size={20} /></button>
        </div>
        {items.length === 0 ? (
          <div className="empty-cart"><ShoppingBag size={30} /><p>Tu próxima compra favorita empieza aquí.</p><button className="text-link" onClick={onClose}>Explorar productos <span>↗</span></button></div>
        ) : (
          <>
            <div className="cart-items">
              {items.map(({ product, quantity }) => (
                <div className="cart-item" key={product.id}>
                  <div className="cart-thumb"><Image src={product.image} alt="" fill unoptimized sizes="84px" /></div>
                  <div className="cart-item-details">
                    <div className="cart-item-top"><div><span>{product.category}</span><h3>{product.name}</h3></div><strong>{formatPrice(product.price * quantity)}</strong></div>
                    <div className="cart-item-bottom">
                      <div className="quantity-control">
                        <button type="button" onClick={() => onQuantity(product.id, -1)} aria-label={`Disminuir cantidad de ${product.name}`}><Minus size={13} /></button>
                        <span>{quantity}</span>
                        <button type="button" onClick={() => onQuantity(product.id, 1)} aria-label={`Aumentar cantidad de ${product.name}`}><Plus size={13} /></button>
                      </div>
                      <button type="button" className="remove-button" onClick={() => onRemove(product.id)} aria-label={`Quitar ${product.name}`}><Trash2 size={15} /></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="drawer-footer">
              <div className="subtotal"><span>Subtotal de productos</span><strong>{formatPrice(subtotal)}</strong></div>
              <p>El envío y los impuestos se calcularán al finalizar la compra.</p>
              <button type="button" className="checkout-button" onClick={onCheckout}>Continuar con la compra <span>↗</span></button>
              <button type="button" className="text-link continue-shopping" onClick={onClose}>Seguir explorando</button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
