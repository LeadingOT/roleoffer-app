import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Browse Compensation by Funding Stage - RoleOffer',
  description: 'Compare startup compensation from Seed to Pre-IPO. Understand how funding stage impacts salary, equity, and total comp.',
};

const stages = [
  {
    id: 'seed',
    label: 'Seed Stage',
    range: '$1M - $10M',
    description: 'Early product-market fit. High equity, lower cash. Higher risk, higher potential upside.',
    icon: '🌱',
    equityRange: '0.5% - 2.5%',
    salaryMultiplier: '0.85x',
    highlights: ['Most equity', 'Founding team feel', 'Highest impact', 'Higher risk'],
  },
  {
    id: 'series-a',
    label: 'Series A',
    range: '$10M - $25M',
    description: 'Proven traction. Balanced comp. Building foundational team and scaling product.',
    icon: '🚀',
    equityRange: '0.3% - 1.5%',
    salaryMultiplier: '0.90x',
    highlights: ['Strong equity', 'Product-market fit', 'Growing fast', 'Moderate risk'],
  },
  {
    id: 'series-b',
    label: 'Series B',
    range: '$25M - $50M',
    description: 'Scaling revenue. Near-market salaries. Equity still meaningful.',
    icon: '📈',
    equityRange: '0.2% - 1.0%',
    salaryMultiplier: '0.95x',
    highlights: ['Good equity', 'Competitive salary', 'Clear path', 'Lower risk'],
  },
  {
    id: 'series-c',
    label: 'Series C',
    range: '$50M - $100M',
    description: 'Established product. Market-rate salaries. Equity compression begins.',
    icon: '💼',
    equityRange: '0.1% - 0.6%',
    salaryMultiplier: '1.0x',
    highlights: ['Market salary', 'Moderate equity', 'Stability', 'Clear roadmap'],
  },
  {
    id: 'late-stage',
    label: 'Late Stage',
    range: '$100M - $200M',
    description: 'Pre-IPO trajectory. Strong cash comp. Lower equity but lower risk.',
    icon: '🏢',
    equityRange: '0.05% - 0.3%',
    salaryMultiplier: '1.05x',
    highlights: ['High salary', 'Lower equity', 'Low risk', 'Structured'],
  },
  {
    id: 'pre-ipo',
    label: 'Pre-IPO',
    range: '$200M+',
    description: 'IPO within 1-2 years. Top-of-market salaries. RSUs instead of options.',
    icon: '🔔',
    equityRange: '0.01% - 0.15%',
    salaryMultiplier: '1.10x',
    highlights: ['Top salary', 'RSUs', 'Near-zero risk', 'FAANG-like'],
  },
];

const roles = ['engineering', 'product', 'design', 'data', 'analytics'];
const locations = ['san-francisco', 'new-york', 'seattle', 'austin'];

export default function StagesPage() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-12">
        <h1 className="text-5xl font-bold mb-4">Browse Compensation by Funding Stage</h1>
        <p className="text-xl text-gray-600">
          Understand the trade-offs between cash, equity, and risk at different startup stages.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 mb-16">
        {stages.map((stage) => (
          <div key={stage.id} className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center">
                <span className="text-5xl mr-4">{stage.icon}</span>
                <div>
                  <h2 className="text-3xl font-bold">{stage.label}</h2>
                  <p className="text-xl text-gray-600">{stage.range}</p>
                  <p className="text-gray-600 mt-2">{stage.description}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="bg-green-50 rounded-lg p-3 mb-2">
                  <div className="text-sm text-gray-600">Typical Equity</div>
                  <div className="text-lg font-bold text-green-600">{stage.equityRange}</div>
                </div>
                <div className="bg-blue-50 rounded-lg p-3">
                  <div className="text-sm text-gray-600">Salary vs Market</div>
                  <div className="text-lg font-bold text-blue-600">{stage.salaryMultiplier}</div>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold mb-3">Key Characteristics:</h3>
              <div className="flex flex-wrap gap-2">
                {stage.highlights.map((highlight) => (
                  <span
                    key={highlight}
                    className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-sm"
                  >
                    {highlight}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-3">Top Roles at {stage.label}:</h3>
                <div className="space-y-2">
                  {roles.slice(0, 4).map((role) => (
                    <Link
                      key={role}
                      href={`/compensation/${role}-ic4-${stage.id}-san-francisco`}
                      className="block text-blue-600 hover:text-blue-800 hover:underline capitalize"
                    >
                      → {role.replace('-', ' ')} (Senior)
                    </Link>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Compare Locations:</h3>
                <div className="space-y-2">
                  {locations.map((loc) => (
                    <Link
                      key={loc}
                      href={`/compensation/engineering-ic4-${stage.id}-${loc}`}
                      className="block text-blue-600 hover:text-blue-800 hover:underline capitalize"
                    >
                      → {loc.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-8">
        <h2 className="text-xl font-bold mb-3">💡 Pro Tip: Total Compensation Math</h2>
        <p className="text-gray-700">
          When comparing offers across stages, use <strong>expected value</strong> for equity:
        </p>
        <ul className="list-disc ml-6 mt-3 space-y-2 text-gray-700">
          <li>Seed: 0.5% × $500M (10% prob) = $2.5M × 10% = <strong>$250K expected</strong></li>
          <li>Series A: 0.3% × $1B (20% prob) = $3M × 20% = <strong>$600K expected</strong></li>
          <li>Late: 0.05% × $5B (60% prob) = $2.5M × 60% = <strong>$1.5M expected</strong></li>
        </ul>
        <p className="mt-3 text-gray-700">
          Later-stage offers often have <em>higher</em> expected value despite lower equity %, because probability of exit is much higher.
        </p>
      </div>

      <div className="bg-blue-50 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to Compare Specific Offers?</h2>
        <p className="text-gray-700 mb-6">
          Browse by <Link href="/roles" className="text-blue-600 hover:underline">role</Link>,{' '}
          <Link href="/locations" className="text-blue-600 hover:underline">location</Link>, or{' '}
          <Link href="/" className="text-blue-600 hover:underline">search directly</Link>.
        </p>
      </div>
    </div>
  );
}
