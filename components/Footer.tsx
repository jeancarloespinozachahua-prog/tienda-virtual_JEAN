"use client";

import { useState } from "react";
import { ArrowUpRight, Instagram, Send } from "lucide-react";

export default function Footer() {
  const [newsletterMessage, setNewsletterMessage] = useState("");

  function handleNewsletterSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNewsletterMessage("¡Gracias! El formulario está listo para conectar con nuestra lista de novedades.");
    event.currentTarget.reset();
  }

  return (
    <footer className="site-footer" id="story">
      <div className="footer-main">
        <div className="footer-brand">
          <a className="wordmark" href="#home" aria-label="JEAN Store, inicio">JEAN<span>.</span></a>
          <p>Tecnología con intención.<br />Diseño para todos los días.</p>
          <a className="footer-contact" href="mailto:hola@jean.com">
            hola@jean.com <ArrowUpRight size={14} />
          </a>
        </div>
        <div className="footer-column">
          <span className="footer-label">EXPLORA</span>
          <a href="#shop">Todos los productos</a>
          <a href="#categories">Colecciones</a>
          <a href="#shop">Novedades</a>
          <a href="#shop">Más vendidos</a>
        </div>
        <div className="footer-column">
          <span className="footer-label">TE ACOMPAÑAMOS</span>
          <a href="#experience-title">Nuestra propuesta</a>
          <a href="#experience-title">Envíos y devoluciones</a>
          <a href="#experience-title">Garantía</a>
          <a href="mailto:soporte@jean.com">Contacto</a>
        </div>
        <div className="footer-newsletter">
          <span className="footer-label">NOVEDADES JEAN</span>
          <p>Recibe noticias, lanzamientos y recomendaciones.</p>
          <form onSubmit={handleNewsletterSubmit}>
            <label className="sr-only" htmlFor="newsletter-email">Tu correo electrónico</label>
            <input id="newsletter-email" type="email" placeholder="Tu correo electrónico" required />
            <button type="submit" aria-label="Enviar correo para novedades"><Send size={16} /></button>
          </form>
          <span className="newsletter-message" aria-live="polite">{newsletterMessage}</span>
          <small>Formulario de demostración; aún no guarda suscripciones.</small>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 JEAN STORE. TODOS LOS DERECHOS RESERVADOS.</span>
        <div>
          <a href="#story">Privacidad</a>
          <a href="#story">Términos</a>
          <a href="#story" aria-label="Instagram"><Instagram size={15} /></a>
        </div>
        <span>DISEÑO Y TECNOLOGÍA <span className="footer-spark">✳</span></span>
      </div>
    </footer>
  );
}
