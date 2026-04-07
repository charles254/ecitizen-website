import prisma from '@/lib/prisma';
import { getLocationEnrichment } from '@/lib/location-enrichment';
import DynamicOrderForm from '@/components/DynamicOrderForm';
import SchemaMarkup from '@/components/SchemaMarkup';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

type Props = {
  params: Promise<{ townSlug: string; serviceSlug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { townSlug, serviceSlug } = await params;
  const towns = await prisma.$queryRaw<Record<string, any>[]>`SELECT * FROM Location WHERE slug = ${townSlug} LIMIT 1`;
  const location = towns[0];
  const services = await prisma.$queryRaw<Record<string, any>[]>`SELECT * FROM Service WHERE slug = ${serviceSlug} LIMIT 1`;
  const service = services[0];

  if (!location || !service) return { title: 'Service Not Found' };

  const enrichment = getLocationEnrichment(townSlug);
  const hasServiceNote = enrichment?.service_notes?.[serviceSlug];

  // Noindex combos without enriched content
  const robots = !hasServiceNote ? { index: false, follow: true } : undefined;

  return {
    title: `${service.title} in ${location.name} | Cyber eCitizen`,
    description: `Apply for ${service.title} in ${location.name}, ${location.county} County. Fast, secure eCitizen processing. No queues, instant support, KDPA compliant.`,
    alternates: {
      canonical: `https://cyberecitizen.com/kenya/${townSlug}/${serviceSlug}`,
    },
    ...(robots ? { robots } : {}),
  };
}

export default async function ServiceLocationPage({ params }: Props) {
  const { townSlug, serviceSlug } = await params;
  const towns = await prisma.$queryRaw<Record<string, any>[]>`SELECT * FROM Location WHERE slug = ${townSlug} LIMIT 1`;
  const location = towns[0];
  const services = await prisma.$queryRaw<Record<string, any>[]>`SELECT * FROM Service WHERE slug = ${serviceSlug} LIMIT 1`;
  const service = services[0];

  if (!location || !service) return notFound();

  const enrichment = getLocationEnrichment(townSlug);
  const serviceNote = enrichment?.service_notes?.[serviceSlug];

  // Fetch nearby locations offering the same service
  const nearbyLocations = await prisma.$queryRaw<any[]>`
    SELECT slug, name FROM Location
    WHERE county = ${location.county} AND slug != ${townSlug}
    LIMIT 4
  `;

  return (
    <div className="bg-white min-h-screen">
      {/* FAQPage schema for enriched combos */}
      {serviceNote && (
        <SchemaMarkup data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": `How do I apply for ${service.title} in ${location.name}?`,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": `You can apply for ${service.title} in ${location.name} through our digital bridge. ${serviceNote}`
              }
            },
            {
              "@type": "Question",
              "name": `How much does ${service.title} cost in ${location.name}?`,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": `The service fee for ${service.title} in ${location.name} is Ksh ${service.price}, payable via M-Pesa. This includes our agent processing fee and portal navigation.`
              }
            }
          ]
        }} />
      )}

      <section className="relative pt-32 pb-44 overflow-hidden bg-[#020617]">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-600/10 blur-[150px] rounded-full -mr-48 -mt-48 animate-pulse-soft"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2 text-center lg:text-left">
              <nav className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-8 justify-center lg:justify-start">
                  <Link href="/kenya" className="hover:text-emerald-500 transition-colors">Kenya</Link>
                  <span className="w-1 h-1 bg-slate-700 rounded-full"></span>
                  <Link href={`/kenya/${townSlug}`} className="hover:text-emerald-500 transition-colors">{location.name}</Link>
                  <span className="w-1 h-1 bg-slate-700 rounded-full"></span>
                  <span className="text-emerald-400">{service.title}</span>
              </nav>
              <div className="flex items-center gap-6 mb-12 justify-center lg:justify-start">
                  <div className="w-24 h-24 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden relative shadow-2xl animate-float">
                      {serviceSlug.includes('dl') || serviceSlug.includes('license') ? <Image src="/ntsa-hero.png" alt="NTSA" fill className="object-cover" /> :
                       serviceSlug.includes('conduct') || serviceSlug.includes('pcc') ? <Image src="/dci-hero.png" alt="DCI" fill className="object-cover" /> :
                       serviceSlug.includes('business') || serviceSlug.includes('company') ? <Image src="/brs-hero.png" alt="BRS" fill className="object-cover" /> :
                       serviceSlug.includes('tax') || serviceSlug.includes('kra') ? <Image src="/tax-icon.png" alt="Tax" fill className="object-cover" /> :
                       <div className="text-4xl">📋</div>}
                  </div>
                  <div>
                      <p className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.5em] mb-2">Verified Terminal</p>
                      <p className="text-white font-black text-lg uppercase tracking-tighter">{location.name} Branch</p>
                  </div>
              </div>

              <h1 className="text-5xl md:text-7xl font-black text-white leading-tight tracking-tighter mb-8">
                {service.title} <br/>
                <span className="text-gradient">in {location.name}</span>
              </h1>
              <p className="text-xl text-slate-400 max-w-xl leading-relaxed mb-10 font-medium italic">
                Official application gateway for {service.title} in {location.name}, {location.county} County.
              </p>

              <div className="grid grid-cols-2 gap-4">
                  <div className="p-6 bg-white/5 border border-white/10 rounded-3xl">
                      <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Service Fee</p>
                      <p className="text-2xl font-black text-white">Ksh {service.price}</p>
                  </div>
                  <div className="p-6 bg-white/5 border border-white/10 rounded-3xl">
                      <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">ETA</p>
                      <p className="text-2xl font-black text-emerald-400">2 Hours</p>
                  </div>
              </div>
            </div>

            <div className="lg:w-1/2 w-full">
                <div className="p-10 glass rounded-[3.5rem] border border-white/10 shadow-3xl">
                    <div className="mb-10 text-center">
                        <h3 className="text-2xl font-black text-slate-950 uppercase tracking-tighter">Citizen Application</h3>
                        <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-2">{location.name} Terminal</p>
                    </div>
                    <DynamicOrderForm service={service as any} schema={service.formSchema as { name: string; label: string; type: "text" | "select" | "file"; required?: boolean; options?: string[] }[]} />
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* Location-specific service info */}
      <section className="py-32 bg-slate-50">
          <div className="max-w-4xl mx-auto px-6">
              <h2 className="text-3xl font-black text-slate-900 mb-12 tracking-tight uppercase text-center">{service.title} in {location.name}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-left">
                  <div className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100">
                      <h4 className="font-black text-slate-900 mb-4 uppercase text-sm tracking-widest underline decoration-emerald-500">Local Requirements</h4>
                      {serviceNote ? (
                        <p className="text-slate-500 text-sm leading-relaxed mb-6 font-medium">{serviceNote}</p>
                      ) : (
                        <p className="text-slate-500 text-sm leading-relaxed mb-6 font-medium">For citizens applying in <strong>{location.name}</strong>, please ensure you have your original National ID and an active eCitizen password. Fingerprinting for DCI services will be booked at your nearest local station.</p>
                      )}
                      <span className="text-xs font-black text-emerald-600 uppercase tracking-[0.2em]">Ksh {service.price} Payable via M-Pesa</span>
                  </div>
                  <div className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100">
                      <h4 className="font-black text-slate-900 mb-4 uppercase text-sm tracking-widest underline decoration-emerald-500">48h Privacy Policy</h4>
                      <p className="text-slate-500 text-sm leading-relaxed font-medium">As part of our commitment to the residents of {location.county} County, all biometric data and personal identifiers are purged automatically 48 hours after application completion.</p>
                      <span className="text-xs font-black text-emerald-600 uppercase tracking-[0.2em]">KDPA Certified System</span>
                  </div>
              </div>

              {/* Nearby locations for same service */}
              {nearbyLocations.length > 0 && (
                <div className="mt-12 text-center">
                  <h4 className="font-black text-slate-900 text-sm uppercase tracking-widest mb-6">Also Available Nearby</h4>
                  <div className="flex flex-wrap gap-3 justify-center">
                    {nearbyLocations.map((nearby: any) => (
                      <Link
                        key={nearby.slug}
                        href={`/kenya/${nearby.slug}/${serviceSlug}`}
                        className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 hover:border-emerald-500/30 hover:text-emerald-600 transition-all"
                      >
                        {service.title} in {nearby.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
          </div>
      </section>
    </div>
  );
}
