import { MetadataRoute } from 'next';
import prisma from '@/lib/prisma';
import { SITE_CONFIG } from '@/lib/constants';
import { hasLocationEnrichment, getEnrichedServiceSlugs } from '@/lib/location-enrichment';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [categories, services, locations] = await Promise.all([
    prisma.category.findMany(),
    prisma.service.findMany({ include: { category: true } }),
    prisma.location.findMany()
  ]);

  const baseUrl = SITE_CONFIG.url;

  // Homepage — highest priority
  const homepageEntry = {
    url: baseUrl,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 1.0,
  };

  // Category hub pages — high priority (hub pages)
  const categoryEntries = categories.map((cat) => ({
    url: `${baseUrl}/services/${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  // Individual service pages — high priority (conversion pages)
  const serviceEntries = services.map((ser) => ({
    url: `${baseUrl}/services/${ser.category.slug}/${ser.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // Kenya locations directory
  const kenyaHubEntry = {
    url: `${baseUrl}/kenya`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  };

  // Individual location pages — only include enriched locations
  const locationEntries = locations
    .filter((loc) => hasLocationEnrichment(loc.slug))
    .map((loc) => ({
      url: `${baseUrl}/kenya/${loc.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }));

  // Location-service combinations — only include combos with enriched service_notes
  const locationServiceEntries = locations
    .filter((loc) => hasLocationEnrichment(loc.slug))
    .flatMap((loc) => {
      const enrichedSlugs = getEnrichedServiceSlugs(loc.slug);
      return services
        .filter((ser) => enrichedSlugs.includes(ser.slug))
        .map((ser) => ({
          url: `${baseUrl}/kenya/${loc.slug}/${ser.slug}`,
          lastModified: new Date(),
          changeFrequency: 'monthly' as const,
          priority: 0.4,
        }));
    });

  // Static pages — informational
  const staticPages = [
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.5 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.5 },
    { url: `${baseUrl}/privacy`, lastModified: new Date(), changeFrequency: 'yearly' as const, priority: 0.3 },
    { url: `${baseUrl}/terms`, lastModified: new Date(), changeFrequency: 'yearly' as const, priority: 0.3 },
  ];

  return [
    homepageEntry,
    ...staticPages,
    ...categoryEntries,
    ...serviceEntries,
    kenyaHubEntry,
    ...locationEntries,
    ...locationServiceEntries,
  ] as MetadataRoute.Sitemap;
}
