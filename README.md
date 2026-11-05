# Neotek Soluciones Integrales

Sitio web con Vite, React, TypeScript y Motion.

## Comandos

```bash
npm install
npm run dev      # desarrollo
npm run build    # genera dist/ para publicar
npm run preview  # prueba local de dist/
```

## Dónde editar

- Textos, servicios, sedes, teléfonos, resoluciones y galería: `src/data/site.ts`
- Estilos: `src/index.css`
- Secciones: `src/components/`
- Fotos optimizadas y PDFs: `public/img/` y `public/documentos/`

Cada foto usa dos tamaños en WebP (`nombre-sm.webp` y `nombre-lg.webp`), con sus medidas registradas en `src/data/photos.json`.
