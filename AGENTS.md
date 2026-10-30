<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep the portfolio sections on the single index route with anchor navigation, since they form one continuous personal presentation; content the user asks for as its own page (e.g. /artigos) gets a real route file instead of a new section on the index.
- Render the menu and footer from the shared components in src/components so every route keeps the same fixed header, language switch and footer; routes pass their language and language-change handler down.
- Define portfolio visual styles and semantic tokens in src/styles.css and use the shared Button variants for actions to keep the visual language consistent.
- Render shared header navigation links through the Button navigation variant with asChild to preserve router destinations and centralize their visual states.
- Keep the hero diagram as an imported image with contain sizing and an unframed mobile placement so its lettering and full loop remain visible.
- Contact submissions use a CSRF-protected server function with a fixed template, recipient and CC; report success only when the managed email API accepts the send, and never fall back to mailto automatically.
- Reuse the browser-safe Zod contact schema on the client and server; clear field errors as corrected values become valid.
- Managed email templates live in src/lib/email-templates; keep delivery, suppression and unsubscribe management on Lovable rather than creating queues or email tables.
- Keep bilingual portfolio copy in a typed browser-safe dictionary and select the language through the ?lang search parameter on every route, so content and metadata stay consistent on reload.
- Keep articles and translations in browser-safe structured modules registered in src/lib/articles.ts, selected by route language; PDF system screenshots use image blocks with asset pointers and translated captions, keeping public text and images separate from advertising.
- Keep hard-skill tool names in the browser-safe src/lib/hard-skill-rows.ts module shared by UI and MCP, and animate accessibility-hidden copies with CSS so the public catalog stays aligned without importing React into server tools.
- Define read-only public MCP tools individually in src/lib/mcp/tools and register with defineMcp at /mcp via the Vite plugin; expose only public portfolio content, never contact submissions or sending actions.
- Register browser-local read tools with useWebMCP in the components displaying their content and wrap execution with the shared telemetry helper, preserving mount cleanup and normal UI behavior.
