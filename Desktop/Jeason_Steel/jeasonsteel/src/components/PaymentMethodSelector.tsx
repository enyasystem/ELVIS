
import React from 'react';
import { Button } from "@/components/ui/button";
import { CreditCard } from "lucide-react";

interface PaymentMethodSelectorProps {
  onSelect: (method: 'flutterwave') => void;
}

const PaymentMethodSelector: React.FC<PaymentMethodSelectorProps> = ({ onSelect }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mb-4">Select Payment Method</h3>
      <Button
        onClick={() => onSelect('flutterwave')}
        className="flex items-center justify-center gap-2 h-20 w-full"
        variant="outline"
      >
        <div className="flex items-center gap-3">
          <img 
            src="https://cdn.filestackcontent.com/YO2eS1S5TImtaFiJVwph" 
            alt="Flutterwave Logo" 
            className="h-8 w-auto"
          />
          <div className="text-left">
            <div className="font-semibold">Pay with Flutterwave</div>
            <div className="text-sm text-gray-500">Fast and secure payment</div>
          </div>
        </div>
      </Button>
      <p className="text-xs text-center text-gray-500 mt-2">
        Payment processed securely by Flutterwave
      </p>
    </div>
  );
};

export default PaymentMethodSelector;
