import {
  Product,
  Category,
  CheckoutRequest,
  CheckoutResponse,
  ApiError,
  LoginRequest,
  RegisterRequest,
  AuthResponse,
} from '@/types';


const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;


export async function getProducts(): Promise<Product[]> {
  try {
    const res = await fetch(`${BASE_URL}/products`, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    } as any);

    if (!res.ok) {
      throw new Error(`API Error: Failed to fetch products (${res.status})`);
    }
    
    const data = await res.json();
    return data.products as Product[];
  } catch (error) {
    console.error('Error in getProducts:', error);
    return [];
  }
}

export async function getProductById(
  productId: string
): Promise<Product | null> {
  if (!productId) {
    console.error('getProductById: No product ID provided.');
    return null;
  }

  try {
    const res = await fetch(`${BASE_URL}/products/${productId}`, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    } as any);

    if (!res.ok) {
      if (res.status === 404) return null; // Correctly handle 404
      throw new Error(`API Error: Failed to fetch product ${productId} (${res.status})`);
    }
    
    const data = await res.json();
    return data as Product;
  } catch (error) {
    console.error(`Error in getProductById (${productId}):`, error);
    return null;
  }
}

export async function getCategories(): Promise<Category[]> {
  try {
    const res = await fetch(`${BASE_URL}/categories`, {
      next: { revalidate: 86400 }, // Cache for 24 hours
    } as any);

    if (!res.ok) {
      throw new Error(`API Error: Failed to fetch categories (${res.status})`);
    }

    const data = await res.json();
    return data.categories as Category[];
  } catch (error) {
    console.error('Error in getCategories:', error);
    return [];
  }
}

export async function getProductsByCategory(
  categoryName: string
): Promise<Product[]> {
  if (!categoryName) {
    console.error('getProductsByCategory: No category name provided.');
    return [];
  }

  try {
    const res = await fetch(`${BASE_URL}/categories/${categoryName}/products`, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    } as any);

    if (!res.ok) {
      throw new Error(`API Error: Failed to fetch products for category ${categoryName} (${res.status})`);
    }
    
    const data = await res.json();
    return data.products as Product[];
  } catch (error) {
    console.error(`Error in getProductsByCategory (${categoryName}):`, error);
    return [];
  }
}


export async function loginUser(
  loginData: LoginRequest
): Promise<AuthResponse | { error: string }> {
  try {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(loginData),
    });

    const data = await res.json();

    if (!res.ok) {
      const errorDetail =
        (data as ApiError)?.detail?.[0]?.msg || 'Login failed';
      throw new Error(errorDetail);
    }

    return data as AuthResponse;
  } catch (error) {
    console.error('Error in loginUser:', error);
    return {
      error:
        error instanceof Error ? error.message : 'An unknown error occurred',
    };
  }
}

export async function registerUser(
  registerData: RegisterRequest
): Promise<AuthResponse | { error: string }> {
  try {
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(registerData),
    });

    const data = await res.json();

    if (!res.ok) {
      const errorDetail =
        (data as ApiError)?.detail?.[0]?.msg || 'Registration failed';
      throw new Error(errorDetail);
    }

    return data as AuthResponse;
  } catch (error) {
    console.error('Error in registerUser:', error);
    return {
      error:
        error instanceof Error ? error.message : 'An unknown error occurred',
    };
  }
}

export async function submitCheckout(
  checkoutData: CheckoutRequest
): Promise<CheckoutResponse | { error: string }> {
  try {
    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(checkoutData),
    });

    const data = await res.json();

    if (!res.ok) {
      const errorDetail =
        (data as ApiError)?.detail?.[0]?.msg || 'Checkout failed';
      throw new Error(errorDetail);
    }

    return data as CheckoutResponse;
  } catch (error) {
    console.error('Error in submitCheckout:', error);
    return {
      error:
        error instanceof Error ? error.message : 'An unknown error occurred',
    };
  }
}