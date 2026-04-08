import LegalPage from '@/components/LegalPage';
import { SITE_CONFIG } from '@/lib/constants';

export const metadata = {
  title: `Privacy Policy | ${SITE_CONFIG.shortName}`,
  description: `How we handle and protect your data at ${SITE_CONFIG.shortName} in compliance with the KDPA.`,
  alternates: {
    canonical: `${SITE_CONFIG.url}/privacy`,
  },
};

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" lastUpdated="March 14, 2026">
      <section className="space-y-10 text-slate-700">
        <div>
          <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight mb-4 border-b-2 border-emerald-100 pb-2">1. Data Controller Statement</h2>
          <p className="leading-relaxed">
            {SITE_CONFIG.name} (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) operates as an application bridge and human-assisted gateway for Kenyan government services. We are registered Data Controllers with the <strong>Office of the Data Protection Commissioner (ODPC)</strong> in Kenya. We respect your privacy and are committed to protecting your personal data through rigorous data governance.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight mb-4 border-b-2 border-emerald-100 pb-2">2. The 48-Hour Purge Policy</h2>
          <div className="my-6 p-8 bg-emerald-50 border border-emerald-100 rounded-3xl italic font-bold text-emerald-900 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10 text-4xl">🛡️</div>
            &quot;To remain strictly KDPA compliant, all PII (Personally Identifiable Information) including ID copies, passport photos, and application logs are automatically purged from our temporary processing servers 48 hours after your application is marked as &quot;Completed&quot; or &quot;In-Queue&quot; on the official eCitizen portal.&quot;
          </div>
        </div>

        <div>
           <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight mb-4 border-b-2 border-emerald-100 pb-2">3. Information We Process</h2>
           <p className="leading-relaxed mb-4">
             In order to facilitate your eCitizen applications, we process the following categories of data:
           </p>
           <ul className="list-disc pl-6 space-y-3 font-medium">
             <li><strong>Identity Data:</strong> National Identity Numbers, ID copies, and full names.</li>
             <li><strong>Contact Data:</strong> Mobile phone numbers and email addresses for status updates.</li>
             <li><strong>Verification Data:</strong> One-Time Passwords (OTP) provided by you to authorize agent assisted login.</li>
             <li><strong>Financial Data:</strong> M-Pesa transaction codes for government payment processing.</li>
           </ul>
        </div>

        <div>
          <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight mb-4 border-b-2 border-emerald-100 pb-2">4. Third-Party Sharing</h2>
          <p className="leading-relaxed">
            Your data is strictly shared <strong>only</strong> with Official Kenyan Government Portals (eCitizen, NTSA TIMS, iTax, BRS) through our authenticated agent sessions. No data is ever sold, leased, or shared with third-party marketing firms or advertisers.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight mb-4 border-b-2 border-emerald-100 pb-2">5. Data Subject Rights</h2>
          <p className="leading-relaxed">
            Under the Kenya Data Protection Act, you have the right to access, rectify, or request the erasure of your personal data. Given our 48-hour purge policy, most data is deleted before an erasure request can be processed. For immediate concerns, contact {SITE_CONFIG.contact.email}.
          </p>
        </div>
      </section>
    </LegalPage>
  );
}
