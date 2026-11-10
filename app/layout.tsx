import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "JEAN STORE | Tecnología para vivir diferente",
  description:
    "Descubre tecnología, audio, relojes y accesorios con diseño innovador en JEAN STORE.",
  keywords: ["JEAN Store", "tecnología", "audífonos", "relojes", "accesorios"],
  openGraph: {
    title: "JEAN STORE | Tecnología para vivir diferente",
    description: "Diseño y tecnología para acompañarte cada día.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
