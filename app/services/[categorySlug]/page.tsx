import { cache } from 'react';
import prisma from '@/lib/prisma';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import SchemaMarkup from '@/components/SchemaMarkup';

export const revalidate = 86400; // Revalidate every 24 hours

// server-cache-react: Deduplicate DB query between generateMetadata and page component
const getCategoryBySlug = cache(async (slug: string) => {
  return prisma.category.findUnique({
    where: { slug },
    include: { services: true }
  });
});

// rendering-hoist-static-jsx: Image map hoisted outside component
const categoryImageMap: Record<string, string> = {
  ntsa: '/ntsa-icon.svg',
  dci: '/dci-icon.svg',
  brs: '/brs-icon.svg',
  education: '/education-icon.svg',
  'tax-services': '/tax-icon.svg',
  'civil-registration': '/civil-icon.svg',
  immigration: '/immigration-icon.svg',
  marriage: '/marriage-icon.svg',
  'social-security': '/social-security-icon.svg',
  'account-management': '/account-icon.svg',
  health: '/health-icon.svg',
};

type Props = {
  params: Promise<{ categorySlug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { categorySlug } = await params;
  const category = await getCategoryBySlug(categorySlug);

  if (!category) return { title: 'Category Not Found' };

  const title = `${category.name} Online Applications Kenya | Fast eCitizen Services`;
  const rawDescription = `Professional assistance for all ${category.name}. ${category.description} Apply online securely and get your documents processed fast.`;
  const description = rawDescription.length > 155 ? rawDescription.slice(0, 152) + '...' : rawDescription;
  return {
    title,
    description,
    alternates: {
      canonical: `https://cyberecitizen.com/services/${categorySlug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://cyberecitizen.com/services/${categorySlug}`,
      images: [{ url: 'https://cyberecitizen.com/ntsa-hero.png', width: 1200, height: 630, alt: `${category.name} eCitizen Services` }],
    },
  };
}

export default async function CategoryHub({ params }: Props) {
  const { categorySlug } = await params;
  const category = await getCategoryBySlug(categorySlug);

  if (!category) return notFound();

  const categoryContent: Record<string, { whyUs: string, requirements: string[] }> = {
    ntsa: {
      whyUs: "Direct-to-agent processing for official NTSA TIMS applications.",
      requirements: ["Original/Copy of ID", "KRA PIN Certificate", "Active Phone Number"],
    },
    dci: {
      whyUs: "Automated booking and processing for Police Clearance.",
      requirements: ["National ID Card", "Birth Certificate (Minors)", "Processing Fee (Ksh 1050)"],
    },
    brs: {
        whyUs: "End-to-end filing for business name search and registration.",
        requirements: ["3 Proposed Names", "Director ID Copy", "KRA PIN Certificate"],
    },
    immigration: {
        whyUs: "Expert guidance for complex passport and visa applications.",
        requirements: ["Birth Certificate", "Original ID", "2 Passport Photos", "Parents ID Copies"],
    },
    'tax-services': {
        whyUs: "Professional KRA tax compliance and PIN services.",
        requirements: ["ID Number", "Active Email Address", "Place of Residence"],
    },
    'civil-registration': {
        whyUs: "Hassle-free birth and death certificate processing.",
        requirements: ["Hospital Notification", "Parents ID Cards", "KRA PIN (If applicable)"],
    },
    education: {
        whyUs: "Fast-track HELB/KUCCPS student portal assistance.",
        requirements: ["KCSE Index Number", "University Admission Letter", "ID Number"],
    },
    'social-security': {
        whyUs: "Safe registration and recovery of social security details.",
        requirements: ["National ID", "Phone Number", "Employment Details"],
    },
    marriage: {
        whyUs: "Legal coordination for civil marriage notices and certificates.",
        requirements: ["Groom ID", "Bride ID", "Passport Photos", "Witness IDs"],
    },
    'account-management': {
        whyUs: "Secure eCitizen account recovery and profile updates.",
        requirements: ["ID Number", "Old Phone Number", "New SIM Card"],
    },
  };

  const currentContent = categoryContent[categorySlug] || {
    whyUs: "Expert assistance for digital citizen services.",
    requirements: ["National ID Card", "KRA PIN Certificate", "Active Phone Number"],
  };

  return (
    <div className="bg-white min-h-screen">
      <SchemaMarkup 
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          "name": category.name,
          "description": category.description,
          "provider": {
            "@type": "LocalBusiness",
            "name": "Cyber eCitizen Kenya"
          },
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": `${category.name} Services`,
            "itemListElement": category.services.map((service: any) => ({
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": service.title,
                "url": `https://cyberecitizen.com/services/${category.slug}/${service.slug}`
              },
              "price": service.price,
              "priceCurrency": "KES"
            }))
          }
        }} 
      />
      {/* Category Hero */}
      <section className="relative pt-24 pb-32 overflow-hidden bg-[#020617]">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-600/10 blur-[150px] rounded-full -mr-48 -mt-48 animate-pulse-soft"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-10">
            <div className="lg:w-2/3 text-center lg:text-left">
              <nav className="flex items-center gap-3 text-[9px] font-black uppercase tracking-[0.3em] text-slate-500 mb-5 justify-center lg:justify-start">
                  <Link href="/" className="hover:text-emerald-500 transition-colors">Digital Cyber</Link>
                  <span className="w-1 h-1 bg-slate-700 rounded-full"></span>
                  <span className="text-emerald-400">{category.name}</span>
              </nav>
              <h1 className="text-4xl md:text-6xl font-black text-white leading-tight tracking-tighter mb-5">
                {category.name.split(' ')[0]} <br/>
                <span className="text-gradient">Portal 2026</span>
              </h1>
              <p className="text-base text-slate-400 max-w-xl leading-relaxed mb-3 font-medium italic">
                &quot;{category.description}&quot;
              </p>
              <p className="text-xs text-emerald-400/80 font-bold uppercase tracking-widest mb-6">
                {currentContent.whyUs}
              </p>
              
              <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                 <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl flex items-center gap-2">
                    <span className="text-emerald-400 text-xl">⚡</span>
                    <span className="text-[10px] font-black text-white uppercase tracking-widest">Processing in 2h - 6h</span>
                 </div>
                 <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl flex items-center gap-2">
                    <span className="text-emerald-400 text-sm">🛡️</span>
                    <span className="text-[10px] font-black text-white uppercase tracking-widest">KDPA Compliant</span>
                 </div>
              </div>
            </div>

            <div className="lg:w-1/3 w-full">
                <div className="p-5 glass-dark rounded-2xl border border-white/10 relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-full h-1 gradient-brand"></div>

                    {/* Category Specific SEO Image */}
                    <div className="mb-5 w-full h-36 rounded-xl overflow-hidden border border-white/10 relative">
                        <Image 
                            src={categoryImageMap[categorySlug] || '/ntsa-hero.png'} 
                            alt={`${category.name} eCitizen Kenya Application Portal`}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                    </div>

                    <h3 className="text-base font-black text-white mb-4 uppercase tracking-tighter">Required for Submission</h3>
                    <ul className="space-y-3">
                        {currentContent.requirements.map((req: string, i: number) => (
                            <li key={i} className="flex items-center gap-3 text-slate-400 group-hover:text-white transition-colors duration-500 group-hover:translate-x-1">
                                <span className="w-6 h-6 rounded-lg bg-emerald-600/20 flex items-center justify-center text-[10px] text-emerald-400 font-black italic">{i+1}</span>
                                <span className="text-xs font-bold">{req}</span>
                            </li>
                        ))}
                    </ul>
                    <div className="mt-6 p-3 bg-white/5 rounded-xl border border-white/5 text-[9px] font-black text-slate-500 text-center uppercase tracking-widest leading-relaxed">
                        Data is automatically purged 48 hours after application completion.
                    </div>
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services List with Overlap */}
      <section className="max-w-7xl mx-auto px-6 -mt-16 relative z-20 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {category.services.map((service: { id: string; slug: string; title: string; price: number }) => (
                <Link 
                  key={service.id} 
                  href={`/services/${category.slug}/${service.slug}`}
                  className="group p-6 bg-white border border-slate-100 rounded-2xl shadow-lg hover:border-emerald-500/30 transition-premium relative overflow-hidden card-hover-effect"
                >
                    <div className="absolute top-0 right-0 w-32 h-32 gradient-brand opacity-0 group-hover:opacity-5 transition-opacity rounded-full -mr-16 -mt-16"></div>
                    <div className="w-14 h-14 bg-slate-50 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-6 transition-premium shadow-inner border border-slate-100 overflow-hidden relative">
                        {categoryImageMap[category.slug] ? (
                            <Image src={categoryImageMap[category.slug]} alt={category.name} fill className="object-cover" />
                        ) : (
                            <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.031.352 5.988 5.988 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 01-2.031.352 5.989 5.989 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971z" /></svg>
                        )}
                    </div>
                    <h4 className="text-lg font-black text-slate-900 mb-1.5 group-hover:text-emerald-600 transition-colors uppercase tracking-tight">{service.title}</h4>
                    <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-5">eCitizen eRequest</p>

                    <div className="flex items-center justify-between border-t border-slate-50 pt-5">
                        <div>
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Service Fee</p>
                            <p className="text-lg font-black text-slate-900">Ksh {service.price}</p>
                        </div>
                        <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center group-hover:bg-emerald-600 transition-all shadow-lg">
                            <span className="text-xl">➔</span>
                        </div>
                    </div>
                </Link>
            ))}

            {/* Help Card */}
            <div className="p-6 gradient-brand rounded-2xl text-white shadow-xl relative overflow-hidden flex flex-col justify-between group">
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
                <div>
                   <h4 className="text-2xl font-black tracking-tighter mb-3">Request <br/>Support</h4>
                    <p className="text-white/70 text-xs leading-relaxed font-bold mb-5 italic">&quot;Speak directly to our agents via WhatsApp for manual assistance.&quot;</p>
                </div>
                <a 
                   href="https://wa.me/254712345678" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="w-full py-3 bg-white text-slate-950 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg hover:-translate-y-1 transition-premium active:scale-95 text-center flex items-center justify-center"
                >
                   Open WhatsApp Hub
                </a>
            </div>
        </div>
      </section>

      {/* Why Us Redesign */}
      <section className="py-16 bg-slate-50 border-y border-slate-100 relative overflow-hidden">
          <div className="max-w-4xl mx-auto px-6 text-center">
              <h2 className="text-[9px] font-black text-emerald-600 uppercase tracking-[0.5em] mb-5">Expert Methodology</h2>
              <h3 className="text-3xl font-black text-slate-900 tracking-tighter mb-8">The Cyber Bridge Advantage</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-lg transition-premium">
                      <div className="text-2xl mb-4">👁️</div>
                      <h5 className="font-black text-slate-900 mb-3 uppercase tracking-tighter text-sm">No Rejected Cases</h5>
                      <p className="text-slate-500 text-sm leading-relaxed font-medium">Bypassing manual errors through automated validation of ID numbers and KRA PINs before portal submission.</p>
                  </div>
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-lg transition-premium">
                      <div className="text-2xl mb-4">🔒</div>
                      <h5 className="font-black text-slate-900 mb-3 uppercase tracking-tighter text-sm">Citizen Privacy</h5>
                      <p className="text-slate-500 text-sm leading-relaxed font-medium">Our portal utilizes single-session tokens. Once your application is marked &apos;In-Queue&apos;, your PII is encrypted and inaccessible.</p>
                  </div>
              </div>
          </div>
      </section>
    </div>
  );
}
