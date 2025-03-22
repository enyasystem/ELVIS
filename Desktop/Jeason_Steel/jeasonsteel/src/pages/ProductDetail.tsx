
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { FileText, Loader2 } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { formatPrice } from "@/lib/utils";
import { Product } from "@/types/payment";
import { SEOHelmet, getProductSchema } from "@/utils/seo";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchProduct(Number(id));
    }
  }, [id]);

  const fetchProduct = async (productId: number) => {
    try {
      setIsLoading(true);
      
      // Fetch the main product
      const { data: productData, error: productError } = await supabase
        .from('products')
        .select('*')
        .eq('id', productId)
        .single();
      
      if (productError) {
        throw productError;
      }
      
      // Transform product data
      const transformedProduct = {
        ...productData,
        images: Array.isArray(productData.images) && productData.images.length > 0 
          ? productData.images 
          : [productData.image],
        specifications: typeof productData.specifications === 'object' 
          ? productData.specifications 
          : {}
      } as Product;
      
      setProduct(transformedProduct);
      
      // Fetch related products (same category, excluding current product)
      if (transformedProduct.category) {
        const { data: relatedData, error: relatedError } = await supabase
          .from('products')
          .select('*')
          .eq('category', transformedProduct.category)
          .neq('id', productId)
          .limit(3);
        
        if (!relatedError && relatedData) {
          const transformedRelated = relatedData.map(item => ({
            ...item,
            images: Array.isArray(item.images) ? item.images : [],
            specifications: typeof item.specifications === 'object' ? item.specifications : {}
          })) as Product[];
          
          setRelatedProducts(transformedRelated);
        }
      }
      
    } catch (error) {
      console.error("Error fetching product:", error);
      toast.error("Failed to load product details");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRequestQuote = () => {
    if (product) {
      toast.success(`Redirecting to quote request form for ${product.title}`);
      // Navigate to the quote page with the product info
      window.location.href = `/quote?product=${encodeURIComponent(product.title)}`;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="container mx-auto px-4 py-16 mt-16 flex-grow flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="h-10 w-10 animate-spin mx-auto text-steel-primary" />
            <p className="mt-4 text-lg">Loading product details...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="container mx-auto px-4 py-16 mt-16 flex-grow">
          <h1 className="text-2xl font-bold">Product not found</h1>
          <Link to="/products" className="text-blue-600 hover:underline">
            Return to products
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <SEOHelmet 
        title={`${product.title} - Jeason Steel Limited`}
        description={product.full_description || product.description}
        keywords={[product.category, product.title, "steel product", "jeason steel", "construction materials"]}
        image={product.image}
      />
      <script type="application/ld+json">
        {JSON.stringify(getProductSchema(product))}
      </script>
      
      <Header />
      <div className="container mx-auto px-4 py-16 mt-16 flex-grow">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <div className="w-full">
            <Carousel className="w-full max-w-xl mx-auto">
              <CarouselContent>
                {product.images.map((image, index) => (
                  <CarouselItem key={index}>
                    <div className="aspect-video relative rounded-lg overflow-hidden">
                      <img
                        src={image}
                        alt={`${product.title} - View ${index + 1}`}
                        className="absolute inset-0 w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://placehold.co/600x400?text=Image+Error';
                        }}
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
          <div>
            <h1 className="text-4xl font-bold mb-4">{product.title}</h1>
            {/* Commented out price display
            <p className="text-2xl font-bold text-jeason-secondary mb-4">
              {formatPrice(product.price)}
            </p>
            */}
            <p className="text-gray-700 mb-6">{product.full_description}</p>
            <Button
              onClick={handleRequestQuote}
              className="w-full bg-steel-primary text-white py-2 px-4 rounded-md hover:bg-steel-secondary transition-colors duration-200 mb-6 flex items-center justify-center gap-2"
            >
              <FileText className="h-5 w-5" />
              Request Quote
            </Button>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-2xl font-semibold mb-4">Specifications</h2>
              {Object.keys(product.specifications).length > 0 ? (
                Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-2 border-b border-gray-200">
                    <span className="font-medium capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                    <span className="text-gray-600">{value}</span>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-2">No specifications available</p>
              )}
            </div>
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-3xl font-bold mb-8">Related Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedProducts.map((relatedProduct) => (
                <Link
                  key={relatedProduct.id}
                  to={`/product/${relatedProduct.id}`}
                  className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="aspect-video relative">
                    <img
                      src={relatedProduct.image}
                      alt={relatedProduct.title}
                      className="absolute inset-0 w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://placehold.co/600x400?text=Image+Error';
                      }}
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{relatedProduct.title}</h3>
                    <p className="text-gray-600">{relatedProduct.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetail;
