# Strong's Digital Labs — Website

Technology consultancy website for Strong's Digital Labs. Built with React and connected to the SDL API.

## Architecture

```
src/
  components/
    ui/                  # Reusable UI primitives
      Button.jsx
      PageHero.jsx
      SectionHeader.jsx
      ServiceCard.jsx
      ProjectCard.jsx
      ProcessGrid.jsx
      ProcessTimeline.jsx
      ValuesGrid.jsx
    sections/            # Home page sections
      Hero.jsx
      ServicesSection.jsx
      HowWeWork.jsx
      PortfolioSection.jsx
      Testimonials.jsx
      CTA.jsx
    Navbar.jsx
    Footer.jsx
  pages/                 # Route-level pages
  data/                  # Single source of truth for content
  hooks/                 # Shared React hooks
  utils/                 # Pure utility functions
  constants/             # Asset paths and app constants
  context/               # React context providers
  services/              # API client
  styles/                # Shared global styles
```

## Public assets

| File | Usage |
|------|--------|
| `logo-hero.png` | Hero card, favicon, social previews |
| `logo-navbar.png` | Navbar and footer |
| `logo-hero-alt.png` | Saved alternate hero logo |
| `about-ai-illustration.png` | About page illustration |

## Setup

1. `npm install`
2. Start API on port `3003` (see `../smsolutions_api`)
3. `npm start`

## Scripts

- `npm start` — development
- `npm run build` — production build
- `npm test` — tests

Built by Strong's Digital Labs.
