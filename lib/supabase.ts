import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper types
export type CompData = {
  id: string;
  stage: string;
  stage_label: string;
  location: string;
  location_label: string;
  role: string;
  role_label: string;
  level: string;
  level_label: string;
  level_name: string;
  percentile: string;
  salary: number;
  total_cash: number;
  equity_pct: number;
  created_at: string;
};

// Helper function to get compensation data
export async function getCompData(filters: {
  role?: string;
  level?: string;
  stage?: string;
  location?: string;
  percentile?: string;
}) {
  let query = supabase.from('comp_data').select('*');
  
  if (filters.role) query = query.eq('role', filters.role);
  if (filters.level) query = query.eq('level', filters.level);
  if (filters.stage) query = query.eq('stage', filters.stage);
  if (filters.location) query = query.eq('location', filters.location);
  if (filters.percentile) query = query.eq('percentile', filters.percentile);
  
  const { data, error } = await query;
  
  if (error) throw error;
  return data as CompData[];
}

// Parse slug to filters
export function parseSlug(slug: string) {
  // Format: {role}-{level}-{stage}-{location}
  // Example: engineering-ic4-series_a-san_francisco
  const parts = slug.split('-');
  
  // Find indices of known segments
  const stageIndex = parts.findIndex(p => ['seed', 'series', 'late'].includes(p));
  
  // Extract components
  let role = '';
  let level = '';
  let stage = '';
  let location = '';
  
  if (stageIndex > 0) {
    // Role is everything before stage
    role = parts.slice(0, stageIndex - 1).join('_');
    level = parts[stageIndex - 1];
    
    // Stage might be multi-part (e.g., series_a)
    if (parts[stageIndex] === 'series' || parts[stageIndex] === 'late') {
      stage = `${parts[stageIndex]}_${parts[stageIndex + 1]}`;
      location = parts.slice(stageIndex + 2).join('_');
    } else {
      stage = parts[stageIndex];
      location = parts.slice(stageIndex + 1).join('_');
    }
  }
  
  return { role, level, stage, location };
}

// Generate slug from filters
export function generateSlug(filters: {
  role: string;
  level: string;
  stage: string;
  location: string;
}) {
  return `${filters.role}-${filters.level}-${filters.stage}-${filters.location}`
    .replace(/_/g, '-')
    .toLowerCase();
}

// Get all unique combinations for static generation
export async function getAllCombinations() {
  // Fetch all data with pagination (Supabase default limit is 1000)
  let allData: any[] = [];
  let from = 0;
  const pageSize = 1000;
  
  while (true) {
    const { data, error } = await supabase
      .from('comp_data')
      .select('role, level, stage, location')
      .range(from, from + pageSize - 1);
    
    if (error) {
      console.error('Error fetching combinations:', error);
      break;
    }
    
    if (!data || data.length === 0) break;
    
    allData = allData.concat(data);
    
    if (data.length < pageSize) break; // Last page
    
    from += pageSize;
  }
  
  // Get unique combinations
  const combos = new Set<string>();
  allData.forEach(row => {
    combos.add(generateSlug({
      role: row.role,
      level: row.level,
      stage: row.stage,
      location: row.location
    }));
  });
  
  console.log(`Fetched ${allData.length} rows, generated ${combos.size} unique combinations for pSEO`);
  
  return Array.from(combos);
}
