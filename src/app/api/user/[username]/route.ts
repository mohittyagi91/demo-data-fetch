import {NextResponse } from 'next/server';

export async function GET(
  { params }: { params: Promise<{ username: string }> }) {
    const { username } = await params;

  if (!username) {
    return NextResponse.json(
      { error: 'Username is required' },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(
      `https://api.twitter.com/2/users/by/username/${username}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${process.env.BEARER_TOKEN}`,
        },
      }
    );

    const data = await response.json();
  const transformed = { ...data};
 
  return new Response(JSON.stringify(transformed), {
    headers: { 'Content-Type': 'application/json' },
  });
  } catch (error) {
    return NextResponse.json(
      { error: error },
      { status: 500 }
    );
  }
}
