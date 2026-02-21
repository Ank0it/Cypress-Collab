import { NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    const body = await req.json();
    const { email, password } = body;

    const { data } = await supabase.from('profiles').select('*').eq('email', email);
    if (data?.length) {
      return NextResponse.json({ error: { message: 'User already exists', data } }, { status: 409 });
    }

    const response = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}api/auth/callback`,
      },
    });
    return NextResponse.json(response);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('API /auth/signup error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
