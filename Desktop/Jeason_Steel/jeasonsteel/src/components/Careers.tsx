
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, UserPlus, Loader2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { supabase } from "@/integrations/supabase/client";

type CareerListing = {
  id: number;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
};

// Fallback career listings if database fetch fails
const initialJobListings: CareerListing[] = [];

const Careers = () => {
  const [jobListings, setJobListings] = useState<CareerListing[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCareers();
  }, []);

  const fetchCareers = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const { data, error } = await supabase
        .from('careers')
        .select('*')
        .order('id', { ascending: false });
      
      if (error) {
        throw error;
      }
      
      if (data && data.length > 0) {
        setJobListings(data);
      } else {
        // No fallback for empty results - show the "no positions available" message
        setJobListings([]);
      }
    } catch (error) {
      console.error("Error fetching career listings:", error);
      setError("Failed to load job listings.");
      setJobListings([]);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <section className="py-16 bg-white" id="careers">
        <div className="container mx-auto px-4 flex justify-center items-center min-h-[300px]">
          <Loader2 className="h-10 w-10 animate-spin text-steel-primary" />
          <span className="ml-3 text-lg">Loading job opportunities...</span>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white" id="careers">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-steel-primary mb-4 flex items-center justify-center gap-2">
            <Briefcase className="h-8 w-8" />
            Opportunities
          </h2>
          <p className="text-xl text-steel-secondary mb-6">
            Are you looking for a new challenge in the metal stockholding industry? 
            We currently have the following opportunities available:
          </p>
        </div>

        {error && (
          <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {jobListings.length === 0 ? (
          <p className="text-center text-lg text-gray-600 mb-12">No job positions available at the moment.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2 mb-12">
            {jobListings.map((job) => (
              <Card key={job.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <UserPlus className="h-5 w-5" />
                    {job.title}
                  </CardTitle>
                  <CardDescription>{job.department}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-sm text-steel-gray">
                      <strong>Location:</strong> {job.location}
                    </p>
                    <p className="text-sm text-steel-gray">
                      <strong>Type:</strong> {job.type}
                    </p>
                    {job.description && (
                      <p className="text-sm text-steel-gray mt-2">
                        {job.description}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <Separator className="my-8" />

        <div className="text-center">
          <h3 className="text-2xl font-semibold text-steel-primary mb-4">
            We might have a place for you on our team
          </h3>
          <p className="text-steel-secondary">
            Even if you don't see a position that matches your skills, we're always looking for talented individuals. 
            Send your CV to careers@jeasonsteelcompany.com
          </p>
        </div>
      </div>
    </section>
  );
};

export default Careers;
