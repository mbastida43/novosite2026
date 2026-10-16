import { describe, expect, it } from 'vitest'
import { articlesByLanguage } from '@/lib/articles'
import firstSystemScreenshot from '@/assets/k3d/image-28.asset.json'

describe('K3D PDF article', () => {
  it('provides the same 25 selected system screenshots in both languages', () => {
    const pt = articlesByLanguage.pt.find(article => article.slug === 'kubernetes-k3d-windows-wsl')
    const en = articlesByLanguage.en.find(article => article.slug === 'kubernetes-k3d-windows-wsl')
    const ptImages = pt?.blocks.filter(block => block.type === 'image')
    const enImages = en?.blocks.filter(block => block.type === 'image')
    expect(ptImages).toHaveLength(25)
    expect(enImages?.map(image => image.url)).toEqual(ptImages?.map(image => image.url))
    expect(new Set(ptImages?.map(image => image.url)).size).toBe(25)
    expect(ptImages?.[0]?.url).toBe(firstSystemScreenshot.url)
  })
})