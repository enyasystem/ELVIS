
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
import { CheckCircle, XCircle, RefreshCw, Trash2 } from "lucide-react";
import { supabase } from '@/integrations/supabase/client';
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface QuoteRequest {
  id: number;
  name: string;
  email: string;
  phone: string;
  // company: string;
  product_details: string;
  quantity: string;
  status: string;
  created_at: string;
}

const AdminQuoteRequests = () => {
  const [quoteRequests, setQuoteRequests] = useState<QuoteRequest[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [quoteToDelete, setQuoteToDelete] = useState<number | null>(null);
  
  useEffect(() => {
    const fetchQuoteRequests = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('quote_requests')
          .select('*')
          .order('created_at', { ascending: false });
          
        if (error) throw error;
        
        setQuoteRequests(data as QuoteRequest[]);
      } catch (error) {
        console.error('Error fetching quote requests:', error);
        toast.error('Failed to load quote requests');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchQuoteRequests();
  }, [refreshTrigger]);
  
  const handleStatusUpdate = async (id: number, status: string) => {
    try {
      const { error } = await supabase
        .from('quote_requests')
        .update({ status })
        .eq('id', id);
        
      if (error) throw error;
      
      setQuoteRequests(prevRequests => 
        prevRequests.map(request => 
          request.id === id ? { ...request, status } : request
        )
      );
      
      toast.success(`Quote request marked as ${status}`);
    } catch (error) {
      console.error('Error updating quote request:', error);
      toast.error('Failed to update quote request');
    }
  };
  
  const handleDeleteQuote = async () => {
    if (quoteToDelete === null) return;
    
    try {
      const { error } = await supabase
        .from('quote_requests')
        .delete()
        .eq('id', quoteToDelete);
        
      if (error) throw error;
      
      setQuoteRequests(prevRequests => 
        prevRequests.filter(request => request.id !== quoteToDelete)
      );
      
      toast.success('Quote request deleted successfully');
      setQuoteToDelete(null);
    } catch (error) {
      console.error('Error deleting quote request:', error);
      toast.error('Failed to delete quote request');
    }
  };
  
  const handleRefresh = () => {
    setRefreshTrigger(prev => prev + 1);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Quote Requests</h2>
        <Button onClick={handleRefresh} variant="outline" size="sm" className="flex items-center gap-2">
          <RefreshCw className="h-4 w-4" />
          Refresh
        </Button>
      </div>
      
      {isLoading ? (
        <div className="text-center py-8">Loading quote requests...</div>
      ) : quoteRequests.length === 0 ? (
        <div className="text-center py-8 text-gray-500">No quote requests found.</div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Name</TableHead>
{/*               <TableHead>Company</TableHead> */}
              <TableHead>Contact</TableHead>
              <TableHead>Product Details</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {quoteRequests.map(request => (
              <TableRow key={request.id}>
                <TableCell>{new Date(request.created_at).toLocaleDateString()}</TableCell>
                <TableCell>{request.name}</TableCell>
{/*                 <TableCell>{request.company}</TableCell> */}
                <TableCell>
                  <div>{request.email}</div>
                  <div>{request.phone}</div>
                </TableCell>
                <TableCell>
                  <div className="max-w-xs overflow-hidden text-ellipsis whitespace-nowrap" title={request.product_details}>
                    {request.product_details}
                  </div>
                </TableCell>
                <TableCell>{request.quantity}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    request.status === 'completed' ? 'bg-green-100 text-green-800' : 
                    request.status === 'rejected' ? 'bg-red-100 text-red-800' : 
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {request.status}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleStatusUpdate(request.id, 'completed')}
                      disabled={request.status !== 'pending'}
                    >
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleStatusUpdate(request.id, 'rejected')}
                      disabled={request.status !== 'pending'}
                    >
                      <XCircle className="h-4 w-4 text-red-500" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setQuoteToDelete(request.id)}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Quote Request</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete this quote request? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel onClick={() => setQuoteToDelete(null)}>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={handleDeleteQuote} className="bg-red-500 hover:bg-red-600">Delete</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
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

export default AdminQuoteRequests;
