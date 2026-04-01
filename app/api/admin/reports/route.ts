import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { requireAdminAuth } from '@/lib/auth';

export async function GET(req: Request) {
    const authError = requireAdminAuth(req);
    if (authError) return authError;

    try {
        // Fetch stats for the last 30 days
        const orders = await prisma.order.findMany({
            where: {
                status: 'COMPLETED',
                createdAt: {
                    gte: new Date(new Date().setDate(new Date().getDate() - 30))
                }
            },
            select: {
                amountPaid: true,
                commissionEarned: true,
                createdAt: true
            }
        });

        const totalRevenue = orders.reduce((sum, o) => sum + o.amountPaid, 0);
        const totalCommission = orders.reduce((sum, o) => sum + o.commissionEarned, 0);
        const netProfit = totalRevenue - totalCommission;

        // Group by day for the chart
        const dailyData: Record<string, { revenue: number, profit: number }> = {};
        orders.forEach(o => {
            const date = o.createdAt.toISOString().split('T')[0];
            if (!dailyData[date]) dailyData[date] = { revenue: 0, profit: 0 };
            dailyData[date].revenue += o.amountPaid;
            dailyData[date].profit += (o.amountPaid - o.commissionEarned);
        });

        const chartData = Object.entries(dailyData).map(([date, values]) => ({
            date,
            ...values
        })).sort((a, b) => a.date.localeCompare(b.date));

        return NextResponse.json({
            success: true,
            summary: {
                totalRevenue,
                totalCommission,
                netProfit,
                orderCount: orders.length
            },
            chartData
        });

    } catch (error) {
        console.error('Reports API Error:', error);
        return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
    }
}
