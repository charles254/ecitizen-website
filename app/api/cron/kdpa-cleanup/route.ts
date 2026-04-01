import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: Request) {
    // Authenticate via Authorization header (not query param — avoids log exposure)
    const authHeader = req.headers.get('authorization');
    const cronSecret = process.env.CRON_SECRET;

    if (!cronSecret || !authHeader || authHeader !== `Bearer ${cronSecret}`) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const fortyEightHoursAgo = new Date(Date.now() - 48 * 60 * 60 * 1000);

        // 1. Find orders to scrub (completed and older than 48h)
        const ordersToScrub = await prisma.order.findMany({
            where: {
                status: 'COMPLETED',
                updatedAt: { lte: fortyEightHoursAgo }
            },
            include: { documents: true }
        });

        console.log(`KDPA Cleanup: Found ${ordersToScrub.length} orders to scrub.`);

        for (const order of ordersToScrub) {
            // A. Logic to delete files from S3 would go here
            /*
            for (const doc of order.documents) {
                await s3.send(new DeleteObjectCommand({ Bucket: bucket, Key: doc.fileKey }));
            }
            */
            
            // B. Scrub sensitive database data
            await prisma.order.update({
                where: { id: order.id },
                data: {
                    formData: { scrubbed: true, message: "Data deleted per KDPA 48h policy" },
                    providedOtp: null
                }
            });

            // C. Delete secondary documents records
            await prisma.document.deleteMany({
                where: { orderId: order.id }
            });
        }

        return NextResponse.json({
            success: true,
            scrubbedCount: ordersToScrub.length,
            policy: "48h-Data-Wipe"
        });

    } catch (error) {
        console.error('Cleanup Error:', error);
        return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
    }
}
