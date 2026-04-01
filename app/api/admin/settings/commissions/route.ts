import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { requireAdminAuth } from '@/lib/auth';

export async function GET(req: Request) {
    const authError = requireAdminAuth(req);
    if (authError) return authError;

    try {
        const services = await prisma.service.findMany({
            include: { category: true }
        });
        return NextResponse.json({ success: true, services });
    } catch {
        return NextResponse.json({ success: false, error: 'Failed to fetch services' }, { status: 500 });
    }
}

export async function PATCH(req: Request) {
    const authError = requireAdminAuth(req);
    if (authError) return authError;

    try {
        const { serviceId, agentCommission } = await req.json();

        // Input validation
        if (!serviceId || typeof serviceId !== 'string') {
            return NextResponse.json({ success: false, error: 'Service ID is required' }, { status: 400 });
        }

        const updatedService = await prisma.service.update({
            where: { id: serviceId },
            data: { agentCommission: parseFloat(agentCommission) }
        });

        return NextResponse.json({ success: true, service: updatedService });
    } catch (error) {
        console.error('Update commission error:', error);
        return NextResponse.json({ success: false, error: 'Update failed' }, { status: 500 });
    }
}
