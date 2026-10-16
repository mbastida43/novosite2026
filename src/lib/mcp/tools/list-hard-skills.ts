import { defineTool } from '@lovable.dev/mcp-js'
import { hardSkillRows } from '../../hard-skill-rows'

export default defineTool({
  name: 'list_hard_skills',
  title: 'Listar competências técnicas',
  description: 'List the tool names in the two public hard-skills rows, without inferring proficiency or certifications.',
  inputSchema: {},
  annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false },
  handler: () => {
    const rows = hardSkillRows.map((skills, index) => ({ row: index + 1, skills: [...skills] }))
    return { content: [{ type: 'text', text: rows.map(row => `${row.row}: ${row.skills.join(', ')}`).join('\n') }], structuredContent: { rows } }
  },
})