import { NextResponse } from 'next/server';

const API_BASE_URL = process.env.API_BASE_URL;

export async function GET() {
  if (!API_BASE_URL) {
    return NextResponse.json({ detail: 'API base URL not configured' }, { status: 500 });
  }

  try {
    const apiRes = await fetch(`${API_BASE_URL}/categories`, {
      next: { revalidate: 86400 }, // Cache for 24 hours
    });

    const data = await apiRes.json();
    if (!apiRes.ok) {
      return NextResponse.json(data, { status: apiRes.status });
    }
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ detail: 'An unexpected server error occurred.' }, { status: 500 });
  }
}