
import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, RefreshCw, ExternalLink } from "lucide-react";
import { supabase } from '@/integrations/supabase/client';
import { toast } from "sonner";

interface CareerApplication {
  id: number;
  name: string;
  email: string;
  phone: string;
  position: string;
  experience: string;
  resume_url: string | null;
  status: string;
  created_at: string;
}

const AdminCareerApplications = () => {
  const [applications, setApplications] = useState<CareerApplication[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  
  useEffect(() => {
    const fetchApplications = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('career_applications')
          .select('*')
          .order('created_at', { ascending: false });
          
        if (error) throw error;
        
        setApplications(data as CareerApplication[]);
      } catch (error) {
        console.error('Error fetching career applications:', error);
        toast.error('Failed to load career applications');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchApplications();
  }, [refreshTrigger]);
  
  const handleStatusUpdate = async (id: number, status: string) => {
    try {
      const { error } = await supabase
        .from('career_applications')
        .update({ status })
        .eq('id', id);
        
      if (error) throw error;
      
      setApplications(prevApplications => 
        prevApplications.map(application => 
          application.id === id ? { ...application, status } : application
        )
      );
      
      toast.success(`Application marked as ${status}`);
    } catch (error) {
      console.error('Error updating application:', error);
      toast.error('Failed to update application');
    }
  };
  
  const handleRefresh = () => {
    setRefreshTrigger(prev => prev + 1);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Career Applications</h2>
        <Button onClick={handleRefresh} variant="outline" size="sm" className="flex items-center gap-2">
          <RefreshCw className="h-4 w-4" />
          Refresh
        </Button>
      </div>
      
      {isLoading ? (
        <div className="text-center py-8">Loading applications...</div>
      ) : applications.length === 0 ? (
        <div className="text-center py-8 text-gray-500">No applications found.</div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Position</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Experience</TableHead>
              <TableHead>Resume</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {applications.map(application => (
              <TableRow key={application.id}>
                <TableCell>{new Date(application.created_at).toLocaleDateString()}</TableCell>
                <TableCell>{application.name}</TableCell>
                <TableCell>{application.position}</TableCell>
                <TableCell>
                  <div>{application.email}</div>
                  <div>{application.phone}</div>
                </TableCell>
                <TableCell>
                  <div className="max-w-xs overflow-hidden text-ellipsis whitespace-nowrap" title={application.experience}>
                    {application.experience}
                  </div>
                </TableCell>
                <TableCell>
                  {application.resume_url ? (
                    <a 
                      href={application.resume_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-steel-primary hover:text-steel-secondary flex items-center gap-1"
                    >
                      <ExternalLink className="h-3 w-3" />
                      View
                    </a>
                  ) : (
                    <span className="text-gray-400">N/A</span>
                  )}
                </TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    application.status === 'approved' ? 'bg-green-100 text-green-800' : 
                    application.status === 'rejected' ? 'bg-red-100 text-red-800' : 
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {application.status}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleStatusUpdate(application.id, 'approved')}
                      disabled={application.status !== 'pending'}
                    >
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleStatusUpdate(application.id, 'rejected')}
                      disabled={application.status !== 'pending'}
                    >
                      <XCircle className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default AdminCareerApplications;
