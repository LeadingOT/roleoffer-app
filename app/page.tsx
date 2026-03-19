import Link from 'next/link';

export default function HomePage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'RoleOffer',
    description: 'Startup compensation benchmarks and salary data',
    url: 'https://roleoffer.com',
    publisher: {
      '@type': 'Organization',
      name: 'RoleOffer',
      url: 'https://roleoffer.com'
    }
  };

  // Top 50 high-value combinations (most-searched)
  const popularCombos = [
    // SF Engineering
    { slug: 'engineering-ic4-series-a-san-francisco', label: 'Senior Engineer • Series A • SF', salary: '$180K' },
    { slug: 'engineering-ic6-series-a-san-francisco', label: 'Staff Engineer • Series A • SF', salary: '$220K' },
    { slug: 'engineering-ic4-seed-san-francisco', label: 'Senior Engineer • Seed • SF', salary: '$165K' },
    { slug: 'engineering-ic3-series-a-san-francisco', label: 'Mid Engineer • Series A • SF', salary: '$150K' },
    { slug: 'engineering-ic6-series-b-san-francisco', label: 'Staff Engineer • Series B • SF', salary: '$240K' },
    
    // NY Engineering
    { slug: 'engineering-ic4-series-a-new-york', label: 'Senior Engineer • Series A • NY', salary: '$175K' },
    { slug: 'engineering-ic6-series-a-new-york', label: 'Staff Engineer • Series A • NY', salary: '$210K' },
    { slug: 'engineering-ic4-seed-new-york', label: 'Senior Engineer • Seed • NY', salary: '$160K' },
    
    // Product roles
    { slug: 'product-ic4-series-a-san-francisco', label: 'Senior PM • Series A • SF', salary: '$170K' },
    { slug: 'product-ic3-series-a-san-francisco', label: 'PM • Series A • SF', salary: '$145K' },
    { slug: 'product-ic4-seed-san-francisco', label: 'Senior PM • Seed • SF', salary: '$155K' },
    { slug: 'product-ic4-series-a-new-york', label: 'Senior PM • Series A • NY', salary: '$165K' },
    { slug: 'product-ic6-series-a-san-francisco', label: 'Staff PM • Series A • SF', salary: '$195K' },
    
    // Design roles
    { slug: 'design-ic4-series-a-san-francisco', label: 'Senior Designer • Series A • SF', salary: '$155K' },
    { slug: 'design-ic4-seed-san-francisco', label: 'Senior Designer • Seed • SF', salary: '$140K' },
    { slug: 'design-ic3-series-a-san-francisco', label: 'Mid Designer • Series A • SF', salary: '$125K' },
    { slug: 'design-ic4-series-a-new-york', label: 'Senior Designer • Series A • NY', salary: '$150K' },
    
    // Data Science
    { slug: 'data-ic4-series-a-san-francisco', label: 'Senior Data Scientist • Series A • SF', salary: '$175K' },
    { slug: 'data-ic4-seed-san-francisco', label: 'Senior Data Scientist • Seed • SF', salary: '$160K' },
    { slug: 'data-ic6-series-a-san-francisco', label: 'Staff Data Scientist • Series A • SF', salary: '$210K' },
    
    // Seattle
    { slug: 'engineering-ic4-series-a-seattle', label: 'Senior Engineer • Series A • Seattle', salary: '$170K' },
    { slug: 'engineering-ic6-series-a-seattle', label: 'Staff Engineer • Series A • Seattle', salary: '$205K' },
    { slug: 'product-ic4-series-a-seattle', label: 'Senior PM • Series A • Seattle', salary: '$160K' },
    
    // Austin
    { slug: 'engineering-ic4-series-a-austin', label: 'Senior Engineer • Series A • Austin', salary: '$150K' },
    { slug: 'engineering-ic4-seed-austin', label: 'Senior Engineer • Seed • Austin', salary: '$140K' },
    { slug: 'product-ic4-series-a-austin', label: 'Senior PM • Series A • Austin', salary: '$145K' },
    { slug: 'design-ic4-seed-austin', label: 'Senior Designer • Seed • Austin', salary: '$125K' },
    
    // Boston
    { slug: 'engineering-ic4-series-a-boston', label: 'Senior Engineer • Series A • Boston', salary: '$165K' },
    { slug: 'data-ic4-series-a-boston', label: 'Senior Data Scientist • Series A • Boston', salary: '$170K' },
    { slug: 'product-ic4-series-a-boston', label: 'Senior PM • Series A • Boston', salary: '$155K' },
    
    // Later stages
    { slug: 'engineering-ic4-series-b-san-francisco', label: 'Senior Engineer • Series B • SF', salary: '$190K' },
    { slug: 'engineering-ic4-series-c-san-francisco', label: 'Senior Engineer • Series C • SF', salary: '$200K' },
    { slug: 'engineering-ic4-late-stage-san-francisco', label: 'Senior Engineer • Late Stage • SF', salary: '$215K' },
    { slug: 'product-ic4-series-b-san-francisco', label: 'Senior PM • Series B • SF', salary: '$180K' },
    { slug: 'product-ic4-late-stage-san-francisco', label: 'Senior PM • Late Stage • SF', salary: '$195K' },
    
    // Junior roles
    { slug: 'engineering-ic1-series-a-san-francisco', label: 'Junior Engineer • Series A • SF', salary: '$130K' },
    { slug: 'engineering-ic1-seed-san-francisco', label: 'Junior Engineer • Seed • SF', salary: '$115K' },
    { slug: 'product-ic1-series-a-san-francisco', label: 'Associate PM • Series A • SF', salary: '$120K' },
    
    // Analytics
    { slug: 'analytics-ic4-series-a-san-francisco', label: 'Senior Analyst • Series A • SF', salary: '$140K' },
    { slug: 'analytics-ic3-series-a-san-francisco', label: 'Data Analyst • Series A • SF', salary: '$115K' },
    { slug: 'analytics-ic4-series-a-new-york', label: 'Senior Analyst • Series A • NY', salary: '$135K' },
    
    // Remote/Other
    { slug: 'engineering-ic4-series-a-los-angeles', label: 'Senior Engineer • Series A • LA', salary: '$155K' },
    { slug: 'engineering-ic4-series-a-boulder', label: 'Senior Engineer • Series A • Boulder', salary: '$145K' },
    { slug: 'product-ic4-series-a-los-angeles', label: 'Senior PM • Series A • LA', salary: '$150K' },
    { slug: 'design-ic4-series-a-los-angeles', label: 'Senior Designer • Series A • LA', salary: '$145K' },
    
    // Principal/IC8
    { slug: 'engineering-ic8-series-a-san-francisco', label: 'Principal Engineer • Series A • SF', salary: '$260K' },
    { slug: 'engineering-ic8-series-b-san-francisco', label: 'Principal Engineer • Series B • SF', salary: '$280K' },
    { slug: 'product-ic8-series-a-san-francisco', label: 'Principal PM • Series A • SF', salary: '$240K' },
    { slug: 'data-ic8-series-a-san-francisco', label: 'Principal Data Scientist • Series A • SF', salary: '$250K' },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">
            Know Your Worth at Startups
          </h1>
          <p className="text-xl text-gray-600">
            Real compensation data from $1M to $200M+ startups
          </p>
        </div>

        {/* Browse by Category */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Link
            href="/roles"
            className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-lg p-8 hover:shadow-xl transition text-center"
          >
            <div className="text-4xl mb-3">💼</div>
            <h2 className="text-2xl font-bold mb-2">Browse by Role</h2>
            <p className="text-blue-100">Engineering, Product, Design, Data, Analytics</p>
            <p className="mt-4 font-semibold">View all roles →</p>
          </Link>

          <Link
            href="/locations"
            className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-lg p-8 hover:shadow-xl transition text-center"
          >
            <div className="text-4xl mb-3">📍</div>
            <h2 className="text-2xl font-bold mb-2">Browse by Location</h2>
            <p className="text-purple-100">SF, NYC, Seattle, Austin, Boston + 3 more</p>
            <p className="mt-4 font-semibold">View all locations →</p>
          </Link>

          <Link
            href="/stages"
            className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-lg p-8 hover:shadow-xl transition text-center"
          >
            <div className="text-4xl mb-3">🚀</div>
            <h2 className="text-2xl font-bold mb-2">Browse by Stage</h2>
            <p className="text-green-100">Seed to Pre-IPO (6 funding stages)</p>
            <p className="mt-4 font-semibold">View all stages →</p>
          </Link>
        </div>

        {/* Popular Combinations */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold mb-6">Popular Compensation Benchmarks</h2>
          <p className="text-gray-600 mb-6">
            View the most-searched role + level + stage + location combinations.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {popularCombos.map((combo) => (
              <Link
                key={combo.slug}
                href={`/compensation/${combo.slug}`}
                className="block p-4 border rounded-lg hover:border-blue-500 hover:shadow-md transition"
              >
                <h3 className="font-semibold text-sm mb-1">{combo.label}</h3>
                <p className="text-blue-600 font-bold">{combo.salary}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">58,752</div>
            <p className="text-gray-600">Data Points</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">5</div>
            <p className="text-gray-600">Roles Covered</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">8</div>
            <p className="text-gray-600">Major Cities</p>
          </div>
        </div>

        {/* Why RoleOffer */}
        <div className="bg-blue-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4">Why RoleOffer?</h2>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">✓</span>
              <span>Real benchmark data from Carta, H1B, and salary transparency postings</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">✓</span>
              <span>Covers 6 funding stages from Seed to $200M+</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">✓</span>
              <span>Percentile breakdowns (p25, p50, p75, p90)</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">✓</span>
              <span>Total compensation including equity</span>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
