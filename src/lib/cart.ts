export type Plaque = {
  id: string;
  text: string;
  material: string;
  format: string;
  fixOption: string;
};

const CART_KEY = 'gravyour_cart';

export function getCart(): Plaque[] {
  const raw = localStorage.getItem(CART_KEY);
  return raw ? JSON.parse(raw) : [];
}

export function saveCart(cart: Plaque[]) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

export function addToCart(plaque: Plaque) {
  const cart = getCart();
  cart.push(plaque);
  saveCart(cart);
}

export function removeFromCart(id: string) {
  const cart = getCart().filter(p => p.id !== id);
  saveCart(cart);
}

export function clearCart() {
  localStorage.removeItem(CART_KEY);
}
