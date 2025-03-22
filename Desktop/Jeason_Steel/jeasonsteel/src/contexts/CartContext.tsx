
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Product } from '@/types/payment';

interface CartItem {
  id: number;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (productId: number) => void;
  removeFromCart: (productId: number) => void;
  getCartTotal: () => number;
  getItemCount: () => number;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'jeason-steel-cart';

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    // Load initial cart items from localStorage
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    return savedCart ? JSON.parse(savedCart) : [];
  });
  
  const [products, setProducts] = useState<Product[]>([]);
  
  // Fetch products when the component mounts
  useEffect(() => {
    async function fetchProducts() {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*');
          
        if (error) {
          throw error;
        }
        
        // Transform database records to Product type
        const transformedProducts = data?.map(item => ({
          ...item,
          images: Array.isArray(item.images) ? item.images : [],
          specifications: typeof item.specifications === 'object' ? item.specifications : {}
        })) as Product[];
        
        setProducts(transformedProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
        // We won't try to fallback to imported products since they don't exist
      }
    }
    
    fetchProducts();
  }, []);

  // Save cart items to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addToCart = (productId: number) => {
    // Find the product from our fetched products
    const product = products.find(p => p.id === productId);
    
    if (!product) {
      toast.error("Product not found");
      return;
    }
    
    setItems(currentItems => {
      const existingItem = currentItems.find(item => item.id === productId);
      if (existingItem) {
        return currentItems.map(item =>
          item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...currentItems, { id: productId, quantity: 1 }];
    });
    toast.success(`Added ${product.title} to cart`);
  };

  const removeFromCart = (productId: number) => {
    // Find the product from our fetched products
    const product = products.find(p => p.id === productId);
    
    if (!product) {
      // If we don't have the product data, just remove it from cart without showing the product name
      setItems(currentItems => currentItems.filter(item => item.id !== productId));
      toast.success("Item removed from cart");
      return;
    }

    setItems(currentItems => currentItems.filter(item => item.id !== productId));
    toast.success(`Removed ${product.title} from cart`);
  };

  const getCartTotal = () => {
    return items.reduce((total, item) => {
      // Try to find the product in our fetched products
      const product = products.find(p => p.id === item.id);
      if (product) {
        return total + product.price * item.quantity;
      }
      // If it's not in our fetched products, return the current total
      return total;
    }, 0);
  };

  const getItemCount = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const clearCart = () => {
    setItems([]);
    localStorage.removeItem(CART_STORAGE_KEY);
    toast.success("Cart cleared");
  };

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, getCartTotal, getItemCount, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
