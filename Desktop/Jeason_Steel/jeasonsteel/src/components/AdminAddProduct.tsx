import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { z } from "zod";
import { supabase, SUPABASE_URL } from "@/integrations/supabase/client";
import { Loader2, Upload, Plus, Minus } from "lucide-react";
import { Label } from "@/components/ui/label";

const productSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  price: z.number().positive("Price must be positive"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  category: z.string().min(2, "Category must be at least 2 characters")
});

type ProductFormData = {
  title: string;
  price: number | string;
  description: string;
  full_description: string;
  category: string;
  imageFile: File | null;
  specifications: Record<string, string>;
};

type ValidationErrors = {
  [key in keyof Omit<ProductFormData, "specifications">]?: string;
};

type SpecificationField = {
  key: string;
  value: string;
};

type AdminAddProductProps = {
  onProductAdded?: () => void;
};

const SUGGESTED_SPECIFICATIONS = [
  { key: "material", value: "" },
  { key: "thickness", value: "" },
  { key: "width", value: "" },
  { key: "length", value: "" },
  { key: "finishes", value: "" },
  { key: "sizes", value: "" },
  { key: "types", value: "" },
  { key: "grades", value: "" },
  { key: "weight", value: "" }
];

const AdminAddProduct = ({ onProductAdded }: AdminAddProductProps) => {
  const [formData, setFormData] = useState<ProductFormData>({
    title: "",
    price: "",
    description: "",
    full_description: "",
    category: "",
    imageFile: null,
    specifications: {}
  });
  
  const [specFields, setSpecFields] = useState<SpecificationField[]>([
    { key: "material", value: "Standard" },
    { key: "sizes", value: "Various" }
  ]);
  
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData({ ...formData, imageFile: file });
      
      const reader = new FileReader();
      reader.onload = (event) => {
        setImagePreview(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSpecChange = (index: number, field: 'key' | 'value', value: string) => {
    const newSpecFields = [...specFields];
    newSpecFields[index][field] = value;
    setSpecFields(newSpecFields);
  };

  const addSpecField = () => {
    setSpecFields([...specFields, { key: "", value: "" }]);
  };

  const removeSpecField = (index: number) => {
    const newSpecFields = [...specFields];
    newSpecFields.splice(index, 1);
    setSpecFields(newSpecFields);
  };

  const validate = () => {
    try {
      productSchema.parse({
        ...formData,
        price: Number(formData.price)
      });
      
      if (!formData.imageFile) {
        setErrors({ imageFile: "Please select an image file" });
        return false;
      }
      
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: ValidationErrors = {};
        error.errors.forEach(err => {
          const path = err.path[0] as keyof Omit<ProductFormData, "specifications">;
          newErrors[path] = err.message;
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const uploadImage = async (file: File): Promise<string> => {
    try {
      console.log("Starting image upload process...");
      
      // Create a safe file name
      const fileExt = file.name.split('.').pop();
      const fileName = `${crypto.randomUUID()}.${fileExt}`;
      
      console.log(`Uploading file: ${fileName}, size: ${file.size} bytes, type: ${file.type}`);
      
      // Detailed environment check
      const envInfo = {
        origin: window.location.origin,
        host: window.location.host,
        pathname: window.location.pathname,
        supabaseUrl: SUPABASE_URL,
      };
      console.log("Environment info:", envInfo);
      
      // Upload the file with retries
      let uploadAttempt = 0;
      let uploadSuccessful = false;
      let uploadError = null;
      let uploadData = null;
      
      while (uploadAttempt < 3 && !uploadSuccessful) {
        uploadAttempt++;
        console.log(`Upload attempt ${uploadAttempt}...`);
        
        try {
          const result = await supabase.storage
            .from('products')
            .upload(fileName, file, {
              cacheControl: '3600',
              upsert: true
            });
            
          uploadError = result.error;
          uploadData = result.data;
          
          if (uploadError) {
            console.error(`Upload error on attempt ${uploadAttempt}:`, uploadError);
            // Wait briefly before retry
            if (uploadAttempt < 3) await new Promise(r => setTimeout(r, 1000));
          } else {
            uploadSuccessful = true;
            console.log(`Upload successful on attempt ${uploadAttempt}:`, uploadData);
          }
        } catch (err) {
          console.error(`Exception during upload attempt ${uploadAttempt}:`, err);
          uploadError = err;
          // Wait briefly before retry
          if (uploadAttempt < 3) await new Promise(r => setTimeout(r, 1000));
        }
      }
      
      if (!uploadSuccessful) {
        throw new Error(`Upload failed after ${uploadAttempt} attempts: ${uploadError?.message || "Unknown error"}`);
      }
      
      // Get the public URL
      try {
        const { data: urlData } = supabase.storage
          .from('products')
          .getPublicUrl(fileName);
          
        console.log("Generated public URL:", urlData.publicUrl);
        return urlData.publicUrl;
      } catch (urlErr) {
        console.error("Error getting public URL:", urlErr);
        throw urlErr;
      }
    } catch (error) {
      console.error("Error in uploadImage:", error);
      throw error;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) {
      toast.error("Please fix the form errors");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      let imageUrl = '';
      
      if (formData.imageFile) {
        try {
          console.log("Starting image upload...");
          imageUrl = await uploadImage(formData.imageFile);
          console.log("Image uploaded successfully:", imageUrl);
        } catch (uploadError) {
          console.error("Image upload failed:", uploadError);
          toast.error(`Image upload failed: ${uploadError instanceof Error ? uploadError.message : 'Unknown error'}`);
          setIsSubmitting(false);
          return;
        }
      }
      
      const specifications: Record<string, string> = {};
      specFields.forEach(field => {
        if (field.key.trim() && field.value.trim()) {
          specifications[field.key.trim()] = field.value.trim();
        }
      });
      
      const fullDescription = formData.full_description.trim() 
        ? formData.full_description 
        : formData.description;
      
      const productData = {
        title: formData.title,
        price: Number(formData.price),
        description: formData.description,
        full_description: fullDescription,
        image: imageUrl,
        category: formData.category,
        images: [imageUrl],
        specifications
      };
      
      console.log("Submitting product data:", productData);
      
      const result = await supabase
        .from('products')
        .insert(productData)
        .select();
      
      console.log("Database insertion response:", result);
      
      if (result.error) {
        console.error("Database insertion error:", result.error);
        
        // Check for specific error types
        if (result.error.code === '23505') {
          throw new Error(`A product with this title already exists (Error: ${result.error.message})`);
        } else if (result.error.code === '42P01') {
          throw new Error(`Database table error: ${result.error.message}. Please check if the 'products' table exists.`);
        } else if (result.error.code === '42501') {
          throw new Error(`Permission denied: ${result.error.message}. Your account may not have access to add products.`);
        } else {
          throw new Error(`Database error: ${result.error.message} (Code: ${result.error.code})`);
        }
      }
      
      const data = result.data;
      console.log("Product added successfully:", data);
      toast.success(`Product "${formData.title}" added successfully!`);
      
      setFormData({
        title: "",
        price: "",
        description: "",
        full_description: "",
        category: "",
        imageFile: null,
        specifications: {}
      });
      setSpecFields([
        { key: "material", value: "Standard" },
        { key: "sizes", value: "Various" }
      ]);
      setImagePreview(null);
      
      if (onProductAdded) {
        onProductAdded();
      }
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error(`Failed to add product: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Product</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title" className="block text-sm font-medium mb-1">
              Product Title
            </Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
              className={errors.title ? "border-red-500" : ""}
            />
            {errors.title && <p className="mt-1 text-xs text-red-500">{errors.title}</p>}
          </div>
          
          <div>
            <Label htmlFor="price" className="block text-sm font-medium mb-1">
              Price (₦)
            </Label>
            <Input
              id="price"
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              required
              min="0"
              step="0.01"
              className={errors.price ? "border-red-500" : ""}
            />
            {errors.price && <p className="mt-1 text-xs text-red-500">{errors.price}</p>}
          </div>
          
          <div>
            <Label htmlFor="category" className="block text-sm font-medium mb-1">
              Category
            </Label>
            <Input
              id="category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              required
              className={errors.category ? "border-red-500" : ""}
            />
            {errors.category && <p className="mt-1 text-xs text-red-500">{errors.category}</p>}
          </div>
          
          <div>
            <Label htmlFor="description" className="block text-sm font-medium mb-1">
              Short Description (for listings)
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
              className={errors.description ? "border-red-500" : ""}
            />
            {errors.description && <p className="mt-1 text-xs text-red-500">{errors.description}</p>}
          </div>
          
          <div>
            <Label htmlFor="full_description" className="block text-sm font-medium mb-1">
              Full Description (for product detail page)
            </Label>
            <Textarea
              id="full_description"
              value={formData.full_description}
              onChange={(e) => setFormData({ ...formData, full_description: e.target.value })}
              rows={5}
            />
            <p className="text-xs text-gray-500 mt-1">If left empty, the short description will be used.</p>
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-2">
              <Label className="block text-sm font-medium">
                Product Specifications
              </Label>
              <Button 
                type="button" 
                variant="outline" 
                size="sm" 
                onClick={addSpecField} 
                className="flex items-center gap-1"
              >
                <Plus className="h-4 w-4" />
                Add Specification
              </Button>
            </div>
            
            <div className="space-y-3 mt-3">
              {specFields.map((field, index) => (
                <div key={index} className="flex gap-2 items-start">
                  <div className="w-2/5">
                    <Input
                      placeholder="Specification name"
                      list={`spec-suggestions-${index}`}
                      value={field.key}
                      onChange={(e) => handleSpecChange(index, 'key', e.target.value)}
                    />
                    <datalist id={`spec-suggestions-${index}`}>
                      {SUGGESTED_SPECIFICATIONS.map((suggestion, i) => (
                        <option key={i} value={suggestion.key}>
                          {suggestion.key}
                        </option>
                      ))}
                    </datalist>
                  </div>
                  <div className="flex-1">
                    <Input
                      placeholder="Specification value"
                      value={field.value}
                      onChange={(e) => handleSpecChange(index, 'value', e.target.value)}
                    />
                  </div>
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => removeSpecField(index)}
                    disabled={specFields.length <= 1}
                  >
                    <Minus className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Add specifications like thickness, width, material, etc. to provide detailed product information.
            </p>
          </div>
          
          <div>
            <Label htmlFor="imageFile" className="block text-sm font-medium mb-1">
              Product Image
            </Label>
            <div className="grid gap-4">
              <Input
                id="imageFile"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className={errors.imageFile ? "border-red-500" : ""}
              />
              {errors.imageFile && <p className="mt-1 text-xs text-red-500">{errors.imageFile}</p>}
              
              {imagePreview && (
                <div className="h-40 w-full overflow-hidden rounded-md border">
                  <img 
                    src={imagePreview} 
                    alt="Preview" 
                    className="h-full w-full object-cover"
                  />
                </div>
              )}
              
              {!imagePreview && (
                <div className="h-40 w-full overflow-hidden rounded-md border flex items-center justify-center bg-muted">
                  <Upload className="h-8 w-8 text-muted-foreground" />
                  <p className="ml-2 text-sm text-muted-foreground">No image selected</p>
                </div>
              )}
            </div>
          </div>
          
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 
                Adding...
              </>
            ) : (
              "Add Product"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AdminAddProduct;
