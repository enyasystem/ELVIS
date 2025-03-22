import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";
import { Label } from "@/components/ui/label";

// Define validation schema
const careerSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  department: z.string().min(2, "Department must be at least 2 characters"),
  location: z.string().min(2, "Location must be at least 2 characters"),
  type: z.string().min(2, "Employment type must be at least 2 characters"),
  description: z.string().min(20, "Description must be at least 20 characters")
});

type CareerFormData = {
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
};

type ValidationErrors = {
  [key in keyof CareerFormData]?: string;
};

type AdminAddCareerProps = {
  onCareerAdded?: () => void;
};

const AdminAddCareer = ({ onCareerAdded }: AdminAddCareerProps) => {
  const [formData, setFormData] = useState<CareerFormData>({
    title: "",
    department: "",
    location: "",
    type: "",
    description: "",
  });
  
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    try {
      careerSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: ValidationErrors = {};
        error.errors.forEach(err => {
          const path = err.path[0] as keyof CareerFormData;
          newErrors[path] = err.message;
        });
        setErrors(newErrors);
      }
      return false;
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
      // Insert the career into Supabase
      const { data, error } = await supabase
        .from('careers')
        .insert(formData)
        .select();
      
      if (error) {
        throw error;
      }
      
      toast.success(`Job position "${formData.title}" added successfully!`);
      
      // Reset the form
      setFormData({
        title: "",
        department: "",
        location: "",
        type: "",
        description: "",
      });

      // Call the onCareerAdded callback if provided
      if (onCareerAdded) {
        onCareerAdded();
      }
    } catch (error) {
      console.error("Error adding career:", error);
      toast.error("Failed to add job position. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Job Position</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title" className="block text-sm font-medium mb-1">
              Job Title
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
            <Label htmlFor="department" className="block text-sm font-medium mb-1">
              Department
            </Label>
            <Input
              id="department"
              value={formData.department}
              onChange={(e) => setFormData({ ...formData, department: e.target.value })}
              required
              className={errors.department ? "border-red-500" : ""}
            />
            {errors.department && <p className="mt-1 text-xs text-red-500">{errors.department}</p>}
          </div>
          
          <div>
            <Label htmlFor="location" className="block text-sm font-medium mb-1">
              Location
            </Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              required
              className={errors.location ? "border-red-500" : ""}
            />
            {errors.location && <p className="mt-1 text-xs text-red-500">{errors.location}</p>}
          </div>
          
          <div>
            <Label htmlFor="type" className="block text-sm font-medium mb-1">
              Employment Type
            </Label>
            <Input
              id="type"
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              required
              placeholder="Full-time, Part-time, Contract, etc."
              className={errors.type ? "border-red-500" : ""}
            />
            {errors.type && <p className="mt-1 text-xs text-red-500">{errors.type}</p>}
          </div>
          
          <div>
            <Label htmlFor="description" className="block text-sm font-medium mb-1">
              Job Description
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
          
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Adding...
              </>
            ) : (
              "Add Job Position"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AdminAddCareer;
