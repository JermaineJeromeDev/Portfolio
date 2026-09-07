# Jermaine Jérôme Bärwolf | Portfolio

Personal portfolio of **Jermaine Jérôme Bärwolf**, a Fullstack Developer based in Erfurt. The site presents my technical profile, selected projects, skills, testimonials and contact options in a responsive, bilingual interface.

## What is included

- Responsive portfolio website for desktop, tablet and mobile
- English and German language switching
- Project showcase with GitHub and live-test links
- Skills overview with category tabs and interactive icons
- Contact form connected to Formspree
- Legal Notice page with localized content
- Dynamic page titles and meta descriptions for SEO
- Server-side rendering and client hydration with Angular SSR
- Accessible navigation, focus states and form validation

## Tech stack

| Area         | Technology                                             |
| ------------ | ------------------------------------------------------ |
| Framework    | Angular 21 with standalone components                  |
| Language     | TypeScript 5.9                                         |
| Styling      | SCSS                                                   |
| UI state     | Angular signals and component state                    |
| Translations | `@ngx-translate/core` and `@ngx-translate/http-loader` |
| Rendering    | Angular SSR with Express                               |
| HTTP         | Angular `HttpClient` and Formspree                     |
| Testing      | Angular CLI unit-test builder with Vitest              |
| Tooling      | Angular CLI, npm and Prettier                          |

## Requirements

- Node.js compatible with Angular 21
- npm 11 or a compatible npm version
- Git

Check your local versions before starting:

```bash
node --version
npm --version
git --version
```

## Get the project running

### 1. Clone the repository

```bash
git clone https://github.com/JermaineJeromeDev/Portfolio.git
cd Portfolio
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm start
```

Open [http://localhost:4200](http://localhost:4200) in your browser. Angular reloads the application automatically when source files change.

## Available commands

| Command                       | Purpose                                  |
| ----------------------------- | ---------------------------------------- |
| `npm start`                   | Start the Angular development server     |
| `npm run build`               | Create a production SSR build in `dist/` |
| `npm run watch`               | Rebuild continuously in development mode |
| `npm test`                    | Run the unit-test builder                |
| `npm run serve:ssr:portfolio` | Serve an already built SSR application   |

To build and then serve the SSR output:

```bash
npm run build
npm run serve:ssr:portfolio
```

The SSR server is available at the port printed in the terminal, normally `http://localhost:4000`.

## Contact form

The contact form is implemented in the core service:

```text
src/app/core/services/contact.service.ts
```

Submissions are sent to the configured Formspree endpoint. The service keeps the HTTP integration separate from the form component, while the component handles validation, loading state, success feedback and error feedback.

Before deploying, make sure that:

1. The Formspree endpoint belongs to the intended form.
2. The recipient email address is verified in Formspree.
3. A real submission is tested on the deployed domain.

## Internationalization and SEO

Translations are stored in:

```text
public/i18n/en.json
public/i18n/de.json
```

The language service manages the active language and uses the browser language as the initial preference. The SEO service updates the document title, description and Open Graph metadata for the home page and Legal Notice whenever the route or language changes.

## Project structure

```text
src/
├── app/
│   ├── components/       Reusable UI components
│   ├── core/services/    Application-wide services
│   ├── layout/           Header, menu overlay and footer
│   └── pages/            Home and Legal Notice pages
├── styles/               Shared SCSS variables and mixins
├── main.ts               Browser bootstrap
├── main.server.ts        SSR bootstrap
└── server.ts             Express SSR server

public/
├── i18n/                 English and German translation files
├── img/                  Portfolio and profile images
├── icons/                UI and form icons
└── shapes/               Decorative visual assets
```

## Code conventions

- Standalone Angular components are preferred over NgModules.
- Shared, application-wide behavior belongs in `src/app/core`.
- Page-specific UI stays close to its page under `src/app/pages`.
- Translatable visible text belongs in the i18n JSON files.
- Static images should use Angular's `NgOptimizedImage` where appropriate.
- Use the existing SCSS variables and mixins before introducing new design tokens.

## Production notes

The Angular build enforces budgets for the initial bundle and component styles. Large images should be resized or compressed before being committed. Run the production build before deployment and resolve new budget warnings or errors before publishing.

## Design attribution

The visual design of this portfolio is based on a design owned by [Developer Akademie GmbH](https://developerakademie.com/). The design may not be reused, reproduced, modified or distributed without the required permission. Further legal information is available on the website's [Legal Notice](src/app/pages/legal-notice/legal-notice.html).

## License

This repository is a personal portfolio project. The source code and design are not licensed for reuse unless permission is granted by the author.

## Author

**Jermaine Jérôme Bärwolf**
