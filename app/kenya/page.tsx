import prisma from '@/lib/prisma';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "eCitizen Services in All Kenyan Towns & Cities | Find Your Location",
  description: "Access eCitizen services across 500+ Kenyan towns. Find NTSA, DCI Good Conduct, Business Registration, and KRA services near you. County-by-county coverage.",
  alternates: {
    canonical: "https://cyberecitizen.com/kenya",
  },
};

export default async function KenyaHub() {
  const locations = await prisma.location.findMany({
    orderBy: { name: 'asc' }
  });

  // Group by first letter for a clean UI
  const grouped = locations.reduce((acc: Record<string, any[]>, loc: any) => {
    const firstLetter = loc.name[0].toUpperCase();
    if (!acc[firstLetter]) acc[firstLetter] = [];
    acc[firstLetter].push(loc);
    return acc;
  }, {});

  const alphabet = Object.keys(grouped).sort();

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero */}
      <section className="bg-slate-900 pt-24 pb-16 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 blur-[120px] rounded-full -mr-24 -mt-24"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
            <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-8">
                Kenya <span className="text-gradient">Locations</span>
            </h1>
            <p className="text-slate-400 text-base max-w-xl mx-auto italic font-medium leading-relaxed">
                "Connecting every citizen to digital infrastructure across 500+ administrative nodes."
            </p>
        </div>
      </section>

      {/* Quick Nav */}
      <div className="sticky top-20 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200 py-4 shadow-sm overflow-x-auto no-scrollbar">
          <div className="max-w-7xl mx-auto px-6 flex justify-center gap-4">
              {alphabet.map((letter: string) => (
                  <a key={letter} href={`#letter-${letter}`} className="w-8 h-8 flex items-center justify-center font-black text-xs text-slate-400 hover:text-emerald-600 transition-colors uppercase">
                      {letter}
                  </a>
              ))}
          </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 py-14">
          <div className="space-y-16">
              {alphabet.map((letter: string) => (
                  <div key={letter} id={`letter-${letter}`} className="relative">
                      <div className="absolute -left-12 top-0 text-8xl font-black text-slate-100/50 select-none">
                          {letter}
                      </div>
                      <div className="relative pt-12">
                          <h2 className="text-2xl font-black text-slate-900 mb-6 border-b-4 border-emerald-600 w-fit pb-2">
                              {letter}
                          </h2>
                          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-x-8 gap-y-4">
                              {grouped[letter].map((loc: any) => (
                                  <Link 
                                    key={loc.id} 
                                    href={`/kenya/${loc.slug}`}
                                    className="text-sm font-bold text-slate-500 hover:text-emerald-600 transition-all hover:translate-x-1"
                                  >
                                      {loc.name}
                                  </Link>
                              ))}
                          </div>
                      </div>
                  </div>
              ))}
          </div>
      </main>
    </div>
  );
}
