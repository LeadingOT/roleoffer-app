import { Metadata } from 'next';
import { getCompData, parseSlug, getAllCombinations } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import { 
  generateOverview, 
  generateEquityInsights, 
  generateNegotiationTips,
  generateCareerProgression,
  generateLocationInsights 
} from '@/lib/content-generator';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getAllCombinations();
  // Generate all 2,160 unique combinations for full pSEO coverage
  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const filters = parseSlug(slug);
  
  const data = await getCompData(filters);
  if (!data || data.length === 0) {
    return {
      title: 'Compensation Not Found - RoleOffer',
    };
  }
  
  const sample = data[0];
  const p50Data = data.find(d => d.percentile === 'p50');
  const salary = p50Data ? p50Data.salary : sample.salary;
  
  return {
    title: `${sample.level_name} ${sample.role_label} at ${sample.stage_label} Startups in ${sample.location_label} - Compensation Benchmarks`,
    description: `Real compensation data for ${sample.level_name} ${sample.role_label} at ${sample.stage_label} startups in ${sample.location_label}. Median base salary: $${salary.toLocaleString()}. Includes equity and total comp breakdown.`,
  };
}

export default async function CompensationPage({ params }: Props) {
  const { slug } = await params;
  const filters = parseSlug(slug);
  
  const data = await getCompData(filters);
  
  if (!data || data.length === 0) {
    notFound();
  }
  
  // Group by percentile
  const byPercentile: Record<string, typeof data[0]> = {};
  data.forEach(item => {
    byPercentile[item.percentile] = item;
  });
  
  const sample = data[0];
  const p50 = byPercentile['p50'] || sample;
  
  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
          <a href="/" className="hover:text-blue-600">Home</a>
          <span>/</span>
          <span>Compensation</span>
        </div>
        <h1 className="text-4xl font-bold mb-3">
          {sample.level_name} {sample.role_label}
        </h1>
        <div className="flex gap-4 text-lg text-gray-600">
          <span>📍 {sample.location_label}</span>
          <span>•</span>
          <span>💰 {sample.stage_label} Stage</span>
        </div>
      </div>

      {/* Key Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-sm text-gray-600 mb-1">Median Base Salary (p50)</div>
          <div className="text-3xl font-bold text-blue-600">
            ${p50.salary.toLocaleString()}
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-sm text-gray-600 mb-1">Total Cash (p50)</div>
          <div className="text-3xl font-bold text-green-600">
            ${p50.total_cash.toLocaleString()}
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-sm text-gray-600 mb-1">Equity (p50)</div>
          <div className="text-3xl font-bold text-purple-600">
            {(p50.equity_pct * 100).toFixed(2)}%
          </div>
        </div>
      </div>

      {/* Percentile Breakdown */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4">Compensation Breakdown by Percentile</h2>
        <p className="text-gray-600 mb-6">
          View how compensation varies across different percentiles for this role.
        </p>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold">Percentile</th>
                <th className="px-4 py-3 text-right text-sm font-semibold">Base Salary</th>
                <th className="px-4 py-3 text-right text-sm font-semibold">Total Cash</th>
                <th className="px-4 py-3 text-right text-sm font-semibold">Equity %</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {['p25', 'p50', 'p75', 'p90'].map((percentile) => {
                const item = byPercentile[percentile];
                if (!item) return null;
                
                return (
                  <tr key={percentile} className={percentile === 'p50' ? 'bg-blue-50' : ''}>
                    <td className="px-4 py-3 font-medium">
                      {percentile === 'p25' && '25th (Entry)'}
                      {percentile === 'p50' && '50th (Median)'}
                      {percentile === 'p75' && '75th (Experienced)'}
                      {percentile === 'p90' && '90th (Top Performer)'}
                    </td>
                    <td className="px-4 py-3 text-right font-mono">
                      ${item.salary.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-right font-mono">
                      ${item.total_cash.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-right font-mono">
                      {(item.equity_pct * 100).toFixed(2)}%
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Market Overview */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4">Market Overview</h2>
        <p className="text-gray-700 leading-relaxed">
          {generateOverview({
            role: sample.role,
            role_label: sample.role_label,
            level: sample.level_label,
            level_name: sample.level_name,
            stage: sample.stage,
            stage_label: sample.stage_label,
            location: sample.location,
            location_label: sample.location_label,
            median_salary: p50.salary,
            median_equity: p50.equity_pct,
          })}
        </p>
      </div>

      {/* Equity Deep Dive */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4">Understanding Your Equity</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          {generateEquityInsights({
            role: sample.role,
            role_label: sample.role_label,
            level: sample.level_label,
            level_name: sample.level_name,
            stage: sample.stage,
            stage_label: sample.stage_label,
            location: sample.location,
            location_label: sample.location_label,
            median_salary: p50.salary,
            median_equity: p50.equity_pct,
          })}
        </p>
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-4">
          <p className="text-sm text-gray-700">
            <strong>Pro tip:</strong> Always ask about the company's fully-diluted cap table, liquidation preferences, 
            and post-termination exercise window (ideally 5-10 years, not 90 days).
          </p>
        </div>
      </div>

      {/* Negotiation Tips */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4">How to Negotiate This Offer</h2>
        <p className="text-gray-700 leading-relaxed">
          {generateNegotiationTips({
            role: sample.role,
            role_label: sample.role_label,
            level: sample.level_label,
            level_name: sample.level_name,
            stage: sample.stage,
            stage_label: sample.stage_label,
            location: sample.location,
            location_label: sample.location_label,
            median_salary: p50.salary,
            median_equity: p50.equity_pct,
          })}
        </p>
      </div>

      {/* Career Progression */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4">Career Growth Path</h2>
        <p className="text-gray-700 leading-relaxed">
          {generateCareerProgression({
            role: sample.role,
            role_label: sample.role_label,
            level: sample.level_label,
            level_name: sample.level_name,
            stage: sample.stage,
            stage_label: sample.stage_label,
            location: sample.location,
            location_label: sample.location_label,
            median_salary: p50.salary,
            median_equity: p50.equity_pct,
          })}
        </p>
      </div>

      {/* Location Context */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4">{sample.location_label} Startup Market</h2>
        <p className="text-gray-700 leading-relaxed">
          {generateLocationInsights({
            role: sample.role,
            role_label: sample.role_label,
            level: sample.level_label,
            level_name: sample.level_name,
            stage: sample.stage,
            stage_label: sample.stage_label,
            location: sample.location,
            location_label: sample.location_label,
            median_salary: p50.salary,
            median_equity: p50.equity_pct,
          })}
        </p>
      </div>

      {/* Context */}
      <div className="bg-blue-50 rounded-lg p-6 mb-8">
        <h2 className="text-xl font-bold mb-3">About This Data</h2>
        <p className="text-gray-700 mb-3">
          This compensation data is compiled from public sources including DOL H1B disclosures, 
          state salary transparency job postings, and published startup compensation surveys.
        </p>
        <ul className="space-y-2 text-sm text-gray-700">
          <li>• <strong>Role:</strong> {sample.role_label} ({sample.level_label})</li>
          <li>• <strong>Experience:</strong> {sample.level_name}</li>
          <li>• <strong>Company Stage:</strong> {sample.stage_label}</li>
          <li>• <strong>Location:</strong> {sample.location_label}</li>
          <li>• <strong>Data Freshness:</strong> Updated March 2026</li>
        </ul>
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-3">
          Need a Complete Offer Package?
        </h2>
        <p className="mb-6 text-blue-100">
          Get a customized offer letter, equity projections, and negotiation tips for just $49.
        </p>
        <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:shadow-lg transition">
          Generate My Offer →
        </button>
      </div>
    </div>
  );
}
