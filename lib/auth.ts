import { NextResponse } from 'next/server';

const ADMIN_API_KEY = process.env.ADMIN_API_KEY;

/**
 * Validates admin authentication via Authorization header.
 * Returns null if authenticated, or a 401 NextResponse if not.
 */
export function requireAdminAuth(req: Request): NextResponse | null {
  if (!ADMIN_API_KEY) {
    console.error('ADMIN_API_KEY environment variable is not set');
    return NextResponse.json(
      { success: false, error: 'Server misconfiguration' },
      { status: 500 }
    );
  }

  const authHeader = req.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json(
      { success: false, error: 'Authentication required' },
      { status: 401 }
    );
  }

  const token = authHeader.slice(7);

  // Constant-time comparison to prevent timing attacks
  if (token.length !== ADMIN_API_KEY.length) {
    return NextResponse.json(
      { success: false, error: 'Invalid credentials' },
      { status: 403 }
    );
  }

  let mismatch = 0;
  for (let i = 0; i < token.length; i++) {
    mismatch |= token.charCodeAt(i) ^ ADMIN_API_KEY.charCodeAt(i);
  }

  if (mismatch !== 0) {
    return NextResponse.json(
      { success: false, error: 'Invalid credentials' },
      { status: 403 }
    );
  }

  return null; // Authenticated
}
