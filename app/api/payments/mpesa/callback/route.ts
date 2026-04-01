import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { sendSMS } from '@/lib/sms';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        console.log('M-Pesa Callback Received:', JSON.stringify(body, null, 2));

        const result = body.Body.stkCallback;

        if (result.ResultCode === 0) {
            // Payment Successful
            const checkoutId = result.CheckoutRequestID;
            interface MpesaItem { Name: string; Value: string | number }
            const amount = result.CallbackMetadata.Item.find((item: MpesaItem) => item.Name === 'Amount').Value;
            const mpesaReceipt = result.CallbackMetadata.Item.find((item: MpesaItem) => item.Name === 'MpesaReceiptNumber').Value;
            const phoneNumber = result.CallbackMetadata.Item.find((item: MpesaItem) => item.Name === 'PhoneNumber').Value;

            console.log(`Payment confirmed: ${checkoutId} for ${amount} (Receipt: ${mpesaReceipt}) from ${phoneNumber}`);

            // Update Order Status to PAID in Database
            try {
                const order = await prisma.order.findFirst({
                    where: { checkoutRequestId: checkoutId }
                });

                if (order) {
                    // async-parallel: Update DB and send SMS concurrently
                    const [updateResult] = await Promise.all([
                        prisma.order.update({
                            where: { id: order.id },
                            data: {
                                status: 'PAID',
                                mpesaReceipt: mpesaReceipt
                            }
                        }),
                        sendSMS(phoneNumber, `Payment Received! Order ${order.id} is now being processed. Tracking link: https://ecitizen-cyber.co.ke/orders/${order.id}/track`)
                    ]);
                    console.log(`Order ${order.id} status updated to PAID.`);
                }
            } catch (dbError) {
                console.error('Database update failed after payment:', dbError);
            }
            
        } else {
            // Payment Cancelled or Failed
            console.error(`Payment failed or cancelled: ResultCode ${result.ResultCode} (${result.ResultDesc})`);
        }

        // Return a successful response to Safaricom to acknowledge Receipt
        return NextResponse.json({ ResultCode: 0, ResultDesc: "Success" });

    } catch (error) {
        console.error('M-Pesa Callback Processing Error:', error);
        return NextResponse.json({ ResultCode: 1, ResultDesc: "Internal server error" }, { status: 500 });
    }
}
