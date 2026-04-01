import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(
    req: Request,
    { params }: { params: { orderId: string } }
) {
    try {
        const { orderId } = await params;

        const order = await prisma.order.findUnique({
            where: { id: orderId },
            include: {
                service: {
                    select: {
                        title: true,
                        category: {
                            select: { name: true }
                        }
                    }
                }
            }
        });

        if (!order) {
            return NextResponse.json({ success: false, error: 'Order not found' }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            order: {
                id: order.id,
                status: order.status,
                serviceTitle: order.service.title,
                categoryName: order.service.category.name,
                createdAt: order.createdAt,
                requiresOtp: order.requiresOtp
            }
        });

    } catch (error) {
        console.error('Order Fetch Error:', error);
        return NextResponse.json({ success: false, error: 'Failed to fetch order details' }, { status: 500 });
    }
}
