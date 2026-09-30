# Pixelcliq Media

D2C-first agency website built with Next.js 16, React 19, TypeScript, Tailwind CSS, Framer Motion and Lenis.

## Run locally

```sh
npm ci
cp .env.example .env.local
npm run dev
```

Set `NEXT_PUBLIC_SITE_URL` to the deployed origin before publishing. Build with `npm run build`; serve with `npm start`. Run `npm run lint` for lint checks.

## Contact

Public details are centralized in `src/content/site.ts`: +91 7024332332 and contact@pixelcliqmedia.com.
The contact form prepares an email draft that the visitor reviews and sends through their own email application. It does not claim delivery or store enquiries. `/api/contact` returns 503 for valid requests until a delivery provider is configured. Direct phone and email links remain available.

## Content and motion

- `src/content/`: editable agency content and media registries.
- `src/components/`: layout, service-specific animations, image rails and inline video collections.
- `public/`: optimized images, fonts, animations and videos required by the site.
- `/creative-showcase`: filterable original studio concepts.
- `/ai-video-creative`: filterable video collection.
- `/approach`: process and engagement information.

Studio concepts are labeled as concepts. Case studies, stats and testimonials remain unpublished until verified. Local source media, reference dumps, build output, dependencies and credentials are excluded from Git.

Build output uses `.next.nosync` to avoid iCloud interference on the original Mac. This also works on other hosts. For deployment, run the normal Next.js build/start commands.
