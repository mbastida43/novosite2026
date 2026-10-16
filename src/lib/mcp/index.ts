import { defineMcp } from '@lovable.dev/mcp-js'
import getProfile from './tools/get-profile'
import listHardSkills from './tools/list-hard-skills'
import getDevopsPrinciples from './tools/get-devops-principles'

// Explicit public-access consent: expose only the existing public portfolio.
// Omitting auth config intentionally allows unauthenticated read-only calls.
export default defineMcp({
  name: 'marlonbastida',
  title: 'marlonbastida',
  version: '1.0.0',
  instructions: 'Read the public portfolio of Marlon Bastida: biography, professional links, hard skills and DevOps principles. Portuguese is the default; use language en for English. Tool names do not establish proficiency or certification. No message sending, editing or private data is exposed.',
  tools: [getProfile, listHardSkills, getDevopsPrinciples],
})