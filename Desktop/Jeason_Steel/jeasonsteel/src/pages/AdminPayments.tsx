
import React, { useEffect, useState } from 'react';
import AdminHeader from "@/components/AdminHeader";
import Footer from "@/components/Footer";
import AdminPaymentVerification from "@/components/AdminPaymentVerification";
import type { Transaction, PaymentMethod, PaymentStatus } from '@/types/payment';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from "@/hooks/useAuth";

const AdminPayments = () => {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTransactions = async () => {
    try {
      if (!user) return;

      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // Map the data to match our Transaction type
      const mappedTransactions: Transaction[] = data.map(t => ({
        id: t.id,
        userId: t.user_id,
        amount: t.amount,
        currency: t.currency,
        paymentMethod: t.payment_method as PaymentMethod,
        paymentStatus: t.payment_status as PaymentStatus,
        flutterwaveReference: t.flutterwave_reference,
        bankTransferReference: t.bank_transfer_reference,
        paymentProofUrl: t.payment_proof_url,
        adminVerified: t.admin_verified,
        adminVerifiedAt: t.admin_verified_at,
        adminVerifiedBy: t.admin_verified_by,
        createdAt: t.created_at,
        updatedAt: t.updated_at,
        customerName: t.customer_name,
        customerEmail: t.customer_email,
        customerPhone: t.customer_phone
      }));

      setTransactions(mappedTransactions);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <AdminHeader />
        <div className="flex-grow container mx-auto px-4 py-16 mt-16 flex items-center justify-center">
          <p className="text-lg">Loading transactions...</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <AdminHeader />
      <div className="flex-grow container mx-auto px-4 py-16 mt-16">
        <h1 className="text-3xl font-bold mb-8">Payment Management</h1>
        <p className="mb-4 text-gray-600">Logged in as: {user?.email}</p>
        <AdminPaymentVerification
          transactions={transactions}
          onTransactionUpdated={fetchTransactions}
        />
      </div>
      <Footer />
    </div>
  );
};

export default AdminPayments;
