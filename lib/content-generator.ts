// Dynamic content generator for pSEO pages
// Generates unique, contextual content based on role/level/stage/location

type ContentContext = {
  role: string;
  role_label: string;
  level: string;
  level_name: string;
  stage: string;
  stage_label: string;
  location: string;
  location_label: string;
  median_salary: number;
  median_equity: number;
};

export function generateOverview(ctx: ContentContext): string {
  const roleContext = {
    engineering: `${ctx.level_name} engineers are critical to building and scaling the product. They typically own significant technical decisions and mentor junior team members.`,
    product: `${ctx.level_name} product managers drive product strategy and work closely with engineering and design to ship features that move key metrics.`,
    design: `${ctx.level_name} designers shape the user experience and visual identity of the product, balancing user needs with business goals.`,
    analytics: `${ctx.level_name} analysts turn data into insights that drive product and business decisions, working across teams to measure impact.`,
    marketing: `${ctx.level_name} marketers develop and execute strategies to acquire and retain customers, balancing brand building with performance marketing.`,
  };

  const stageContext = {
    seed: `At the Seed stage ($1M-$10M raised), startups are finding product-market fit. Roles are generalist, with high impact potential but significant risk.`,
    'series-a': `Series A companies ($10M-$25M) have validated PMF and are scaling their go-to-market. This stage offers a balance of equity upside and reduced risk.`,
    'series-b': `Series B startups ($25M-$50M) are scaling operations and expanding into new markets. Compensation becomes more structured with competitive cash.`,
    'series-c': `Series C+ companies ($50M-$200M+) are preparing for IPO or acquisition. Equity risk is lower, but upside is more predictable.`,
    'late-stage': `Late-stage startups ($200M+) offer stable compensation packages closer to public company standards, with lower risk but smaller equity grants.`,
  };

  const locationContext: Record<string, string> = {
    'san-francisco': 'San Francisco offers the highest compensation due to competition from big tech and high cost of living.',
    'new-york': 'New York City provides strong compensation with a growing startup ecosystem competing with finance and consulting.',
    'austin': 'Austin offers competitive pay with lower cost of living, attracting talent from coastal tech hubs.',
    'seattle': 'Seattle compensation is driven by Amazon and Microsoft, with startups competing for top engineering talent.',
    'boston': 'Boston combines strong academic talent with a mature biotech and SaaS startup scene.',
  };

  return `${roleContext[ctx.role as keyof typeof roleContext] || ''} ${stageContext[ctx.stage as keyof typeof stageContext] || ''} ${locationContext[ctx.location] || 'This market offers competitive compensation for experienced startup talent.'} In ${ctx.location_label}, median base salary for this role is $${ctx.median_salary.toLocaleString()}, with equity grants around ${(ctx.median_equity * 100).toFixed(1)}% typical for this level and stage.`;
}

export function generateEquityInsights(ctx: ContentContext): string {
  const equityByStage = {
    seed: `At Seed stage, ${(ctx.median_equity * 100).toFixed(2)}% equity represents significant ownership. If the company succeeds, this could be worth $500K-$2M+ in 5-7 years. However, 70% of Seed companies don't reach Series B, so diversification is key.`,
    'series-a': `Series A equity grants of ${(ctx.median_equity * 100).toFixed(2)}% are meaningful but diluted from earlier rounds. With a typical 4-year vest and 1-year cliff, your shares could be worth $200K-$1M+ if the company exits successfully.`,
    'series-b': `At Series B, ${(ctx.median_equity * 100).toFixed(2)}% equity is more predictable but smaller. The company has proven traction, so your equity has a better chance of being worth something, though upside is capped compared to earlier stages.`,
    'series-c': `Series C+ equity of ${(ctx.median_equity * 100).toFixed(2)}% is closer to RSUs at public companies. Expect 2-5x returns if the company IPOs or gets acquired, rather than 10-100x moonshots.`,
    'late-stage': `Late-stage equity grants around ${(ctx.median_equity * 100).toFixed(2)}% are conservative. These companies are near liquidity events, so your equity may convert to cash within 1-3 years at predictable valuations.`,
  };

  return equityByStage[ctx.stage as keyof typeof equityByStage] || `Equity of ${(ctx.median_equity * 100).toFixed(2)}% is typical for this stage and level. Understand vesting schedules, strike prices, and post-termination exercise windows before accepting.`;
}

export function generateNegotiationTips(ctx: ContentContext): string {
  const levelTips = {
    ic1: `As an entry-level candidate, focus on learning opportunities and team quality over marginal salary differences. You have less leverage but can negotiate start date, signing bonus, or equity refresh schedules.`,
    ic2: `Mid-level roles have moderate negotiation leverage. Use competing offers to negotiate 10-15% higher base or additional equity. Ask about promotion timelines and performance review criteria.`,
    ic3: `Senior ICs have strong leverage, especially in hot markets. Negotiate for 15-20% above initial offer, accelerated vesting, or guaranteed equity refreshes. Ask about IC vs management track expectations.`,
    ic4: `Staff-level candidates are in high demand. Push for 20-30% above initial offer, equity upside guarantees, or executive perks like more PTO. Clarify scope of ownership and decision-making authority.`,
    ic6: `Principal/Distinguished ICs are rare. Negotiate executive compensation packages including retention bonuses, board observer rights, or profit-sharing. Your hire likely unlocks a funding round or key initiative.`,
  };

  return `${levelTips[ctx.level as keyof typeof levelTips] || 'Research market rates for your level and location before negotiating.'} In ${ctx.location_label}, talent is ${['san-francisco', 'new-york', 'seattle'].includes(ctx.location) ? 'highly competitive' : 'competitive but less saturated than coastal hubs'}, giving you ${ctx.level.startsWith('ic1') || ctx.level.startsWith('ic2') ? 'moderate' : 'strong'} negotiation leverage. Always get offers in writing and take 3-5 days to review before signing.`;
}

export function generateCareerProgression(ctx: ContentContext): string {
  const nextLevel: Record<string, string> = {
    ic1: 'IC2 (Mid-level)',
    ic2: 'IC3 (Senior)',
    ic3: 'IC4 (Staff) or Engineering/Product Manager',
    ic4: 'IC6 (Principal/Distinguished) or VP of Engineering/Product',
    ic6: 'CTO, VP, or Principal Fellow',
  };

  const timeToPromotion: Record<string, string> = {
    ic1: '1-2 years with strong performance',
    ic2: '2-3 years showing increasing scope',
    ic3: '3-4 years demonstrating leadership and strategic thinking',
    ic4: '4-6 years with significant org-level impact',
    ic6: 'Promotion rare; most reach through external hire or acquisition',
  };

  return `From ${ctx.level_name}, the next step is typically ${nextLevel[ctx.level] || 'senior leadership or specialist roles'}, achievable in ${timeToPromotion[ctx.level] || '2-4 years'}. At ${ctx.stage_label} companies, promotions often come faster than at mature companies due to rapid growth and expanding scope. Focus on driving measurable impact, mentoring others, and expanding your cross-functional influence to accelerate your career progression. Many ${ctx.level_name}s also transition to founding their own startups or joining earlier-stage companies for larger equity grants.`;
}

export function generateLocationInsights(ctx: ContentContext): string {
  const cityInsights: Record<string, string> = {
    'san-francisco': 'San Francisco and the Bay Area remain the global hub for venture-backed startups, with the highest density of Series A+ companies. Cost of living is extreme ($3K-5K/month for 1BR), but access to capital, talent, and exit opportunities is unmatched.',
    'new-york': 'NYC is the second-largest startup ecosystem, strong in fintech, media, and enterprise SaaS. Salaries are 10-15% higher than tier-2 cities but 5-10% below SF. Rent averages $3K-4K/month in Manhattan.',
    'austin': 'Austin has exploded post-2020 with no state income tax and lower COL ($1.5K-2.5K/month rent). Salaries are 70-80% of SF levels but take-home pay is often higher. Strong for developer tools, gaming, and consumer tech.',
    'seattle': 'Seattle compensation is driven by Amazon and Microsoft, making it the best non-SF market for engineering pay. Startups compete aggressively for talent. No state income tax is a major benefit.',
    'boston': 'Boston offers strong academic talent from MIT, Harvard, and BU. Dominant in biotech, robotics, and SaaS. Salaries are 75-85% of SF with moderate COL ($2K-3.5K/month).',
  };

  return cityInsights[ctx.location] || `${ctx.location_label} is emerging as a competitive startup market, offering lower cost of living than SF or NYC while building a strong talent and investor base. Remote work has made location less critical, but being near your company's HQ often accelerates career growth.`;
}
