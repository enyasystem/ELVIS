import { Building2, Factory, Briefcase, Settings, ArrowRight } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

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
  const location = useLocation();
  const isLandingPage = location.pathname === '/';

  return (
    <section id="services" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-steel-primary text-center mb-12">
          Our Services
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
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
        
        {/* View All Services Button - Only shown on landing page */}
        {isLandingPage && (
          <div className="text-center mt-8">
            <Link to="/services">
              <Button 
                variant="default" 
                size="lg"
                className="group bg-jeason-primary hover:bg-jeason-secondary text-white px-8 py-6 text-lg font-semibold transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                View All Services
                <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform duration-300" />
              </Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default Services;
