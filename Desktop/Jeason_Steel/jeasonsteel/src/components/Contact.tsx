import { Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent successfully!");
    setFormData({ name: "", email: "", message: "" });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section id="contact" className="py-16 bg-white/50 backdrop-blur-sm rounded-2xl shadow-xl">
      <motion.div 
        className="container mx-auto px-4"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="max-w-5xl mx-auto">
          <motion.h2 
            variants={itemVariants}
            className="text-3xl md:text-4xl font-bold text-steel-primary text-center mb-12"
          >
            Contact Jeason Steel Company
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div className="space-y-8" variants={containerVariants}>
              <motion.div 
                variants={itemVariants}
                className="flex items-start gap-4 hover:transform hover:scale-105 transition-transform duration-300 bg-white/80 p-6 rounded-xl shadow-lg"
              >
                <MapPin className="h-6 w-6 text-steel-primary shrink-0" />
                <div>
                  <h3 className="font-semibold text-steel-primary mb-1">Our Office Location</h3>
                  <p className="text-steel-gray">Plot 6A Cocoa Industries Road Ogba Industrial Estate Ikeja Ogba, Lagos, Nigeria</p>
                  <div className="mt-4 aspect-video w-full">
                    <iframe
  src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d3963.2151449753524!2d3.337754724098595!3d6.620174222034219!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sPlot%206A%20Cocoa%20Industries%20Road%20Ogba%20Industrial%20Estate%20Ikeja%2C%20Plot%206A%20Cocoa%20Industries%20Rd%2C%20Ogba%2C%20Lagos%20100271%2C%20Lagos!5e0!3m2!1sen!2sng!4v1741565606370!5m2!1sen!2sng"                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                    ></iframe>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                variants={itemVariants}
                className="flex items-start gap-4 hover:transform hover:scale-105 transition-transform duration-300 bg-white/80 p-6 rounded-xl shadow-lg"
              >
                <Phone className="h-6 w-6 text-steel-primary shrink-0" />
                <div>
                  <h3 className="font-semibold text-steel-primary mb-1">Call Us</h3>
                  <p className="text-steel-gray">Main Office: +2348035025555</p>
                  <p className="text-steel-gray">Customer Support: +2349030251668</p>
                </div>
              </motion.div>
              
              <motion.div 
                variants={itemVariants}
                className="flex items-start gap-4 hover:transform hover:scale-105 transition-transform duration-300 bg-white/80 p-6 rounded-xl shadow-lg"
              >
                <Mail className="h-6 w-6 text-steel-primary shrink-0" />
                <div>
                  <h3 className="font-semibold text-steel-primary mb-1">Email Us</h3>
                  <p className="text-steel-gray">
                    For Quotes: <a href="mailto:quotes@jeasonsteel.com" className="text-steel-primary hover:underline">quotes@jeasonsteel.com</a>
                  </p>
                  <p className="text-steel-gray">
                    For Inquiries: <a href="mailto:info@jeasonsteel.com" className="text-steel-primary hover:underline">info@jeasonsteel.com</a>
                  </p>
                </div>
              </motion.div>

              <motion.div 
                variants={itemVariants}
                className="mt-8"
              >
                <Link 
                  to="/quote" 
                  className="inline-block px-6 py-3 bg-steel-primary text-white rounded-lg hover:bg-steel-secondary transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                >
                  Request a Quote
                </Link>
              </motion.div>
            </motion.div>

            <motion.form 
              variants={containerVariants}
              onSubmit={handleSubmit} 
              className="space-y-6 bg-white/80 p-8 rounded-xl shadow-lg"
            >
              <motion.div 
                variants={itemVariants}
                className="transform transition-all duration-300 hover:scale-[1.02]"
              >
                <label htmlFor="name" className="block text-sm font-medium text-steel-primary mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-steel-gray/20 focus:outline-none focus:ring-2 focus:ring-steel-primary transition-all duration-300"
                  required
                />
              </motion.div>
              
              <motion.div 
                variants={itemVariants}
                className="transform transition-all duration-300 hover:scale-[1.02]"
              >
                <label htmlFor="email" className="block text-sm font-medium text-steel-primary mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-steel-gray/20 focus:outline-none focus:ring-2 focus:ring-steel-primary transition-all duration-300"
                  required
                />
              </motion.div>
              
              <motion.div 
                variants={itemVariants}
                className="transform transition-all duration-300 hover:scale-[1.02]"
              >
                <label htmlFor="message" className="block text-sm font-medium text-steel-primary mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-2 rounded-lg border border-steel-gray/20 focus:outline-none focus:ring-2 focus:ring-steel-primary transition-all duration-300"
                  required
                />
              </motion.div>

              <motion.button
                variants={itemVariants}
                type="submit"
                className="w-full px-6 py-3 bg-steel-primary text-white rounded-lg hover:bg-steel-secondary transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              >
                Send Message
              </motion.button>
            </motion.form>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;
