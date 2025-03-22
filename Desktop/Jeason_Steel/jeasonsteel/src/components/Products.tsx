
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, RefreshCw, FileText } from "lucide-react";
import { Product } from "@/types/payment";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import { SEOHelmet, pageSEO } from "@/utils/seo";

const Products = () => {
  const [displayProducts, setDisplayProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  useEffect(() => {
    fetchProducts();
    
    // Set up a polling interval to refresh products every 60 seconds
    const intervalId = setInterval(() => {
      fetchProducts(false); // silent refresh without loading state
    }, 60000);
    
    return () => clearInterval(intervalId);
  }, []);
  
  const fetchProducts = async (showLoading = true) => {
    try {
      if (showLoading) {
        setIsLoading(true);
      }
      setError(null);
      
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('id', { ascending: false });
      
      if (error) {
        throw error;
      }
      
      // Transform database records to Product type
      const transformedProducts = data?.map(item => ({
        ...item,
        images: Array.isArray(item.images) ? item.images : [],
        specifications: typeof item.specifications === 'object' ? item.specifications : {}
      })) as Product[];
      
      setDisplayProducts(transformedProducts || []);
      
    } catch (error) {
      console.error("Error fetching products:", error);
      setError("Failed to load products. Please try again later.");
      setDisplayProducts([]);
    } finally {
      if (showLoading) {
        setIsLoading(false);
      }
      setIsRefreshing(false);
    }
  };
  
  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchProducts();
  };

  if (isLoading) {
    return (
      <section id="products" className="py-16 bg-jeason-light">
        <div className="container mx-auto px-4 flex justify-center items-center min-h-[300px]">
          <Loader2 className="h-10 w-10 animate-spin text-jeason-primary" />
          <span className="ml-3 text-lg">Loading products...</span>
        </div>
      </section>
    );
  }

  return (
    <section id="products" className="py-16 bg-jeason-light">
      <SEOHelmet 
        title={pageSEO.products.title}
        description={pageSEO.products.description}
        keywords={pageSEO.products.keywords}
      />
      
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-jeason-primary">
            Our Products
          </h2>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="hidden md:flex"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
        
        {error && (
          <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}
        
        {displayProducts.length === 0 ? (
          <p className="text-center text-lg text-gray-600">No products available at the moment.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {displayProducts.map((product) => (
              <div 
                key={product.id}
                className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              >
                <Link 
                  to={`/product/${product.id}`}
                  className="block aspect-video relative"
                >
                  <img 
                    src={product.image} 
                    alt={product.title}
                    className="absolute inset-0 w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://placehold.co/600x400?text=Image+Error';
                    }}
                  />
                </Link>
                <div className="p-6">
                  <Link 
                    to={`/product/${product.id}`}
                    className="block"
                  >
                    <h3 className="text-xl font-semibold text-jeason-primary mb-2">
                      {product.title}
                    </h3>
                    <p className="text-steel-gray mb-4">
                      {product.description}
                    </p>
                    {/* Commented out price display
                    <p className="text-lg font-bold text-jeason-secondary mb-4">
                      {formatPrice(product.price)}
                    </p>
                    */}
                  </Link>
                  <Link
                    to={`/product/${product.id}`}
                    className="w-full bg-jeason-primary text-white py-2 px-4 rounded-md hover:bg-jeason-secondary transition-colors duration-200 flex items-center justify-center gap-2"
                  >
                    <FileText className="h-5 w-5" />
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Products;
