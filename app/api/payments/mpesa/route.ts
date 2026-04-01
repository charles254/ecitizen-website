import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { encryptJson } from '@/lib/crypto';

const getAccessToken = async () => {
    const consumerKey = process.env.MPESA_CONSUMER_KEY;
    const consumerSecret = process.env.MPESA_CONSUMER_SECRET;
    if (!consumerKey || !consumerSecret) {
        throw new Error('M-Pesa credentials not configured');
    }
    const baseUrl = process.env.MPESA_ENV === 'production'
        ? 'https://api.safaricom.co.ke'
        : 'https://sandbox.safaricom.co.ke';
    const url = `${baseUrl}/oauth/v1/generate?grant_type=client_credentials`;

    const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64');

    const response = await fetch(url, {
        headers: {
            Authorization: `Basic ${auth}`
        }
    });

    const data = await response.json();
    return data.access_token;
};

const generateTimestamp = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hour = String(date.getHours()).padStart(2, '0');
    const minute = String(date.getMinutes()).padStart(2, '0');
    const second = String(date.getSeconds()).padStart(2, '0');
    return `${year}${month}${day}${hour}${minute}${second}`;
};

export async function POST(req: Request) {
    try {
        const { amount, phone, serviceId, formData } = await req.json();

        // Prepare STK Push Parameters (sync - no await needed)
        const shortCode = process.env.MPESA_SHORTCODE;
        const passKey = process.env.MPESA_PASSKEY;
        if (!shortCode || !passKey) {
            return NextResponse.json({ success: false, error: 'Payment service not configured' }, { status: 503 });
        }
        const timestamp = generateTimestamp();
        const password = Buffer.from(`${shortCode}${passKey}${timestamp}`).toString('base64');
        const callbackUrl = process.env.MPESA_CALLBACK_URL;
        if (!callbackUrl) {
            return NextResponse.json({ success: false, error: 'Payment callback not configured' }, { status: 503 });
        }

        // Ensure phone is in format 2547XXXXXXXX
        let formattedPhone = phone;
        if (typeof formattedPhone === 'string') {
            if (formattedPhone.startsWith('0')) {
                formattedPhone = '254' + formattedPhone.slice(1);
            } else if (formattedPhone.startsWith('+')) {
                formattedPhone = formattedPhone.slice(1);
            }
        }

        const mpesaBaseUrl = process.env.MPESA_ENV === 'production'
            ? 'https://api.safaricom.co.ke'
            : 'https://sandbox.safaricom.co.ke';
        const stkPushUrl = `${mpesaBaseUrl}/mpesa/stkpush/v1/processrequest`;

        // async-parallel: Fetch access token and resolve user in parallel
        const accessTokenPromise = getAccessToken();
        const userPromise = prisma.user.findFirst({
            where: {
                OR: [
                    { idNumber: formData?.id_number },
                    { phone: formData?.phone_number || phone }
                ]
            }
        }).then(existing => existing || prisma.user.create({
            data: {
                name: formData?.full_name || 'Guest User',
                idNumber: formData?.id_number,
                phone: formData?.phone_number || phone,
                email: formData?.email || `guest-${Date.now()}@ecitizen-cyber.com`
            }
        }));

        const [accessToken, user] = await Promise.all([accessTokenPromise, userPromise]);

        // Create Order with FULL encrypted data
        const order = await prisma.order.create({
            data: {
                userId: user.id,
                serviceId: serviceId, 
                status: 'PENDING',
                amountPaid: parseFloat(amount),
                formData: { 
                    payload: encryptJson(formData) 
                }
            }
        });

        const stkPushPayload = {
            BusinessShortCode: shortCode,
            Password: password,
            Timestamp: timestamp,
            TransactionType: "CustomerPayBillOnline",
            Amount: Math.round(amount),
            PartyA: formattedPhone,
            PartyB: shortCode,
            PhoneNumber: formattedPhone,
            CallBackURL: callbackUrl,
            AccountReference: `ORD${order.id.split('-')[0].toUpperCase()}`,
            TransactionDesc: `Payment for Order ${order.id.split('-')[0]}`
        };

        console.log(`Initiating M-Pesa STK Push for ${formattedPhone}: Ksh ${amount}`);

        const response = await fetch(stkPushUrl, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(stkPushPayload)
        });

        const data = await response.json();

        if (data.ResponseCode === "0") {
            // Update the order with checkoutRequestId
            await prisma.order.update({
                where: { id: order.id },
                data: { checkoutRequestId: data.CheckoutRequestID }
            });

            return NextResponse.json({
                success: true,
                orderId: order.id,
                checkoutRequestId: data.CheckoutRequestID,
                message: 'STK Push sent to your phone. Please enter your PIN.'
            });
        } else {
            console.error('M-Pesa STK Error:', data);
            return NextResponse.json({
                success: false,
                error: data.ErrorMessage || 'Failed to initiate STK Push',
                details: data
            }, { status: 400 });
        }

    } catch (error) {
        console.error('M-Pesa API Error:', error);
        return NextResponse.json({ 
            success: false, 
            error: 'Server error during payment initiation' 
        }, { status: 500 });
    }
}
