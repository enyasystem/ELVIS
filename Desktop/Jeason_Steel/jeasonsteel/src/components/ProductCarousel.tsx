
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, ChevronLeft, ChevronRight, FileText } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Product } from "@/types/payment";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "@/components/ui/carousel";

const ProductCarousel = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [api, setApi] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  // Set up autoplay when API is available
  useEffect(() => {
    if (!api) return;

    // Autoplay interval (5 seconds)
    const autoplayInterval = setInterval(() => {
      if (api.canScrollNext()) {
        api.scrollNext();
      } else {
        api.scrollTo(0); // Go back to beginning when reaching end
      }
    }, 5000);

    // Clear interval on component unmount
    return () => clearInterval(autoplayInterval);
  }, [api]);

  const fetchFeaturedProducts = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('id', { ascending: false })
        .limit(4);
      
      if (error) {
        throw error;
      }
      
      // Transform database records to Product type
      const transformedProducts = data?.map(item => ({
        ...item,
        images: Array.isArray(item.images) ? item.images : [],
        specifications: typeof item.specifications === 'object' ? item.specifications : {}
      })) as Product[];
      
      setProducts(transformedProducts || []);
    } catch (error) {
      console.error("Error fetching featured products:", error);
      setProducts([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRequestQuote = (productId: number, productName: string) => {
    toast.success(`Preparing quote for ${productName}`);
    navigate(`/quote?product=${encodeURIComponent(productName)}`);
  };

  const handleProductClick = (productId: number) => {
    navigate(`/product/${productId}`);
  };

  if (isLoading || products.length === 0) {
    return null; // Don't show anything while loading
  }

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-jeason-primary">
            Featured Products
          </h2>
          <p className="text-steel-gray mt-2">Check out our top products</p>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          setApi={setApi}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {products.map((product) => (
              <CarouselItem key={product.id} className="pl-4 sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow h-full flex flex-col">
                  <div 
                    onClick={() => handleProductClick(product.id)}
                    className="block aspect-video relative cursor-pointer"
                  >
                    <img 
                      src={product.image} 
                      alt={product.title}
                      className="absolute inset-0 w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://placehold.co/600x400?text=Image+Error';
                      }}
                    />
                  </div>
                  <div className="p-6 flex-grow flex flex-col">
                    <div 
                      onClick={() => handleProductClick(product.id)}
                      className="block flex-grow cursor-pointer"
                    >
                      <h3 className="text-xl font-semibold text-jeason-primary mb-2">
                        {product.title}
                      </h3>
                      <p className="text-steel-gray mb-4 line-clamp-2">
                        {product.description}
                      </p>
                      {/* Commented out price display 
                      <p className="text-lg font-bold text-jeason-secondary mb-4">
                        {formatPrice(product.price)}
                      </p>
                      */}
                    </div>
                    <button
                      onClick={() => handleRequestQuote(product.id, product.title)}
                      className="w-full bg-jeason-primary text-white py-2 px-4 rounded-md hover:bg-jeason-secondary transition-colors duration-200 flex items-center justify-center gap-2"
                    >
                      <FileText className="h-5 w-5" />
                      Request Quote
                    </button>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex items-center justify-end mt-8">
            <CarouselPrevious className="relative static left-0 right-auto mr-2">
              <ChevronLeft className="h-5 w-5" />
            </CarouselPrevious>
            <CarouselNext className="relative static right-0 left-auto">
              <ChevronRight className="h-5 w-5" />
            </CarouselNext>
          </div>
        </Carousel>

        <div className="mt-8 text-center">
          <Link to="/products">
            <Button variant="outline" className="group">
              View More Products
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProductCarousel;
