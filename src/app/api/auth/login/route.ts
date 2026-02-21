import { NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    const body = await req.json();
    const { email, password } = body;
    const response = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return NextResponse.json(response);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('API /auth/login error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
