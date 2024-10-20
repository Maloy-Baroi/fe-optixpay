import { MainLayout } from "@/features/layouts";
import React from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return <MainLayout>{children}</MainLayout>;
};

export default DashboardLayout;
