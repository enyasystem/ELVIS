import ServiceLayout from "./ServiceLayout";

const constructionContent = {
  title: "Construction: Steel Works",
  description: "Comprehensive steel construction services for commercial and industrial projects",
  heroImage: "/images/construction-hero.jpg",
  content: {
    introduction: "Our steel construction division specializes in delivering high-quality structural steel solutions for commercial, industrial, and infrastructure projects. With decades of experience and a team of skilled professionals, we ensure precision, safety, and excellence in every project.",
    features: [
      {
        title: "Structural Steel Installation",
        description: "Professional installation of steel frameworks, beams, and support structures",
        image: "/images/structural-steel.jpg"
      },
      {
        title: "Steel Building Systems",
        description: "Complete pre-engineered and custom steel building solutions",
        image: "/images/structural-steel.jpg"
      },
      {
        title: "Industrial Construction",
        description: "Specialized steel construction for industrial facilities and warehouses",
        image: "/images/industrial.jpg"
      },
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
      title={constructionContent.title}
      description={constructionContent.description}
      heroImage={constructionContent.heroImage}
      content={constructionContent.content}
    />
  );
};

export default ConstructionPage;
