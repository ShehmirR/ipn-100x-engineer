import { NextRequest, NextResponse } from 'next/server';
import { findUserById } from '@/utils/storage';

export async function GET(request: NextRequest) {
  try {
    // Get session cookie
    const sessionId = request.cookies.get('session')?.value;

    if (!sessionId) {
      return NextResponse.json(
        { authenticated: false, user: null },
        { status: 200 }
      );
    }

    // Find user by session ID
    const user = findUserById(sessionId);

    if (!user) {
      // Session is invalid, clear it
      const response = NextResponse.json(
        { authenticated: false, user: null },
        { status: 200 }
      );
      response.cookies.set('session', '', { maxAge: 0 });
      return response;
    }

    // Return user info (without password)
    return NextResponse.json(
      {
        authenticated: true,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Session check error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
