# Isaiah Bernal — Portfolio

Personal portfolio website for Isaiah Bernal, IT Systems Specialist and security-oriented developer. Built as a static site and deployed via GitHub Pages.

**Live site:** [ibernal1815.github.io](https://ibernal1815.github.io)

---

## About

This site serves as a central hub for my professional profile, security projects, certifications, and blog. It is intentionally built without frameworks or build tools — just HTML, CSS, and vanilla JavaScript — so it loads fast, stays easy to maintain, and deploys anywhere.

---

## Structure

```
.
├── index.html     # All markup and content
├── style.css      # All styles — variables, layout, responsive breakpoints
├── main.js        # All JavaScript — splash, interactions, animations
└── README.md      # This file
```

---

## Features

- Boot sequence splash screen with radar animation and phase loader
- Animated matrix rain background
- Glitch effect hero with typewriter role cycling
- Responsive hamburger navigation (collapses at 768px)
- Tabbed work / education / involvement timeline
- Certifications accordion with in-progress cert progress bars
- Project cards with hover-reveal upcoming labs card
- Blog section with category filter
- Resume download section (PDF / DOCX / TXT / MD)
- Contact section with form
- Web Audio API sound effects (off by default)
- Scroll-triggered reveal animations
- Back to top button

---

## Tech Stack

| Layer      | Choice                          |
|------------|---------------------------------|
| Markup     | HTML5                           |
| Styling    | CSS3 — custom properties, grid, flexbox |
| Scripting  | Vanilla JavaScript (ES5-compatible) |
| Fonts      | Google Fonts — Orbitron, Share Tech Mono, VT323 |
| Hosting    | GitHub Pages                    |
| Domain     | Custom (Cloudflare DNS)         |

No npm. No build step. No dependencies.

---

## Local Development

Clone the repo and open `index.html` directly in a browser. No server required.

```bash
git clone https://github.com/ibernal1815/ibernal1815.github.io.git
cd ibernal1815.github.io
open index.html
```

If you want a local dev server (useful for testing service workers or HTTPS-gated APIs):

```bash
# Python 3
python3 -m http.server 8080

# Node (npx, no install needed)
npx serve .
```

Then visit `http://localhost:8080`.

---

## Deployment

This site is deployed automatically via GitHub Pages. Any push to the `main` branch goes live within ~60 seconds.

**Custom domain setup:**

1. Add a `CNAME` file to the repo root containing your domain (e.g., `isaiahbernal.com`)
2. In your DNS provider (Cloudflare recommended), add a CNAME record pointing your domain to `ibernal1815.github.io`
3. Enable HTTPS in repo Settings → Pages → Enforce HTTPS

---

## Sections

| Section      | Content |
|--------------|---------|
| Hero         | Name, role typewriter, stats |
| About        | Bio, terminal card, quick-info mini grid |
| Hacker Ranks | TryHackMe and HackTheBox stats |
| Skills       | 6 category cards with pip ratings |
| Experience   | Work, education, and involvement timelines |
| Projects     | 7 live project cards + upcoming labs hover card |
| Certifications | CompTIA and ISC2 accordion, studying certs with progress bars |
| Blog         | 6 posts with category filter |
| Resume       | PDF / DOCX / TXT / MD download cards |
| Contact      | Contact info + message form |

---

## Certifications

**Active:** CompTIA A+, Network+, Security+, CySA+, Cloud Essentials+ — ISC2 CC

**In progress:** CCSP, PenTest+, RHCSA

---

## To Do

- [ ] Connect contact form to Formspree or Netlify Forms
- [ ] Add real resume file links in the Resume section
- [ ] Add real TryHackMe and HackTheBox profile links
- [ ] Publish blog posts
- [ ] Add Sysinternals Detection Lab project card when complete
- [ ] Add Malware Analysis Sandbox project card when complete

---

## License

This repository contains my personal portfolio content. The code structure is available for reference, but the written content, project descriptions, and personal information are not licensed for reuse.

---

*Built with discipline and too many terminal windows.*
