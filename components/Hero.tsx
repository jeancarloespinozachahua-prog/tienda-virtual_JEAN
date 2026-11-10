"use client";

import dynamic from "next/dynamic";
import { ArrowDown, ArrowUpRight, MousePointer2, Sparkles } from "lucide-react";
import { formatPrice } from "@/lib/products";

const NeonIntroScene = dynamic(() => import("@/components/NeonProductScene").then((module) => module.NeonIntroScene), {
  ssr: false,
  loading: () => <div className="intro-scene-loading" aria-hidden="true" />,
});

const NeonProductScene = dynamic(() => import("@/components/NeonProductScene"), {
  ssr: false,
  loading: () => <div className="scene-loading" aria-hidden="true"><div className="loading-ring" /></div>,
});

export default function Hero() {
  return (
    <section className="hero" id="home">
      <div className="page-intro" aria-hidden="true">
        <NeonIntroScene />
        <div className="page-intro-copy">
          <span className="page-intro-brand">JEAN<span className="page-intro-dot">.</span></span>
          <strong>Un momento para ti.</strong>
          <small>Prepárate para escuchar diferente.</small>
          <i />
        </div>
      </div>
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-copy">
        <p className="hero-kicker"><span className="live-dot" /> TECNOLOGÍA PARA TU DÍA A DÍA</p>
        <h1>El futuro<br />se siente <span>ahora.</span></h1>
        <p className="hero-description">Tecnología, diseño y experiencias pensadas para acompañarte. Descubre productos que hacen cada día extraordinario.</p>
        <div className="hero-actions">
          <a className="primary-button" href="#shop">Explorar productos <ArrowUpRight size={17} /></a>
          <a className="play-link" href="#story"><span><Sparkles size={15} /></span> Conoce JEAN</a>
        </div>
        <div className="hero-index"><span>01</span><i /><span>03</span><small>DESLIZA PARA DESCUBRIR <ArrowDown size={12} /></small></div>
      </div>
      <div className="hero-art" aria-label="Persona animada en 3D usando audífonos Pulse X1">
        <div className="scene-status"><span className="live-dot" /> 3D EN VIVO</div>
        <div className="orbit orbit-one" aria-hidden="true" />
        <div className="orbit orbit-two" aria-hidden="true" />
        <div className="scene-glow" aria-hidden="true" />
        <NeonProductScene />
        <div className="product-float-label"><span className="live-dot" /><span>PERSONA CON AUDÍFONOS</span><strong>Pulse X1</strong><small>Arrastra para girar · {formatPrice(289)}</small></div>
        <div className="scene-drag-hint"><MousePointer2 size={14} /> ARRASTRA PARA GIRAR</div>
        <div className="hero-vertical-label">DISEÑADO PARA LO QUE VIENE</div>
      </div>
      <div className="hero-bottom-note"><span>DESLIZA PARA DESCUBRIR</span><i /></div>
    </section>
  );
}
