import React from "react";
import { useNavigate } from "react-router-dom";
import { AdminPanel } from "./AdminPanel";

export const AdminPage: React.FC = () => {
  const navigate = useNavigate();
  return <AdminPanel open={true} onClose={() => navigate("/")} />;
};
