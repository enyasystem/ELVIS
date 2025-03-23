import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Slider from "react-slick";
import Loader from "./Loader";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const carouselData = [
  {
    title: "Welcome to Jeason Steel Company",
    description: "Providing World-Class Steel Solutions and Services to clients in order to invest and create reliable infrastructure.",
    subtext: "We are your reliable Steel Partner.",
    image: "/lovable-uploads/H3.png",
    buttonText: "View Products",
    buttonLink: "/products"
  },
  {
    title: "Quality Steel Solutions",
    description: "Premium steel products engineered to meet the highest industry standards.",
    subtext: "Excellence in every detail",
    image: "/images/steel-production.jpg",
    buttonText: "About Us",
    buttonLink: "/about"
  },
  {
    title: "Innovation & Expertise",
    description: "Leveraging cutting-edge technology to deliver exceptional steel products.",
    subtext: "Leading the industry forward",
    image: "/images/steel-workers.jpg",
    buttonText: "Our Services",
    buttonLink: "/services"
  }
];

const Hero = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time or wait for resources
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Show loader for 2 seconds

    return () => clearTimeout(timer);
  }, []);

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

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section id="home" className="relative h-[calc(100vh-4rem)] overflow-hidden bg-gradient-to-br from-steel-primary to-steel-secondary md:bg-none animate-fade-in">
      <Slider {...settings} className="h-full">
        {carouselData.map((slide, index) => (
          <div key={index} className="h-full">
            <div className="relative h-full flex flex-col md:flex-row">
              <div className="relative z-20 md:w-1/2 h-full md:bg-gradient-to-br from-steel-primary to-steel-secondary">
                <div className="h-full container mx-auto px-4 flex items-center">
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="w-full max-w-xl space-y-6 p-6 md:p-8 md:bg-black/10 md:backdrop-blur-sm md:rounded-lg bg-transparent"
                  >
                    <motion.h1 
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.6 }}
                      className="text-4xl md:text-6xl font-bold leading-tight text-white"
                    >
                      {slide.title}
                    </motion.h1>
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4, duration: 0.6 }}
                      className="space-y-4"
                    >
                      <p className="text-lg md:text-xl text-gray-100 animate-slide-in">
                        {slide.description}
                      </p>
                      <p className="text-lg md:text-xl font-semibold text-gray-100 animate-slide-in delay-200">
                        {slide.subtext}
                      </p>
                    </motion.div>
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6, duration: 0.6 }}
                      className="flex flex-wrap gap-4"
                    >
                      <Link 
                        to={slide.buttonLink}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-white text-steel-primary rounded-lg hover:bg-steel-light transition-all duration-300 transform hover:scale-105 animate-scale-in delay-300"
                      >
                        {slide.buttonText}
                        <ArrowRight className="h-5 w-5" />
                      </Link>
                      <Link 
                        to="/contact"
                        className="px-6 py-3 border border-white text-white rounded-lg hover:bg-white/10 transition-all duration-300 transform hover:scale-105 animate-scale-in delay-400"
                      >
                        Contact Us
                      </Link>
                    </motion.div>
                  </motion.div>
                </div>
              </div>

              {/* Image Section */}
              <motion.div 
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
                className="absolute md:relative md:w-1/2 w-full h-full inset-0 md:inset-auto"
              >
                <div className="absolute inset-0 md:hidden bg-gradient-to-b from-black/50 to-black/20" />
                <img 
                  src={slide.image}
                  alt={`Slide ${index + 1}`}
                  className="w-full h-full object-cover animate-fade-in"
                  loading="eager"
                />
              </motion.div>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default Hero;
