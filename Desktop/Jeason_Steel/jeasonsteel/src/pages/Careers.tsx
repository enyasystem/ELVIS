
import React from 'react';
import Header from "@/components/Header";
import CareerForm from "@/components/CareerForm";
import Footer from "@/components/Footer";
import { SEOHelmet, pageSEO } from "@/utils/seo";
import FloatingButtons from "@/components/FloatingButtons";

const CareersPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <SEOHelmet 
        title={pageSEO.careers.title}
        description={pageSEO.careers.description}
        keywords={pageSEO.careers.keywords}
      />
      
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-steel-primary text-center mb-8">
            Career Opportunities
          </h1>
          <CareerForm position="General Application" />
        </div>
      </main>
      <Footer />
      <FloatingButtons />
    </div>
  );
};

export default CareersPage;
