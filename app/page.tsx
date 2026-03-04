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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-4">
          Know Your Worth at Startups
        </h1>
        <p className="text-xl text-gray-600">
          Real compensation data from $1M to $200M+ startups
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
        <h2 className="text-2xl font-bold mb-6">
          Search Compensation Benchmarks
        </h2>
        <p className="text-gray-600 mb-4">
          Browse compensation data by role, level, funding stage, and location.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a
            href="/compensation/engineering-ic4-series-a-san-francisco"
            className="block p-4 border rounded-lg hover:border-blue-500 hover:shadow-md transition"
          >
            <h3 className="font-semibold text-lg mb-2">Senior Engineer (IC4)</h3>
            <p className="text-sm text-gray-600">$10M-$25M • San Francisco</p>
            <p className="text-blue-600 font-bold mt-2">View Benchmarks →</p>
          </a>
          
          <a
            href="/compensation/product-ic3-seed-new-york"
            className="block p-4 border rounded-lg hover:border-blue-500 hover:shadow-md transition"
          >
            <h3 className="font-semibold text-lg mb-2">Product Manager (IC3)</h3>
            <p className="text-sm text-gray-600">$1M-$10M • New York</p>
            <p className="text-blue-600 font-bold mt-2">View Benchmarks →</p>
          </a>
          
          <a
            href="/compensation/engineering-ic6-seed-san-francisco"
            className="block p-4 border rounded-lg hover:border-blue-500 hover:shadow-md transition"
          >
            <h3 className="font-semibold text-lg mb-2">Staff Engineer (IC6)</h3>
            <p className="text-sm text-gray-600">$1M-$10M • San Francisco</p>
            <p className="text-blue-600 font-bold mt-2">View Benchmarks →</p>
          </a>
          
          <a
            href="/compensation/design-ic4-seed-austin"
            className="block p-4 border rounded-lg hover:border-blue-500 hover:shadow-md transition"
          >
            <h3 className="font-semibold text-lg mb-2">Senior Designer (IC4)</h3>
            <p className="text-sm text-gray-600">$1M-$10M • Austin</p>
            <p className="text-blue-600 font-bold mt-2">View Benchmarks →</p>
          </a>
        </div>
      </div>

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
