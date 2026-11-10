export type Category = "Audio" | "Relojes" | "Videojuegos" | "Estilo de vida";

export type Product = {
  id: string;
  name: string;
  category: Category;
  price: number;
  previousPrice?: number;
  rating: string;
  badge?: string;
  color: string;
  image: string;
  description: string;
};

export type CartItem = {
  product: Product;
  quantity: number;
};

export const USD_TO_PEN = 3.421491;

export const formatPrice = (priceInUsd: number) =>
  new Intl.NumberFormat("es-PE", {
    style: "currency",
    currency: "PEN",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(priceInUsd * USD_TO_PEN);

export const products: Product[] = [
  {
    id: "pulse-x1",
    name: "Audífonos Pulse X1",
    category: "Audio",
    price: 289,
    previousPrice: 349,
    rating: "4.9",
    badge: "MÁS VENDIDO",
    color: "#a78bfa",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=85",
    description: "Sonido de estudio, sin distracciones.",
  },
  {
    id: "nova-buds",
    name: "Audífonos Nova Buds Pro",
    category: "Audio",
    price: 179,
    rating: "4.8",
    badge: "NUEVO",
    color: "#67e8f9",
    image: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?auto=format&fit=crop&w=900&q=85",
    description: "Formato compacto, sonido envolvente.",
  },
  {
    id: "arc-watch",
    name: "Reloj Arc Ultra",
    category: "Relojes",
    price: 399,
    rating: "4.9",
    color: "#818cf8",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=85",
    description: "A tu ritmo, todos los días.",
  },
  {
    id: "flux-speaker",
    name: "Parlante portátil Flux",
    category: "Audio",
    price: 219,
    rating: "4.7",
    color: "#22d3ee",
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=900&q=85",
    description: "Gran sonido para llevar contigo.",
  },
  {
    id: "void-controller",
    name: "Control inalámbrico Void",
    category: "Videojuegos",
    price: 149,
    previousPrice: 179,
    rating: "4.8",
    badge: "OFERTA",
    color: "#c084fc",
    image: "https://images.unsplash.com/photo-1592840496694-26d035b52b48?auto=format&fit=crop&w=900&q=85",
    description: "Precisión en cada partida.",
  },
  {
    id: "halo-lamp",
    name: "Lámpara ambiental Halo",
    category: "Estilo de vida",
    price: 129,
    rating: "4.6",
    color: "#f0abfc",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=85",
    description: "La luz perfecta para cada momento.",
  },
  {
    id: "echo-mic",
    name: "Micrófono de estudio Echo",
    category: "Videojuegos",
    price: 199,
    rating: "4.8",
    color: "#60a5fa",
    image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=900&q=85",
    description: "Tu voz, clara y en primer plano.",
  },
  {
    id: "orbit-pack",
    name: "Mochila tecnológica Orbit",
    category: "Estilo de vida",
    price: 159,
    rating: "4.7",
    color: "#a3e635",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=85",
    description: "Todo lo que necesitas, contigo.",
  },
];

export const categories: { name: Category; number: string; image: string }[] = [
  {
    name: "Audio",
    number: "01",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1000&q=85",
  },
  {
    name: "Relojes",
    number: "02",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1000&q=85",
  },
  {
    name: "Videojuegos",
    number: "03",
    image: "https://images.unsplash.com/photo-1592840496694-26d035b52b48?auto=format&fit=crop&w=1000&q=85",
  },
  {
    name: "Estilo de vida",
    number: "04",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1000&q=85",
  },
];
