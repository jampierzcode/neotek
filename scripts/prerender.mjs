// Inserta el contenido de la página en dist/index.html y genera los archivos de indexación.
import { readFile, rm, writeFile } from 'node:fs/promises'
import { loadEnv } from 'vite'

const siteUrl = loadEnv('production', process.cwd()).VITE_SITE_URL?.replace(/\/$/, '')
if (!siteUrl) throw new Error('Falta VITE_SITE_URL en .env')

const server = await import(new URL('../dist-ssr/entry-server.js', import.meta.url))
const { ALL_SERVICES, BRANCHES, EMAIL, FACEBOOK, LEGAL_NAME, PHONE_PRIMARY, RUC, render } = server

const orgId = `${siteUrl}/#empresa`
const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': orgId,
      name: 'Neotek Soluciones Integrales',
      legalName: LEGAL_NAME,
      taxID: RUC,
      url: `${siteUrl}/`,
      logo: `${siteUrl}/logo.png`,
      image: `${siteUrl}/og.jpg`,
      email: EMAIL,
      telephone: `+${PHONE_PRIMARY}`,
      sameAs: [FACEBOOK],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Servicios',
        itemListElement: ALL_SERVICES.map((name) => ({
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name },
        })),
      },
    },
    ...BRANCHES.map((b) => ({
      '@type': 'LocalBusiness',
      '@id': `${siteUrl}/#sede-${b.id}`,
      name: `Neotek Soluciones Integrales ${b.city}`,
      parentOrganization: { '@id': orgId },
      url: `${siteUrl}/#sedes`,
      image: `${siteUrl}/og.jpg`,
      email: EMAIL,
      telephone: `+${PHONE_PRIMARY}`,
      address: {
        '@type': 'PostalAddress',
        streetAddress: b.street,
        addressLocality: b.locality,
        addressRegion: b.region,
        addressCountry: 'PE',
      },
    })),
  ],
}

const jsonLd = JSON.stringify(structuredData).replace(/</g, '\\u003c')
const template = await readFile('dist/index.html', 'utf8')
if (!template.includes('<div id="root"></div>')) throw new Error('No se encontró #root en dist/index.html')

const html = template
  .replace('<div id="root"></div>', () => `<div id="root">${render()}</div>`)
  .replace('</head>', () => `  <script type="application/ld+json">${jsonLd}</script>\n  </head>`)
await writeFile('dist/index.html', html)

await writeFile('dist/robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`)
await writeFile(
  'dist/sitemap.xml',
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${siteUrl}/</loc>
    <lastmod>${new Date().toISOString().slice(0, 10)}</lastmod>
  </url>
</urlset>
`,
)
await rm('dist-ssr', { recursive: true })
console.log(`Prerender listo para ${siteUrl}`)
