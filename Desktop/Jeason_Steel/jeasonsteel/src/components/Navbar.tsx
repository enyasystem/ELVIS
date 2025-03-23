
import { Menu } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { formatPrice } from "@/lib/utils";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { getItemCount, getCartTotal } = useCart();
  // Not displaying cart counts and totals
  // const itemCount = getItemCount();
  // const total = getCartTotal();

  return (
    <header className="fixed w-full bg-gray-200/95 backdrop-blur-sm shadow-sm z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img 
                src="/images/Jeason Steel Logo.png" 
                alt="Jeason Steel Limited" 
                className="h-10 mr-2"
              />
              <span className="text-2xl font-bold text-steel-primary"></span>
            </Link>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-steel-primary hover:text-steel-secondary transition-colors">Home</Link>
            <Link to="/products" className="text-steel-primary hover:text-steel-secondary transition-colors">Products</Link>
            <Link to="/about" className="text-steel-primary hover:text-steel-secondary transition-colors">About</Link>
            <Link to="/careers" className="text-steel-primary hover:text-steel-secondary transition-colors">Careers</Link>
            <Link to="/quote" className="text-steel-primary hover:text-steel-secondary transition-colors">Request Quote</Link>
            <Link to="/contact" className="text-steel-primary hover:text-steel-secondary transition-colors">Contact</Link>
            {/* Removed shopping cart link and counter */}
          </nav>

          <div className="md:hidden flex items-center space-x-4">
            {/* Removed shopping cart link and counter */}
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <Menu className="h-6 w-6 text-steel-primary" />
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4">
            <nav className="flex flex-col space-y-4">
              <Link to="/" className="text-steel-primary hover:text-steel-secondary transition-colors">Home</Link>
              <Link to="/products" className="text-steel-primary hover:text-steel-secondary transition-colors">Products</Link>
              <Link to="/about" className="text-steel-primary hover:text-steel-secondary transition-colors">About</Link>
              <Link to="/careers" className="text-steel-primary hover:text-steel-secondary transition-colors">Careers</Link>
              <Link to="/quote" className="text-steel-primary hover:text-steel-secondary transition-colors">Request Quote</Link>
              <Link to="/contact" className="text-steel-primary hover:text-steel-secondary transition-colors">Contact</Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
