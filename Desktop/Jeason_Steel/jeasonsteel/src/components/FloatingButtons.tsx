
import { ArrowUp, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FloatingButtons = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="fixed bottom-6 z-50 flex w-full justify-between px-6 pointer-events-none">
      <div className="pointer-events-auto">
        <motion.a
          href="https://wa.me/2348035025555"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          className="p-3 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 transition-colors flex items-center justify-center"
          aria-label="Contact on WhatsApp"
        >
          <Phone className="h-6 w-6" />
        </motion.a>
      </div>
      
      <div className="pointer-events-auto">
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              onClick={scrollToTop}
              className="p-3 bg-steel-primary text-white rounded-full shadow-lg hover:bg-steel-secondary transition-colors"
              aria-label="Scroll to top"
            >
              <ArrowUp className="h-6 w-6" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default FloatingButtons;
