import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-steel-primary text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Jeason Steel</h3>
            <p className="text-steel-light">
              Leading provider of premium steel solutions in Lagos, Nigeria.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-steel-light transition-colors">Home</Link></li>
              <li><Link to="/products" className="hover:text-steel-light transition-colors">Products</Link></li>
              <li><Link to="/about" className="hover:text-steel-light transition-colors">About</Link></li>
              <li><Link to="/contact" className="hover:text-steel-light transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Products</h4>
            <ul className="space-y-2">
              <li><Link to="/products" className="hover:text-steel-light transition-colors">Structural Steel</Link></li>
              <li><Link to="/products" className="hover:text-steel-light transition-colors">Steel Pipes</Link></li>
              <li><Link to="/products" className="hover:text-steel-light transition-colors">Steel Plates</Link></li>
              <li><Link to="/products" className="hover:text-steel-light transition-colors">Steel Sheets</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Contact Info</h4>
            <ul className="space-y-2">
              <li>Plot 6A Cocoa Industries Road Ogba Industrial Estate Ikeja</li>
              <li>Ogba, Lagos, Nigeria</li>
              <li>
                <a href="tel:+2348035025555" className="hover:text-steel-light transition-colors">
                  +234 803 502 5555
                </a>
              </li>
              <li>
                <a href="mailto:info@jeasonsteelng.com" className="hover:text-steel-light transition-colors">
                  info@jeasonsteelng.com
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-8 pt-8 text-center">
          <p>&copy; {new Date().getFullYear()} Jeason Steel. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
