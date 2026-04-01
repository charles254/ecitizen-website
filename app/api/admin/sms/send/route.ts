import { NextResponse } from 'next/server';
import { sendSMS } from '@/lib/sms';
import { requireAdminAuth } from '@/lib/auth';

export async function POST(req: Request) {
    const authError = requireAdminAuth(req);
    if (authError) return authError;

    try {
        const { phone, message } = await req.json();

        if (!phone || !message) {
            return NextResponse.json({ success: false, error: 'Phone and message are required' }, { status: 400 });
        }

        const result = await sendSMS(phone, message);

        if (result.success) {
            return NextResponse.json({ success: true, message: 'SMS sent successfully' });
        } else {
            return NextResponse.json({ success: false, error: 'Failed to send SMS' }, { status: 500 });
        }

    } catch (error) {
        console.error('Manual SMS Error:', error);
        return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
    }
}
