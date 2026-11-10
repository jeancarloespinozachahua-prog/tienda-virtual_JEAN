"use client";

import { useState } from "react";
import { Heart, Search, ShoppingBag, X } from "lucide-react";

type NavbarProps = {
  cartCount: number;
  favoritesOnly: boolean;
  onSearch: (value: string) => void;
  onCartOpen: () => void;
  onFavoritesToggle: () => void;
};

export default function Navbar({
  cartCount,
  favoritesOnly,
  onSearch,
  onCartOpen,
  onFavoritesToggle,
}: NavbarProps) {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="site-header">
      <a className="wordmark" href="#home" aria-label="JEAN Store, inicio">
        JEAN<span>.</span>
      </a>
      <nav className="main-nav" aria-label="Navegación principal">
        <a href="#shop">Tienda</a>
        <a href="#categories">Colecciones</a>
        <a href="#story">Nosotros</a>
      </nav>
      <div className="nav-actions">
        {searchOpen && (
          <label className="nav-search">
            <span className="sr-only">Buscar productos</span>
            <input autoFocus placeholder="Buscar productos..." onChange={(event) => onSearch(event.target.value)} />
            <button type="button" className="icon-button search-close" aria-label="Cerrar búsqueda" onClick={() => { setSearchOpen(false); onSearch(""); }}>
              <X size={17} />
            </button>
          </label>
        )}
        <button type="button" className="icon-button" aria-label="Buscar productos" onClick={() => setSearchOpen(!searchOpen)}>
          <Search size={19} />
        </button>
        <button
          type="button"
          className={`icon-button ${favoritesOnly ? "is-active" : ""}`}
          aria-label={favoritesOnly ? "Mostrar todos los productos" : "Mostrar favoritos"}
          aria-pressed={favoritesOnly}
          onClick={onFavoritesToggle}
        >
          <Heart size={19} fill={favoritesOnly ? "currentColor" : "none"} />
        </button>
        <button type="button" className="icon-button bag-button" aria-label={`Abrir carrito, ${cartCount} productos`} onClick={onCartOpen}>
          <ShoppingBag size={19} />
          <span className="bag-count">{cartCount}</span>
        </button>
      </div>
    </header>
  );
}
