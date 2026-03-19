import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Browse Compensation by Location - RoleOffer',
  description: 'View startup compensation benchmarks for major tech hubs: San Francisco, New York, Seattle, Austin, Boston, Los Angeles, Boulder, and more.',
};

const locations = [
  {
    id: 'san-francisco',
    label: 'San Francisco, CA',
    description: 'The heart of tech. Highest comp but also highest cost of living.',
    icon: '🌉',
    medianSalary: '$180K+',
    startupCount: '5,000+',
    topRoles: ['engineering', 'product', 'design', 'data'],
  },
  {
    id: 'new-york',
    label: 'New York, NY',
    description: 'Fintech and enterprise hub. Strong compensation, competitive market.',
    icon: '🗽',
    medianSalary: '$170K+',
    startupCount: '3,500+',
    topRoles: ['product', 'engineering', 'analytics', 'data'],
  },
  {
    id: 'seattle',
    label: 'Seattle, WA',
    description: 'Amazon/Microsoft overflow. Great comp, no state income tax.',
    icon: '🌲',
    medianSalary: '$165K+',
    startupCount: '2,000+',
    topRoles: ['engineering', 'data', 'product', 'analytics'],
  },
  {
    id: 'austin',
    label: 'Austin, TX',
    description: 'Fast-growing scene. Lower cost, no state tax, competitive salaries.',
    icon: '🤠',
    medianSalary: '$145K+',
    startupCount: '1,800+',
    topRoles: ['engineering', 'design', 'product', 'analytics'],
  },
  {
    id: 'boston',
    label: 'Boston, MA',
    description: 'Biotech and deep-tech. Strong academic talent pipeline.',
    icon: '🎓',
    medianSalary: '$155K+',
    startupCount: '1,500+',
    topRoles: ['engineering', 'data', 'product', 'analytics'],
  },
  {
    id: 'los-angeles',
    label: 'Los Angeles, CA',
    description: 'Entertainment tech, creator economy. Growing startup scene.',
    icon: '🎬',
    medianSalary: '$150K+',
    startupCount: '1,200+',
    topRoles: ['design', 'engineering', 'product', 'analytics'],
  },
  {
    id: 'boulder',
    label: 'Boulder, CO',
    description: 'Quality of life champion. Strong hardware/outdoor tech focus.',
    icon: '⛰️',
    medianSalary: '$140K+',
    startupCount: '800+',
    topRoles: ['engineering', 'product', 'data', 'design'],
  },
  {
    id: 'atlanta',
    label: 'Atlanta, GA',
    description: 'Emerging tech hub. Low cost, growing VC activity.',
    icon: '🍑',
    medianSalary: '$135K+',
    startupCount: '900+',
    topRoles: ['engineering', 'analytics', 'product', 'data'],
  },
];

const stages = [
  { id: 'seed', label: 'Seed' },
  { id: 'series-a', label: 'Series A' },
  { id: 'series-b', label: 'Series B' },
  { id: 'late-stage', label: 'Late Stage' },
];

export default function LocationsPage() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-12">
        <h1 className="text-5xl font-bold mb-4">Browse Compensation by Location</h1>
        <p className="text-xl text-gray-600">
          Compare startup salaries across major tech hubs. Understand how location impacts your total compensation.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {locations.map((location) => (
          <div key={location.id} className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition">
            <div className="flex items-center mb-4">
              <span className="text-5xl mr-4">{location.icon}</span>
              <div>
                <h2 className="text-3xl font-bold">{location.label}</h2>
                <p className="text-gray-600 text-sm">{location.description}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-6 mb-6">
              <div className="bg-blue-50 rounded p-3">
                <div className="text-sm text-gray-600">Median Salary</div>
                <div className="text-xl font-bold text-blue-600">{location.medianSalary}</div>
              </div>
              <div className="bg-purple-50 rounded p-3">
                <div className="text-sm text-gray-600">Startups</div>
                <div className="text-xl font-bold text-purple-600">{location.startupCount}</div>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="font-semibold mb-3">Top Roles in {location.label.split(',')[0]}:</h3>
              <div className="space-y-2">
                {location.topRoles.map((role) => (
                  <Link
                    key={role}
                    href={`/compensation/${role}-ic4-series-a-${location.id}`}
                    className="block text-blue-600 hover:text-blue-800 hover:underline capitalize"
                  >
                    → {role.replace('-', ' ')} (Senior)
                  </Link>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <h3 className="font-semibold mb-3">By Funding Stage:</h3>
              <div className="grid grid-cols-2 gap-2">
                {stages.map((stage) => (
                  <Link
                    key={stage.id}
                    href={`/compensation/engineering-ic4-${stage.id}-${location.id}`}
                    className="text-center px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm hover:bg-gray-200 transition"
                  >
                    {stage.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-8 mb-8">
        <h2 className="text-2xl font-bold mb-4">Comparing Multiple Locations?</h2>
        <p className="mb-6">
          Our data shows that comp can vary 30-50% between SF and emerging hubs, but cost-of-living adjusted take-home is often similar. Use our benchmarks to negotiate location-adjusted offers.
        </p>
        <Link
          href="/"
          className="inline-block bg-white text-blue-600 px-6 py-3 rounded-lg font-bold hover:shadow-lg transition"
        >
          Compare Specific Roles →
        </Link>
      </div>

      <div className="bg-blue-50 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Browse by Other Dimensions</h2>
        <p className="text-gray-700">
          View by <Link href="/roles" className="text-blue-600 hover:underline">role</Link>,{' '}
          <Link href="/stages" className="text-blue-600 hover:underline">funding stage</Link>, or{' '}
          <Link href="/" className="text-blue-600 hover:underline">return home</Link>.
        </p>
      </div>
    </div>
  );
}
