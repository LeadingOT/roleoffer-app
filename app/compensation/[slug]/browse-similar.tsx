import Link from 'next/link';

type BrowseSimilarProps = {
  currentRole: string;
  currentLevel: string;
  currentStage: string;
  currentLocation: string;
};

export function BrowseSimilar({ currentRole, currentLevel, currentStage, currentLocation }: BrowseSimilarProps) {
  const roles = ['engineering', 'product', 'design', 'data', 'analytics'];
  const levels = ['ic1', 'ic3', 'ic4', 'ic6', 'ic8'];
  const stages = ['seed', 'series-a', 'series-b', 'series-c', 'late-stage', 'pre-ipo'];
  const locations = ['san-francisco', 'new-york', 'seattle', 'austin', 'boston', 'los-angeles', 'boulder', 'atlanta'];
  
  const levelLabels: Record<string, string> = {
    'ic1': 'Junior',
    'ic3': 'Mid-level',
    'ic4': 'Senior',
    'ic6': 'Staff',
    'ic8': 'Principal',
  };
  
  const stageLabels: Record<string, string> = {
    'seed': 'Seed',
    'series-a': 'Series A',
    'series-b': 'Series B',
    'series-c': 'Series C',
    'late-stage': 'Late Stage',
    'pre-ipo': 'Pre-IPO',
  };
  
  // Similar roles (same level/stage/location, different role)
  const similarRoles = roles
    .filter(r => r !== currentRole)
    .slice(0, 4)
    .map(role => ({
      slug: `${role}-${currentLevel}-${currentStage}-${currentLocation}`,
      label: `${role.charAt(0).toUpperCase() + role.slice(1)} (${levelLabels[currentLevel]})`,
    }));
  
  // Same role, different levels
  const differentLevels = levels
    .filter(l => l !== currentLevel)
    .map(level => ({
      slug: `${currentRole}-${level}-${currentStage}-${currentLocation}`,
      label: `${levelLabels[level]} ${currentRole.charAt(0).toUpperCase() + currentRole.slice(1)}`,
    }));
  
  // Same role/level, different stages
  const differentStages = stages
    .filter(s => s !== currentStage)
    .slice(0, 4)
    .map(stage => ({
      slug: `${currentRole}-${currentLevel}-${stage}-${currentLocation}`,
      label: `${stageLabels[stage]} Stage`,
    }));
  
  // Same role/level/stage, different locations
  const differentLocations = locations
    .filter(l => l !== currentLocation)
    .slice(0, 4)
    .map(loc => ({
      slug: `${currentRole}-${currentLevel}-${currentStage}-${loc}`,
      label: loc.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
    }));
  
  return (
    <div className="bg-gray-50 rounded-lg p-8 mb-8">
      <h2 className="text-2xl font-bold mb-6">Browse Similar Roles</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Different Roles */}
        <div>
          <h3 className="font-semibold mb-3 text-gray-700">Other Roles (Same Level & Stage)</h3>
          <div className="space-y-2">
            {similarRoles.map(item => (
              <Link
                key={item.slug}
                href={`/compensation/${item.slug}`}
                className="block text-blue-600 hover:text-blue-800 hover:underline text-sm"
              >
                → {item.label}
              </Link>
            ))}
          </div>
        </div>
        
        {/* Different Levels */}
        <div>
          <h3 className="font-semibold mb-3 text-gray-700">Different Levels (Same Role)</h3>
          <div className="space-y-2">
            {differentLevels.map(item => (
              <Link
                key={item.slug}
                href={`/compensation/${item.slug}`}
                className="block text-blue-600 hover:text-blue-800 hover:underline text-sm"
              >
                → {item.label}
              </Link>
            ))}
          </div>
        </div>
        
        {/* Different Stages */}
        <div>
          <h3 className="font-semibold mb-3 text-gray-700">Other Funding Stages</h3>
          <div className="space-y-2">
            {differentStages.map(item => (
              <Link
                key={item.slug}
                href={`/compensation/${item.slug}`}
                className="block text-blue-600 hover:text-blue-800 hover:underline text-sm"
              >
                → {item.label}
              </Link>
            ))}
          </div>
        </div>
        
        {/* Different Locations */}
        <div>
          <h3 className="font-semibold mb-3 text-gray-700">Other Locations</h3>
          <div className="space-y-2">
            {differentLocations.map(item => (
              <Link
                key={item.slug}
                href={`/compensation/${item.slug}`}
                className="block text-blue-600 hover:text-blue-800 hover:underline text-sm"
              >
                → {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
      
      <div className="mt-6 pt-6 border-t border-gray-300">
        <p className="text-sm text-gray-600">
          Or browse all{' '}
          <Link href="/roles" className="text-blue-600 hover:underline">roles</Link>,{' '}
          <Link href="/locations" className="text-blue-600 hover:underline">locations</Link>, or{' '}
          <Link href="/stages" className="text-blue-600 hover:underline">stages</Link>.
        </p>
      </div>
    </div>
  );
}
