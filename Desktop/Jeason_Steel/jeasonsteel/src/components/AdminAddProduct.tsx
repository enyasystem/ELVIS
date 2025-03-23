import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { z } from "zod";
import { supabase, SUPABASE_URL } from "@/integrations/supabase/client";
import { Loader2, Upload, Plus, Minus, X } from "lucide-react";
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
  imageFiles: File[];  // Changed from imageFile: File | null
  imagePreviewUrls: string[]; // Added for multiple previews
  specifications: Record<string, string>;
};

// Update the ValidationErrors type
type ValidationErrors = {
  [key in keyof Omit<ProductFormData, "specifications" | "imagePreviewUrls" | "imageFiles">]?: string;
} & {
  imageFile?: string;
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
    imageFiles: [],
    imagePreviewUrls: [],
    specifications: {}
  });
  
  const [specFields, setSpecFields] = useState<SpecificationField[]>([
    { key: "material", value: "Standard" },
    { key: "sizes", value: "Various" }
  ]);
  
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setFormData(prev => ({
        ...prev,
        imageFiles: [...prev.imageFiles, ...files]
      }));
      
      files.forEach(file => {
        const reader = new FileReader();
        reader.onload = (event) => {
          setFormData(prev => ({
            ...prev,
            imagePreviewUrls: [...prev.imagePreviewUrls, event.target?.result as string]
          }));
        };
        reader.readAsDataURL(file);
      });
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

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      imageFiles: prev.imageFiles.filter((_, i) => i !== index),
      imagePreviewUrls: prev.imagePreviewUrls.filter((_, i) => i !== index)
    }));
  };

  // Then update the validate function
  const validate = () => {
    try {
      productSchema.parse({
        ...formData,
        price: Number(formData.price)
      });
      
      if (formData.imageFiles.length === 0) {
        setErrors(prev => ({ ...prev, imageFile: "Please select at least one image" }));
        return false;
      }
      
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: ValidationErrors = {};
        error.errors.forEach(err => {
          const path = err.path[0] as keyof Omit<ProductFormData, "specifications" | "imagePreviewUrls" | "imageFiles">;
          newErrors[path] = err.message;
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const uploadImages = async (files: File[]): Promise<string[]> => {
    try {
      const uploadPromises = files.map(async (file) => {
        const fileExt = file.name.split('.').pop();
        // Generate a unique filename using timestamp and random string
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
        
        const result = await supabase.storage
          .from('products')
          .upload(fileName, file, {
            cacheControl: '3600',
            upsert: true
          });

        if (result.error) throw result.error;

        const { data: urlData } = supabase.storage
          .from('products')
          .getPublicUrl(fileName);

        return urlData.publicUrl;
      });

      return await Promise.all(uploadPromises);
    } catch (error) {
      console.error("Error in uploadImages:", error);
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
      let imageUrls: string[] = [];
      
      if (formData.imageFiles.length > 0) {
        try {
          imageUrls = await uploadImages(formData.imageFiles);
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
        image: imageUrls[0], // First image as main image
        images: imageUrls, // All images
        category: formData.category,
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
        imageFiles: [],
        imagePreviewUrls: [],
        specifications: {}
      });
      setSpecFields([
        { key: "material", value: "Standard" },
        { key: "sizes", value: "Various" }
      ]);
      
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
              Product Images
            </Label>
            <div className="grid gap-4">
              <Input
                id="imageFile"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                multiple // Add multiple attribute
                className={errors.imageFile ? "border-red-500" : ""}
              />
              {errors.imageFile && <p className="mt-1 text-xs text-red-500">{errors.imageFile}</p>}
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {formData.imagePreviewUrls.map((preview, index) => (
                  <div key={index} className="relative group">
                    <div className="h-40 w-full overflow-hidden rounded-md border">
                      <img 
                        src={preview} 
                        alt={`Preview ${index + 1}`} 
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
                
                {formData.imagePreviewUrls.length === 0 && (
                  <div className="h-40 w-full overflow-hidden rounded-md border flex items-center justify-center bg-muted">
                    <Upload className="h-8 w-8 text-muted-foreground" />
                    <p className="ml-2 text-sm text-muted-foreground">No images selected</p>
                  </div>
                )}
              </div>
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
