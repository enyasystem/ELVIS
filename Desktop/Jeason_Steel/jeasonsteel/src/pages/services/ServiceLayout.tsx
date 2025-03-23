import { motion } from "framer-motion";
import Navbar from "../../components/Navbar";
import Footer from "@/components/Footer";

interface ServicePageProps {
  title: string;
  description: string;
  heroImage: string;
  content: {
    introduction: string;
    features: Array<{
      title: string;
      description: string;
      image: string;
    }>;
    benefits: string[];
  };
}

const ServiceLayout = ({ title, description, heroImage, content }: ServicePageProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="relative h-[40vh] overflow-hidden">
          <img 
            src={heroImage} 
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50 flex items-center">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  {title}
                </h1>
                <p className="text-xl text-gray-200">
                  {description}
                </p>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Content Sections */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="py-16 bg-white"
        >
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <section className="mb-16">
                <h2 className="text-2xl font-semibold text-steel-primary mb-6">Overview</h2>
                <p className="text-steel-gray leading-relaxed">
                  {content.introduction}
                </p>
              </section>

              <section className="mb-16">
                <h2 className="text-2xl font-semibold text-steel-primary mb-8">Our Services</h2>
                <div className="grid md:grid-cols-2 gap-8">
                  {content.features.map((feature, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.2 }}
                      className="bg-steel-light rounded-lg overflow-hidden"
                    >
                      <img 
                        src={feature.image} 
                        alt={feature.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-6">
                        <h3 className="text-xl font-semibold text-steel-primary mb-3">
                          {feature.title}
                        </h3>
                        <p className="text-steel-gray">
                          {feature.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-steel-primary mb-6">Benefits</h2>
                <ul className="grid md:grid-cols-2 gap-4">
                  {content.benefits.map((benefit, index) => (
                    <li 
                      key={index}
                      className="flex items-center space-x-2 text-steel-gray"
                    >
                      <span className="w-2 h-2 bg-steel-primary rounded-full" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default ServiceLayout;
