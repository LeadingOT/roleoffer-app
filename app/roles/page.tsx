import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Browse Compensation by Role - RoleOffer',
  description: 'View startup compensation benchmarks for Engineering, Product, Design, Data, and Analytics roles across all levels and funding stages.',
};

const roles = [
  {
    id: 'engineering',
    label: 'Engineering',
    description: 'Software engineers, full-stack developers, backend/frontend specialists',
    icon: '💻',
    levels: ['IC1 (Junior)', 'IC3 (Mid)', 'IC4 (Senior 1)', 'IC6 (Staff)', 'IC8 (Principal)'],
    topLocations: ['san-francisco', 'new-york', 'seattle', 'austin'],
  },
  {
    id: 'product',
    label: 'Product Management',
    description: 'Product managers, product leads, product directors',
    icon: '📊',
    levels: ['IC1 (Associate PM)', 'IC3 (PM)', 'IC4 (Senior PM)', 'IC6 (Staff PM)', 'IC8 (Principal PM)'],
    topLocations: ['san-francisco', 'new-york', 'boston', 'seattle'],
  },
  {
    id: 'design',
    label: 'Design',
    description: 'Product designers, UX/UI designers, design leads',
    icon: '🎨',
    levels: ['IC1 (Junior)', 'IC3 (Mid)', 'IC4 (Senior)', 'IC6 (Staff)', 'IC8 (Principal)'],
    topLocations: ['san-francisco', 'new-york', 'los-angeles', 'austin'],
  },
  {
    id: 'data',
    label: 'Data Science',
    description: 'Data scientists, ML engineers, AI researchers',
    icon: '📈',
    levels: ['IC1 (Junior)', 'IC3 (Mid)', 'IC4 (Senior)', 'IC6 (Staff)', 'IC8 (Principal)'],
    topLocations: ['san-francisco', 'new-york', 'seattle', 'boston'],
  },
  {
    id: 'analytics',
    label: 'Data Analytics',
    description: 'Data analysts, business intelligence, analytics engineers',
    icon: '📉',
    levels: ['IC1 (Junior)', 'IC3 (Mid)', 'IC4 (Senior)', 'IC6 (Staff)', 'IC8 (Principal)'],
    topLocations: ['san-francisco', 'new-york', 'chicago', 'austin'],
  },
];

const stages = [
  { id: 'seed', label: 'Seed ($1M-$10M)', shortLabel: 'Seed' },
  { id: 'series-a', label: 'Series A ($10M-$25M)', shortLabel: 'Series A' },
  { id: 'series-b', label: 'Series B ($25M-$50M)', shortLabel: 'Series B' },
  { id: 'series-c', label: 'Series C ($50M-$100M)', shortLabel: 'Series C' },
  { id: 'late-stage', label: 'Late Stage ($100M-$200M)', shortLabel: 'Late' },
  { id: 'pre-ipo', label: 'Pre-IPO ($200M+)', shortLabel: 'Pre-IPO' },
];

export default function RolesPage() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-12">
        <h1 className="text-5xl font-bold mb-4">Browse Compensation by Role</h1>
        <p className="text-xl text-gray-600">
          Select a role to view detailed compensation benchmarks across all levels, stages, and locations.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {roles.map((role) => (
          <div key={role.id} className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition">
            <div className="flex items-center mb-4">
              <span className="text-5xl mr-4">{role.icon}</span>
              <div>
                <h2 className="text-3xl font-bold">{role.label}</h2>
                <p className="text-gray-600">{role.description}</p>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="font-semibold mb-3">Available Levels:</h3>
              <div className="space-y-2">
                {role.levels.map((level, idx) => {
                  const levelId = ['ic1', 'ic3', 'ic4', 'ic6', 'ic8'][idx];
                  return (
                    <Link
                      key={levelId}
                      href={`/compensation/${role.id}-${levelId}-series-a-san-francisco`}
                      className="block text-blue-600 hover:text-blue-800 hover:underline"
                    >
                      → {level}
                    </Link>
                  );
                })}
              </div>
            </div>

            <div className="mt-6">
              <h3 className="font-semibold mb-3">Top Locations:</h3>
              <div className="flex flex-wrap gap-2">
                {role.topLocations.map((loc) => (
                  <Link
                    key={loc}
                    href={`/compensation/${role.id}-ic4-series-a-${loc}`}
                    className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm hover:bg-blue-100 transition"
                  >
                    {loc.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                  </Link>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <h3 className="font-semibold mb-3">By Funding Stage:</h3>
              <div className="grid grid-cols-3 gap-2">
                {stages.slice(0, 6).map((stage) => (
                  <Link
                    key={stage.id}
                    href={`/compensation/${role.id}-ic4-${stage.id}-san-francisco`}
                    className="text-center px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs hover:bg-gray-200 transition"
                  >
                    {stage.shortLabel}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-blue-50 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Not Sure Where to Start?</h2>
        <p className="text-gray-700 mb-6">
          Browse by <Link href="/locations" className="text-blue-600 hover:underline">location</Link>,{' '}
          <Link href="/stages" className="text-blue-600 hover:underline">funding stage</Link>, or go back to the{' '}
          <Link href="/" className="text-blue-600 hover:underline">homepage</Link>.
        </p>
      </div>
    </div>
  );
}
