import type { PortfolioCategorySlug } from '../i18n/config'
import { portfolioImages, type ImageRef } from './images'

export interface PortfolioProject {
  id: string
  category: PortfolioCategorySlug
  title: { ro: string; en: string }
  caption: { ro: string; en: string }
  image: ImageRef
  tags: { ro: string[]; en: string[] }
}

export const portfolioProjects: PortfolioProject[] = [
  {
    id: 'bucatarie-1',
    category: 'bucatarie',
    title: { ro: 'Bucătărie modernă cu insulă', en: 'Modern kitchen with island' },
    caption: { ro: 'Texturi calde, blat continuu, electrocasnice integrate.', en: 'Warm textures, seamless worktop, integrated appliances.' },
    image: portfolioImages.bucatarie[0],
    tags: { ro: ['Insulă', 'Iluminat ambiental', 'Optimizare spațiu'], en: ['Island', 'Ambient lighting', 'Space optimisation'] },
  },
  {
    id: 'bucatarie-2',
    category: 'bucatarie',
    title: { ro: 'Bucătărie cu blat din piatră', en: 'Kitchen with stone worktop' },
    caption: { ro: 'Combinație de mat și natural pentru un aspect echilibrat.', en: 'Matte and natural finishes balance each other.' },
    image: portfolioImages.bucatarie[1],
    tags: { ro: ['Blat cuarț', 'Fronturi mate', 'Detalii calde'], en: ['Quartz worktop', 'Matte fronts', 'Warm details'] },
  },
  {
    id: 'bucatarie-3',
    category: 'bucatarie',
    title: { ro: 'Bucătărie cu fronturi mate', en: 'Kitchen with matte fronts' },
    caption: { ro: 'Linii curate, organizare verticală maximă.', en: 'Clean lines, maximal vertical storage.' },
    image: portfolioImages.bucatarie[2],
    tags: { ro: ['Linie curată', 'Organizare verticală'], en: ['Clean lines', 'Vertical storage'] },
  },
  {
    id: 'bucatarie-4',
    category: 'bucatarie',
    title: { ro: 'Bucătărie cu iluminat integrat', en: 'Kitchen with integrated lighting' },
    caption: { ro: 'LED-uri sub corpuri pentru atmosferă, plus iluminat de lucru.', en: 'Under-cabinet LEDs for mood, plus task lighting.' },
    image: portfolioImages.bucatarie[3],
    tags: { ro: ['Iluminat LED', 'Iluminat de lucru'], en: ['LED lighting', 'Task lighting'] },
  },
  {
    id: 'living-1',
    category: 'living',
    title: { ro: 'Living cu bibliotecă pe perete', en: 'Living room with full-wall library' },
    caption: { ro: 'O bibliotecă din podea în tavan, integrată discret.', en: 'A floor-to-ceiling library, discreetly integrated.' },
    image: portfolioImages.living[0],
    tags: { ro: ['Bibliotecă integrată', 'Texturi naturale'], en: ['Integrated library', 'Natural textures'] },
  },
  {
    id: 'living-2',
    category: 'living',
    title: { ro: 'Living cu zonă TV integrată', en: 'Living with integrated TV unit' },
    caption: { ro: 'Cablare ascunsă, suport TV pe perete, depozitare cu sertare.', en: 'Hidden cabling, wall-mounted TV, drawer storage.' },
    image: portfolioImages.living[1],
    tags: { ro: ['Integrare TV', 'Cablare ascunsă'], en: ['TV integration', 'Hidden cabling'] },
  },
  {
    id: 'living-3',
    category: 'living',
    title: { ro: 'Living elegant', en: 'Elegant living room' },
    caption: { ro: 'Materiale calde, accente metalice subtile.', en: 'Warm materials with subtle metallic accents.' },
    image: portfolioImages.living[2],
    tags: { ro: ['Texturi calde', 'Accente metalice'], en: ['Warm textures', 'Metallic accents'] },
  },
  {
    id: 'dormitor-1',
    category: 'dormitor',
    title: { ro: 'Dormitor matrimonial cu tăblie tapițată', en: 'Master bedroom with upholstered headboard' },
    caption: { ro: 'Confort vizual, tăblie tapițată, depozitare sub pat.', en: 'Visual comfort, upholstered headboard, under-bed storage.' },
    image: portfolioImages.dormitor[0],
    tags: { ro: ['Tăblie tapițată', 'Sub-pat'], en: ['Upholstered headboard', 'Under-bed'] },
  },
  {
    id: 'dormitor-2',
    category: 'dormitor',
    title: { ro: 'Dormitor cu depozitare integrată', en: 'Bedroom with integrated storage' },
    caption: { ro: 'Dulapuri ascunse care fac spațiul să respire.', en: 'Hidden wardrobes that let the room breathe.' },
    image: portfolioImages.dormitor[1],
    tags: { ro: ['Depozitare integrată'], en: ['Integrated storage'] },
  },
  {
    id: 'dressing-1',
    category: 'dressing',
    title: { ro: 'Dressing walk-in optimizat', en: 'Optimised walk-in dressing' },
    caption: { ro: 'Bare extractibile, sertare cu separatoare, oglindă.', en: 'Pull-out bars, drawers with dividers, full mirror.' },
    image: portfolioImages.dressing[0],
    tags: { ro: ['Walk-in', 'Sertare cu separatoare'], en: ['Walk-in', 'Drawer dividers'] },
  },
  {
    id: 'dressing-2',
    category: 'dressing',
    title: { ro: 'Dressing cu iluminat LED', en: 'Dressing with LED lighting' },
    caption: { ro: 'LED-uri pe rafturi, senzori de prezență.', en: 'Shelf LEDs with motion sensors.' },
    image: portfolioImages.dressing[1],
    tags: { ro: ['Iluminat LED', 'Senzori prezență'], en: ['LED lighting', 'Motion sensors'] },
  },
  {
    id: 'dressing-3',
    category: 'dressing',
    title: { ro: 'Dressing cu fronturi lucioase', en: 'Dressing with glossy fronts' },
    caption: { ro: 'Fronturi lucioase și depozitare simetrică.', en: 'Gloss fronts with symmetric storage.' },
    image: portfolioImages.dressing[2],
    tags: { ro: ['Fronturi lucioase', 'Depozitare simetrică'], en: ['Gloss fronts', 'Symmetric storage'] },
  },
  {
    id: 'baie-1',
    category: 'baie',
    title: { ro: 'Mobilier de baie pe comandă', en: 'Custom bathroom cabinetry' },
    caption: { ro: 'Materiale rezistente la umiditate și un ton cald.', en: 'Moisture-resistant materials in a warm tone.' },
    image: portfolioImages.baie[0],
    tags: { ro: ['Hidrofug', 'Tonuri calde'], en: ['Water-resistant', 'Warm tones'] },
  },
]

export function projectsByCategory(slug: PortfolioCategorySlug): PortfolioProject[] {
  return portfolioProjects.filter((p) => p.category === slug)
}
