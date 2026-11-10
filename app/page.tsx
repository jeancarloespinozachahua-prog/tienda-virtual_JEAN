"use client";

import { useMemo, useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Headphones,
  RotateCcw,
  ShieldCheck,
  SlidersHorizontal,
  X,
} from "lucide-react";
import CartDrawer from "@/components/CartDrawer";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import { categories, formatPrice, products } from "@/lib/products";
import type { CartItem, Category, Product } from "@/lib/products";

function normalizeText(value: string) {
  return value.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();
}

export default function Home() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<Category | "All">("All");
  const [sortBy, setSortBy] = useState("featured");
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [notice, setNotice] = useState("");

  const filteredProducts = useMemo(() => {
    const normalizedSearch = normalizeText(search.trim());
    const matching = products.filter((product) => {
      const matchesCategory = activeCategory === "All" || product.category === activeCategory;
      const matchesSearch =
        !normalizedSearch ||
        normalizeText(`${product.name} ${product.category} ${product.description}`).includes(normalizedSearch);
      const matchesFavorite = !favoritesOnly || favorites.includes(product.id);
      return matchesCategory && matchesSearch && matchesFavorite;
    });
    if (sortBy === "price-low") return [...matching].sort((a, b) => a.price - b.price);
    if (sortBy === "price-high") return [...matching].sort((a, b) => b.price - a.price);
    if (sortBy === "rating") return [...matching].sort((a, b) => Number(b.rating) - Number(a.rating));
    return matching;
  }, [activeCategory, favorites, favoritesOnly, search, sortBy]);

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  function showNotice(message: string) {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 3000);
  }

  function addToCart(product: Product) {
    setCart((current) => {
      const existing = current.find((item) => item.product.id === product.id);
      if (existing) {
        return current.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }
      return [...current, { product, quantity: 1 }];
    });
    showNotice(`${product.name} se añadió al carrito`);
  }

  function changeQuantity(id: string, change: number) {
    setCart((current) =>
      current.flatMap((item) => {
        if (item.product.id !== id) return [item];
        const quantity = item.quantity + change;
        return quantity > 0 ? [{ ...item, quantity }] : [];
      }),
    );
  }

  function removeFromCart(id: string) {
    setCart((current) => current.filter((item) => item.product.id !== id));
  }

  function toggleFavorite(id: string) {
    setFavorites((current) =>
      current.includes(id) ? current.filter((favorite) => favorite !== id) : [...current, id],
    );
  }

  return (
    <>
      <Navbar
        cartCount={cartCount}
        favoritesOnly={favoritesOnly}
        onSearch={setSearch}
        onCartOpen={() => setCartOpen(true)}
        onFavoritesToggle={() => setFavoritesOnly((current) => !current)}
      />
      <main>
        <Hero />
        <section className="trust-strip" aria-label="Beneficios de compra">
          <span><i /> DISEÑO PARA DURAR</span>
          <span><i /> ENVÍO GRATIS DESDE {formatPrice(150)}</span>
          <span><i /> 2 AÑOS DE GARANTÍA</span>
          <span><i /> 30 DÍAS PARA DEVOLVER</span>
        </section>
        <section className="shop-section section-shell" id="shop">
          <div className="section-heading">
            <div>
              <p className="eyebrow">TECNOLOGÍA QUE TE ACOMPAÑA</p>
              <h2>Encuentra tu próximo <span>favorito.</span></h2>
            </div>
            <a className="section-link" href="#categories">Ver colecciones <ArrowUpRight size={15} /></a>
          </div>
          <div className="shop-toolbar">
            <div className="filter-tabs" role="group" aria-label="Filtrar por categoría">
              <button
                type="button"
                className={activeCategory === "All" ? "selected" : ""}
                onClick={() => setActiveCategory("All")}
              >
                Todos <span>{products.length}</span>
              </button>
              {categories.map((category) => (
                <button
                  type="button"
                  key={category.name}
                  className={activeCategory === category.name ? "selected" : ""}
                  onClick={() => setActiveCategory(category.name)}
                >
                  {category.name}
                </button>
              ))}
            </div>
            <label className="sort-select">
              <SlidersHorizontal size={15} />
              <span className="sr-only">Ordenar productos</span>
              <select value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
                <option value="featured">Destacados</option>
                <option value="price-low">Precio: menor a mayor</option>
                <option value="price-high">Precio: mayor a menor</option>
                <option value="rating">Mejor calificados</option>
              </select>
            </label>
          </div>
          {favoritesOnly && (
            <div className="filter-notice">
              Mostrando tus productos favoritos
              <button
                type="button"
                onClick={() => setFavoritesOnly(false)}
                aria-label="Quitar filtro de favoritos"
              >
                <X size={14} />
              </button>
            </div>
          )}
          {search && (
            <div className="filter-notice">
              Resultados para &ldquo;{search}&rdquo;
              <button type="button" onClick={() => setSearch("")} aria-label="Borrar búsqueda">
                <X size={14} />
              </button>
            </div>
          )}
          {filteredProducts.length ? (
            <div className="product-grid">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  favorite={favorites.includes(product.id)}
                  onAdd={addToCart}
                  onFavorite={toggleFavorite}
                />
              ))}
            </div>
          ) : (
            <div className="no-results">
              <span>0{activeCategory === "All" ? "0" : "1"}</span>
              <h3>No encontramos productos</h3>
              <p>Prueba otra búsqueda o explora todas las categorías.</p>
              <button
                className="text-link"
                onClick={() => {
                  setSearch("");
                  setFavoritesOnly(false);
                  setActiveCategory("All");
                }}
              >
                Borrar filtros <ArrowRight size={14} />
              </button>
            </div>
          )}
          <a className="catalog-link" href="#categories">
            DESCUBRE TODA LA COLECCIÓN <ArrowDown size={13} />
          </a>
        </section>
        <section className="category-section" id="categories">
          <div className="section-shell">
            <div className="section-heading category-heading">
              <div>
                <p className="eyebrow">ENCUENTRA LO QUE VA CONTIGO</p>
                <h2>Explora nuestras <span>colecciones.</span></h2>
              </div>
              <span className="category-aside">Cuatro formas de vivir la tecnología.</span>
            </div>
            <div className="category-grid">
              {categories.map((category) => (
                <button
                  type="button"
                  className="category-tile"
                  key={category.name}
                  onClick={() => {
                    setActiveCategory(category.name);
                    setFavoritesOnly(false);
                    document.querySelector("#shop")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  style={{ "--tile-image": `url("${category.image}")` } as React.CSSProperties}
                >
                  <span className="category-number">{category.number} / 04</span>
                  <span className="category-tile-bottom">
                    <strong>{category.name}</strong>
                    <i><ArrowUpRight size={17} /></i>
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>
        <section className="experience-section section-shell" aria-labelledby="experience-title">
          <div className="section-heading">
            <div>
              <p className="eyebrow">UNA COMPRA PENSADA PARA TI</p>
              <h2 id="experience-title">Más que tecnología. <span>Confianza.</span></h2>
            </div>
          </div>
          <div className="experience-grid">
            <article className="experience-card">
              <span className="experience-icon"><ShieldCheck size={20} /></span>
              <h3>Compra con tranquilidad</h3>
              <p>Disfruta de 2 años de garantía y 30 días para solicitar una devolución.</p>
            </article>
            <article className="experience-card">
              <span className="experience-icon"><RotateCcw size={20} /></span>
              <h3>Envío sin costo</h3>
              <p>En pedidos superiores a {formatPrice(150)}. El costo y el tiempo se confirman según tu ubicación.</p>
            </article>
            <article className="experience-card">
              <span className="experience-icon"><Headphones size={20} /></span>
              <h3>Estamos para ayudarte</h3>
              <p>¿Tienes preguntas? Escríbenos y te ayudaremos a elegir lo que necesitas.</p>
              <a href="mailto:soporte@jean.com">Contactar a soporte <ArrowUpRight size={14} /></a>
            </article>
          </div>
        </section>
      </main>
      <Footer />
      <CartDrawer
        open={cartOpen}
        items={cart}
        onClose={() => setCartOpen(false)}
        onQuantity={changeQuantity}
        onRemove={removeFromCart}
        onCheckout={() => {
          setCartOpen(false);
          showNotice("Esta tienda es una demostración: el pago aún no está configurado.");
        }}
      />
      <div className={`toast ${notice ? "toast-visible" : ""}`} role="status" aria-live="polite">
        {notice}
      </div>
    </>
  );
}
