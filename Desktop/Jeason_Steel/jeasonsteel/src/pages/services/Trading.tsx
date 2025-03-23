import ServiceLayout from "./ServiceLayout";

const tradingContent = {
  title: "Steel Trading",
  description: "Global steel trading solutions with competitive pricing and reliable delivery",
  heroImage: "/images/technical.jpg",
  content: {
    introduction: "Our steel trading division provides comprehensive solutions for businesses seeking reliable steel supply chains. We work with leading manufacturers and suppliers worldwide to ensure you get the best quality products at competitive prices.",
    features: [
      {
        title: "Global Sourcing",
        description: "Access to an international network of steel manufacturers and suppliers",
        image: "/images/global-sourcing.jpg"
      },
      {
        title: "Quality Assurance",
        description: "Rigorous quality control and product verification processes",
        image: "/images/quality-assurance.jpg"
      },
      {
        title: "Logistics Management",
        description: "End-to-end supply chain management and timely delivery services",
        image: "/images/Logistic Jeason Steel .jpg"
      },
      {
        title: "Market Intelligence",
        description: "Up-to-date market insights and pricing information",
        image: "/images/market-intelligence.jpg"
      }
    ],
    benefits: [
      "Competitive pricing through strategic partnerships",
      "Reliable and timely delivery",
      "Access to diverse steel products",
      "Expert guidance on product selection",
      "Flexible payment terms",
      "Quality guaranteed products"
    ]
  }
};

const TradingPage = () => {
  return (
    <ServiceLayout
      title={tradingContent.title}
      description={tradingContent.description}
      heroImage={tradingContent.heroImage}
      content={tradingContent.content}
    />
  );
};

export default TradingPage;
