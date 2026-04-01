import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { sendSMS } from '@/lib/sms';
import { requireAdminAuth } from '@/lib/auth';
// import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const ALLOWED_FILE_TYPES = ['application/pdf', 'image/jpeg', 'image/png'];
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export async function POST(req: Request) {
    const authError = requireAdminAuth(req);
    if (authError) return authError;

    try {
        const formData = await req.formData();
        const file = formData.get('file') as File;
        const orderId = formData.get('orderId') as string;
        const fileName = formData.get('fileName') as string;

        if (!file || !orderId) {
            return NextResponse.json({ success: false, error: 'Missing file or orderId' }, { status: 400 });
        }

        // File validation
        if (!ALLOWED_FILE_TYPES.includes(file.type)) {
            return NextResponse.json({ success: false, error: 'Invalid file type. Only PDF, JPEG, and PNG allowed.' }, { status: 400 });
        }
        if (file.size > MAX_FILE_SIZE) {
            return NextResponse.json({ success: false, error: 'File too large. Maximum 10MB.' }, { status: 400 });
        }
        // Sanitize filename to prevent path traversal
        const sanitizedFileName = (fileName || file.name).replace(/[^a-zA-Z0-9._-]/g, '_');

        console.log(`Agent uploading document for Order ${orderId}: ${fileName}`);

        // 1. In production, you would upload to AWS S3 here.
        // For now, we simulate a successful upload and get a URL.
        const mockFileUrl = `https://your-s3-bucket.s3.eu-west-1.amazonaws.com/completed/${orderId}/${fileName}`;

        // 2. Create a Document record in the database linked to the order
        const document = await prisma.document.create({
            data: {
                orderId: orderId,
                fileUrl: mockFileUrl,
                fileName: fileName
            }
        });

        // 3. Update the order status to COMPLETED and get user phone
        const updatedOrder = await prisma.order.update({
            where: { id: orderId },
            data: { status: 'COMPLETED' },
            include: { user: true }
        });

        // 4. Send Delivery SMS
        if (updatedOrder.user.phone) {
            await sendSMS(
                updatedOrder.user.phone, 
                `Your document for Order ${orderId} is ready! Download it here: https://ecitizen-cyber.co.ke/orders/${orderId}/track`
            );
        }

        return NextResponse.json({ 
            success: true, 
            message: 'Document delivered successfully. Order marked as COMPLETED.',
            documentId: document.id
        });

    } catch (error) {
        console.error('Agent upload error:', error);
        return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
    }
}
