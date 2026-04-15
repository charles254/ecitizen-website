import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Page Not Found',
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="text-center max-w-lg mx-auto px-6">
        <div className="w-20 h-20 bg-emerald-50 rounded-3xl flex items-center justify-center mx-auto mb-8">
          <svg className="w-10 h-10 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h1 className="text-4xl font-black text-slate-900 tracking-tighter mb-4">Page Not Found</h1>
        <p className="text-slate-500 mb-8">The page you are looking for does not exist or has been moved. Browse our services to find what you need.</p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link href="/" className="px-8 py-4 gradient-brand text-white rounded-2xl font-black shadow-xl hover:-translate-y-1 transition-premium">
            Go Home
          </Link>
          <Link href="/contact" className="px-8 py-4 bg-white text-slate-900 border border-slate-200 rounded-2xl font-black shadow-sm hover:-translate-y-1 transition-premium">
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
