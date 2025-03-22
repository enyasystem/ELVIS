
export type PaymentMethod = 'flutterwave' | 'bank_transfer';
export type PaymentStatus = 'pending' | 'processing' | 'completed' | 'failed' | 'refunded';

export interface Transaction {
  id: string;
  userId?: string;
  amount: number;
  currency: string;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  flutterwaveReference?: string;
  bankTransferReference?: string;
  paymentProofUrl?: string;
  adminVerified: boolean;
  adminVerifiedAt?: string;
  adminVerifiedBy?: string;
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  createdAt: string;
  updatedAt: string;
}

export interface BankAccount {
  id: string;
  bankName: string;
  accountName: string;
  accountNumber: string;
  isActive: boolean;
}

// Updated Product interface to match database schema
export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  category: string;
  images: string[];  // We'll ensure this is parsed from JSON
  full_description: string;
  specifications: {
    [key: string]: string;
  };
  created_at?: string;
  updated_at?: string;
}
