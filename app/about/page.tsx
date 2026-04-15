import { Metadata } from 'next';
import Link from 'next/link';
import { SITE_CONFIG } from '@/lib/constants';

export const revalidate = 86400; // Revalidate every 24 hours

export const metadata: Metadata = {
  title: `About Us | ${SITE_CONFIG.shortName}`,
  description: `Learn about ${SITE_CONFIG.shortName} — Kenya's trusted eCitizen application bridge. Our mission, team, and commitment to secure digital government services.`,
  alternates: {
    canonical: `${SITE_CONFIG.url}/about`,
  },
  openGraph: {
    title: `About Us | ${SITE_CONFIG.shortName}`,
    description: `Learn about ${SITE_CONFIG.shortName} — Kenya's trusted eCitizen application bridge. Our mission, team, and commitment to secure digital government services.`,
    url: `${SITE_CONFIG.url}/about`,
  },
};

export default function AboutPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <section className="relative pt-24 pb-14 overflow-hidden bg-[#020617]">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-600/10 blur-[150px] rounded-full -mr-48 -mt-48"></div>
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          <p className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.5em] mb-6">Who We Are</p>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-6">
            About <span className="text-gradient">Cyber eCitizen</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed font-medium">
            Kenya&apos;s premier digital bridge for government eCitizen services. Fast, secure, and KDPA compliant.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-14 max-w-4xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center mb-6">
              <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg>
            </div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tighter mb-3">Our Mission</h2>
            <p className="text-slate-600 leading-relaxed">
              We exist to simplify access to Kenya&apos;s government digital services. Navigating the eCitizen portal can be complex and time-consuming. Our expert agents bridge that gap — handling form submissions, OTP verification, and document processing on your behalf, so you get results without the friction.
            </p>
          </div>
          <div>
            <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center mb-6">
              <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>
            </div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tighter mb-3">Our Promise</h2>
            <p className="text-slate-600 leading-relaxed">
              Every application is handled with enterprise-grade security. Your personal data is encrypted with AES-256 and automatically purged within 48 hours of processing, in full compliance with the Kenya Data Protection Act (KDPA).
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-slate-50 border-y border-slate-100">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: '24,500+', label: 'Applications Processed' },
            { value: '500+', label: 'Towns Covered' },
            { value: '99.9%', label: 'Success Rate' },
            { value: '2-6h', label: 'Average Processing' },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="text-2xl md:text-3xl font-black text-slate-900 tracking-tighter">{stat.value}</p>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-2">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Services We Cover */}
      <section className="py-14 max-w-4xl mx-auto px-6">
        <h2 className="text-3xl font-black text-slate-900 tracking-tighter mb-10 text-center">Services We Cover</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { name: 'NTSA Services', desc: 'Smart DL, Logbook Transfer, Renewals', icon: <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg> },
            { name: 'DCI Good Conduct', desc: 'Police Clearance Certificates', icon: <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg> },
            { name: 'Business Registration', desc: 'BRS, Company Names, CR12', icon: <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg> },
            { name: 'KRA & Tax', desc: 'PIN Application, eTIMS, Compliance', icon: <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" /></svg> },
            { name: 'Immigration', desc: 'Passports, Visas, Permits', icon: <svg className="w-5 h-5 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" /></svg> },
            { name: 'Civil Registration', desc: 'Birth, Death, Marriage Certificates', icon: <svg className="w-5 h-5 text-violet-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z" /></svg> },
          ].map((service) => (
            <div key={service.name} className="p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:shadow-lg hover:border-emerald-500/20 transition-premium">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center mb-4 shadow-sm">{service.icon}</div>
              <h3 className="font-black text-slate-900 text-sm uppercase tracking-tight mb-1">{service.name}</h3>
              <p className="text-xs text-slate-500">{service.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-black text-slate-900 tracking-tighter mb-3">Ready to Get Started?</h2>
          <p className="text-slate-500 mb-8 max-w-xl mx-auto">Join thousands of Kenyans who trust us with their eCitizen applications.</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/#services" className="px-8 py-4 gradient-brand text-white rounded-2xl font-black shadow-xl hover:-translate-y-1 transition-premium">Start Application</Link>
            <Link href="/contact" className="px-8 py-4 bg-white text-slate-900 border border-slate-200 rounded-2xl font-black shadow-sm hover:-translate-y-1 transition-premium">Contact Us</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
