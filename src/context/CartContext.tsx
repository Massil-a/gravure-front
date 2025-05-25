import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react'

export type CartItem = {
  id: string;
  text?: string;
  material?: string;
  format?: string;
  fixOption?: string;
  price?: string;
  quantity: number;
  image: string;
  name: string;
  sold_price?: string;
  stock: number;
  description: string;
  size: string;
  tags: string[];
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_KEY = 'gravyour_cart';

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const storedCart = localStorage.getItem(CART_KEY);
    console.log(storedCart)
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item: CartItem) => {
    setCart(prev => {
      const existingIndex = prev.findIndex(i => i.id === item.id);

      if (existingIndex !== -1) {
        // Crée une copie du panier
        const updatedCart = [...prev];
        
        // Crée une copie de l'objet à mettre à jour, avec la quantité modifiée
        const existingItem = updatedCart[existingIndex];
        updatedCart[existingIndex] = {
          ...existingItem,
          quantity: (existingItem.quantity || 0) + (item.quantity || 0),
        };

        return updatedCart;
      } else {
        // Ajoute un nouvel article au panier
        return [...prev, item];
      }
    });
  };


  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
