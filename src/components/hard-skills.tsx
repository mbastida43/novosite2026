import { useState } from 'react'
import { Pause, Play } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { portfolioCopy, type Language } from '@/lib/portfolio-copy'
import { hardSkillRows } from '@/lib/hard-skill-rows'
import { useWebMCP } from 'use-webmcp-tool'
import { runWebMCPTool } from '@/lib/webmcp-telemetry'
export { hardSkillRows } from '@/lib/hard-skill-rows'

export function HardSkills({ lang }: { lang: Language }) {
  const [paused, setPaused] = useState(false)
  const copy = portfolioCopy[lang].hardSkills
  useWebMCP({
    name: 'read_visible_hard_skills',
    description: 'Read the two hard-skills rows displayed on this page, once per row without animation duplicates.',
    annotations: { readOnlyHint: true },
    execute: () => runWebMCPTool('read_visible_hard_skills', () =>
      hardSkillRows.map((skills, index) => `${copy.rows[index]}: ${skills.join(', ')}`).join('\n')),
  })
  return (
    <section className="content-section hard-skills-section" id="hard-skills" aria-labelledby="hard-skills-title">
      <div className="section-heading">
        <div><span className="section-index">{copy.index}</span><h2 id="hard-skills-title" className="shimmer-sweep">{copy.title}</h2></div>
        <Button variant="quiet" size="icon" className="skills-motion-control" onClick={() => setPaused(value => !value)} aria-label={paused ? copy.resume : copy.pause} title={paused ? copy.resume : copy.pause} aria-pressed={paused}>
          {paused ? <Play aria-hidden="true" /> : <Pause aria-hidden="true" />}
        </Button>
      </div>
      <div className="hard-skills-bands" data-paused={paused}>
        {hardSkillRows.map((skills, row) => (
          <div className="skills-marquee" key={row}>
            <div className={`skills-track ${row === 0 ? 'skills-track-right' : 'skills-track-left'}`}>
              {[false, true].map(duplicate => (
                <ul className="hard-skills-list" key={String(duplicate)} aria-hidden={duplicate || undefined} aria-label={duplicate ? undefined : copy.rows[row]}>
                  {skills.map(skill => <li key={skill}>{skill}</li>)}
                </ul>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}