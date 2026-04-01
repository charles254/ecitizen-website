'use client';
import { useState } from 'react';

interface Field {
  name: string;
  label: string;
  type: 'text' | 'select' | 'file';
  required?: boolean;
  options?: string[];
}

interface Service {
  id: string;
  title: string;
  price: number;
}

export default function DynamicOrderForm({ service, schema }: { service: Service, schema: Field[] }) {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(false);
  const [customerInfo, setCustomerInfo] = useState<{ name: string } | null>(null);

  const handleLookup = async (identifier: string) => {
    if (!identifier || identifier.length < 4) return;
    
    setLoading(true);
    try {
        const res = await fetch(`/api/customers/lookup?identifier=${identifier}`);
        const data = await res.json();
        
        if (data.success && data.user) {
            setCustomerInfo({ name: data.user.name });
            // Auto-fill form data with returned user fields
            const newFormData = { ...formData };
            if (data.user.name) newFormData.full_name = data.user.name;
            if (data.user.idNumber) newFormData.id_number = data.user.idNumber;
            if (data.user.kraPin) newFormData.kra_pin = data.user.kraPin;
            if (data.user.phone) newFormData.phone_number = data.user.phone;
            
            setFormData(newFormData);
        }
    } catch (err) {
        console.error('Lookup failed', err);
    } finally {
        setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'file') {
        const file = (e.target as HTMLInputElement).files?.[0];
        setFormData({ ...formData, [name]: file });
    } else {
        setFormData({ ...formData, [name]: value });
        
        // Trigger lookup if field is ID or Phone
        if (name === 'id_number' || name === 'phone_number') {
            if (value.length >= 8) {
                handleLookup(value);
            }
        }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // 1. Separate files from text data
    const textData: Record<string, any> = {};
    const fileData: Record<string, File> = {};
    
    Object.keys(formData).forEach(key => {
        if (formData[key] instanceof File) {
            fileData[key] = formData[key];
        } else {
            textData[key] = formData[key];
        }
    });

    try {
        // 2. Initiate Payment & Create Order
        const res = await fetch('/api/payments/mpesa', {
            method: 'POST',
            body: JSON.stringify({
                amount: service.price,
                phone: formData.phone_number || formData.phone || formData.id_number,
                serviceId: service.id,
                formData: textData // Send text fields only for initial record
            })
        });
        
        const payData = await res.json();
        
        if (payData.success && payData.orderId) {
            // 3. Handle File Uploads if any
            const fileKeys = Object.keys(fileData);
            if (fileKeys.length > 0) {
                for (const key of fileKeys) {
                    const file = fileData[key];
                    // Get pre-signed URL
                    const presignRes = await fetch('/api/documents/presign', {
                        method: 'POST',
                        body: JSON.stringify({
                            fileName: file.name,
                            fileType: file.type,
                            orderId: payData.orderId
                        })
                    });
                    const presignData = await presignRes.json();
                    
                    if (presignData.success) {
                        console.log(`[MOCK] Uploading ${file.name} to S3 via ${presignData.uploadUrl}`);
                        // In real production:
                        // await fetch(presignData.uploadUrl, { method: 'PUT', body: file, headers: { 'Content-Type': file.type } });
                    }
                }
            }

            alert('M-Pesa STK Push sent! Please complete payment on your phone to start processing.');
            window.location.href = `/orders/${payData.orderId}/track`;
        } else {
            throw new Error(payData.error || 'Payment initiation failed');
        }
    } catch (err: any) {
        alert(err.message || 'Payment initiation failed. Please check your network and try again.');
    } finally {
        setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {customerInfo && (
          <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl flex items-center gap-3 animate-slide-in">
              <span className="text-xl">👋</span>
              <div>
                  <p className="text-emerald-900 font-bold text-sm">Welcome back, {customerInfo.name}!</p>
                  <p className="text-emerald-600 text-[10px] font-medium uppercase tracking-widest">We&apos;ve auto-filled your ID and KRA details from your previous orders.</p>
              </div>
          </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {schema.map((field, index) => (
          <div key={index} className={`flex flex-col ${field.type === 'file' ? 'md:col-span-2' : ''}`}>
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2 flex items-center justify-between">
                {field.label}
                {field.required && <span className="text-rose-500">*</span>}
            </label>
            
            {field.type === 'text' && (
              <input 
                type="text" 
                name={field.name} 
                required={field.required} 
                value={(formData[field.name] as string) || ''}
                onChange={handleChange} 
                className="bg-slate-50 border border-slate-200 p-4 rounded-2xl focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all placeholder:text-slate-300 font-medium" 
                placeholder={`Enter your ${field.label.toLowerCase()}...`}
              />
            )}
            
            {field.type === 'select' && (
              <select 
                name={field.name} 
                required={field.required} 
                value={(formData[field.name] as string) || ''}
                onChange={handleChange} 
                className="bg-slate-50 border border-slate-200 p-4 rounded-2xl focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all font-medium appearance-none"
              >
                <option value="">Select an option</option>
                {field.options?.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            )}

            {field.type === 'file' && (
              <div className="relative group">
                  <input 
                    type="file" 
                    name={field.name} 
                    required={field.required} 
                    onChange={handleChange} 
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                  />
                  <div className="border-2 border-dashed border-slate-200 group-hover:border-primary/50 group-hover:bg-primary/5 p-8 rounded-3xl flex flex-col items-center justify-center transition-all bg-slate-50">
                      <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-xl mb-3 group-hover:scale-110 transition-transform">
                          📁
                      </div>
                      <p className="text-slate-600 font-bold text-sm">Upload {field.label}</p>
                      <p className="text-slate-400 text-xs mt-1">{(formData[field.name] as File)?.name || 'PDF, JPG or PNG (Max 5MB)'}</p>
                  </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <button 
        type="submit" 
        disabled={loading}
        className="w-full bg-[#0f172a] group relative p-6 rounded-[2rem] overflow-hidden shadow-2xl hover:shadow-blue-500/20 transition-premium active:scale-95 disabled:opacity-50"
      >
        <div className="absolute inset-0 gradient-brand transform translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
        <div className="relative z-10 flex items-center justify-center gap-4">
            <span className="text-white font-black uppercase tracking-widest text-sm">
                {loading ? 'Processing Citizen ID...' : `Confirm & Pay Ksh ${service.price}`}
            </span>
            <span className="text-white text-xl group-hover:translate-x-2 transition-transform">→</span>
        </div>
      </button>

      <div className="flex items-center justify-center gap-6 pt-4">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span> 256-bit Encrypted
          </span>
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span> M-Pesa Verified
          </span>
      </div>

      <style jsx>{`
        @keyframes slide-in {
            from { transform: translateY(-10px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
        .animate-slide-in {
            animation: slide-in 0.4s ease-out forwards;
        }
      `}</style>
    </form>
  );
}
