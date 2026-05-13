---
title: Migration from Gatsby to Astro
date: '2026-05-13T02:19:40.004Z'
updatedDate: ''
template: 'post'
language: 'en'
draft: false
slug: '/posts/migration-from-gatsby-to-astro'
link: '/posts/migration-from-gatsby-to-astro/ja'
category: 'Tech'
tags:
  - 'Frontend'
  - 'AI'
  - 'Claude Code'
description: 'I migrated my blog website from Gatsby to Astro using Claude Code.'
---

I migrated this website from Gatsby to Astro using Claude Code.

### Motivation
The last time I wrote a blog post was more than 2 years ago. When I tried to write a new post recently, the dev server didn't start up, and it seemed like a lot of work to resolve issues. Around the same time, I heard someone saying on a podcast, "Who still uses Gatsby?", so I decided to migrate off of it. I also expected that the process would not be too hard with AI.

### Why Astro?
After some research, Astro and Next.js seemed like solid options. Personally, I haven't heard good things about Next.js, and I had an impression that Next.js would be an overkill, so I chose to go with Astro, which I had heard mentioned several times on podcasts.

### Migration process
There is an excellent [official guide](https://docs.astro.build/en/guides/migrate-to-astro/from-gatsby/) for migration from Gatsby to Astro. I asked Claude Code to read it and create plans, reviewed them by comparing with the guide, and then started migration. I subscribed to Claude Code's Pro plan for this particular migration. I exhausted my token limit twice (once that night and again the next morning), which completed the basic migration and enabled the dev server to start up again! The process was much smoother than I expected, and Claude Code also did an excellent job on fixing bugs I found by manual testing.

### Other things I did using Claude Code
Migration completed in two days, but I also asked Claude Code to clean up unnecessary files and improve several things:

- Create a favicon in SVG - it used to be a JPEG, so I described how it looked, and Claude Code successfully recreated it!
- Merge the about and contact pages
- Create the Life log page
- Create the tea mug icon
- Implement the dark mode
- Address SCSS warnings

### Summary
Thanks to Claude Code, the migration I started that night finished the next morning. I really feel that subscribing to the Claude Code Pro plan was one of the best purchases I have ever made, considering how much time it helped me save. The purpose was for me to be able to start publishing blog posts again, so I did not try to understand how Astro works this time, but I imagine that it would have been a good learning opportunity if I had migrated it myself.

There are a few topics I want to write about, and I'm hoping to write one more post this year.

### Claude Code's thoughts

Here's what Claude Code thought about this migration:

> The most interesting part of this migration for me was the hybrid approach — keeping React components intact and only converting the routing and data layer to Astro. It's a pragmatic decision that let the migration finish in one night rather than weeks. The temptation is always to rewrite everything cleanly, but that's how migrations stall.<br /><br />
> What struck me most was how the hardest problems weren't technical — they were decisions: which features to keep (Disqus, search, PWA), which to drop (KaTeX, Netlify CMS), and what "done" looks like. Those judgment calls were yours, and they're what made the migration focused rather than endless.

Thank you Claude Code!
