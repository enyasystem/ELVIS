import ServiceLayout from "./ServiceLayout";

const constructionContent = {
  title: "Construction: Steel Works",
  description: "Comprehensive steel construction services for commercial and industrial projects",
  heroImage: "/images/services/construction-hero.jpg",
  content: {
    introduction: "Our steel construction division specializes in delivering high-quality structural steel solutions for commercial, industrial, and infrastructure projects. With decades of experience and a team of skilled professionals, we ensure precision, safety, and excellence in every project.",
    features: [
      {
        title: "Structural Steel Installation",
        description: "Professional installation of steel frameworks, beams, and support structures",
        image: "/images/services/structural-steel.jpg"
      },
      {
        title: "Steel Building Systems",
        description: "Complete pre-engineered and custom steel building solutions",
        image: "/images/services/building-systems.jpg"
      },
      {
        title: "Industrial Construction",
        description: "Specialized steel construction for industrial facilities and warehouses",
        image: "/images/services/industrial.jpg"
      },
      {
        title: "Bridge Construction",
        description: "Steel bridge construction and rehabilitation services",
        image: "/images/services/bridge.jpg"
      }
    ],
    benefits: [
      "Expert project management and execution",
      "Strict adherence to safety standards",
      "On-time project completion",
      "Cost-effective solutions",
      "Quality assurance at every stage",
      "Experienced technical team"
    ]
  }
};

const ConstructionPage = () => {
  return (
    <ServiceLayout
      title="Construction: Steel Works"
      description="Comprehensive steel construction services for commercial and industrial projects"
      heroImage="/images/services/construction-hero.jpg"
      content={constructionContent.content}
    />
  );
};

export default ConstructionPage;
