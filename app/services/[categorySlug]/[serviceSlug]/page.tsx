import { cache } from 'react';
import prisma from '@/lib/prisma';
import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import SchemaMarkup from '@/components/SchemaMarkup';

// bundle-dynamic-imports: Heavy form component loaded dynamically
const DynamicOrderForm = dynamic(() => import('@/components/DynamicOrderForm'), {
  loading: () => <div className="animate-pulse bg-slate-100 rounded-2xl h-96" />,
});

// server-cache-react: Deduplicate DB query between generateMetadata and page component
const getServiceBySlug = cache(async (slug: string) => {
  return prisma.service.findUnique({
    where: { slug },
    include: { category: true }
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
  params: Promise<{ categorySlug: string, serviceSlug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { categorySlug, serviceSlug } = await params;
  const service = await getServiceBySlug(serviceSlug);

  if (!service) return { title: 'Service Not Found' };

  const categoryName = service.category?.name || categorySlug;
  const title = `${service.title} | Apply Online via ${categoryName} Portal Kenya`;
  const description = `Apply for ${service.title} online in Kenya. Expert-assisted ${categoryName} processing with M-Pesa payment, real-time tracking, and KDPA-compliant data handling. Ksh ${service.price} service fee.`;
  return {
    title,
    description,
    keywords: service.seoKeywords + ', eCitizen Kenya, Online application, Cyber cafe services',
    alternates: {
        canonical: `https://cyberecitizen.com/services/${categorySlug}/${serviceSlug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://cyberecitizen.com/services/${categorySlug}/${serviceSlug}`,
    },
  };
}

export default async function ServicePage({ params }: Props) {
  const { categorySlug, serviceSlug } = await params;
  const service = await getServiceBySlug(serviceSlug);

  if (!service) return notFound();

  // Convert Json field to schema type
  const formSchema = service.formSchema as any;

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* HowTo Schema for rich snippets */}
      <SchemaMarkup data={{
        "@context": "https://schema.org",
        "@type": "HowTo",
        "name": `How to Apply for ${service.title} Online`,
        "description": `Step-by-step guide to apply for ${service.title} through our eCitizen bridge service.`,
        "step": [
          { "@type": "HowToStep", "position": 1, "name": "Fill the Application Form", "text": "Complete the required fields including your ID number and personal details." },
          { "@type": "HowToStep", "position": 2, "name": "Pay via M-Pesa", "text": `Pay the Ksh ${service.price} service fee through the M-Pesa STK push sent to your phone.` },
          { "@type": "HowToStep", "position": 3, "name": "Submit OTP", "text": "Follow the tracking link and provide your eCitizen OTP when prompted by SMS." },
          { "@type": "HowToStep", "position": 4, "name": "Receive Your Document", "text": "Get your official certificate or confirmation via SMS and WhatsApp within 48 hours." }
        ]
      }} />
      {/* FAQPage Schema for rich snippets */}
      <SchemaMarkup data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          { "@type": "Question", "name": `How long does ${service.title} processing take?`, "acceptedAnswer": { "@type": "Answer", "text": "Most applications are processed within 2-6 hours during business hours (7 AM - 10 PM)." } },
          { "@type": "Question", "name": `How much does ${service.title} cost?`, "acceptedAnswer": { "@type": "Answer", "text": `The service fee is Ksh ${service.price}, payable via M-Pesa STK push.` } },
          { "@type": "Question", "name": "Is my personal data safe?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. All data is encrypted with 256-bit AES and automatically purged 48 hours after processing, in compliance with the Kenya Data Protection Act (KDPA)." } }
        ]
      }} />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Instructions & Content (SEO) */}
          <div className="lg:col-span-4 space-y-8">
            <div className="text-sm opacity-60 flex items-center gap-2 mb-4">
                <Link href="/" className="hover:text-emerald-600">Home</Link>
                <span>/</span>
                <Link href={`/services/${categorySlug}`} className="hover:text-emerald-600">{service.category.name}</Link>
            </div>
            
            <div className="w-16 h-16 rounded-2xl bg-white border border-slate-200 flex items-center justify-center overflow-hidden relative shadow-lg mb-8 animate-float">
                {categoryImageMap[categorySlug] ? (
                    <Image src={categoryImageMap[categorySlug]} alt={service.category.name} fill className="object-cover" />
                ) : (
                    <svg className="w-10 h-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>
                )}
            </div>
            
            <h1 className="text-2xl font-black text-slate-900 leading-tight">
                {service.title} <br/>
                <span className="text-emerald-600 tracking-tighter text-lg font-bold uppercase">eCitizen Application</span>
            </h1>
            
            <div className="space-y-6">
                <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm">
                    <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                        <span className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs">!</span>
                        How it Works
                    </h3>
                    <ul className="space-y-4">
                        <li className="flex gap-3 text-sm text-slate-600">
                            <span className="font-bold text-primary">01.</span>
                            Fill in the required details in the form <span className="hidden lg:inline">on the right</span><span className="lg:hidden">below</span>.
                        </li>
                        <li className="flex gap-3 text-sm text-slate-600">
                            <span className="font-bold text-primary">02.</span>
                            Pay the service fee via the M-Pesa STK push.
                        </li>
                        <li className="flex gap-3 text-sm text-slate-600">
                            <span className="font-bold text-primary">03.</span>
                            Follow the live track link to provide your eCitizen OTP.
                        </li>
                        <li className="flex gap-3 text-sm text-slate-600">
                            <span className="font-bold text-primary">04.</span>
                            Receive your official certificate via download in 48h.
                        </li>
                    </ul>
                </div>

                <div className="p-6 bg-emerald-900 text-white rounded-2xl shadow-xl">
                    <h4 className="font-bold mb-2">Need immediate help?</h4>
                    <p className="text-emerald-200 text-sm mb-4">Our dedicated agents are standing by to help with your {service.title} application.</p>
                    <button className="w-full bg-emerald-700 hover:bg-emerald-600 py-3 rounded-xl font-bold text-sm transition-all">
                        Talk to an Agent
                    </button>
                </div>
            </div>
          </div>

          {/* Right Column: The Form */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
                <div className="gradient-brand px-5 md:px-6 py-4 md:py-5 text-white flex flex-col md:flex-row items-center justify-between gap-3 md:gap-0">
                    <div className="flex items-center gap-4 md:gap-6">
                        <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center overflow-hidden border border-white/20 shadow-xl">
                             <Image 
                                src={categoryImageMap[categorySlug] || '/ntsa-hero.png'} 
                                alt={`${service.title} Application Official eCitizen Bridge`}
                                width={64}
                                height={64}
                                className="object-cover"
                             />
                        </div>
                        <div>
                            <h2 className="text-lg md:text-xl font-bold">Secure Application Form</h2>
                            <p className="text-emerald-100 text-[10px] md:text-xs">Encryption Level: 256-bit AES</p>
                        </div>
                    </div>
                    <div className="text-center md:text-right">
                        <span className="text-xs md:text-sm opacity-70">Cyber Fee:</span>
                        <div className="text-lg md:text-xl font-black">Ksh {service.price}</div>
                    </div>
                </div>
                
                <div className="p-5 md:p-8">
                    {/* Pass the JSON schema to the client component */}
                    <DynamicOrderForm service={service} schema={formSchema} />
                    
                    <div className="mt-8 pt-8 border-t border-slate-100 flex flex-wrap gap-6 justify-center">
                         <div className="flex items-center gap-2 opacity-40 grayscale">
                             <span className="text-[10px] font-black uppercase tracking-widest">Safaricom</span>
                             <div className="w-8 h-4 bg-green-500 rounded-sm"></div>
                         </div>
                         <div className="flex items-center gap-2 opacity-40 grayscale">
                             <span className="text-[10px] font-black uppercase tracking-widest">KDPA</span>
                             <div className="w-8 h-4 bg-emerald-500 rounded-sm"></div>
                         </div>
                         <div className="flex items-center gap-2 opacity-40 grayscale">
                             <span className="text-[10px] font-black uppercase tracking-widest">SSL</span>
                             <div className="w-8 h-4 bg-slate-500 rounded-sm"></div>
                         </div>
                    </div>
                </div>
            </div>

            <div className="mt-8 text-center text-slate-400 text-xs px-8">
                By submitting this form, you authorize our agents to access your eCitizen account on your behalf for the purpose of processing the requested service. All data is handled according to the Kenya Data Protection Act.
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
