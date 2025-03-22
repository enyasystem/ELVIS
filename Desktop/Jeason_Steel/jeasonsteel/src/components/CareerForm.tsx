
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

interface CareerFormProps {
  position: string;
}

const CareerForm: React.FC<CareerFormProps> = ({ position }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    experience: "",
    resumeUrl: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase
        .from('career_applications')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            position: position,
            experience: formData.experience,
            resume_url: formData.resumeUrl || null,
            status: 'pending'
          }
        ]);
        
      if (error) throw error;
      
      toast.success("Application submitted successfully!");
      setFormData({
        name: "",
        email: "",
        phone: "",
        experience: "",
        resumeUrl: ""
      });
    } catch (error) {
      console.error("Error submitting application:", error);
      toast.error("Failed to submit application. Please try again.");
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
        <label htmlFor="experience" className="block text-sm font-medium text-steel-primary mb-2">
          Experience
        </label>
        <Textarea
          id="experience"
          value={formData.experience}
          onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
          required
        />
      </div>

      <div>
        <label htmlFor="resumeUrl" className="block text-sm font-medium text-steel-primary mb-2">
          Resume URL (Optional)
        </label>
        <Input
          id="resumeUrl"
          value={formData.resumeUrl}
          onChange={(e) => setFormData({ ...formData, resumeUrl: e.target.value })}
          placeholder="Link to your resume (Google Drive, Dropbox, etc.)"
        />
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Submitting...
          </>
        ) : (
          "Submit Application"
        )}
      </Button>
    </form>
  );
};

export default CareerForm;
