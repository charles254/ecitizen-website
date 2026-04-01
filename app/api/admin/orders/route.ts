import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { requireAdminAuth } from '@/lib/auth';

export async function GET(req: Request) {
    const authError = requireAdminAuth(req);
    if (authError) return authError;

    try {
        const { searchParams } = new URL(req.url);
        const status = searchParams.get('status');

        const orders = await prisma.order.findMany({
            where: status && status !== 'ALL' ? { status } : {},
            include: {
                user: {
                    select: { name: true, phone: true }
                },
                service: {
                    select: { title: true }
                }
            },
            orderBy: { createdAt: 'desc' },
            take: 50
        });

        // Simple Stats
        const [totalRevenue, activeOrders, pendingOtp] = await Promise.all([
            prisma.order.aggregate({ _sum: { amountPaid: true } }),
            prisma.order.count({ where: { status: { not: 'COMPLETED' } } }),
            prisma.order.count({ where: { status: 'AWAITING_OTP' } })
        ]);

        return NextResponse.json({
            success: true,
            orders: orders.map(o => ({
                id: `ORD-${o.id.split('-')[0].toUpperCase()}`,
                fullId: o.id,
                customer: o.user.name,
                service: o.service.title,
                status: o.status,
                amount: o.amountPaid,
                time: o.createdAt
            })),
            stats: {
                revenue: totalRevenue._sum.amountPaid || 0,
                active: activeOrders,
                pendingOtp: pendingOtp
            }
        });

    } catch (error) {
        console.error('Admin Orders Fetch Error:', error);
        return NextResponse.json({ success: false, error: 'Failed to fetch dashboard data' }, { status: 500 });
    }
}
