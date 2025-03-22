
import { Helmet } from 'react-helmet';
import React from 'react';

export type SEOProps = {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: string;
  twitterCard?: string;
};

const defaultSEO = {
  title: "Jeason Steel Limited - Premium Steel Products & Solutions",
  description: "Jeason Steel Limited provides high-quality steel products including angle irons, steel beams, hot rolled steel coils, and more for construction and industrial applications.",
  keywords: [
    "steel products", 
    "angle irons", 
    "steel beams", 
    "steel sheets", 
    "steel coils", 
    "construction materials", 
    "industrial steel", 
    "Jeason Steel", 
    "chequered plates", 
    "steel suppliers",
    "steel manufacturing",
    "steel distribution",
    "construction steel",
    "structural steel",
    "building materials",
    "metal products",
    "steel fabrication",
    "steel industry",
    "steel services",
    "quality steel products"
  ],
  image: "/lovable-uploads/9c506511-a536-4e27-b95b-e0d81e43036a.png",
  url: "https://jeasonsteel.com",
  type: "website",
  twitterCard: "summary_large_image"
};

// Export as a React component with explicit type
export const SEOHelmet: React.FC<SEOProps> = ({
  title = defaultSEO.title,
  description = defaultSEO.description,
  keywords = defaultSEO.keywords,
  image = defaultSEO.image,
  url = defaultSEO.url,
  type = defaultSEO.type,
  twitterCard = defaultSEO.twitterCard
}) => {
  const keywordsString = keywords.join(", ");
  
  return React.createElement(
    Helmet,
    null,
    React.createElement('title', null, title),
    React.createElement('meta', { name: "description", content: description }),
    React.createElement('meta', { name: "keywords", content: keywordsString }),
    
    // Open Graph / Facebook
    React.createElement('meta', { property: "og:type", content: type }),
    React.createElement('meta', { property: "og:url", content: url }),
    React.createElement('meta', { property: "og:title", content: title }),
    React.createElement('meta', { property: "og:description", content: description }),
    React.createElement('meta', { property: "og:image", content: image }),
    
    // Twitter
    React.createElement('meta', { name: "twitter:card", content: twitterCard }),
    React.createElement('meta', { name: "twitter:url", content: url }),
    React.createElement('meta', { name: "twitter:title", content: title }),
    React.createElement('meta', { name: "twitter:description", content: description }),
    React.createElement('meta', { name: "twitter:image", content: image }),
    
    // Canonical URL
    React.createElement('link', { rel: "canonical", href: url })
  );
};

export const pageSEO = {
  home: {
    title: "Jeason Steel Limited - Premium Steel Products & Solutions",
    description: "Leading provider of high-quality steel products for construction and industrial applications across Nigeria.",
    keywords: [...defaultSEO.keywords, "steel manufacturing", "steel solutions"]
  },
  products: {
    title: "Steel Products - Jeason Steel Limited",
    description: "Browse our comprehensive range of high-quality steel products including angle irons, steel beams, steel sheets, and more.",
    keywords: [...defaultSEO.keywords, "buy steel products", "steel product catalog"]
  },
  about: {
    title: "About Us - Jeason Steel Limited",
    description: "Learn about Jeason Steel Limited's history, values, mission, and commitment to quality in the steel industry.",
    keywords: [...defaultSEO.keywords, "steel company", "steel manufacturer history", "about Jeason Steel"]
  },
  contact: {
    title: "Contact Us - Jeason Steel Limited",
    description: "Get in touch with Jeason Steel Limited for inquiries about our products, quotes, or any other information.",
    keywords: [...defaultSEO.keywords, "contact steel supplier", "steel product inquiry"]
  },
  quote: {
    title: "Request a Quote - Jeason Steel Limited",
    description: "Request a personalized quote for our premium steel products tailored to your project requirements.",
    keywords: [...defaultSEO.keywords, "steel quote", "steel price inquiry", "steel product quote"]
  },
  careers: {
    title: "Careers - Jeason Steel Limited",
    description: "Explore career opportunities at Jeason Steel Limited and join our team of steel industry professionals.",
    keywords: [...defaultSEO.keywords, "steel industry jobs", "steel company careers", "jobs at Jeason Steel"]
  }
};

// Structured data for the organization
export const getOrganizationSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Jeason Steel Limited",
    "url": defaultSEO.url,
    "logo": `${defaultSEO.url}${defaultSEO.image}`,
    "description": defaultSEO.description,
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "Nigeria"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+234-XXX-XXXX-XXX",
      "contactType": "customer service"
    }
  };
};

// Structured data for products
export const getProductSchema = (product: any) => {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.title,
    "description": product.full_description || product.description,
    "image": product.image,
    "brand": {
      "@type": "Brand",
      "name": "Jeason Steel"
    },
    "offers": {
      "@type": "Offer",
      "url": `${defaultSEO.url}/product/${product.id}`,
      "priceCurrency": "NGN",
      "price": product.price,
      "priceValidUntil": new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
      "availability": "https://schema.org/InStock"
    }
  };
};
