import prisma from '@/lib/prisma';
import Link from 'next/link';
import Image from 'next/image';
import SchemaMarkup from '@/components/SchemaMarkup';
import { FadeIn, StaggerContainer, StaggerItem, ScaleIn, CountUp } from '@/components/Motion';
import { SITE_CONFIG } from '@/lib/constants';

// rendering-hoist-static-jsx: Category icon map with consistent premium SVG style
const categoryIconMap: Record<string, string> = {
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

// rendering-hoist-static-jsx: Static schema data hoisted to module level
const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Cyber eCitizen Kenya",
  "image": "https://cyberecitizen.com/ntsa-hero.png",
  "@id": "https://cyberecitizen.com",
  "url": "https://cyberecitizen.com",
  "telephone": "+254700000000",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Nairobi CBD",
    "addressLocality": "Nairobi",
    "addressCountry": "KE"
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    "opens": "07:00",
    "closes": "22:00"
  },
  "sameAs": [
    "https://www.facebook.com/ecitizencyber",
    "https://twitter.com/ecitizencyber"
  ]
};

export default async function Home() {
  const categories = await prisma.category.findMany();

  return (
    <div className="bg-white min-h-screen font-sans selection:bg-emerald-600 selection:text-white" suppressHydrationWarning>
      <SchemaMarkup data={localBusinessSchema} />
      <SchemaMarkup 
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          "itemListElement": categories.map((cat: any, index: number) => ({
            "@type": "ListItem",
            "position": index + 1,
            "item": {
              "@type": "Service",
              "name": cat.name,
              "description": cat.description,
              "url": `${SITE_CONFIG.url}/services/${cat.slug}`
            }
          }))
        }} 
      />
      {/* Cinematic Hero */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden bg-[#020617] pt-16 pb-10">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-emerald-600/10 blur-[150px] rounded-full -mr-96 -mt-96 animate-pulse-soft"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-teal-600/10 blur-[120px] rounded-full -ml-48 -mb-48 animate-pulse-soft"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03]"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-12">
            <div className="lg:w-3/5 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 text-[9px] font-black uppercase tracking-[0.3em] mb-5 shadow-lg shadow-emerald-500/5 animate-fade-in">
                 <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                 </span>
                 Next-Gen Cyber Bridge
              </div>

              <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.1] md:leading-[0.95] tracking-[0.02em] mb-4 md:mb-6 drop-shadow-2xl animate-fade-in">
                The Smart Way <br/>
                To <span className="text-gradient drop-shadow-sm">eCitizen</span>
              </h1>

              <p className="text-lg md:text-xl text-slate-400 max-w-xl leading-relaxed mb-6 font-medium animate-fade-in">
                Professional application bridge for <span className="text-white font-bold">NTSA</span>, <span className="text-white font-bold">DCI</span>, and <span className="text-white font-bold">BRS</span>. Secure, compliant, and extraordinarily fast.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start animate-fade-in">
                 <Link href="#services" className="px-6 md:px-8 py-3 md:py-4 gradient-brand text-white rounded-xl md:rounded-2xl font-black text-sm md:text-base shadow-xl shadow-emerald-600/30 hover:-translate-y-1 hover:shadow-emerald-600/50 transition-premium active:scale-95 group text-center">
                    Start Application <span className="inline-block group-hover:translate-x-1 transition-transform ml-1">→</span>
                 </Link>
                 <Link href="/orders/track" className="px-6 md:px-8 py-3 md:py-4 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-xl md:rounded-2xl font-black text-sm md:text-base backdrop-blur-xl transition-premium shadow-lg text-center">
                    Track Progress
                 </Link>
              </div>

              <div className="mt-8 flex items-center justify-center lg:justify-start gap-8 border-t border-white/5 pt-6 animate-fade-in">
                <div className="flex -space-x-3">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-3 border-[#020617] bg-slate-800 flex items-center justify-center font-black text-[10px] text-white overflow-hidden shadow-xl relative">
                       {i < 4 && <Image src={`/ntsa-hero.png`} alt="Cyber eCitizen verified customer" fill className="object-cover opacity-50" />}
                       {i === 4 && <span className="relative z-10 text-emerald-400">+2k</span>}
                    </div>
                  ))}
                </div>
                <div>
                  <CountUp target={24500} suffix="+" className="text-white font-black text-xl tracking-tighter" />
                  <p className="text-emerald-500/60 font-black uppercase tracking-[0.2em] text-[10px]">Applications Processed</p>
                </div>
              </div>
            </div>

            <div className="lg:w-2/5 relative hidden lg:block animate-fade-in">
               <div className="relative group">
                  <div className="absolute -inset-1 gradient-brand rounded-[4rem] blur opacity-25 group-hover:opacity-40 transition-opacity"></div>
                  <div className="relative glass-dark rounded-[3rem] border border-white/10 p-8 shadow-2xl animate-float backdrop-blur-3xl overflow-hidden">
                     <div className="absolute top-0 left-0 w-full h-1 shimmer"></div>
                     <div className="space-y-8">
                         <div className="flex justify-between items-center">
                            <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 flex items-center justify-center overflow-hidden border border-emerald-500/30">
                               <Image src="/ntsa-hero.png" alt="Official NTSA Smart DL Renewal eCitizen Kenya" width={56} height={56} className="object-cover" />
                            </div>
                           <div className="text-right">
                              <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Tracking Status</p>
                              <p className="text-emerald-400 font-bold text-sm">NTSA Smart DL Renewal</p>
                           </div>
                        </div>
                        <div className="h-4 bg-white/5 rounded-full overflow-hidden">
                           <div className="h-full bg-emerald-500 w-2/3 shadow-[0_0_15px_rgba(16,185,129,0.5)]"></div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 bg-white/5 rounded-3xl border border-white/5">
                               <p className="text-[10px] text-slate-500 font-black mb-1 uppercase">Order #</p>
                               <p className="text-white font-black">7741-K</p>
                            </div>
                            <div className="p-4 bg-white/5 rounded-3xl border border-white/5">
                               <p className="text-[10px] text-slate-500 font-black mb-1 uppercase">ETA</p>
                               <p className="text-white font-black">2 Hours</p>
                            </div>
                        </div>
                        <div className="pt-4 border-t border-white/10">
                           <button className="w-full py-4 rounded-2xl bg-white text-slate-900 font-black text-xs uppercase tracking-[0.2em] shadow-xl hover:scale-105 transition-premium">
                              Check Detailed Status
                           </button>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-14 md:py-20 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn className="text-center mb-10">
            <h2 className="text-[9px] font-black text-emerald-600 uppercase tracking-[0.5em] mb-3">Simple Process</h2>
            <h3 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tighter">How It Works</h3>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { step: '01', title: 'Choose Service', desc: 'Select from NTSA, DCI, BRS, or other government services.', icon: <svg className="w-7 h-7 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg> },
              { step: '02', title: 'Fill Your Details', desc: 'Complete a simple form with your information and documents.', icon: <svg className="w-7 h-7 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg> },
              { step: '03', title: 'We Process It', desc: 'Our expert agents handle the eCitizen portal submission for you.', icon: <svg className="w-7 h-7 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg> },
              { step: '04', title: 'Get Results', desc: 'Receive your certificate or confirmation via SMS and WhatsApp.', icon: <svg className="w-7 h-7 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.745 3.745 0 011.043 3.296A3.745 3.745 0 0121 12z" /></svg> },
            ].map((item) => (
              <StaggerItem key={item.step} className="relative p-6 bg-slate-50 border border-slate-100 rounded-2xl hover:bg-white hover:shadow-lg hover:border-emerald-500/20 transition-premium group">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-11 h-11 bg-emerald-50 rounded-xl flex items-center justify-center group-hover:bg-emerald-100 transition-colors">
                    {item.icon}
                  </div>
                  <span className="text-4xl font-black text-slate-100 group-hover:text-emerald-100 transition-colors">{item.step}</span>
                </div>
                <h4 className="text-lg font-black text-slate-900 mb-2 tracking-tight">{item.title}</h4>
                <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Services Grid (Enhanced & Dense) */}
      <section id="services" className="py-14 md:py-20 bg-slate-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-emerald-600/5 blur-[200px] pointer-events-none rounded-full -mr-96 -mt-96"></div>
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn className="text-center mb-10 md:mb-14">
              <h2 className="text-[9px] font-black text-emerald-600 uppercase tracking-[0.5em] mb-3">Service Catalog 2026</h2>
              <h3 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tighter mb-3">Official eCitizen Bridge</h3>
              <p className="text-slate-500 font-medium max-w-2xl mx-auto text-base md:text-lg leading-relaxed italic">&quot;Access Kenya&apos;s digital infrastructure through a secure, high-speed human-assisted gateway.&quot;</p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {categories.map((category: { id: string; slug: string; name: string; description: string }) => (
              <Link
                key={category.id}
                href={`/services/${category.slug}`}
                className="group p-6 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-xl hover:border-emerald-500/20 transition-premium relative overflow-hidden flex flex-col justify-between"
              >
                <div className="absolute top-0 right-0 w-32 h-32 gradient-brand opacity-0 group-hover:opacity-10 rounded-full -mr-16 -mt-16 transition-all duration-500 scale-50 group-hover:scale-150"></div>
                
                <div>
                  <div className="w-14 h-14 bg-slate-50 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-6 transition-premium shadow-inner border border-slate-100 overflow-hidden relative">
                    <Image src={categoryIconMap[category.slug] || '/immigration-icon.svg'} alt={category.name} fill className="object-cover" />
                  </div>
                  
                  <h4 className="text-lg font-black text-slate-900 mb-2 group-hover:text-emerald-600 transition-colors tracking-tight uppercase">
                    {category.name}
                  </h4>
                  <p className="text-slate-500 text-[11px] leading-relaxed mb-5 font-bold opacity-70 group-hover:opacity-100 transition-opacity">
                    {category.description}
                  </p>
                </div>
                
                <div className="flex items-center justify-between border-t border-slate-50 pt-6">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-emerald-600 transition-colors">Open Gateway</span>
                  <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-premium">
                     <span className="text-lg translate-x-px">→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Digital Security & Trust (User Tips Integration) */}
      <section className="py-14 md:py-20 bg-white relative">
          <div className="max-w-7xl mx-auto px-6">
              <ScaleIn className="p-8 md:p-14 bg-slate-900 rounded-[2.5rem] text-white relative overflow-hidden shadow-2xl">
                  <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 blur-[120px] rounded-full -mr-48 -mt-48"></div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
                      <div>
                          <h2 className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.5em] mb-8">Security Advisory</h2>
                          <h3 className="text-3xl md:text-4xl font-black tracking-tighter mb-6 leading-tight">Navigating the <span className="text-gradient">Official</span> eCitizen Portal</h3>
                          <p className="text-slate-400 text-lg font-medium leading-relaxed italic mb-12">
                              &quot;As the primary gateway for Kenyan government services, security is our top priority. We ensure every transaction is handled with enterprise-grade integrity.&quot;
                          </p>
                          <div className="space-y-6">
                              <div className="flex items-start gap-5">
                                  <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold">✓</div>
                                  <div>
                                      <p className="font-black uppercase tracking-widest text-xs mb-1">Centralized Payments</p>
                                      <p className="text-slate-500 text-sm">Direct M-Pesa push and card integration via official eCitizen gateways.</p>
                                  </div>
                              </div>
                              <div className="flex items-start gap-5">
                                  <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold">✓</div>
                                  <div>
                                      <p className="font-black uppercase tracking-widest text-xs mb-1">Digital Identity Protection</p>
                                      <p className="text-slate-500 text-sm">Automatic data purging and session encryption following KDPA standards.</p>
                                  </div>
                              </div>
                          </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          <div className="p-8 bg-white/5 border border-white/5 rounded-3xl hover:bg-white/10 transition-colors">
                              <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-4">
                                <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
                              </div>
                              <h5 className="font-black text-sm uppercase tracking-widest mb-2">Check URL</h5>
                              <p className="text-slate-500 text-[10px] font-bold leading-relaxed uppercase">Always verify you are on ecitizen.go.ke when submitting direct PII.</p>
                          </div>
                          <div className="p-8 bg-white/5 border border-white/5 rounded-3xl hover:bg-white/10 transition-colors">
                              <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-4">
                                <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" /></svg>
                              </div>
                              <h5 className="font-black text-sm uppercase tracking-widest mb-2">Gateway Pay</h5>
                              <p className="text-slate-500 text-[10px] font-bold leading-relaxed uppercase">No manual transfers to personal accounts. Use provided official payment shortcodes.</p>
                          </div>
                          <div className="p-8 bg-white/5 border border-white/5 rounded-3xl hover:bg-white/10 transition-colors">
                              <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-4">
                                <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" /></svg>
                              </div>
                              <h5 className="font-black text-sm uppercase tracking-widest mb-2">Verified OTP</h5>
                              <p className="text-slate-500 text-[10px] font-bold leading-relaxed uppercase">Only provide OTPs when you trigger an action. Our agents will notify you via our dashboard.</p>
                          </div>
                          <div className="p-8 gradient-brand border border-white/5 rounded-3xl">
                              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center mb-4">
                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.745 3.745 0 011.043 3.296A3.745 3.745 0 0121 12z" /></svg>
                              </div>
                              <h5 className="font-black text-sm uppercase tracking-widest mb-2">Trust Score</h5>
                              <p className="text-white/80 text-[10px] font-bold leading-relaxed uppercase">99.9% Successful Application rate across all government departments.</p>
                          </div>
                      </div>
                  </div>
              </ScaleIn>
          </div>
      </section>

      {/* Regional Terminals - PSEO Anchor */}
      <section className="py-12 md:py-16 max-w-7xl mx-auto px-6">
          <FadeIn className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
              <div className="md:w-1/2">
                  <h2 className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.6em] mb-6">Regional Terminals</h2>
                  <h3 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter overflow-hidden">
                      Nationwide <span className="text-gradient">Connectivity</span>
                  </h3>
              </div>
              <p className="md:w-1/3 text-slate-500 font-medium text-lg italic">&quot;Connecting citizens from every corner of Kenya to the digital eCitizen infrastructure.&quot;</p>
          </FadeIn>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {[
                  { name: 'Nairobi', slug: 'nairobi-cbd', count: 1420 },
                  { name: 'Mombasa', slug: 'mombasa-island', count: 860 },
                  { name: 'Kisumu', slug: 'kisumu-city', count: 420 },
                  { name: 'Nakuru', slug: 'nakuru-town', count: 310 },
                  { name: 'Eldoret', slug: 'eldoret-town', count: 280 },
                  { name: 'Thika', slug: 'thika-town', count: 190 },
              ].map((loc) => (
                  <Link key={loc.slug} href={`/kenya/${loc.slug}`} className="group p-5 bg-slate-50 border border-slate-100 rounded-2xl hover:bg-white hover:shadow-lg hover:border-emerald-500/20 transition-premium text-center">
                      <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-emerald-100 group-hover:scale-110 transition-all duration-500 mx-auto">
                        <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>
                      </div>
                      <h4 className="font-black text-slate-900 group-hover:text-emerald-600 transition-colors uppercase tracking-widest text-[10px]">{loc.name}</h4>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">{loc.count}+ Applied</p>
                  </Link>
              ))}
          </div>

          <div className="mt-16 text-center">
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-6 pb-4 border-b border-slate-50 inline-block">Also available in</p>
              <div className="flex flex-wrap justify-center gap-x-6 gap-y-4 max-w-4xl mx-auto">
                  {['Malindi', 'Kitale', 'Kakamega', 'Bungoma', 'Machakos', 'Meru', 'Nyeri', 'Kericho', 'Kisii', 'Naivasha', 'Garissa', 'Isiolo', 'Embu', 'Voi'].map(town => (
                      <Link key={town} href={`/kenya/${town.toLowerCase().replace(/ /g, '-')}-town`} className="text-xs font-black text-slate-400 hover:text-emerald-600 transition-colors uppercase tracking-widest">
                          {town}
                      </Link>
                  ))}
                  <Link href="/kenya" className="text-xs font-black text-emerald-600 uppercase tracking-widest animate-pulse hover:text-emerald-700 transition-colors">
                      And 50+ More →
                  </Link>
              </div>
          </div>
      </section>

      {/* Modern Proof Section */}
      <section className="bg-slate-950 py-14 md:py-20 relative overflow-hidden">
          <div className="absolute top-1/2 left-0 w-96 h-96 bg-emerald-500/10 blur-[120px] rounded-full"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-500/10 blur-[120px] rounded-full"></div>

          <StaggerContainer className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-16 relative">
              <StaggerItem className="group">
                  <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-8 border border-white/5 group-hover:scale-110 transition-transform">
                    <svg className="w-8 h-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>
                  </div>
                  <h5 className="text-xl font-black text-white mb-4 uppercase tracking-tighter">KDPA Compliant</h5>
                  <p className="text-slate-400 text-sm leading-relaxed font-medium">Strategic 48-hour data-wipe policy ensures your PII is never stored longer than necessary for processing.</p>
              </StaggerItem>
              <StaggerItem className="group">
                  <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-8 border border-white/5 group-hover:scale-110 transition-transform">
                    <svg className="w-8 h-8 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg>
                  </div>
                  <h5 className="text-xl font-black text-white mb-4 uppercase tracking-tighter">Velocity First</h5>
                  <p className="text-slate-400 text-sm leading-relaxed font-medium">Bypassing standard portal friction points through real-time OTP bridging and expert agent oversight.</p>
              </StaggerItem>
              <StaggerItem className="group">
                  <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-8 border border-white/5 group-hover:scale-110 transition-transform">
                    <svg className="w-8 h-8 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" /></svg>
                  </div>
                  <h5 className="text-xl font-black text-white mb-4 uppercase tracking-tighter">Omni-Channel</h5>
                  <p className="text-slate-400 text-sm leading-relaxed font-medium">Receive real-time updates via WhatsApp or automated SMS alerts for complete transparency.</p>
              </StaggerItem>
          </StaggerContainer>
      </section>

      {/* CTA Banner */}
      <section className="py-14 md:py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <ScaleIn className="gradient-brand rounded-[2rem] md:rounded-[3rem] p-8 md:p-14 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/10 blur-[100px] rounded-full -mr-48 -mt-48"></div>
            <div className="relative z-10">
              <h2 className="text-2xl md:text-4xl font-black text-white tracking-tighter mb-3">Ready to Get Started?</h2>
              <p className="text-white/80 text-base md:text-lg font-medium max-w-xl mx-auto mb-8">
                Join thousands of Kenyans who trust us with their eCitizen applications. Fast, secure, and hassle-free.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="#services" className="px-7 py-3.5 bg-white text-slate-900 rounded-xl font-black text-sm shadow-xl hover:-translate-y-1 hover:shadow-white/20 transition-premium active:scale-95">
                  Start Application
                </Link>
                <Link href="/orders/track" className="px-7 py-3.5 bg-white/10 text-white border border-white/20 rounded-xl font-black text-sm backdrop-blur-xl hover:bg-white/20 transition-premium">
                  Track Your Order
                </Link>
              </div>
            </div>
          </ScaleIn>
        </div>
      </section>

    </div>
  );
}
