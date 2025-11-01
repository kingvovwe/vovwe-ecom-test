import { NextResponse } from 'next/server';
import { RegisterRequest, AuthResponse, ApiError } from '@/types';

const API_BASE_URL = process.env.API_BASE_URL;

export async function POST(request: Request) {
  let registerData: RegisterRequest;

  try {
    registerData = await request.json();
  } catch (error) {
    return NextResponse.json({ detail: 'Invalid JSON body' }, { status: 400 });
  }

  try {
    const apiRes = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(registerData),
    });

    const data = await apiRes.json();

    if (!apiRes.ok) {
      return NextResponse.json(data as ApiError, { status: apiRes.status });
    }

    return NextResponse.json(data as AuthResponse, { status: 200 });
  } catch (error) {
    console.error('Error in register API route:', error);
    return NextResponse.json(
      { detail: 'An unexpected server error occurred.' },
      { status: 500 }
    );
  }
}