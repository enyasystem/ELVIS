
import React, { useState } from "react";
import AdminHeader from "@/components/AdminHeader";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdminAddProduct from "@/components/AdminAddProduct";
import AdminAddCareer from "@/components/AdminAddCareer";
import AdminProductList from "@/components/AdminProductList";
import AdminCareerList from "@/components/AdminCareerList";
import AdminQuoteRequests from "@/components/AdminQuoteRequests";
import AdminCareerApplications from "@/components/AdminCareerApplications";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { ExternalLink, UserCog, Webhook, Briefcase, Package, FileQuestion, UserCheck, LayoutDashboard } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const { user } = useAuth();
  const [productRefreshTrigger, setProductRefreshTrigger] = useState(0);
  const [careerRefreshTrigger, setCareerRefreshTrigger] = useState(0);
  
  const handleProductAdded = () => {
    setProductRefreshTrigger(prev => prev + 1);
  };
  
  const handleCareerAdded = () => {
    setCareerRefreshTrigger(prev => prev + 1);
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <AdminHeader />
      <div className="flex-grow container mx-auto px-4 py-8 md:py-16 mt-16">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
              <LayoutDashboard className="h-6 w-6 text-steel-primary" />
              Admin Dashboard
            </h1>
            <p className="text-gray-600">Logged in as: {user?.email}</p>
          </div>
          <div className="flex gap-3">
            <a href="/change-password" className="inline-block">
              <Button variant="outline" className="flex items-center gap-2">
                <UserCog className="h-4 w-4" />
                Change Password
              </Button>
            </a>
            <a href="/" target="_blank" rel="noopener noreferrer" className="inline-block">
              <Button className="flex items-center gap-2 bg-steel-primary hover:bg-steel-secondary">
                <ExternalLink className="h-4 w-4" />
                View Website
              </Button>
            </a>
          </div>
        </div>
        
        <Card className="mb-8">
          <CardContent className="p-6">
            <Tabs defaultValue="products" className="w-full">
              <TabsList className="grid w-full grid-cols-1 md:grid-cols-5 gap-2 mb-6">
                <TabsTrigger value="products" className="flex items-center gap-2">
                  <Package className="h-4 w-4" />
                  <span>Products</span>
                </TabsTrigger>
                <TabsTrigger value="careers" className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4" />
                  <span>Careers</span>
                </TabsTrigger>
                <TabsTrigger value="payments" className="flex items-center gap-2">
                  <Webhook className="h-4 w-4" />
                  <span>Payments</span>
                </TabsTrigger>
                <TabsTrigger value="quotes" className="flex items-center gap-2">
                  <FileQuestion className="h-4 w-4" />
                  <span>Quotes</span>
                </TabsTrigger>
                <TabsTrigger value="applications" className="flex items-center gap-2">
                  <UserCheck className="h-4 w-4" />
                  <span>Applications</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="products" className="mt-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <AdminAddProduct onProductAdded={handleProductAdded} />
                  <AdminProductList refreshTrigger={productRefreshTrigger} />
                </div>
              </TabsContent>
              
              <TabsContent value="careers" className="mt-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <AdminAddCareer onCareerAdded={handleCareerAdded} />
                  <AdminCareerList refreshTrigger={careerRefreshTrigger} />
                </div>
              </TabsContent>
              
              <TabsContent value="payments" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Payment Verification</CardTitle>
                    <CardDescription>Manage and verify payment transactions</CardDescription>
                  </CardHeader>
                  <CardContent className="flex justify-center py-10">
                    <Link to="/admin/payments">
                      <Button className="flex items-center gap-2">
                        <Webhook className="h-4 w-4" />
                        Go to Payments
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="quotes" className="mt-6">
                <AdminQuoteRequests />
              </TabsContent>
              
              <TabsContent value="applications" className="mt-6">
                <AdminCareerApplications />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default AdminDashboard;
