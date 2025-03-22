import { motion } from "framer-motion";

interface ServicePageProps {
  title: string;
  description: string;
  content: {
    introduction: string;
    features: Array<{
      title: string;
      description: string;
    }>;
    benefits: string[];
  };
}

const ServiceLayout = ({ title, description, content }: ServicePageProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="py-16 bg-white"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-steel-primary mb-4">
            {title}
          </h1>
          <p className="text-xl text-steel-gray mb-12">
            {description}
          </p>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-steel-primary mb-6">Overview</h2>
            <p className="text-steel-gray leading-relaxed">
              {content.introduction}
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-steel-primary mb-6">Our Services</h2>
            <div className="grid gap-6">
              {content.features.map((feature, index) => (
                <div 
                  key={index}
                  className="p-6 bg-steel-light rounded-lg"
                >
                  <h3 className="text-xl font-semibold text-steel-primary mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-steel-gray">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-steel-primary mb-6">Benefits</h2>
            <ul className="list-disc list-inside space-y-3 text-steel-gray">
              {content.benefits.map((benefit, index) => (
                <li key={index}>{benefit}</li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </motion.div>
  );
};

export default ServiceLayout;
