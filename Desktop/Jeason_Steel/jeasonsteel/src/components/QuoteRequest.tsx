
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";
import { useLocation } from "react-router-dom";

const QuoteRequest = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const productFromUrl = searchParams.get("product");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    productDetails: productFromUrl || "",
    quantity: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Update form when product changes in URL
  useEffect(() => {
    if (productFromUrl) {
      setFormData(prevData => ({
        ...prevData,
        productDetails: productFromUrl
      }));
    }
  }, [productFromUrl]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase
        .from('quote_requests')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            company: formData.company,
            product_details: formData.productDetails,
            quantity: formData.quantity,
            status: 'pending'
          }
        ]);
        
      if (error) throw error;
      
      toast.success("Quote request submitted successfully!");
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        productDetails: "",
        quantity: "",
      });
    } catch (error) {
      console.error("Error submitting quote request:", error);
      toast.error("Failed to submit quote request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-steel-primary mb-2">
          Full Name
        </label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-steel-primary mb-2">
          Email
        </label>
        <Input
          type="email"
          id="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-steel-primary mb-2">
          Phone
        </label>
        <Input
          type="tel"
          id="phone"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          required
        />
      </div>

      <div>
{/*         <label htmlFor="company" className="block text-sm font-medium text-steel-primary mb-2">
          Company Name
        </label> */}
{/*         <Input
          id="company"
          value={formData.company}
          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
          required
        /> */}
      </div>

      <div>
        <label htmlFor="productDetails" className="block text-sm font-medium text-steel-primary mb-2">
          Product Details
        </label>
        <Textarea
          id="productDetails"
          value={formData.productDetails}
          onChange={(e) => setFormData({ ...formData, productDetails: e.target.value })}
          required
        />
      </div>

      <div>
        <label htmlFor="quantity" className="block text-sm font-medium text-steel-primary mb-2">
          Quantity Required
        </label>
        <Input
          id="quantity"
          value={formData.quantity}
          onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
          required
        />
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Submitting...
          </>
        ) : (
          "Request Quote"
        )}
      </Button>
    </form>
  );
};

export default QuoteRequest;
