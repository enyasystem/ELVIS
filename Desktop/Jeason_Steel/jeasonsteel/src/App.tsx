import React, { lazy, Suspense } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/contexts/CartContext";
import { AuthProvider } from "@/hooks/useAuth";
import ProtectedRoute from "@/components/ProtectedRoute";
import Layout from "@/components/Layout";  // Add this import
import Home from "./pages/Index";  // Also add this if missing
import Index from "./pages/Index";
import ProductDetail from "./pages/ProductDetail";
import Products from "./pages/Products";
import About from "./pages/About";
import Careers from "./pages/Careers";
import Quote from "./pages/Quote";
import Contact from "./pages/Contact";
// import Cart from "./pages/Cart"; // Commented out Cart page
import Auth from "./pages/Auth";
import AdminPayments from "./pages/AdminPayments";
import AdminDashboard from "./pages/AdminDashboard";
import ChangePassword from "./pages/ChangePassword";
import ScrollToTop from "./components/ScrollToTop";
import Services from "./components/Services";
import LoadingSpinner from '@/components/LoadingSpinner';

const Trading = lazy(() => import('./pages/services/Trading'));
const Construction = lazy(() => import('./pages/services/Construction'));
const Consultancy = lazy(() => import('./pages/services/Consultancy'));
const Fabrication = lazy(() => import('./pages/services/Fabrication'));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 1,
    },
  },
});

const App: React.FC = () => {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <AuthProvider>
            <CartProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <ScrollToTop />
                <Routes>
                  <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/product/:id" element={<ProductDetail />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/careers" element={<Careers />} />
                    <Route path="/quote" element={<Quote />} />
                    <Route path="/contact" element={<Contact />} />
                    {/* Removed cart route */}
                    <Route path="/auth" element={<Auth />} />
                    <Route path="/change-password" element={<ChangePassword />} />
                    <Route path="/admin/payments" element={
                      <ProtectedRoute>
                        <AdminPayments />
                      </ProtectedRoute>
                    } />
                    <Route path="/admin/dashboard" element={
                      <ProtectedRoute>
                        <AdminDashboard />
                      </ProtectedRoute>
                    } />
                    <Route path="/services/trading" element={
                      <Suspense fallback={<LoadingSpinner />}>
                        <Trading />
                      </Suspense>
                    } />
                    <Route path="/services/construction" element={
                      <Suspense fallback={<LoadingSpinner />}>
                        <Construction />
                      </Suspense>
                    } />
                    <Route path="/services/consultancy" element={
                      <Suspense fallback={<LoadingSpinner />}>
                        <Consultancy />
                      </Suspense>
                    } />
                    <Route path="/services/fabrication" element={
                      <Suspense fallback={<LoadingSpinner />}>
                        <Fabrication />
                      </Suspense>
                    } />
                    <Route path="/services" element={<Services />} />
                  </Route>
                </Routes>
              </BrowserRouter>
            </CartProvider>
          </AuthProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

export default App;
