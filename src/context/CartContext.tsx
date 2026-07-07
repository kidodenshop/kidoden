"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Product } from "@/data/products";

export interface CartItem extends Product {
  selectedSize?: string;
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  isCartOpen: boolean;
  cartCount: number;
  cartTotal: number;
  setIsCartOpen: (isOpen: boolean) => void;
  addToCart: (product: Product, quantity?: number, selectedSize?: string) => void;
  removeFromCart: (productId: string, selectedSize?: string) => void;
  updateQuantity: (productId: string, quantity: number, selectedSize?: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load from local storage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("kidoden_cart");
      if (savedCart) {
        setCartItems(JSON.parse(savedCart));
      }
    } catch (e) {
      console.error("Failed to load cart from localStorage", e);
    }
    setIsInitialized(true);
  }, []);

  // Save to local storage on change
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem("kidoden_cart", JSON.stringify(cartItems));
    }
  }, [cartItems, isInitialized]);

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const addToCart = (product: Product, quantity = 1, selectedSize?: string) => {
    const sizeInventory = product.inventory?.find(inv => inv.size === selectedSize);
    const maxStock = sizeInventory ? sizeInventory.stockQuantity : 99;

    setCartItems((prev) => {
      const existingItem = prev.find(
        (item) => item.id === product.id && item.selectedSize === selectedSize
      );
      if (existingItem) {
        const targetQuantity = existingItem.quantity + quantity;
        if (targetQuantity > maxStock) {
          alert(`Oops! We only have ${maxStock} pieces of size "${selectedSize}" in stock at home.`);
          return prev.map((item) =>
            item.id === product.id && item.selectedSize === selectedSize
              ? { ...item, quantity: maxStock }
              : item
          );
        }
        return prev.map((item) =>
          item.id === product.id && item.selectedSize === selectedSize
            ? { ...item, quantity: targetQuantity }
            : item
        );
      }
      
      if (quantity > maxStock) {
        alert(`Oops! We only have ${maxStock} pieces of size "${selectedSize}" in stock at home.`);
        return [...prev, { ...product, quantity: maxStock, selectedSize }];
      }
      return [...prev, { ...product, quantity, selectedSize }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string, selectedSize?: string) => {
    setCartItems((prev) =>
      prev.filter(
        (item) => !(item.id === productId && item.selectedSize === selectedSize)
      )
    );
  };

  const updateQuantity = (productId: string, quantity: number, selectedSize?: string) => {
    if (quantity < 1) {
      removeFromCart(productId, selectedSize);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.id === productId && item.selectedSize === selectedSize) {
          const sizeInventory = item.inventory?.find(inv => inv.size === selectedSize);
          const maxStock = sizeInventory ? sizeInventory.stockQuantity : 99;
          if (quantity > maxStock) {
            alert(`Sorry, we only have ${maxStock} pieces of this size in stock.`);
            return { ...item, quantity: maxStock };
          }
          return { ...item, quantity };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCartItems([]);
    try {
      localStorage.removeItem("kidoden_cart");
    } catch (e) {
      console.error("Failed to clear cart from localStorage", e);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        isCartOpen,
        cartCount,
        cartTotal,
        setIsCartOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
