
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, Eye, User } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import type { Transaction } from '@/types/payment';
import { updateTransaction } from '@/services/payment';
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface AdminPaymentVerificationProps {
  transactions: Transaction[];
  onTransactionUpdated: () => void;
}

const AdminPaymentVerification: React.FC<AdminPaymentVerificationProps> = ({
  transactions,
  onTransactionUpdated,
}) => {
  const handleVerify = async (transactionId: string, verified: boolean) => {
    try {
      await updateTransaction(transactionId, {
        admin_verified: verified,
        admin_verified_at: new Date().toISOString(),
        payment_status: verified ? 'completed' : 'failed',
      });
      toast.success(`Transaction ${verified ? 'verified' : 'rejected'} successfully`);
      onTransactionUpdated();
    } catch (error) {
      console.error('Error updating transaction:', error);
      toast.error('Failed to update transaction');
    }
  };

  const viewProof = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">Payment Verification</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Method</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Proof</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell>
                {new Date(transaction.createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell>{formatPrice(transaction.amount)}</TableCell>
              <TableCell className="capitalize">{transaction.paymentMethod}</TableCell>
              <TableCell className="capitalize">{transaction.paymentStatus}</TableCell>
              <TableCell>
                {transaction.customerName ? (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="flex items-center gap-1"
                      >
                        <User className="h-4 w-4" />
                        <span>View</span>
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Customer Details</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-2 mt-2">
                        <p><strong>Name:</strong> {transaction.customerName}</p>
                        <p><strong>Email:</strong> {transaction.customerEmail}</p>
                        <p><strong>Phone:</strong> {transaction.customerPhone}</p>
                      </div>
                    </DialogContent>
                  </Dialog>
                ) : (
                  <span className="text-gray-400">N/A</span>
                )}
              </TableCell>
              <TableCell>
                {transaction.paymentProofUrl && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => viewProof(transaction.paymentProofUrl!)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                )}
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleVerify(transaction.id, true)}
                    disabled={transaction.adminVerified}
                  >
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleVerify(transaction.id, false)}
                    disabled={transaction.adminVerified}
                  >
                    <XCircle className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminPaymentVerification;
