import { Shield, Truck, Users, Target, Clock, Award } from "lucide-react";
import { Card, CardContent } from "./ui/card";

const managementTeam = [
  {
    title: "Managing Director and Cheif Executive",
    name: "Joseph E. Agbara",
    image: "/lovable-uploads/chairman.jpg",
    description: "He acquired his experience in various Steel Processing Mills in Germany. He oversees the general operations of the company, procurement of raw materials as well production and."
  },
  {
    title: "Executive Director",
    name: "Engr. Emmanuel Agbara",
    image: "/lovable-uploads/Mr Osita.jpeg",
    description: "Engr. Emmanuel Agbara leads Jeason Steel with a unique combination of technical expertise and business acumen. His innovative approach to steel manufacturing and distribution has transformed our operations and expanded our market presence across West Africa."
  },
  {
    title: "Chief Engineer",
    name: "Sebastian Oparaji",
    image: "/lovable-uploads/secretary.jpg",
    description: "As Company Secretary, Barr. Kimberly Ukegbu ensures corporate governance excellence and legal compliance. Her expertise in corporate law and regulatory matters strengthens our commitment to ethical business practices."
  },
];

const features = [
  {
    icon: Shield,
    title: "Quality Assurance",
    description: "Our products undergo rigorous testing and meet international standards for excellence in steel manufacturing."
  },
  {
    icon: Target,
    title: "Precision Delivery",
    description: "Strategic logistics network ensuring timely delivery across West Africa with real-time tracking."
  },
  {
    icon: Users,
    title: "Expert Consultation",
    description: "Dedicated team of steel industry professionals providing comprehensive technical support."
  },
  {
    icon: Clock,
    title: "Timely Service",
    description: "Quick response times and efficient project execution to meet your deadlines."
  },
  {
    icon: Award,
    title: "Industry Leadership",
    description: "Recognized excellence in steel manufacturing and distribution services."
  },
  {
    icon: Truck,
    title: "Nationwide Coverage",
    description: "Extensive distribution network reaching all corners of Nigeria and beyond."
  }
];

const About = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 space-y-20">
        {/* Company Overview */}
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-steel-primary mb-8 text-center">
            About Jeason Steel
          </h2>
          <p className="text-lg text-steel-gray text-center max-w-4xl mx-auto mb-12">
            Since our establishment, Jeason Steel has been at the forefront of steel manufacturing and distribution in West Africa. We combine cutting-edge technology with decades of industry expertise to deliver superior steel products and services.
          </p>
        </div>

        {/* Management Team Section */}
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-steel-primary mb-12 text-center">
            Our Leadership Team
          </h2>
          <div className="space-y-16">
            {managementTeam.map((member, index) => (
              <div key={index} className="flex flex-col md:flex-row items-center gap-8">
                <div className="md:w-1/3">
                  <div className="w-64 h-64 rounded-full overflow-hidden mx-auto border-4 border-steel-light">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="md:w-2/3 text-center md:text-left">
                  <h3 className="text-2xl font-bold text-steel-primary mb-2">
                    {member.name}
                  </h3>
                  <p className="text-xl text-steel-secondary mb-4">{member.title}</p>
                  <p className="text-steel-gray text-lg">{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Vision and Mission Section */}
        <div className="max-w-7xl mx-auto bg-steel-light rounded-lg p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-steel-primary">Our Vision</h3>
              <p className="text-steel-gray text-lg">
                To become the premier steel solutions provider in West Africa, recognized for quality, innovation, and sustainable practices in the global steel industry.
              </p>
            </div>
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-steel-primary">Our Mission</h3>
              <p className="text-steel-gray text-lg">
                To deliver exceptional steel products and services while fostering economic growth, environmental responsibility, and technological advancement in the steel sector.
              </p>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-steel-primary mb-12 text-center">
            Why Choose Jeason Steel
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="p-6 text-center hover:bg-steel-light rounded-lg transition-all duration-300">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-steel-primary mb-4">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-steel-primary mb-3">
                  {feature.title}
                </h3>
                <p className="text-steel-gray">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
