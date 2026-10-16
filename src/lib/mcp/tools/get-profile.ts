import { defineTool } from '@lovable.dev/mcp-js'
import { z } from 'zod'
import { portfolioCopy } from '../../portfolio-copy'

export default defineTool({
  name: 'get_profile',
  title: 'Consultar perfil de Marlon Bastida',
  description: 'Read Marlon Bastida’s public biography, areas of expertise and public professional links in Portuguese or English.',
  inputSchema: { language: z.enum(['pt', 'en']).default('pt').describe('Language for the public portfolio content.') },
  annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false },
  handler: ({ language }) => {
    const copy = portfolioCopy[language]
    const profile = {
      name: 'Marlon Bastida', role: 'DevSecOps Engineer', language,
      biography: copy.biography, areasOfExpertise: [...copy.skills],
      links: { website: 'https://marlonbastida.tech', github: 'https://github.com/mbastida43/', linkedin: 'https://www.linkedin.com/in/mbastida/' },
    }
    return { content: [{ type: 'text', text: JSON.stringify(profile) }], structuredContent: { profile } }
  },
})