
import React from 'react';
import Header from "@/components/Header";
import QuoteRequest from "@/components/QuoteRequest";
import Footer from "@/components/Footer";
import { SEOHelmet, pageSEO } from "@/utils/seo";
import FloatingButtons from "@/components/FloatingButtons";

const QuotePage = () => {
  return (
    <div className="min-h-screen bg-white">
      <SEOHelmet 
        title={pageSEO.quote.title}
        description={pageSEO.quote.description}
        keywords={pageSEO.quote.keywords}
      />
      
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-steel-primary text-center mb-8">
            Request a Quote
          </h1>
          <QuoteRequest />
        </div>
      </main>
      <Footer />
      <FloatingButtons />
    </div>
  );
};

export default QuotePage;
