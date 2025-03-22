
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Invoice from "@/components/Invoice";
import PaymentMethodSelector from "@/components/PaymentMethodSelector";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Product } from "@/types/payment";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { initializeFlutterwavePayment } from "@/services/payment";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const Cart = () => {
  const { items, addToCart, removeFromCart, getCartTotal, clearCart } = useCart();
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [productDetails, setProductDetails] = useState<Product[]>([]);
  const total = getCartTotal();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Fetch products to get their details
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
        
        setProductDetails(transformedProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }
    
    fetchProducts();
  }, []);

  const cartItems = items.map((item) => {
    const product = productDetails.find((p) => p.id === item.id);
    return {
      ...item,
      product,
    };
  }).filter(item => item.product !== undefined);

  const handlePaymentMethodSelect = (method: 'flutterwave') => {
    handleFlutterwavePayment();
  };

  const handleFlutterwavePayment = async () => {
    try {
      setIsLoading(true);
      window.location.href = "https://flutterwave.com/pay/1cm43chycz93";
    } catch (error) {
      console.error('Error initializing payment:', error);
      toast.error('Failed to initialize payment');
    } finally {
      setIsLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-grow container mx-auto px-4 py-16 mt-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 text-steel-primary hover:text-steel-secondary"
            >
              <ShoppingBag size={20} />
              Continue Shopping
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow container mx-auto px-4 py-8 md:py-16 mt-16">
        <div className="flex justify-between items-center mb-4 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold">Shopping Cart</h1>
          
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Trash2 className="h-4 w-4" />
                <span className="hidden sm:inline">Clear All</span>
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Clear your cart?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will remove all items from your cart. This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction 
                  onClick={clearCart}
                  className="bg-red-500 hover:bg-red-600"
                >
                  Clear All
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8">
          <div className="lg:col-span-2 overflow-x-auto">
            <div className="min-w-[320px] sm:min-w-[600px] lg:min-w-0">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-2 md:gap-4 p-3 md:p-4 border-b"
                >
                  <div className="w-16 h-16 md:w-24 md:h-24 relative rounded-lg overflow-hidden">
                    <img
                      src={item.product?.image}
                      alt={item.product?.title}
                      className="absolute inset-0 w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://placehold.co/600x400?text=Image+Error';
                      }}
                    />
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-semibold text-sm md:text-base">{item.product?.title}</h3>
                    <p className="text-gray-600 text-sm md:text-base">
                      {formatPrice(item.product?.price || 0)}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 md:gap-2">
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-1 md:p-2 text-red-500 hover:bg-red-50 rounded-full"
                      aria-label="Remove item"
                    >
                      <Trash2 className="h-4 w-4 md:h-5 md:w-5" />
                    </button>
                    <span className="w-6 md:w-8 text-center text-sm md:text-base">{item.quantity}</span>
                    <button
                      onClick={() => addToCart(item.id)}
                      className="p-1 md:p-2 text-steel-primary hover:bg-gray-100 rounded-full"
                      aria-label="Add item"
                    >
                      <Plus className="h-4 w-4 md:h-5 md:w-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-gray-50 p-4 md:p-6 rounded-lg h-fit sticky top-20">
            <h2 className="text-lg md:text-xl font-semibold mb-4">Order Summary</h2>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm md:text-base">
                <span>Subtotal</span>
                <span>{formatPrice(total)}</span>
              </div>
              <div className="flex justify-between font-semibold text-sm md:text-base">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>
            <Invoice />
            <button 
              onClick={handleFlutterwavePayment}
              className="w-full bg-steel-primary text-white py-2 px-4 rounded hover:bg-steel-secondary transition-colors"
              disabled={isLoading}
            >
              {isLoading ? 'Processing...' : 'Proceed to Payment'}
            </button>
          </div>
        </div>
      </div>

      <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Payment Method</DialogTitle>
            <DialogDescription>
              Complete your payment with Flutterwave
            </DialogDescription>
          </DialogHeader>
          <PaymentMethodSelector onSelect={handlePaymentMethodSelect} />
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default Cart;
