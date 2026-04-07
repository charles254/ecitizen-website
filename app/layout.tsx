import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from 'next/link';
import Script from 'next/script';
import "./globals.css";
import dynamic from 'next/dynamic';
import SchemaMarkup from "@/components/SchemaMarkup";
import MobileNav from "@/components/MobileNav";
import { SITE_CONFIG } from "@/lib/constants";

// bundle-dynamic-imports: Heavy client widgets loaded dynamically to reduce initial bundle
const SocialProofChat = dynamic(() => import("@/components/SocialProofChat"));
const WhatsAppChat = dynamic(() => import("@/components/WhatsAppChat"));

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: SITE_CONFIG.name + " | Kenyan Digital Services Expert",
  description: SITE_CONFIG.description,
  keywords: "eCitizen Kenya, NTSA Smart DL Renewal, DCI Good Conduct, Business Registration Kenya, KRA PIN services, Kenyan digital services",
  authors: [{ name: SITE_CONFIG.shortName }],
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
  alternates: {
    canonical: SITE_CONFIG.url,
  },
  openGraph: {
    type: "website",
    locale: "en_KE",
    url: SITE_CONFIG.url,
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    siteName: SITE_CONFIG.shortName,
    images: [
      {
        url: SITE_CONFIG.ogImage,
        width: 1200,
        height: 630,
        alt: SITE_CONFIG.shortName + " Digital Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    images: [SITE_CONFIG.ogImage],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32", type: "image/x-icon" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-CQLQRNTE6C" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-CQLQRNTE6C');
          `}
        </Script>
        <SchemaMarkup 
          data={{
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": SITE_CONFIG.shortName,
            "url": SITE_CONFIG.url,
            "logo": `${SITE_CONFIG.url}/logo.png`,
            "description": SITE_CONFIG.description,
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": SITE_CONFIG.contact.phone,
              "contactType": "customer service",
              "areaServed": "KE",
              "availableLanguage": "en"
            },
            "sameAs": [
              SITE_CONFIG.socials.facebook,
              SITE_CONFIG.socials.twitter
            ]
          }} 
        />
        <SchemaMarkup 
          data={{
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": SITE_CONFIG.name,
            "url": SITE_CONFIG.url,
            "potentialAction": {
              "@type": "SearchAction",
              "target": `${SITE_CONFIG.url}/search?q={search_term_string}`,
              "query-input": "required name=search_term_string"
            }
          }} 
        />
      </head>
      <body className={`${inter.className} antialiased text-slate-900 bg-slate-50 overflow-x-hidden`}>
        <div className="w-full bg-white min-h-screen relative">
          {/* Transparent Glassmorphism Header */}
          <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-slate-200/50">
            <div className="max-w-7xl mx-auto px-4 md:px-6 h-14 md:h-16 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 group shrink-0">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-emerald-600 rounded-xl md:rounded-2xl flex items-center justify-center text-white font-black group-hover:rotate-12 transition-premium text-sm md:text-base">C</div>
              <span className="text-lg md:text-xl font-black tracking-tighter text-slate-900 uppercase">Cyber<span className="text-emerald-600">eCitizen</span></span>
            </Link>
            
            <div className="hidden lg:flex items-center gap-8">
                <Link href="/services/ntsa" className="flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-emerald-600 transition-colors group">
                  <svg className="w-4 h-4 text-slate-400 group-hover:text-emerald-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>
                  NTSA
                </Link>
                <Link href="/services/dci" className="flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-emerald-600 transition-colors group">
                  <svg className="w-4 h-4 text-slate-400 group-hover:text-emerald-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>
                  Good Conduct
                </Link>
                <Link href="/services/brs" className="flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-emerald-600 transition-colors group">
                  <svg className="w-4 h-4 text-slate-400 group-hover:text-emerald-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                  Business
                </Link>
            </div>

            <div className="flex items-center gap-2 md:gap-4 shrink-0">
               <Link href="/orders/track" className="hidden sm:inline-flex px-3 md:px-5 py-2 md:py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-900 rounded-xl text-[10px] md:text-sm font-bold transition-premium">
                  <span className="hidden xs:inline">Track </span>Order
               </Link>
               <Link href="/admin/dashboard" className="hidden sm:inline-flex px-3 md:px-5 py-2 md:py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-[10px] md:text-sm font-black shadow-lg shadow-emerald-500/20 transition-premium">
                  <span className="hidden xs:inline">Agent </span>Login
               </Link>
               <MobileNav />
            </div>
          </div>
        </nav>

        <main className="pt-14 md:pt-16 min-h-screen">
            {children}
        </main>

        {/* Ultra-Premium Footer */}
        <footer className="bg-slate-900 pt-12 md:pt-16 pb-8 text-white">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10 md:mb-14">
                <div className="space-y-6">
                    <h4 className="text-2xl font-black uppercase tracking-tighter">{SITE_CONFIG.shortName.split(' ')[0]}<span className="text-emerald-500">{SITE_CONFIG.shortName.split(' ')[1] || ''}</span></h4>
                    <p className="text-slate-400 text-sm leading-relaxed">{SITE_CONFIG.description}</p>
                    <div className="flex gap-4">
                        <a href={SITE_CONFIG.socials.facebook} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center hover:bg-emerald-600 transition-premium group">
                            <svg className="w-5 h-5 fill-current group-hover:scale-110 transition-transform" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                        </a>
                        <a href={SITE_CONFIG.socials.twitter} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center hover:bg-emerald-600 transition-premium group">
                            <svg className="w-5 h-5 fill-current group-hover:scale-110 transition-transform" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                        </a>
                        <a href={SITE_CONFIG.socials.instagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center hover:bg-emerald-600 transition-premium group">
                            <svg className="w-5 h-5 fill-current group-hover:scale-110 transition-transform" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                        </a>
                    </div>
                </div>
                <div>
                   <h5 className="font-bold mb-6 text-slate-500 uppercase text-xs tracking-widest">Quick Access</h5>
                   <ul className="space-y-4 text-sm font-medium">
                       <li><Link href="/services/ntsa" className="flex items-center gap-2 hover:text-emerald-500 transition-colors group">
                         <svg className="w-4 h-4 text-slate-600 group-hover:text-emerald-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>
                         NTSA Services
                       </Link></li>
                       <li><Link href="/services/dci" className="flex items-center gap-2 hover:text-emerald-500 transition-colors group">
                         <svg className="w-4 h-4 text-slate-600 group-hover:text-emerald-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>
                         DCI (Good Conduct)
                       </Link></li>
                       <li><Link href="/services/brs" className="flex items-center gap-2 hover:text-emerald-500 transition-colors group">
                         <svg className="w-4 h-4 text-slate-600 group-hover:text-emerald-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                         Business Registration
                       </Link></li>
                       <li><Link href="/about" className="flex items-center gap-2 hover:text-emerald-500 transition-colors group">
                         <svg className="w-4 h-4 text-slate-600 group-hover:text-emerald-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" /></svg>
                         About Us
                       </Link></li>
                       <li><Link href="/contact" className="flex items-center gap-2 hover:text-emerald-500 transition-colors group">
                         <svg className="w-4 h-4 text-slate-600 group-hover:text-emerald-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>
                         Contact Us
                       </Link></li>
                   </ul>
                </div>
                <div>
                   <h5 className="font-bold mb-6 text-slate-500 uppercase text-xs tracking-widest">Support</h5>
                    <ul className="space-y-4 text-sm font-medium text-slate-400">
                        <li><a href={`https://wa.me/${SITE_CONFIG.contact.whatsapp}`} className="flex items-center gap-2 hover:text-emerald-500 transition-colors group">
                          <svg className="w-4 h-4 group-hover:text-emerald-400 transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                          WhatsApp Helpdesk
                        </a></li>
                        <li><a href={`mailto:${SITE_CONFIG.contact.email}`} className="flex items-center gap-2 hover:text-emerald-500 transition-colors group">
                          <svg className="w-4 h-4 group-hover:text-emerald-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>
                          Email Support
                        </a></li>
                        <li><Link href="/privacy" className="flex items-center gap-2 hover:text-emerald-500 transition-colors group">
                          <svg className="w-4 h-4 group-hover:text-emerald-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" /></svg>
                          Privacy Policy
                        </Link></li>
                        <li><Link href="/terms" className="flex items-center gap-2 hover:text-emerald-500 transition-colors group">
                          <svg className="w-4 h-4 group-hover:text-emerald-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>
                          Terms of Service
                        </Link></li>
                    </ul>
                </div>
                <div className="bg-white/5 p-8 rounded-3xl border border-white/5">
                    <h5 className="font-bold mb-2 text-white">Operational Hours</h5>
                    <p className="text-slate-400 text-sm">Mon - Sun: 7:00 AM - 10:00 PM</p>
                    <div className="mt-6 flex items-center gap-2 text-emerald-400 text-xs font-bold ring-1 ring-emerald-400/20 px-3 py-1 rounded-full w-fit">
                        <span className="animate-pulse">●</span> Active Now
                    </div>
                </div>
            </div>
            <div className="max-w-7xl mx-auto px-6 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                <p className="text-slate-500 text-xs font-medium">© 2026 Digital Cyber Cafe. Not affiliated with the Kenya Government.</p>
                <div className="flex gap-8 text-[10px] font-black uppercase tracking-widest text-slate-500">
                    <span className="flex items-center gap-2"><span className="w-2 h-2 bg-emerald-500 rounded-full"></span> KDPA COMPLIANT</span>
                    <span className="flex items-center gap-2"><span className="w-2 h-2 bg-green-500 rounded-full"></span> SECURE PAYMENTS</span>
                </div>
            </div>
          </footer>
        </div>
        <SocialProofChat />
        <WhatsAppChat />
      </body>
    </html>
  );
}
