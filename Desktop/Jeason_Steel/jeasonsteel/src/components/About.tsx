import { Shield, Truck, Users } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";

const managementTeam = [
  {
    title: "Chairman",
    name: "Lady Cecilia Agbara",
    image: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952",
  },
  {
    title: "Managing Director/Chief Executive Officer",
    name: "Engr. Emmanuel Agbara",
    image: "/lovable-uploads/Mr Osita.jpeg",
  },
  {
    title: "Company Secretary",
    name: "Barr. Kimberly Ukegbu",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
  },
];

const features = [
  {
    icon: Shield,
    title: "Quality Assured",
    description: "All our products meet international quality standards",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    description: "Efficient logistics network across Lagos",
  },
  {
    icon: Users,
    title: "Expert Support",
    description: "Professional team ready to assist you",
  },
];

const About = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 space-y-16">
        {/* Management Team Section */}
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-steel-primary mb-8 text-center">
            Our Management Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {managementTeam.map((member, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-steel-primary mb-2">
                    {member.title}
                  </h3>
                  <p className="text-steel-gray">{member.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CEO Message Section */}
        <div className="max-w-7xl mx-auto bg-steel-light rounded-lg p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <img
                src="/lovable-uploads/Mr Osita.jpeg"
                alt="CEO"
                className="rounded-lg w-full h-[400px] object-cover"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-steel-primary mb-4">
                Message from the CEO
              </h2>
              <p className="text-steel-gray text-lg">
                As the CEO of Jeason Steel, I am committed to delivering excellence in every aspect of our operations. Our focus remains on innovation, quality, and sustainable growth in the steel industry.
              </p>
              <p className="text-steel-gray text-lg mt-4">
                - Engr. Emmanuel Agbara
              </p>
            </div>
          </div>
        </div>

        {/* Vision and Mission Section */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="overflow-hidden">
              <img
                src="/lovable-uploads/eye-glasses-looking-at-city-at-night.jpg"
                alt="Vision"
                className="w-full h-48 object-cover"
              />
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold text-steel-primary mb-4">Our Vision</h3>
                <p className="text-steel-gray">
                  Deliver high-quality iron and steel materials to Nigeria and West Africa while contributing significantly to the global steel value chain and trading economy.
                </p>
              </CardContent>
            </Card>
            <Card className="overflow-hidden">
              <img
                src="/lovable-uploads/H1.png"
                alt="Mission"
                className="w-full h-48 object-cover"
              />
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold text-steel-primary mb-4">Our Mission</h3>
                <p className="text-steel-gray">
                  To be the leading provider of high-quality steel products in West Africa through innovation, sustainability, and excellence in service delivery.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="p-6 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-steel-light mb-4">
                <feature.icon className="h-8 w-8 text-steel-primary" />
              </div>
              <h3 className="text-xl font-semibold text-steel-primary mb-2">
                {feature.title}
              </h3>
              <p className="text-steel-gray">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
