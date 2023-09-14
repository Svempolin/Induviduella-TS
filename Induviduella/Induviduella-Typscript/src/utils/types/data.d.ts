
interface ProductData {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
  // Lägg till andra attribut för produkten här
}

interface Product extends ProductData {
}

interface CartItem {
  cartItemId: string; // Unique identifier
  product: Product; // Product data
  quantity: number; // Quantity of this product in the cart
}
