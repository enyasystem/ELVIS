
import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { formatPrice } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const FloatingCart = () => {
  // Returning null to hide the floating cart
  return null;
};

export default FloatingCart;
