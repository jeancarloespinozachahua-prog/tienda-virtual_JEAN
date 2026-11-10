# JEAN STORE

Tienda de tecnología creada con Next.js App Router, TypeScript y React Three Fiber.

## Requisitos

- Node.js 20.9 o posterior
- npm

## Ejecutar en local

```bash
npm install
npm run dev
```

Abre http://localhost:3000 en tu navegador.

## Comprobaciones

```bash
npm run typecheck
npm run lint
npm run build
```

## Estructura del proyecto

```text
app/                  Páginas, metadatos y estilos globales
components/           Navegación, catálogo, carrito y escena 3D
lib/                  Productos, categorías y tipos compartidos
```

## Integraciones de comercio

El catálogo usa datos locales de `lib/products.ts`; los precios de referencia están en USD y se muestran convertidos a soles con la tasa fija de `USD_TO_PEN` (3.421491 PEN por USD, referencia del 10 de noviembre de 2026). Actualiza esa tasa antes de publicar o conecta una fuente de cambio para mantenerla vigente. El carrito y los favoritos se guardan en el estado del navegador. El formulario de novedades y el flujo de pago son demostrativos y todavía no guardan suscripciones ni procesan pagos. Antes de recibir pedidos reales, conecta un proveedor de pago y un servicio de suscripciones. Usa rutas del servidor para operaciones sensibles y no expongas credenciales en variables de entorno del cliente.
