
import React from 'react';
import Header from "@/components/Header";
import Products from "@/components/Products";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import FloatingCart from "@/components/FloatingCart";
import { SEOHelmet, pageSEO } from "@/utils/seo";

const ProductsPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <SEOHelmet 
        title={pageSEO.products.title}
        description={pageSEO.products.description}
        keywords={pageSEO.products.keywords}
      />
      
      <Header />
      <main className="pt-16">
        <Products />
      </main>
      <Footer />
      <FloatingButtons />
      <FloatingCart />
    </div>
  );
};

export default ProductsPage;
