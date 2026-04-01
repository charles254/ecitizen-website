import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// Rate limiting: simple in-memory tracker
const lookupAttempts = new Map<string, { count: number; resetAt: number }>();
const MAX_ATTEMPTS = 10;
const WINDOW_MS = 15 * 60 * 1000; // 15 minutes

function isRateLimited(ip: string): boolean {
    const now = Date.now();
    const entry = lookupAttempts.get(ip);
    if (!entry || now > entry.resetAt) {
        lookupAttempts.set(ip, { count: 1, resetAt: now + WINDOW_MS });
        return false;
    }
    entry.count++;
    return entry.count > MAX_ATTEMPTS;
}

export async function GET(req: Request) {
    // Rate limiting
    const forwarded = req.headers.get('x-forwarded-for');
    const ip = forwarded?.split(',')[0]?.trim() || 'unknown';
    if (isRateLimited(ip)) {
        return NextResponse.json({ success: false, error: 'Too many requests' }, { status: 429 });
    }

    const { searchParams } = new URL(req.url);
    const identifier = searchParams.get('identifier');

    if (!identifier || identifier.length < 3) {
        return NextResponse.json({ success: false, error: 'Valid identifier is required' }, { status: 400 });
    }

    try {
        const user = await prisma.user.findFirst({
            where: {
                OR: [
                    { idNumber: identifier },
                    { phone: identifier },
                    { email: identifier }
                ]
            },
            select: {
                name: true,
                // Only return non-sensitive fields for auto-fill
                // idNumber and kraPin are NOT returned
            }
        });

        if (!user) {
            return NextResponse.json({ success: false, error: 'Customer not found' }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            user: {
                name: user.name,
            }
        });

    } catch {
        return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
    }
}
