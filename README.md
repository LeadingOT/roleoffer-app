# RoleOffer - Startup Compensation Benchmarks

Real compensation data for startup roles, powered by Next.js 15 and Supabase.

## Features

- 📊 **58,752 compensation data points** from Carta, H1B, and salary transparency sources
- 🎯 **pSEO optimized** with 2,160+ unique compensation pages
- 🚀 **Static generation** for fast page loads
- 💰 **Percentile breakdowns** (p25, p50, p75, p90)
- 📍 **8 major tech hubs** covered
- 🏢 **6 funding stages** from Seed to $200M+

## Tech Stack

- **Framework:** Next.js 15.5 (App Router)
- **Database:** Supabase PostgreSQL
- **Styling:** Tailwind CSS v4
- **TypeScript:** Full type safety
- **Deployment:** Vercel

## Getting Started

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Build

```bash
npm run build
```

Generates 104 static pages including:
- Homepage
- 100 compensation pages
- Not found page

### Environment Variables

Required in `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

## Deployment

### Deploy to Vercel

```bash
vercel
```

Or push to GitHub and connect to Vercel dashboard.

**Important:** Add environment variables in Vercel dashboard:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Custom Domain

In Vercel dashboard:
1. Go to Settings → Domains
2. Add `roleoffer.com`
3. Configure DNS (use Cloudflare)

## Project Structure

```
roleoffer-app/
├── app/
│   ├── compensation/
│   │   └── [slug]/
│   │       └── page.tsx        # Dynamic compensation pages
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Homepage
│   └── globals.css              # Global styles
├── lib/
│   └── supabase.ts              # Supabase client & helpers
├── .env.local                   # Environment variables (gitignored)
└── package.json
```

## pSEO Strategy

### URL Pattern

`/compensation/{role}-{level}-{stage}-{location}`

Examples:
- `/compensation/engineering-ic4-series-a-san-francisco`
- `/compensation/product-ic3-seed-new-york`
- `/compensation/design-ic5-series-b-austin`

### Static Generation

- First 100 pages generated at build time
- Remaining pages generated on-demand (ISR)
- All pages cached at edge

### SEO Optimizations

- ✅ Semantic HTML
- ✅ Dynamic meta titles & descriptions
- ✅ Breadcrumb navigation
- ✅ Structured data (future)
- ✅ Internal linking

## Data Coverage

- **Roles:** Engineering, Product, Design, Sales, Marketing
- **Levels:** IC1-IC7, M1-M2 (9 total)
- **Stages:** Seed, Series A, Late A, Series B, Series C, $200M+
- **Locations:** SF, NYC, Seattle, Austin, Boston, LA, Denver, Chicago

Total combinations: 5 × 9 × 6 × 8 = **2,160 pages**

## Performance

- **Build time:** ~15 seconds
- **First Load JS:** 102 kB
- **Static pages:** 104 pre-rendered
- **Lighthouse:** 100/100 (target)

## Future Enhancements

- [ ] Add schema.org structured data (JobPosting)
- [ ] Implement offer letter generator ($49 paywall)
- [ ] Add comparison tool (2+ roles side-by-side)
- [ ] Location-based cost-of-living adjustments
- [ ] Historical compensation trends
- [ ] Company-specific data (when available)

## License

Proprietary - RoleOffer.com © 2026
