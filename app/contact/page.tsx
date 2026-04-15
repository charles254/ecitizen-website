import { Metadata } from 'next';
import Link from 'next/link';
import { SITE_CONFIG } from '@/lib/constants';

export const metadata: Metadata = {
  title: `Contact Us — WhatsApp, Phone & Email Support | ${SITE_CONFIG.shortName}`,
  description: `Get in touch with ${SITE_CONFIG.shortName}. Reach us via WhatsApp, email, or phone for eCitizen application support. Available 7 days a week, 7 AM - 10 PM.`,
  alternates: {
    canonical: `${SITE_CONFIG.url}/contact`,
  },
  openGraph: {
    title: `Contact Us — WhatsApp, Phone & Email Support | ${SITE_CONFIG.shortName}`,
    description: `Get in touch with ${SITE_CONFIG.shortName}. Reach us via WhatsApp, email, or phone for eCitizen application support. Available 7 days a week, 7 AM - 10 PM.`,
    url: `${SITE_CONFIG.url}/contact`,
  },
};

export default function ContactPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <section className="relative pt-24 pb-14 overflow-hidden bg-[#020617]">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-600/10 blur-[150px] rounded-full -mr-48 -mt-48"></div>
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          <p className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.5em] mb-6">Get In Touch</p>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-6">
            Contact <span className="text-gradient">Us</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed font-medium">
            Need help with your eCitizen application? Our support team is available 7 days a week.
          </p>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="py-14 max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* WhatsApp */}
          <a href={`https://wa.me/${SITE_CONFIG.contact.whatsapp}?text=${encodeURIComponent("Hello, I need help with my eCitizen application.")}`} target="_blank" rel="noopener noreferrer" className="group p-6 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-xl hover:border-emerald-500/20 transition-premium text-center">
            <div className="w-12 h-12 bg-[#25D366]/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6 text-[#25D366]" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            </div>
            <h3 className="text-lg font-black text-slate-900 mb-2">WhatsApp</h3>
            <p className="text-sm text-slate-500 mb-4">Fastest way to reach us. Typically replies in 5 minutes.</p>
            <span className="text-sm font-bold text-emerald-600">Chat Now</span>
          </a>

          {/* Phone */}
          <a href={`tel:${SITE_CONFIG.contact.phone}`} className="group p-6 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-xl hover:border-emerald-500/20 transition-premium text-center">
            <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>
            </div>
            <h3 className="text-lg font-black text-slate-900 mb-2">Phone</h3>
            <p className="text-sm text-slate-500 mb-4">Call us directly during business hours.</p>
            <span className="text-sm font-bold text-emerald-600">{SITE_CONFIG.contact.phone}</span>
          </a>

          {/* Email */}
          <a href={`mailto:${SITE_CONFIG.contact.email}`} className="group p-6 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-xl hover:border-emerald-500/20 transition-premium text-center">
            <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>
            </div>
            <h3 className="text-lg font-black text-slate-900 mb-2">Email</h3>
            <p className="text-sm text-slate-500 mb-4">For formal inquiries and documentation.</p>
            <span className="text-sm font-bold text-emerald-600">{SITE_CONFIG.contact.email}</span>
          </a>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-16 bg-slate-50 border-y border-slate-100">
        <div className="max-w-4xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tighter mb-6">Operational Hours</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-slate-200">
                <span className="text-sm font-bold text-slate-600">Monday - Friday</span>
                <span className="text-sm font-black text-slate-900">7:00 AM - 10:00 PM</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-slate-200">
                <span className="text-sm font-bold text-slate-600">Saturday</span>
                <span className="text-sm font-black text-slate-900">7:00 AM - 10:00 PM</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-slate-200">
                <span className="text-sm font-bold text-slate-600">Sunday</span>
                <span className="text-sm font-black text-slate-900">7:00 AM - 10:00 PM</span>
              </div>
              <div className="flex justify-between items-center py-3">
                <span className="text-sm font-bold text-slate-600">Public Holidays</span>
                <span className="text-sm font-black text-emerald-600">Open (Reduced Hours)</span>
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tighter mb-6">Location</h2>
            <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>
                </div>
                <div>
                  <p className="font-black text-slate-900 text-sm mb-1">{SITE_CONFIG.contact.address}</p>
                  <p className="text-xs text-slate-500">Serving all 47 counties digitally</p>
                </div>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                While our primary office is in Nairobi, all services are processed digitally. You can apply from anywhere in Kenya through our online platform or WhatsApp support.
              </p>
            </div>
            <div className="mt-6 p-4 bg-emerald-50 rounded-xl border border-emerald-100">
              <p className="text-xs font-bold text-emerald-700">
                All applications are processed remotely. No physical visit required.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-black text-slate-900 tracking-tighter mb-3">Start Your Application</h2>
          <p className="text-slate-500 mb-8">Skip the queues and let our experts handle your eCitizen submission.</p>
          <Link href="/#services" className="px-8 py-4 gradient-brand text-white rounded-2xl font-black shadow-xl hover:-translate-y-1 transition-premium inline-block">Browse Services</Link>
        </div>
      </section>
    </div>
  );
}
