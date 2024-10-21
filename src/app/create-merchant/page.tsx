"use client"

import React from 'react';
import MerchantDataTable from "@/app/create-merchant/merchant_list";
import {Button} from "antd";
import {useRouter} from "next/navigation";

const CreateMerchant: React.FC = () => {
  const router = useRouter();

  const gotoCreateMerchant = () => {
    router.push('/new-merchant');
  }

  return (
    <>
      <div>
        <Button className={`float-end`} onClick={gotoCreateMerchant}>
          Create New Merchant
        </Button>
        <MerchantDataTable />
      </div>
    </>
  );
}

export default CreateMerchant;
