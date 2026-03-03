# RoleOffer Deployment Guide

## ✅ Build Complete!

Your Next.js app is ready to deploy. Here's how:

---

## Quick Deploy (Recommended)

### Option 1: Vercel CLI (Fastest)

```bash
cd /home/bill/.openclaw/workspace-roleoffer/roleoffer-app

# Install Vercel CLI (if not installed)
npm i -g vercel

# Deploy
vercel

# Follow prompts:
# - Link to existing project? No
# - Project name: roleoffer-app
# - Directory: ./
# - Override settings? No

# Production deploy
vercel --prod
```

### Option 2: GitHub + Vercel Dashboard

1. **Create GitHub repo:**
```bash
# In roleoffer-app directory
git remote add origin https://github.com/LeadingOT/roleoffer-app.git
git branch -M main
git push -u origin main
```

2. **Deploy via Vercel:**
   - Go to https://vercel.com/new
   - Import Git Repository → Select `roleoffer-app`
   - Configure:
     - Framework Preset: Next.js
     - Root Directory: ./
     - Build Command: `npm run build`
     - Output Directory: (leave default)
   - **Add Environment Variables:**
     ```
     NEXT_PUBLIC_SUPABASE_URL=https://nzlzknqmdvclgqdernkw.supabase.co
     NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im56bHprbnFtZHZjbGdxZGVybmt3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIwNzgxNDQsImV4cCI6MjA4NzY1NDE0NH0.Zb3U1FNwddkb78gtCcsQ5p0gJrKUlq9WAXLbjVaWvXo
     ```
   - Click **Deploy**

---

## Domain Setup

### Add roleoffer.com to Vercel

1. In Vercel dashboard → Project Settings → Domains
2. Add Domain: `roleoffer.com`
3. Add Domain: `www.roleoffer.com`

### Configure DNS (Cloudflare)

Add these records in Cloudflare:

```
Type   Name    Value                     Proxy
A      @       76.76.21.21              ✅ Proxied
CNAME  www     cname.vercel-dns.com     ✅ Proxied
```

Wait 5-10 minutes for DNS propagation.

---

## Post-Deployment Checklist

### 1. Verify Deployment
```bash
# Test homepage
curl https://roleoffer-app.vercel.app

# Test compensation page
curl https://roleoffer-app.vercel.app/compensation/engineering-ic4-series-a-san-francisco
```

### 2. Test Supabase Connection
Visit any compensation page and verify:
- ✅ Data loads (salary numbers appear)
- ✅ Percentile table shows all 4 rows
- ✅ No console errors

### 3. Add to Google Search Console

```bash
# From workspace
cd /home/bill/.openclaw/workspace
node scripts/gsc-auto.mjs add roleoffer.com
node scripts/gsc-auto.mjs verify roleoffer.com
```

### 4. Submit Sitemap

Generate sitemap first:
```bash
cd roleoffer-app
npm install next-sitemap
npx next-sitemap
```

Then submit via GSC or script:
```bash
node scripts/gsc-auto.mjs sitemap roleoffer.com https://roleoffer.com/sitemap.xml
```

---

## Scale to 2,160 Pages

Currently generating **100 pages** at build time. To scale:

### Update Static Params Limit

Edit `app/compensation/[slug]/page.tsx`:

```typescript
export async function generateStaticParams() {
  const slugs = await getAllCombinations();
  return slugs.slice(0, 2160).map((slug) => ({  // Change from 100 to 2160
    slug,
  }));
}
```

### Staged Rollout (Recommended)

**Week 1:** 100 pages (current)
- Monitor: Indexing rate, page quality, Supabase load

**Week 2:** 500 pages
- If indexing is good, scale up

**Week 3:** 1,000 pages

**Week 4:** All 2,160 pages

**Reason:** Google prefers gradual growth over sudden spikes.

---

## Performance Monitoring

### Vercel Analytics
- Enable in project settings (free tier)
- Track: Core Web Vitals, page views

### Supabase Monitoring
- Check query performance in dashboard
- Watch for slow queries
- Current load: very light (static generation queries only at build time)

---

## Troubleshooting

### Build Fails
```bash
# Check logs
vercel logs

# Common issues:
# - Missing env vars → Add in Vercel dashboard
# - Supabase connection → Check URL/key
# - Type errors → Fix locally first
```

### Pages Don't Load Data
- Verify env vars in Vercel
- Check Supabase RLS is disabled on comp_data table
- Test query directly:
```bash
curl "https://nzlzknqmdvclgqdernkw.supabase.co/rest/v1/comp_data?role=eq.engineering&level=eq.ic4&stage=eq.series_a&location=eq.san_francisco&select=*" \
  -H "apikey: YOUR_ANON_KEY"
```

### Slow Build Times
- **Current:** ~15 seconds for 100 pages
- **Expected at 2,160 pages:** ~2-3 minutes
- If slower: Check Supabase query performance

---

## Next Steps After Deploy

1. **Monitor indexing** (GSC → Coverage report)
2. **Test key pages** (top 10 compensation combos)
3. **Set up Analytics** (Vercel + Google Analytics)
4. **Plan content expansion:**
   - Add comparison tool
   - Add offer letter generator (paid feature)
   - Add more locations/roles

---

## Files Reference

**App Location:**
```
/home/bill/.openclaw/workspace-roleoffer/roleoffer-app/
```

**Key Files:**
- `app/compensation/[slug]/page.tsx` - Dynamic pages
- `lib/supabase.ts` - Data fetching logic
- `.env.local` - Credentials (not in git)
- `README.md` - Project overview

**Build Output:**
- `.next/` - Build artifacts
- 104 static pages generated
- Ready for Vercel deployment

---

🎉 **Ready to deploy!** Choose Option 1 or 2 above and ship it!
