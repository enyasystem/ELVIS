
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

const HeaderLoginButton = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (user) {
    return (
      <Button 
        onClick={() => navigate("/admin/dashboard")} 
        variant="outline" 
        size="sm"
      >
        Admin Dashboard
      </Button>
    );
  }

  return (
    <Button 
      onClick={() => navigate("/auth")} 
      variant="outline" 
      size="sm"
    >
      Admin Login
    </Button>
  );
};

export default HeaderLoginButton;
