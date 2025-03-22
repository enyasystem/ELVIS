import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const carouselData = [
  {
    title: "Welcome to Jeason Steel Company",
    description: "Providing World-Class Steel Solutions and Services to clients in order to invest and create reliable infrastructure.",
    subtext: "We are your reliable Steel Partner.",
    image: "/lovable-uploads/H3.png" // Replace with your steel factory image
  },
  {
    title: "Quality Steel Solutions",
    description: "Premium steel products engineered to meet the highest industry standards.",
    subtext: "Excellence in every detail",
    image: "/images/steel-production.jpg" // Replace with your steel production image
  },
  {
    title: "Innovation & Expertise",
    description: "Leveraging cutting-edge technology to deliver exceptional steel products.",
    subtext: "Leading the industry forward",
    image: "/images/steel-workers.jpg" // Replace with your steel workers image
  }
];

const Hero = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false
  };

  return (
    <section id="home" className="relative h-[calc(100vh-4rem)] overflow-hidden bg-gradient-to-br from-steel-primary to-steel-secondary md:bg-none">
      <Slider {...settings} className="h-full">
        {carouselData.map((slide, index) => (
          <div key={index} className="h-full">
            <div className="relative h-full flex flex-col md:flex-row">
              {/* Text Content */}
              <div className="relative z-20 md:w-1/2 h-full md:bg-gradient-to-br from-steel-primary to-steel-secondary">
                <div className="h-full container mx-auto px-4 flex items-center">
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="w-full max-w-xl space-y-6 p-6 md:p-8
                      md:bg-black/10 md:backdrop-blur-sm md:rounded-lg 
                      bg-transparent"
                  >
                    <h1 className="text-4xl md:text-6xl font-bold leading-tight text-white">
                      {slide.title}
                    </h1>
                    <div className="space-y-4">
                      <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        className="text-lg md:text-xl text-gray-100"
                      >
                        {slide.description}
                      </motion.p>
                      <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6, duration: 0.6 }}
                        className="text-lg md:text-xl font-semibold text-gray-100"
                      >
                        {slide.subtext}
                      </motion.p>
                    </div>
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.9, duration: 0.6 }}
                      className="flex flex-wrap gap-4"
                    >
                      <Link 
                        to="/products"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-white text-steel-primary rounded-lg hover:bg-steel-light transition-all duration-300 transform hover:scale-105"
                      >
                        View Products
                        <ArrowRight className="h-5 w-5" />
                      </Link>
                      <Link 
                        to="/contact"
                        className="px-6 py-3 border border-white text-white rounded-lg hover:bg-white/10 transition-all duration-300 transform hover:scale-105"
                      >
                        Contact Us
                      </Link>
                    </motion.div>
                  </motion.div>
                </div>
              </div>

              {/* Image Section */}
              <div className="absolute md:relative md:w-1/2 w-full h-full inset-0 md:inset-auto">
                <div className="absolute inset-0 md:hidden bg-gradient-to-b from-black/50 to-black/20" />
                <img 
                  src={slide.image}
                  alt={`Slide ${index + 1}`}
                  className="w-full h-full object-cover"
                  loading="eager"
                />
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default Hero;
