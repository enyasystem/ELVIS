import ServiceLayout from "./ServiceLayout";

const consultancyContent = {
  title: "Steel Consultancy Services",
  description: "Expert consultation for steel-related projects and investments",
  heroImage: "/images/services/consultancy-hero.jpg",
  content: {
    introduction: "Our consultancy services provide expert guidance on steel-related projects, helping clients make informed decisions about their investments, construction methods, and material selection. We combine industry knowledge with practical experience to deliver valuable insights.",
    features: [
      {
        title: "Project Planning",
        description: "Comprehensive project planning and feasibility studies",
        image: "/images/services/planning.jpg"
      },
      {
        title: "Technical Consulting",
        description: "Expert technical advice on steel specifications and applications",
        image: "/images/services/technical.jpg"
      },
      {
        title: "Investment Advisory",
        description: "Strategic guidance for steel industry investments",
        image: "/images/services/investment.jpg"
      },
      {
        title: "Quality Assurance",
        description: "Quality control systems and inspection services",
        image: "/images/services/quality.jpg"
      }
    ],
    benefits: [
      "Access to industry expertise",
      "Risk mitigation strategies",
      "Cost optimization",
      "Technical compliance assurance",
      "Market insights and analysis",
      "Sustainable solutions"
    ]
  }
};

const ConsultancyPage = () => {
  return (
    <ServiceLayout
      title="Steel Consultancy Services"
      description="Expert consultation for steel-related projects and investments"
      heroImage="/images/services/consultancy-hero.jpg"
      content={consultancyContent.content}
    />
  );
};

export default ConsultancyPage;
