import { MetadataRoute } from 'next';
import { getAllCombinations } from '@/lib/supabase';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://roleoffer.com';
  
  // Get all compensation page slugs
  const slugs = await getAllCombinations();
  
  // Generate sitemap entries
  const compensationPages = slugs.map((slug) => ({
    url: `${baseUrl}/compensation/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));
  
  // Add static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
  ];
  
  return [...staticPages, ...compensationPages];
}
