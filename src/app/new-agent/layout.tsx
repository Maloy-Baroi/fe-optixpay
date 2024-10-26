import { MainLayout } from "@/features/layouts";
import React from "react";

const CreateNewMerchantLayout = ({ children }: { children: React.ReactNode }) => {
  return <MainLayout>{children}</MainLayout>;
};

export default CreateNewMerchantLayout;
