'use client';
import { useState, useEffect, use } from 'react';
import { io } from 'socket.io-client';

const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3001');

export default function OrderTrackPage({ params }: { params: Promise<{ orderId: string }> }) {
  const { orderId } = use(params);
  const [status, setStatus] = useState('PENDING'); // Default status
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');

  useEffect(() => {
    // 1. Initial Status Fetch
    const fetchStatus = async () => {
        try {
            const res = await fetch(`/api/orders/${orderId}`);
            const data = await res.json();
            if (data.success) {
                setStatus(data.order.status);
            }
        } catch (err) {
            console.error("Failed to fetch order status", err);
        }
    };
    fetchStatus();

    // 2. Real-time updates
    socket.on('client_receive_otp_request', ({ orderId: incomingOrderId, message }) => {
        if (incomingOrderId === orderId) {
            setStatus('AWAITING_OTP');
            // Notification or popup or ring/vibration would be here
            alert(`ACTION REQUIRED: ${message}. Check your phone for eCitizen OTP.`);
        }
    });

    socket.on('order_status_update', ({ orderId: incomingOrderId, status: newStatus }) => {
        if (incomingOrderId === orderId) {
            setStatus(newStatus);
        }
    });

    return () => {
        socket.off('client_receive_otp_request');
        socket.off('order_status_update');
    };
  }, [orderId]);

  const sendOtpToAgent = () => {
    if (otp.length === 6) {
        socket.emit('client_submit_otp', { 
          orderId: orderId, 
          otp: otp 
        });
        setOtpSent(true);
        setStatus('PROCESSING');
        alert("OTP submitted to our processing agents.");
    } else {
        alert("Invalid OTP length.");
    }
  };

  return (
    <main className="max-w-4xl mx-auto py-12 px-6">
      <div className="flex items-center gap-4 mb-8">
        <h1 className="text-3xl font-black text-slate-900">Track Order: {orderId}</h1>
        <div className={`px-4 py-1 rounded-full text-sm font-bold tracking-wide ${status === 'AWAITING_OTP' ? 'bg-red-100 text-red-600 animate-pulse' : 'bg-emerald-100 text-emerald-600'}`}>
            {status}
        </div>
      </div>
      
      {status === 'AWAITING_OTP' && !otpSent && (
        <div className="bg-red-50 border-2 border-red-200 p-10 rounded-3xl text-center shadow-xl animate-float">
          <h3 className="text-2xl font-black text-red-600 mb-2">Action Required: eCitizen OTP</h3>
          <p className="text-red-500 mb-8 max-w-sm mx-auto">Please check your SMS or Email for the eCitizen verification code and enter it below.</p>
          
          <div className="flex flex-col items-center gap-6">
            <input 
              type="text" 
              maxLength={6} 
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="text-center text-5xl font-black tracking-[1rem] p-6 border-4 border-red-400 rounded-2xl w-full max-w-xs focus:ring-4 focus:ring-red-100 outline-none" 
              placeholder="000000"
            />
            <button 
              onClick={sendOtpToAgent} 
              className="bg-red-600 hover:bg-red-700 text-white px-12 py-5 rounded-2xl font-black shadow-lg hover:shadow-2xl transition-all"
            >
              Submit Code to Agent
            </button>
          </div>
        </div>
      )}

      {status === 'PROCESSING' && (
          <div className="bg-slate-50 border border-slate-100 p-20 rounded-3xl text-center">
              <div className="w-16 h-16 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
              <h3 className="text-2xl font-bold text-slate-800">Agent Processing...</h3>
              <p className="text-slate-500 mt-4">We are currently using your OTP to complete the eCitizen application. One more step and we&apos;re done!</p>
          </div>
      )}

      <div className="mt-12 space-y-8">
           <div className="flex items-center gap-6 relative">
               <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold shadow-sm ${status === 'PENDING' || status === 'AWAITING_OTP' || status === 'PROCESSING' ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-400'}`}>1</div>
               <div>
                   <h4 className="font-bold text-lg">Order Created</h4>
                   <p className="text-slate-500">Service Fee Paid & Form Submitted.</p>
               </div>
           </div>
           
           <div className="flex items-center gap-6 relative">
               <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold shadow-sm ${status === 'AWAITING_OTP' || status === 'PROCESSING' ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-400'}`}>2</div>
               <div>
                   <h4 className="font-bold text-lg">eCitizen Authentication</h4>
                   <p className="text-slate-500">OTP Verification required for direct processing.</p>
               </div>
           </div>
           
           <div className="flex items-center gap-6 relative opacity-50 grayscale">
               <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold shadow-sm bg-slate-200 text-slate-400`}>3</div>
               <div>
                   <h4 className="font-bold text-lg">Document Delivery</h4>
                   <p className="text-slate-500">Your final certificate will be available for download here.</p>
               </div>
           </div>
      </div>

      {status === 'COMPLETED' && (
          <div className="mt-12 p-8 bg-green-50 border-2 border-green-200 rounded-3xl shadow-lg animate-float">
              <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6">
                      <div className="w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center text-white">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                          </svg>
                      </div>
                      <div>
                          <h3 className="text-2xl font-black text-green-900">Your Document is Ready!</h3>
                          <p className="text-green-700 font-medium">Click below to download your official eCitizen certificate.</p>
                      </div>
                  </div>
                  <a 
                    href="#" 
                    className="gradient-primary text-white px-8 py-4 rounded-2xl font-black shadow-lg hover:shadow-2xl transition-all"
                    onClick={(e) => { e.preventDefault(); alert('Downloading certificate...'); }}
                  >
                    Download PDF
                  </a>
              </div>
              <p className="mt-6 text-xs text-green-600 font-bold uppercase tracking-widest text-center opacity-70">
                  Security Note: This link will expire and all data will be deleted in 48 hours (KDPA Compliant).
              </p>
          </div>
      )}
    </main>
  );
}
