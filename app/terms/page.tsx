import LegalPage from '@/components/LegalPage';
import { SITE_CONFIG } from '@/lib/constants';

export const metadata = {
  title: `Terms of Service | ${SITE_CONFIG.shortName}`,
  description: `Terms and conditions for using the ${SITE_CONFIG.shortName} application bridge.`,
};

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Service" lastUpdated="March 14, 2026">
      <section className="space-y-10 text-slate-700">
        <div>
          <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight mb-4 border-b-2 border-emerald-100 pb-2">1. Scope of Service</h2>
          <p className="leading-relaxed">
            {SITE_CONFIG.name} provides technical assistance and human oversight for citizens accessing official Kenyan government digital portals. We act as an <strong>Independent Bridge</strong> and convenience layer. We are not a government agency, nor are we affiliated with the Government of Kenya beyond providing facilitated access to their public portals.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight mb-4 border-b-2 border-emerald-100 pb-2">2. Fee Structure & Payments</h2>
          <p className="leading-relaxed mb-4">
            The total cost of any service on our platform consists of:
          </p>
          <ul className="list-disc pl-6 space-y-3 font-medium">
            <li><strong>Official Statutory Fees:</strong> These are mandated by the Government of Kenya and are passed directly to eCitizen/KRA/NTSA via official payment gateways.</li>
            <li><strong>Cyber Convenience Fee:</strong> This is a service charge retained by {SITE_CONFIG.shortName} for expert guidance, cyber-cafe infrastructure, priority processing, and administrative overhead.</li>
          </ul>
          <p className="mt-4 leading-relaxed italic">
            By proceeding with a payment, you acknowledge and agree to this split fee structure.
          </p>
        </div>

        <div>
           <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight mb-4 border-b-2 border-emerald-100 pb-2">3. User Responsibility & OTPs</h2>
           <p className="leading-relaxed">
             Users are responsible for the accuracy of the information provided to us. To facilitate application completion, you may be required to provide One-Time Passwords (OTPs) sent to your registered mobile number. While we use these solely for the authorized transaction, you provide them at your own risk.
           </p>
        </div>

        <div>
           <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight mb-4 border-b-2 border-emerald-100 pb-2">4. Processing Timelines</h2>
           <p className="leading-relaxed">
             While we target a 2-hour to 6-hour processing window for most submissions into the queue, we cannot guarantee government portal uptime or the internal processing speed of government departments (e.g., DCI clearance times or NTSA logbook printing).
           </p>
        </div>

        <div>
          <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight mb-4 border-b-2 border-emerald-100 pb-2">5. Limitation of Liability</h2>
          <p className="leading-relaxed">
            {SITE_CONFIG.name} is responsible for the professional and accurate entry of your data into सरकारी portals. We are not liable for application rejections due to false information provided by the user, or policy changes enacted by government entities.
          </p>
        </div>
      </section>
    </LegalPage>
  );
}
