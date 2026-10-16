import { defineTool } from '@lovable.dev/mcp-js'
import { z } from 'zod'
import { portfolioCopy } from '../../portfolio-copy'

export default defineTool({
  name: 'get_devops_principles',
  title: 'Consultar princípios DevOps',
  description: 'Read the ten DevOps principles published on the portfolio, preserving their original-wording attribution.',
  inputSchema: { language: z.enum(['pt', 'en']).default('pt').describe('Language for the principles and attribution.') },
  annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false },
  handler: ({ language }) => {
    const copy = portfolioCopy[language]
    const principles = copy.principles.map(({ title, description }) => ({ title, description }))
    return { content: [{ type: 'text', text: `${principles.map(item => `${item.title}: ${item.description}`).join('\n')}\n${copy.cultureNote}` }], structuredContent: { language, principles, attribution: copy.cultureNote } }
  },
})