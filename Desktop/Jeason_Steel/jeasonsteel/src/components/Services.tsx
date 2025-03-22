import { Building2, Factory, Briefcase, Settings } from "lucide-react";
import { Link } from "react-router-dom";

const services = [
  {
    id: 1,
    title: "Steel Trading",
    description: "Global steel trading solutions with competitive pricing and reliable delivery",
    icon: Building2,
    link: "/services/trading"
  },
  {
    id: 2,
    title: "Construction: Steel Works",
    description: "Comprehensive steel construction services for commercial and industrial projects",
    icon: Factory,
    link: "/services/construction"
  },
  {
    id: 3,
    title: "Consultancy",
    description: "Expert consultation for steel-related projects and investments",
    icon: Briefcase,
    link: "/services/consultancy"
  },
  {
    id: 4,
    title: "Fabrication",
    description: "Custom steel fabrication services tailored to your specifications",
    icon: Settings,
    link: "/services/fabrication"
  }
];

const Services = () => {
  return (
    <section id="services" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-steel-primary text-center mb-12">
          Our Services
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <Link
                key={service.id}
                to={service.link}
                className="group p-6 bg-steel-light rounded-lg hover:bg-steel-primary transition-colors duration-300"
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  <Icon className="h-12 w-12 text-steel-primary group-hover:text-white transition-colors" />
                  <h3 className="text-xl font-semibold text-steel-primary group-hover:text-white transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-steel-gray group-hover:text-steel-light transition-colors">
                    {service.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;