import { defineConfig, type Plugin } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { writeFileSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { locales, portfolioCategorySlugs, productCategorySlugs, productSlugs } from './src/i18n/config'

const SITE_URL = 'https://artistudiodesign.online'

const staticPages = [
  { path: '/', changefreq: 'monthly', priority: '1.0' },
  { path: '/despre', changefreq: 'monthly', priority: '0.8' },
  { path: '/servicii', changefreq: 'monthly', priority: '0.9' },
  { path: '/portofoliu', changefreq: 'monthly', priority: '0.9' },
  { path: '/magazin', changefreq: 'monthly', priority: '0.7' },
  { path: '/produse', changefreq: 'weekly', priority: '0.9' },
  { path: '/ghid', changefreq: 'yearly', priority: '0.5' },
  { path: '/contact', changefreq: 'monthly', priority: '0.7' },
  { path: '/confidentialitate', changefreq: 'yearly', priority: '0.3' },
]

function sitemapPlugin(): Plugin {
  return {
    name: 'generate-sitemap',
    apply: 'build',
    closeBundle() {
      const outDir = resolve(process.cwd(), 'dist/client')
      if (!existsSync(outDir)) return

      const urls: string[] = []

      for (const locale of locales) {
        for (const page of staticPages) {
          urls.push(`  <url>
    <loc>${SITE_URL}/${locale}${page.path === '/' ? '' : page.path}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`)
        }
        for (const slug of portfolioCategorySlugs) {
          urls.push(`  <url>
    <loc>${SITE_URL}/${locale}/portofoliu/${slug}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`)
        }
        for (const slug of productCategorySlugs) {
          urls.push(`  <url>
    <loc>${SITE_URL}/${locale}/produse/categorie/${slug}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`)
        }
        for (const slug of productSlugs) {
          urls.push(`  <url>
    <loc>${SITE_URL}/${locale}/produse/${slug}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`)
        }
      }

      const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>`

      writeFileSync(resolve(outDir, 'sitemap.xml'), sitemap)
    },
  }
}

export default defineConfig({
  plugins: [
    tsconfigPaths({ projects: ['./tsconfig.json'] }),
    tailwindcss(),
    tanstackStart({
      prerender: {
        enabled: true,
        crawlLinks: true,
      },
      pages: [
        { path: '/' },
        ...(locales as readonly string[]).flatMap((l) => [
          { path: `/${l}`, prerender: { crawlLinks: true } },
          { path: `/${l}/despre` },
          { path: `/${l}/servicii` },
          { path: `/${l}/portofoliu`, prerender: { crawlLinks: true } },
          ...portfolioCategorySlugs.map((slug) => ({ path: `/${l}/portofoliu/${slug}` })),
          { path: `/${l}/magazin` },
          { path: `/${l}/produse`, prerender: { crawlLinks: true } },
          ...productCategorySlugs.map((slug) => ({ path: `/${l}/produse/categorie/${slug}` })),
          ...productSlugs.map((slug) => ({ path: `/${l}/produse/${slug}` })),
          { path: `/${l}/ghid` },
          { path: `/${l}/contact` },
          { path: `/${l}/confidentialitate` },
        ]),
        { path: '/404' },
      ],
    }),
    viteReact(),
    sitemapPlugin(),
  ],
})
