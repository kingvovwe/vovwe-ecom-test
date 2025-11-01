
interface ImageMap {
  [key: string]: string;
}

export const productImages: ImageMap = {
  '1': '/images/products/1.jpg', // Wireless Headphones
  '2': '/images/products/2.jpeg', // Running Shoes
  '3': '/images/products/3.jpeg', // Coffee Maker
  '4': '/images/products/4.jpeg', // Laptop Stand
  '5': '/images/products/5.jpg', // Yoga Mat
};

// A default placeholder image in case a product ID has no matching image
export const defaultProductImage =
  'https://placehold.co/600x750/f0f0f0/a0a0a0?text=Image+Not+Available';

