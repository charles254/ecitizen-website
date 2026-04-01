import { MetadataRoute } from 'next';
import prisma from '@/lib/prisma';
import { SITE_CONFIG } from '@/lib/constants';

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

  // Individual location pages — medium priority (pSEO spoke pages)
  const locationEntries = locations.map((loc) => ({
    url: `${baseUrl}/kenya/${loc.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }));

  // Location-service combinations — lower priority to avoid thin content penalty
  // Only generate for top locations (first 50) to control quality
  const topLocations = locations.slice(0, 50);
  const locationServiceEntries = topLocations.flatMap((loc) =>
    services.map((ser) => ({
      url: `${baseUrl}/kenya/${loc.slug}/${ser.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.3,
    }))
  );

  return [
    homepageEntry,
    ...categoryEntries,
    ...serviceEntries,
    kenyaHubEntry,
    ...locationEntries,
    ...locationServiceEntries,
  ] as MetadataRoute.Sitemap;
}
