
import React from 'react';
import Header from "@/components/Header";
import AboutContent from "@/components/About";
import Footer from "@/components/Footer";
import { SEOHelmet, pageSEO } from "@/utils/seo";
import FloatingButtons from "@/components/FloatingButtons";

const About = () => {
  return (
    <div className="min-h-screen bg-white">
      <SEOHelmet 
        title={pageSEO.about.title}
        description={pageSEO.about.description}
        keywords={pageSEO.about.keywords}
      />
      
      <Header />
      <main className="pt-16">
        <AboutContent />
      </main>
      <Footer />
      <FloatingButtons />
    </div>
  );
};

export default About;
