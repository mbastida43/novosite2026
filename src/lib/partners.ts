import amauryPhoto from '@/assets/amaury-souza.jpg.asset.json'
import biancaPhoto from '@/assets/bianca-veit.jpg.asset.json'
import heinzPhoto from '@/assets/heinz-nevermann.jpg.asset.json'
import leviPhoto from '@/assets/levi-alves.jpg.asset.json'
import marceloPhoto from '@/assets/marcelo-pires.jpg.asset.json'
import marianaPhoto from '@/assets/mariana-bs.jpg.asset.json'
import tacioPhoto from '@/assets/tacio-oliveira.jpg.asset.json'

export type Partner = {
  /** Display name; undefined until the real person is provided. */
  name?: string
  /** Role shown under the name, in the language being displayed. */
  role?: { pt: string; en: string }
  /** LinkedIn profile URL; undefined until the real profile is provided. */
  url?: string
  /** Portfolio page opened by the name; undefined until the real page is provided. */
  portfolio?: string
  /** Portrait image URL; undefined until the real photo is provided. */
  photo?: string
  /** CSS object-position for the portrait, used when a center crop would cut the face. */
  photoPosition?: string
}

export const partners: Partner[] = [
  { name: 'Marcelo da Silva Pires', role: { pt: 'DevOps Engineer', en: 'DevOps Engineer' }, url: 'https://www.linkedin.com/in/marcpires/', portfolio: 'https://github.com/marcpires?tab=repositories', photo: marceloPhoto.url },
  { name: 'Heinz Dieter Nevermann Zamorano', role: { pt: 'Consultor DevOps', en: 'DevOps Consultant' }, url: 'https://www.linkedin.com/in/heinz-nevermann/', portfolio: 'https://hnz.com.br', photo: heinzPhoto.url },
  { name: 'Mariana B S', role: { pt: 'Cybersecurity', en: 'Cybersecurity' }, url: 'https://www.linkedin.com/in/marianabsz/', portfolio: 'https://github.com/marianabsctba', photo: marianaPhoto.url },
  { name: 'Tácio Souza de Oliveira', role: { pt: 'DevOps Engineer', en: 'DevOps Engineer' }, url: 'https://www.linkedin.com/in/taciosouzaoliveira/', portfolio: 'https://engineer.tacio.cloud/', photo: tacioPhoto.url },
  { name: 'Levi Leopoldino Alves', role: { pt: 'DevOps Engineer', en: 'DevOps Engineer' }, url: 'https://www.linkedin.com/in/levinux/', portfolio: 'https://dougbrazil.tech/', photo: leviPhoto.url },
  { name: 'Amaury Borges Souza', role: { pt: 'AWS Community Builder', en: 'AWS Community Builder' }, url: 'https://www.linkedin.com/in/amaurybsouza/', photo: amauryPhoto.url, photoPosition: 'right top' },
  { name: 'Bianca Veit da Silva', role: { pt: 'Platform Engineer', en: 'Platform Engineer' }, url: 'https://www.linkedin.com/in/biancaveitdasilva/', portfolio: 'https://devopsdays.org/events/2024-campinas/speakers/bianca-veit/', photo: biancaPhoto.url },
  {},
]
