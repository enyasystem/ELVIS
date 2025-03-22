
import { supabase } from "@/integrations/supabase/client";
import type { Transaction, BankAccount, PaymentMethod, PaymentStatus } from '@/types/payment';

export const initializeFlutterwavePayment = async (
  amount: number, 
  customerDetails?: { name: string; email: string; phone: string }
) => {
  try {
    // Check if user is logged in but don't require it
    const { data: sessionData } = await supabase.auth.getSession();
    
    const body: any = { amount };
    
    // Add customer details if available
    if (customerDetails) {
      body.customer = customerDetails;
    }
    
    // Add authorization if user is logged in
    const headers: Record<string, string> = {};
    if (sessionData.session) {
      headers.Authorization = `Bearer ${sessionData.session.access_token}`;
    }
    
    const { data, error } = await supabase.functions.invoke('initialize-payment', {
      body,
      headers
    });

    if (error) {
      console.error('Edge function error:', error);
      throw error;
    }
    
    return data;
  } catch (error) {
    console.error('Error initializing payment:', error);
    throw error;
  }
};

export const getActiveBankAccounts = async (): Promise<BankAccount[]> => {
  const { data, error } = await supabase
    .from('bank_accounts')
    .select('*')
    .eq('is_active', true);

  if (error) throw error;
  return data.map(account => ({
    id: account.id,
    bankName: account.bank_name,
    accountName: account.account_name,
    accountNumber: account.account_number,
    isActive: account.is_active
  }));
};

export const uploadPaymentProof = async (file: File, transactionId: string) => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('User not authenticated');

  const fileExt = file.name.split('.').pop();
  const fileName = `${transactionId}.${fileExt}`;
  const filePath = `${user.id}/${fileName}`;

  const { data, error } = await supabase.storage
    .from('payment_proofs')
    .upload(filePath, file);

  if (error) throw error;
  return data;
};

export const updateTransaction = async (
  transactionId: string,
  updates: Partial<{
    admin_verified: boolean;
    admin_verified_at: string;
    payment_status: PaymentStatus;
  }>
) => {
  const { data, error } = await supabase
    .from('transactions')
    .update(updates)
    .eq('id', transactionId)
    .select()
    .single();

  if (error) throw error;
  return {
    id: data.id,
    userId: data.user_id,
    amount: data.amount,
    currency: data.currency,
    paymentMethod: data.payment_method as PaymentMethod,
    paymentStatus: data.payment_status as PaymentStatus,
    flutterwaveReference: data.flutterwave_reference,
    bankTransferReference: data.bank_transfer_reference,
    paymentProofUrl: data.payment_proof_url,
    adminVerified: data.admin_verified,
    adminVerifiedAt: data.admin_verified_at,
    adminVerifiedBy: data.admin_verified_by,
    createdAt: data.created_at,
    updatedAt: data.updated_at
  } as Transaction;
};

export const getTransactionById = async (id: string): Promise<Transaction> => {
  const { data, error } = await supabase
    .from('transactions')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  return {
    id: data.id,
    userId: data.user_id,
    amount: data.amount,
    currency: data.currency,
    paymentMethod: data.payment_method as PaymentMethod,
    paymentStatus: data.payment_status as PaymentStatus,
    flutterwaveReference: data.flutterwave_reference,
    bankTransferReference: data.bank_transfer_reference,
    paymentProofUrl: data.payment_proof_url,
    adminVerified: data.admin_verified,
    adminVerifiedAt: data.admin_verified_at,
    adminVerifiedBy: data.admin_verified_by,
    createdAt: data.created_at,
    updatedAt: data.updated_at
  };
};
