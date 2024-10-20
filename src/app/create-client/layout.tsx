import { MainLayout } from "@/features/layouts";
import React from "react";

const CreateMerchantLayout = ({ children }: { children: React.ReactNode }) => {
  return <MainLayout>{children}</MainLayout>;
};

export default CreateMerchantLayout;
