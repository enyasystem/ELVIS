import ServiceLayout from "./ServiceLayout";

const FabricationPage = () => {
  return (
    <ServiceLayout
      title="Steel Fabrication Services"
      description="Custom steel fabrication services tailored to your specifications"
      heroImage="/images/processing.jpg"
      content={{
        introduction: "Our state-of-the-art fabrication facility delivers precision-engineered steel components for various applications. We combine advanced technology with skilled craftsmanship to produce high-quality steel products that meet exact specifications.",
        features: [
          {
            title: "Custom Fabrication",
            description: "Bespoke steel fabrication for specific project requirements",
            image: "/images/processing.jpg"
          },
          {
            title: "Structural Components",
            description: "Fabrication of structural steel elements and assemblies",
            image: "/images/industrial.jpg"
          },
          {
            title: "Metal Processing",
            description: "Cutting, bending, and forming services for steel materials",
            image: "/images/processing.jpg"
          },
          {
            title: "Welding Services",
            description: "Professional welding and joining solutions",
            image: "/images/welding.jpg"
          }
        ],
        benefits: [
          "Precision engineering",
          "Quality craftsmanship",
          "Custom solutions",
          "Modern fabrication techniques",
          "Timely delivery",
          "Competitive pricing"
        ]
      }}
    />
  );
};

export default FabricationPage;
