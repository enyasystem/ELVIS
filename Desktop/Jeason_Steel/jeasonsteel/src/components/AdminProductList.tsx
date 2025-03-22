import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Trash, Pencil, X, Check, Loader2, RefreshCw, Upload } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";
import { Product } from "@/types/payment";
import { Label } from "@/components/ui/label";

const productSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  price: z.number().positive("Price must be positive"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  category: z.string().min(2, "Category must be at least 2 characters")
});

type ValidationErrors = {
  [key in keyof Partial<Product>]?: string;
};

type AdminProductListProps = {
  refreshTrigger?: number;
};

const AdminProductList = ({ refreshTrigger = 0 }: AdminProductListProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState<number | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [deletedProductIds, setDeletedProductIds] = useState<number[]>([]);

  useEffect(() => {
    fetchProducts();
  }, [refreshTrigger]);

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('id', { ascending: false });
      
      if (error) {
        throw error;
      }
      
      const transformedProducts = data?.map(item => ({
        ...item,
        images: Array.isArray(item.images) ? item.images : [],
        specifications: typeof item.specifications === 'object' ? item.specifications : {}
      })) as Product[];
      
      // Filter out products that were deleted in this session
      const filteredProducts = transformedProducts.filter(product => 
        !deletedProductIds.includes(product.id)
      );
      
      setProducts(filteredProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Failed to load products");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchProducts();
    setIsRefreshing(false);
  };

  const validate = (product: Partial<Product>) => {
    try {
      productSchema.parse({
        title: product.title,
        price: product.price,
        description: product.description,
        category: product.category
      });
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: ValidationErrors = {};
        error.errors.forEach(err => {
          const path = err.path[0] as keyof Product;
          newErrors[path] = err.message;
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct({ ...product });
    setErrors({});
    setImageFile(null);
    setImagePreview(null);
  };

  const handleDelete = async (productId: number) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        setIsDeleting(productId);
        
        // Delete from database if it exists there
        const { error } = await supabase
          .from('products')
          .delete()
          .eq('id', productId);
        
        if (error) {
          console.error("Database deletion error:", error);
          // Continue with local deletion even if DB deletion fails
        }
        
        // Update local state to remove product
        setProducts(products.filter(product => product.id !== productId));
        
        // Add to deleted products list to prevent it from coming back on refresh
        setDeletedProductIds(prev => [...prev, productId]);
        
        toast.success(`Product deleted successfully!`);
      } catch (error) {
        console.error("Error deleting product:", error);
        toast.error("Failed to delete product");
      } finally {
        setIsDeleting(null);
      }
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      
      const reader = new FileReader();
      reader.onload = (event) => {
        setImagePreview(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async (file: File): Promise<string> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${crypto.randomUUID()}.${fileExt}`;
    const filePath = `${fileName}`;
    
    const { error: uploadError } = await supabase.storage
      .from('products')
      .upload(filePath, file);
      
    if (uploadError) {
      throw uploadError;
    }
    
    const { data } = supabase.storage
      .from('products')
      .getPublicUrl(filePath);
      
    return data.publicUrl;
  };

  const handleSaveEdit = async () => {
    if (!editingProduct) return;

    if (!validate(editingProduct)) {
      toast.error("Please fix the form errors");
      return;
    }

    try {
      setIsSaving(true);
      
      let imageUrl = editingProduct.image;
      
      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
      }
      
      const { error } = await supabase
        .from('products')
        .update({
          title: editingProduct.title,
          price: editingProduct.price,
          description: editingProduct.description,
          image: imageUrl,
          category: editingProduct.category,
          images: [imageUrl],
          full_description: editingProduct.full_description
        })
        .eq('id', editingProduct.id);
      
      if (error) {
        throw error;
      }
      
      const updatedProduct = {
        ...editingProduct,
        image: imageUrl,
        images: [imageUrl]
      };
      
      setProducts(products.map(product => 
        product.id === editingProduct.id ? updatedProduct : product
      ));
      
      setEditingProduct(null);
      setImageFile(null);
      setImagePreview(null);
      toast.success(`Product "${editingProduct.title}" updated successfully!`);
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Failed to update product");
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancelEdit = () => {
    setEditingProduct(null);
    setErrors({});
    setImageFile(null);
    setImagePreview(null);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading products...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-medium">Existing Products</h3>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleRefresh}
          disabled={isRefreshing}
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>
      
      {products.length === 0 ? (
        <p className="text-center py-8 text-muted-foreground">No products found. Add your first product using the form on the left.</p>
      ) : (
        products.map((product) => (
          <Card key={product.id} className={editingProduct?.id === product.id ? "border-primary" : ""}>
            <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
              {editingProduct?.id === product.id ? (
                <Input
                  value={editingProduct.title}
                  onChange={(e) => setEditingProduct({ ...editingProduct, title: e.target.value })}
                  className={`font-bold ${errors.title ? "border-red-500" : ""}`}
                />
              ) : (
                <CardTitle>{product.title}</CardTitle>
              )}
              
              {errors.title && <p className="text-xs text-red-500">{errors.title}</p>}
              
              <div className="flex space-x-2">
                {editingProduct?.id === product.id ? (
                  <>
                    <Button variant="ghost" size="sm" onClick={handleCancelEdit} disabled={isSaving}>
                      <X className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={handleSaveEdit} disabled={isSaving}>
                      {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="ghost" size="sm" onClick={() => handleEdit(product)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleDelete(product.id)}
                      disabled={isDeleting === product.id}
                    >
                      {isDeleting === product.id ? 
                        <Loader2 className="h-4 w-4 animate-spin" /> : 
                        <Trash className="h-4 w-4" />
                      }
                    </Button>
                  </>
                )}
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  {editingProduct?.id === product.id ? (
                    <>
                      <div>
                        <Label className="text-sm font-medium">Price (₦)</Label>
                        <Input
                          type="number"
                          value={editingProduct.price}
                          onChange={(e) => setEditingProduct({ ...editingProduct, price: Number(e.target.value) })}
                          className={errors.price ? "border-red-500" : ""}
                        />
                        {errors.price && <p className="text-xs text-red-500">{errors.price}</p>}
                      </div>
                      
                      <div>
                        <Label className="text-sm font-medium">Category</Label>
                        <Input
                          value={editingProduct.category}
                          onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                          className={errors.category ? "border-red-500" : ""}
                        />
                        {errors.category && <p className="text-xs text-red-500">{errors.category}</p>}
                      </div>
                      
                      <div>
                        <Label className="text-sm font-medium">Description</Label>
                        <Textarea
                          value={editingProduct.description}
                          onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                          rows={3}
                          className={errors.description ? "border-red-500" : ""}
                        />
                        {errors.description && <p className="text-xs text-red-500">{errors.description}</p>}
                      </div>
                      
                      <div>
                        <Label className="text-sm font-medium">Product Image</Label>
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <p className="text-sm"><span className="font-medium">Price:</span> ₦{product.price.toLocaleString()}</p>
                      <p className="text-sm"><span className="font-medium">Category:</span> {product.category}</p>
                      <p className="text-sm"><span className="font-medium">Description:</span> {product.description}</p>
                    </>
                  )}
                </div>
                
                <div className="h-40 w-full overflow-hidden rounded-md border">
                  {editingProduct?.id === product.id && imagePreview ? (
                    <img 
                      src={imagePreview} 
                      alt={editingProduct.title}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <img 
                      src={editingProduct?.id === product.id ? editingProduct.image : product.image} 
                      alt={product.title}
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://placehold.co/600x400?text=Image+Error';
                      }}
                    />
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};

export default AdminProductList;
