'use client';
import { useState } from 'react';

type AccordionItem = {
    title: string;
    content: string;
    icon: string;
};

export default function TrustAccordion({ locationName }: { locationName: string }) {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const items: AccordionItem[] = [
        {
            title: "Instant OTP Bridging",
            icon: "⚡",
            content: "We've eliminated the 'eCitizen Timeout' frustration. Our real-time bridging system receives and processes your eCitizen OTPs instantly through our secure agent terminal, ensuring your session never expires while you're looking for your phone."
        },
        {
            title: "Document Encryption & Privacy",
            icon: "🛡️",
            content: `Your data security is non-negotiable. All sensitive ID scans and PII are encrypted with military-grade AES-256 encryption. Complying with the Kenya Data Protection Act, every file is automatically purged from our ${locationName} servers exactly 48 hours after application completion.`
        },
        {
            title: "Expert Human Oversight",
            icon: "👨‍💻",
            content: "Unlike standard DIY portals, every application submitted through our bridge is manually reviewed by a professional eCitizen agent. We pre-verify your KRA PIN and ID details to ensure a 100% first-time approval rate for all government services."
        },
        {
            title: "Local Branch Integration",
            icon: "📍",
            content: `Specifically optimized for residents in ${locationName}. We understand the local regional requirements for fingerprinting centers and preferred collection points in ${locationName}, saving you hours of trial and error.`
        }
    ];

    return (
        <div className="space-y-4 w-full">
            {items.map((item, index) => (
                <div 
                    key={index}
                    className={`border transition-all duration-500 rounded-3xl overflow-hidden ${
                        openIndex === index 
                        ? 'border-emerald-500 bg-white shadow-xl shadow-emerald-500/5' 
                        : 'border-slate-100 bg-white shadow-sm'
                    }`}
                >
                    <button
                        onClick={() => setOpenIndex(openIndex === index ? null : index)}
                        className="w-full px-8 py-6 flex items-center justify-between text-left group"
                    >
                        <div className="flex items-center gap-6">
                            <span className={`text-2xl transition-transform duration-500 ${openIndex === index ? 'scale-125' : 'grayscale opacity-50'}`}>
                                {item.icon}
                            </span>
                            <span className={`text-lg font-black tracking-tight transition-colors ${
                                openIndex === index ? 'text-emerald-600' : 'text-slate-900 group-hover:text-emerald-500'
                            }`}>
                                {item.title}
                            </span>
                        </div>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 ${
                            openIndex === index ? 'bg-emerald-600 text-white rotate-180' : 'bg-slate-50 text-slate-400 rotate-0'
                        }`}>
                            <span className="text-xl">⌄</span>
                        </div>
                    </button>
                    
                    <div 
                        className={`transition-all duration-500 ease-in-out ${
                            openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
                        }`}
                    >
                        <div className="px-8 pb-8 pt-2">
                            <p className="text-slate-500 font-medium leading-relaxed italic border-l-4 border-emerald-500/10 pl-6">
                                &quot;{item.content}&quot;
                            </p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
