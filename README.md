# Hydrops Corporate Website

A premium corporate website showcasing Hydrops Colorless Crystal Clear Coconut Oil. Built for a cinematic, scroll-driven storytelling experience.

## Description

Hydrops represents the pinnacle of purity in coconut oil. This platform is designed to visually communicate that quality through a highly polished, interactive storytelling experience. It leverages modern web technologies to achieve smooth scrolling, physical layer stacking, and high-end aesthetics similar to Awwwards-winning product showcases.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** GSAP (ScrollTrigger)
- **Smooth Scrolling:** Lenis
- **Forms/Validation:** React Hook Form + Zod
- **Components:** Radix UI (Headless)

## Folder Structure

```text
src/
├── app/
│   ├── (marketing)/    # Marketing route group (Home, About, Products)
│   ├── api/            # API routes
│   ├── layout.tsx      # Global root layout
│   └── globals.css     # Global CSS
├── components/
│   ├── common/         # Reusable structural components (Scene, Container)
│   ├── layout/         # Navbar, Footer
│   └── ui/             # Reusable UI elements (Buttons, Inputs)
├── constants/
│   ├── site.ts         # Site metadata
│   ├── routes.ts       # Application routes
│   └── theme.ts        # Theme configurations
├── features/
│   └── home/           # Homepage feature module
│       ├── animations/ # GSAP timelines and controllers
│       └── components/ # Homepage specific components
├── lib/
│   └── metadata/       # SEO generation utilities
├── providers/          # Context providers (ThemeProvider, Lenis)
├── styles/             # Global utility and animation CSS
└── types/              # Global TypeScript interfaces
```

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or pnpm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/NIHALMNK/Hydrops.git
   cd hydrops
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Development Commands

- `npm run dev`: Starts the development server.
- `npm run build`: Creates an optimized production build.
- `npm start`: Starts the production server.
- `npm run lint`: Runs ESLint to find and fix problems.

## Features

- **App Router Architecture:** Modern Next.js 16 setup.
- **Cinematic Scrolling:** Integrated Lenis + GSAP ScrollTrigger for hardware-accelerated animations.
- **Feature-Based Structure:** Codebase scales gracefully by keeping features isolated.
- **Premium Design System:** Dark luxury theme with Tailwind CSS.
- **Zero Layout Shifts:** Built using only transform and opacity animations to maintain strict 60 FPS performance.

## Future Roadmap

- [ ] Interactive 3D WebGL bottle rendering
- [ ] CMS integration for dynamic content
- [ ] Multi-product showcase pages
- [ ] Dealer portal
- [ ] Internationalization (i18n)
- [ ] E-commerce functionality

## License

Copyright © 2026 Hydrops Coconut Oil. All rights reserved.
