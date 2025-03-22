
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Trash, Pencil, X, Check, Loader2, RefreshCw } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

type Career = {
  id: number;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
};

// Validation schema
const careerSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  department: z.string().min(2, "Department must be at least 2 characters"),
  location: z.string().min(2, "Location must be at least 2 characters"),
  type: z.string().min(2, "Employment type must be at least 2 characters"),
  description: z.string().min(20, "Description must be at least 20 characters")
});

type ValidationErrors = {
  [key in keyof Partial<Career>]?: string;
};

type AdminCareerListProps = {
  refreshTrigger?: number;
};

const AdminCareerList = ({ refreshTrigger = 0 }: AdminCareerListProps) => {
  const [careers, setCareers] = useState<Career[]>([]);
  const [editingCareer, setEditingCareer] = useState<Career | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState<number | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    fetchCareers();
  }, [refreshTrigger]);

  const fetchCareers = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('careers')
        .select('*')
        .order('id', { ascending: false });
      
      if (error) {
        throw error;
      }
      
      setCareers(data || []);
    } catch (error) {
      console.error("Error fetching careers:", error);
      toast.error("Failed to load job positions");
    } finally {
      setIsLoading(false);
    }
  };

  const validate = (career: Partial<Career>) => {
    try {
      careerSchema.parse({
        title: career.title,
        department: career.department,
        location: career.location,
        type: career.type,
        description: career.description
      });
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: ValidationErrors = {};
        error.errors.forEach(err => {
          const path = err.path[0] as keyof Career;
          newErrors[path] = err.message;
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleEdit = (career: Career) => {
    setEditingCareer({ ...career });
    setErrors({});
  };

  const handleDelete = async (careerId: number) => {
    if (window.confirm("Are you sure you want to delete this job position?")) {
      try {
        setIsDeleting(careerId);
        
        const { error } = await supabase
          .from('careers')
          .delete()
          .eq('id', careerId);
        
        if (error) {
          throw error;
        }
        
        setCareers(careers.filter(career => career.id !== careerId));
        toast.success(`Job position deleted successfully!`);
      } catch (error) {
        console.error("Error deleting job position:", error);
        toast.error("Failed to delete job position");
      } finally {
        setIsDeleting(null);
      }
    }
  };

  const handleSaveEdit = async () => {
    if (!editingCareer) return;

    if (!validate(editingCareer)) {
      toast.error("Please fix the form errors");
      return;
    }

    try {
      setIsSaving(true);
      
      const { error } = await supabase
        .from('careers')
        .update({
          title: editingCareer.title,
          department: editingCareer.department,
          location: editingCareer.location,
          type: editingCareer.type,
          description: editingCareer.description
        })
        .eq('id', editingCareer.id);
      
      if (error) {
        throw error;
      }
      
      setCareers(careers.map(career => 
        career.id === editingCareer.id ? editingCareer : career
      ));
      
      setEditingCareer(null);
      toast.success(`Job position "${editingCareer.title}" updated successfully!`);
    } catch (error) {
      console.error("Error updating job position:", error);
      toast.error("Failed to update job position");
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancelEdit = () => {
    setEditingCareer(null);
    setErrors({});
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchCareers();
    setIsRefreshing(false);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading job positions...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-medium">Existing Job Positions</h3>
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
      
      {careers.length === 0 ? (
        <p className="text-center py-8 text-muted-foreground">No job positions found. Add your first position using the form on the left.</p>
      ) : (
        careers.map((career) => (
          <Card key={career.id} className={editingCareer?.id === career.id ? "border-primary" : ""}>
            <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
              {editingCareer?.id === career.id ? (
                <Input
                  value={editingCareer.title}
                  onChange={(e) => setEditingCareer({ ...editingCareer, title: e.target.value })}
                  className={`font-bold ${errors.title ? "border-red-500" : ""}`}
                />
              ) : (
                <CardTitle>{career.title}</CardTitle>
              )}
              
              {errors.title && <p className="text-xs text-red-500">{errors.title}</p>}
              
              <div className="flex space-x-2">
                {editingCareer?.id === career.id ? (
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
                    <Button variant="ghost" size="sm" onClick={() => handleEdit(career)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleDelete(career.id)}
                      disabled={isDeleting === career.id}
                    >
                      {isDeleting === career.id ? 
                        <Loader2 className="h-4 w-4 animate-spin" /> : 
                        <Trash className="h-4 w-4" />
                      }
                    </Button>
                  </>
                )}
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-4">
                {editingCareer?.id === career.id ? (
                  <>
                    <div>
                      <p className="text-sm font-medium">Department</p>
                      <Input
                        value={editingCareer.department}
                        onChange={(e) => setEditingCareer({ ...editingCareer, department: e.target.value })}
                        className={errors.department ? "border-red-500" : ""}
                      />
                      {errors.department && <p className="text-xs text-red-500">{errors.department}</p>}
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium">Location</p>
                      <Input
                        value={editingCareer.location}
                        onChange={(e) => setEditingCareer({ ...editingCareer, location: e.target.value })}
                        className={errors.location ? "border-red-500" : ""}
                      />
                      {errors.location && <p className="text-xs text-red-500">{errors.location}</p>}
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium">Employment Type</p>
                      <Input
                        value={editingCareer.type}
                        onChange={(e) => setEditingCareer({ ...editingCareer, type: e.target.value })}
                        className={errors.type ? "border-red-500" : ""}
                      />
                      {errors.type && <p className="text-xs text-red-500">{errors.type}</p>}
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium">Description</p>
                      <Textarea
                        value={editingCareer.description}
                        onChange={(e) => setEditingCareer({ ...editingCareer, description: e.target.value })}
                        rows={3}
                        className={errors.description ? "border-red-500" : ""}
                      />
                      {errors.description && <p className="text-xs text-red-500">{errors.description}</p>}
                    </div>
                  </>
                ) : (
                  <>
                    <p className="text-sm"><span className="font-medium">Department:</span> {career.department}</p>
                    <p className="text-sm"><span className="font-medium">Location:</span> {career.location}</p>
                    <p className="text-sm"><span className="font-medium">Employment Type:</span> {career.type}</p>
                    <p className="text-sm"><span className="font-medium">Description:</span> {career.description}</p>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};

export default AdminCareerList;
