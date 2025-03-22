
import React from 'react';
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';
import { useCart } from '@/contexts/CartContext';
import { supabase } from '@/integrations/supabase/client';
import { Product } from '@/types/payment';
import { useState, useEffect } from 'react';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: 30,
  },
  header: {
    marginBottom: 20,
  },
  companyName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  companyDetails: {
    fontSize: 10,
    marginBottom: 20,
  },
  contactInfo: {
    fontSize: 10,
    marginBottom: 20,
  },
  invoiceTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  invoiceDetails: {
    fontSize: 10,
    marginBottom: 20,
  },
  section: {
    margin: 10,
    padding: 10,
  },
  tableContainer: {
    flexDirection: 'column',
    width: 'auto',
    marginBottom: 20,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000000',
    borderBottomStyle: 'solid',
    paddingBottom: 5,
    marginBottom: 5,
  },
  tableHeader: {
    backgroundColor: '#f0f0f0',
  },
  tableCol: {
    flex: 1,
    padding: 5,
  },
  total: {
    marginTop: 20,
    fontSize: 14,
    fontWeight: 'bold',
  },
  bankDetails: {
    fontSize: 10,
    marginTop: 20,
    marginBottom: 20,
  },
  terms: {
    fontSize: 8,
    marginTop: 20,
  },
  signature: {
    marginTop: 50,
    fontSize: 10,
  },
});

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN'
  }).format(price);
};

const getCurrentDate = () => {
  return new Date().toLocaleDateString('en-GB');
};

const generateInvoiceNumber = () => {
  const year = new Date().getFullYear();
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `JS-${year}-${random}`;
};

const InvoiceDocument = ({ items, total, productDetails }: { items: any[], total: number, productDetails: Product[] }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.companyName}>Jeason Steel</Text>
        <Text style={styles.companyDetails}>
          123 Steelworks Road{'\n'}
          Industrial Area, Lagos, Nigeria
        </Text>
      </View>

      <View style={styles.contactInfo}>
        <Text>CONTACT JEASON STEEL COMPANY</Text>
        <Text>For Quotes: quotes@jeasonsteel.com</Text>
        <Text>For Inquiries: info@jeasonsteel.com</Text>
        <Text>Office Contact: +2348035025555, +2349030251668</Text>
      </View>

      <View style={styles.invoiceDetails}>
        <Text>Invoice Number: {generateInvoiceNumber()}</Text>
        <Text>Invoice Date: {getCurrentDate()}</Text>
        <Text>Due Date: {new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('en-GB')}</Text>
        <Text>Payment Terms: 50% upfront, 50% on delivery</Text>
        <Text>Mode of Payment: Bank Transfer</Text>
      </View>

      <View style={styles.tableContainer}>
        <View style={[styles.tableRow, styles.tableHeader]}>
          <Text style={styles.tableCol}>Item</Text>
          <Text style={styles.tableCol}>Quantity</Text>
          <Text style={styles.tableCol}>Unit Price</Text>
          <Text style={styles.tableCol}>Total</Text>
        </View>
        {items.map((item) => {
          const product = productDetails.find(p => p.id === item.id);
          if (!product) return null;
          return (
            <View key={item.id} style={styles.tableRow}>
              <Text style={styles.tableCol}>{product.title}</Text>
              <Text style={styles.tableCol}>{item.quantity}</Text>
              <Text style={styles.tableCol}>{formatPrice(product.price)}</Text>
              <Text style={styles.tableCol}>{formatPrice(product.price * item.quantity)}</Text>
            </View>
          );
        })}
      </View>

      <View style={styles.total}>
        <Text>Total Amount: {formatPrice(total)}</Text>
      </View>

      <View style={styles.bankDetails}>
        <Text>Bank Details for Payment:</Text>
        <Text>Account Name: Jeason Steel Nigeria Ltd.</Text>
        <Text>Bank Name: First Bank of Nigeria</Text>
        <Text>Account Number: XXXXXXXXXX</Text>
      </View>

      <View style={styles.terms}>
        <Text>Terms & Conditions:</Text>
        <Text>1. Payment should be made within 30 days.</Text>
        <Text>2. Late payments attract 5% interest per month.</Text>
        <Text>3. Goods remain Jeason Steel's property until full payment.</Text>
        <Text>4. No refunds after delivery unless agreed in writing.</Text>
      </View>

      <View style={styles.signature}>
        <Text>Authorized Signature: _____________________</Text>
      </View>
    </Page>
  </Document>
);

const Invoice = () => {
  const { items, getCartTotal } = useCart();
  const total = getCartTotal();
  const [productDetails, setProductDetails] = useState<Product[]>([]);
  
  useEffect(() => {
    // Fetch products to get their details
    async function fetchProducts() {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*');
          
        if (error) {
          throw error;
        }
        
        // Transform database records to Product type
        const transformedProducts = data?.map(item => ({
          ...item,
          images: Array.isArray(item.images) ? item.images : [],
          specifications: typeof item.specifications === 'object' ? item.specifications : {}
        })) as Product[];
        
        setProductDetails(transformedProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }
    
    fetchProducts();
  }, []);
  
  if (items.length === 0) return null;

  return (
    <div className="my-4">
      <PDFDownloadLink
        document={<InvoiceDocument items={items} total={total} productDetails={productDetails} />}
        fileName="jeason-steel-invoice.pdf"
        className="bg-jeason-primary text-white px-4 py-2 rounded-md hover:bg-jeason-secondary transition-colors"
      >
        Download Invoice
      </PDFDownloadLink>
    </div>
  );
};

export default Invoice;
