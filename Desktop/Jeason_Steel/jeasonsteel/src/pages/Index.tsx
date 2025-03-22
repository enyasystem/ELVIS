
import React from 'react';
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Products from "@/components/Products";
import Services from "@/components/Services";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ProductCarousel from "@/components/ProductCarousel";
import FloatingButtons from "@/components/FloatingButtons";
import FloatingCart from "@/components/FloatingCart";
import { SEOHelmet, pageSEO, getOrganizationSchema } from "@/utils/seo";
import { Helmet } from 'react-helmet';

const Index = () => {
  return (
    <div className="bg-white min-h-screen">
      <SEOHelmet 
        title={pageSEO.home.title}
        description={pageSEO.home.description}
        keywords={pageSEO.home.keywords}
      />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(getOrganizationSchema())}
        </script>
      </Helmet>
      
      <Header />
      <main>
        <Hero />
        <Services />
        <ProductCarousel />
{/*         <About /> */}
        <Contact />
      </main>
      <Footer />
      <FloatingButtons />
      <FloatingCart />
    </div>
  );
};

export default Index;
