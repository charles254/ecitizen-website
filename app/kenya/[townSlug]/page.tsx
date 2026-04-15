import { cache } from 'react';
import TrustAccordion from '@/components/TrustAccordion';
import SchemaMarkup from '@/components/SchemaMarkup';
import prisma from '@/lib/prisma';
import { getLocationEnrichment } from '@/lib/location-enrichment';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

// server-cache-react: Deduplicate location query between generateMetadata and page
const getLocationBySlug = cache(async (slug: string) => {
  const towns = await prisma.$queryRaw<any[]>`SELECT * FROM Location WHERE slug = ${slug} LIMIT 1`;
  return towns[0] || null;
});

type Props = {
  params: Promise<{ townSlug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { townSlug } = await params;
  const location = await getLocationBySlug(townSlug);

  if (!location) return { title: 'Cyber Cafe Kenya' };

  return {
    title: `eCitizen Services in ${location.name} | Apply Online`,
    description: `Fast eCitizen processing in ${location.name}, ${location.county} County: NTSA, DCI, KRA PIN, passport, and business registration. KDPA compliant.`,
    alternates: {
      canonical: `https://cyberecitizen.com/kenya/${townSlug}`,
    },
  };
}

export default async function LocationHub({ params }: Props) {
  const { townSlug } = await params;
  const location = await getLocationBySlug(townSlug);

  if (!location) return notFound();

  const enrichment = getLocationEnrichment(townSlug);

  // server-dedup-props: Only select needed fields, limit services to 1 per category
  const categories = await prisma.category.findMany({
    select: {
      id: true,
      name: true,
      slug: true,
      services: {
        select: { id: true, slug: true, title: true, price: true },
        take: 1
      }
    }
  });

  // Fetch nearby locations in the same county for cross-linking
  const nearbyLocations = await prisma.$queryRaw<any[]>`
    SELECT slug, name FROM Location
    WHERE county = ${location.county} AND slug != ${townSlug}
    LIMIT 6
  `;

  return (
    <div className="bg-white min-h-screen">
      {/* pSEO: LocalBusiness schema for location page */}
      <SchemaMarkup data={{
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": `Cyber eCitizen ${location.name}`,
        "description": `eCitizen application services in ${location.name}, ${location.county} County`,
        "url": `https://cyberecitizen.com/kenya/${townSlug}`,
        "telephone": "+254712345678",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": location.name,
          "addressRegion": location.county,
          "addressCountry": "KE"
        },
        "areaServed": {
          "@type": "City",
          "name": location.name,
          "containedInPlace": { "@type": "AdministrativeArea", "name": `${location.county} County` }
        },
        "openingHoursSpecification": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
          "opens": "07:00",
          "closes": "22:00"
        },
        "datePublished": "2025-06-01",
        "dateModified": new Date().toISOString().split('T')[0]
      }} />

      {/* FAQPage schema if enrichment available */}
      {enrichment && (
        <SchemaMarkup data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": enrichment.faqs.map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": faq.answer
            }
          }))
        }} />
      )}

      {/* Search-Ready Hero */}
      <section className="relative pt-24 pb-32 overflow-hidden bg-[#020617]">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-600/10 blur-[150px] rounded-full -mr-48 -mt-48 animate-pulse-soft"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-10">
            <div className="lg:w-2/3 text-center lg:text-left">
              <nav className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-8 justify-center lg:justify-start">
                  <Link href="/" className="hover:text-emerald-500 transition-colors">Kenya</Link>
                  <span className="w-1 h-1 bg-slate-700 rounded-full"></span>
                  <span className="text-emerald-400 capitalize">{location.county} County</span>
              </nav>
              <h1 className="text-4xl md:text-6xl font-black text-white leading-tight tracking-tighter mb-8">
                eCitizen Services <br/>
                in <span className="text-gradient capitalize">{location.name}</span>
              </h1>
              <p className="text-base text-slate-400 max-w-xl leading-relaxed mb-6 font-medium italic">
                &quot;Your trusted digital cyber bridge for all government applications in {location.name}. Avoid the queues, we process it for you.&quot;
              </p>

              <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                 <div className="px-6 py-3 bg-white/5 border border-white/10 rounded-2xl flex items-center gap-3">
                    <span className="text-emerald-400 text-xl">📍</span>
                    <span className="text-[10px] font-black text-white uppercase tracking-widest">Local Agent in {location.name}</span>
                 </div>
                 <div className="px-6 py-3 bg-white/5 border border-white/10 rounded-2xl flex items-center gap-3">
                    <span className="text-emerald-400 text-xl">🛡️</span>
                    <span className="text-[10px] font-black text-white uppercase tracking-widest">KDPA Compliant</span>
                 </div>
              </div>
            </div>

            <div className="lg:w-1/3 w-full">
                <div className="p-8 glass-dark rounded-2xl border border-white/10 relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-full h-1 gradient-brand"></div>
                    <h3 className="text-xl font-black text-white mb-6 uppercase tracking-tighter">Local Operational Stats</h3>
                    <div className="space-y-6">
                        <div className="flex justify-between items-center text-sm font-bold">
                            <span className="text-slate-400 uppercase tracking-widest text-[10px]">Processing Speed</span>
                            <span className="text-emerald-400">98% Faster</span>
                        </div>
                        <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                            <div className="h-full bg-emerald-500 w-[98%] shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                        </div>
                        <div className="flex justify-between items-center text-sm font-bold">
                            <span className="text-slate-400 uppercase tracking-widest text-[10px]">Active Orders in {location.name}</span>
                            <span className="text-emerald-400">14 Active</span>
                        </div>
                        <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                            <div className="h-full bg-emerald-500 w-[60%]"></div>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* Local Services Menu */}
      <section className="max-w-7xl mx-auto px-6 -mt-24 relative z-20 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.flatMap((cat) => cat.services).map((service) => (
                <Link
                  key={service.id}
                  href={`/kenya/${townSlug}/${service.slug}`}
                  className="group p-6 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-2xl hover:border-emerald-500/20 transition-premium relative overflow-hidden card-hover-effect"
                >
                    <div className="absolute top-0 right-0 w-32 h-32 gradient-brand opacity-0 group-hover:opacity-5 transition-opacity rounded-full -mr-16 -mt-16"></div>
                    <div className="w-20 h-20 bg-slate-50 rounded-[1.5rem] flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-6 transition-premium shadow-inner border border-slate-100 overflow-hidden relative">
                        {service.slug.includes('dl') || service.slug.includes('license') ? <Image src="/ntsa-hero.png" alt="NTSA" fill className="object-cover" /> :
                         service.slug.includes('conduct') || service.slug.includes('pcc') ? <Image src="/dci-hero.png" alt="DCI" fill className="object-cover" /> :
                         service.slug.includes('business') || service.slug.includes('company') ? <Image src="/brs-hero.png" alt="BRS" fill className="object-cover" /> :
                         service.slug.includes('tax') || service.slug.includes('kra') ? <Image src="/tax-icon.png" alt="Tax" fill className="object-cover" /> :
                         service.slug.includes('passport') || service.slug.includes('visa') ? <Image src="/immigration-icon.svg" alt="Immigration" fill className="object-cover" /> :
                         service.slug.includes('marriage') || service.slug.includes('certificate') ? <Image src="/marriage-icon.svg" alt="Marriage" fill className="object-cover" /> :
                         service.slug.includes('nssf') || service.slug.includes('nhif') ? <Image src="/social-security-icon.svg" alt="Social Security" fill className="object-cover" /> :
                         service.slug.includes('health') ? <Image src="/health-icon.svg" alt="Health" fill className="object-cover" /> :
                         <Image src="/immigration-icon.svg" alt="Service" fill className="object-cover" />}
                    </div>
                    <h4 className="text-2xl font-black text-slate-900 mb-2 group-hover:text-emerald-600 transition-colors uppercase tracking-tight">{service.title}</h4>
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-8">Available in {location.name}</p>

                    <div className="flex items-center justify-between border-t border-slate-50 pt-8">
                        <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Local Fee</p>
                            <p className="text-xl font-black text-slate-900">Ksh {service.price}</p>
                        </div>
                        <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center group-hover:bg-emerald-600 transition-all shadow-xl">
                            <span className="text-xl">➔</span>
                        </div>
                    </div>
                </Link>
            ))}

            <div className="p-10 gradient-brand rounded-2xl text-white shadow-2xl relative overflow-hidden flex flex-col justify-between group">
                <div>
                   <h4 className="text-3xl font-black tracking-tighter mb-4">Location <br/>Manager</h4>
                   <p className="text-white/70 text-sm leading-relaxed font-bold mb-8 italic">&quot;Our {location.name} branch agent handles fingerprinting bookings and file uploads for the community.&quot;</p>
                </div>
                <button className="w-full py-5 bg-white text-slate-950 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl hover:-translate-y-1 transition-premium active:scale-95">
                   Chat Local Agent
                </button>
            </div>
        </div>
      </section>

      {/* Deep Dive Section — unique prose per location */}
      {enrichment && (
        <section className="py-14 md:py-20 bg-slate-50 border-y border-slate-100">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.5em] mb-4">{location.county} County Guide</h2>
              <h3 className="text-3xl font-black text-slate-900 tracking-tighter">eCitizen Processing in {location.name}</h3>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
              <div className="prose prose-slate max-w-none text-slate-600 font-medium leading-loose">
                {enrichment.deep_dive.split('\n\n').map((paragraph, i) => (
                  <p key={i} className="mb-6">{paragraph}</p>
                ))}

                {/* Local Tips */}
                <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm mb-6">
                  <h4 className="font-black text-slate-900 text-sm uppercase tracking-widest mb-4">Local Tips for {location.name}</h4>
                  <ul className="space-y-3 text-sm">
                    {enrichment.local_tips.map((tip, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="w-5 h-5 bg-emerald-500 text-white rounded-full flex items-center justify-center text-xs font-black shrink-0 mt-0.5">{i + 1}</span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-8 bg-emerald-600 rounded-[2.5rem] text-white shadow-2xl shadow-emerald-600/20">
                    <p className="text-xs font-black uppercase tracking-[0.2em] mb-4 opacity-70">{location.county} County Support</p>
                    <h5 className="text-2xl font-black tracking-tighter leading-tight mb-6">Get your eCitizen application processed from {location.name} today.</h5>
                    <Link href="/orders/track" className="inline-block px-6 py-3 bg-white text-emerald-600 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg hover:scale-105 transition-all">
                        Contact Support
                    </Link>
                </div>
              </div>

              {/* Trust Accordion + FAQs */}
              <div className="w-full space-y-8">
                <TrustAccordion locationName={location.name} />

                {/* Unique FAQs */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                  <h4 className="font-black text-slate-900 text-sm uppercase tracking-widest mb-6">{location.name} FAQs</h4>
                  <div className="space-y-4">
                    {enrichment.faqs.map((faq, i) => (
                      <details key={i} className="group border-b border-slate-100 pb-4 last:border-0">
                        <summary className="cursor-pointer text-sm font-bold text-slate-900 group-open:text-emerald-600 transition-colors list-none flex items-center justify-between">
                          {faq.question}
                          <span className="text-emerald-500 group-open:rotate-180 transition-transform">▾</span>
                        </summary>
                        <p className="text-sm text-slate-500 mt-3 leading-relaxed">{faq.answer}</p>
                      </details>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Fallback SEO content for locations without enrichment */}
      {!enrichment && (
        <section className="py-14 md:py-20 bg-slate-50 border-y border-slate-100">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.5em] mb-4">{location.county} County Services</h2>
              <h3 className="text-3xl font-black text-slate-900 tracking-tighter">eCitizen Processing in {location.name}</h3>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
              <div className="prose prose-slate max-w-none text-slate-600 font-medium leading-loose">
                <p className="mb-6">
                  Residents of <strong>{location.name}</strong> in {location.county} County can now access all major eCitizen services
                  without visiting government offices. Our digital bridge handles the portal navigation, form submission, and OTP verification on your behalf.
                </p>
                <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm mb-6">
                  <h4 className="font-black text-slate-900 text-sm uppercase tracking-widest mb-4">Available in {location.name}</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span> NTSA Smart DL, Logbook Transfer, Renewals</li>
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span> DCI Certificate of Good Conduct</li>
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span> BRS Business Name Search & Registration</li>
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span> KRA PIN Application & Compliance</li>
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span> Civil Registration & Marriage Notices</li>
                  </ul>
                </div>
              </div>
              <div className="w-full">
                <TrustAccordion locationName={location.name} />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* pSEO: Related Locations Cross-Linking (Hub & Spoke internal linking) */}
      {nearbyLocations.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.5em] mb-4">Also in {location.county} County</h2>
            <h3 className="text-3xl font-black text-slate-900 tracking-tighter mb-10">Nearby eCitizen Service Points</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
              {nearbyLocations.map((nearby: any) => (
                <Link
                  key={nearby.slug}
                  href={`/kenya/${nearby.slug}`}
                  className="group p-6 bg-slate-50 border border-slate-100 rounded-2xl hover:bg-white hover:shadow-lg hover:border-emerald-500/20 transition-premium text-center"
                >
                  <div className="w-8 h-8 bg-emerald-50 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:bg-emerald-100 transition-colors">
                    <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>
                  </div>
                  <p className="text-xs font-black text-slate-900 group-hover:text-emerald-600 transition-colors uppercase tracking-widest">{nearby.name}</p>
                </Link>
              ))}
            </div>
            <div className="mt-8 text-center">
              <Link href="/kenya" className="text-xs font-black text-emerald-600 uppercase tracking-widest hover:text-emerald-700 transition-colors">
                View All Locations →
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
