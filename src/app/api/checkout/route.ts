import { NextResponse } from 'next/server';
import type { CheckoutRequest, CheckoutResponse, ApiError } from '@/types';

// The external API base URL
const API_BASE_URL = process.env.API_BASE_URL;

export async function POST(request: Request) {
  let checkoutData: CheckoutRequest;

  try {
    checkoutData = await request.json();
  } catch (error) {
    return NextResponse.json({ detail: 'Invalid JSON body' }, { status: 400 });
  }

  if (
    !checkoutData.items ||
    !Array.isArray(checkoutData.items) ||
    !checkoutData.shipping_address ||
    !checkoutData.email
  ) {
    return NextResponse.json(
      {
        detail:
          'Invalid request body. Missing or malformed: items, shipping_address, or email',
      },
      { status: 400 }
    );
  }

  try {
    const apiRes = await fetch(`${API_BASE_URL}/checkout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(checkoutData),
    });

    const data = await apiRes.json();

    if (!apiRes.ok) {
      return NextResponse.json(data as ApiError, {
        status: apiRes.status,
      });
    }

    return NextResponse.json(data as CheckoutResponse, { status: 200 });
  } catch (error) {
    console.error('Error in checkout API route:', error);
    return NextResponse.json(
      { detail: 'An unexpected server error occurred.' },
      { status: 500 }
    );
  }
}
