import { motion } from "framer-motion";

const Loader = () => {
  return (
    <div className="fixed inset-0 bg-steel-primary z-50 flex items-center justify-center">
      <div className="relative">
        {/* Animated steel beam shape */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{
            duration: 1,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
          className="h-4 w-32 bg-white rounded-full"
        />
        
        {/* Company name */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-4 text-center"
        >
          <h2 className="text-2xl font-bold text-white">Jeason Steel</h2>
          <p className="text-steel-light mt-2">Loading...</p>
        </motion.div>
      </div>
    </div>
  );
};

export default Loader;
