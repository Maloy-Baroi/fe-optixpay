"use client"

import React from 'react';
import MerchantDataTable from "@/app/create-merchant/merchant_list";
import {Button} from "antd";
import {useRouter} from "next/navigation";
import CommonCard from '@/features/ui/card/common-card';

const CreateMerchant: React.FC = () => {
  const router = useRouter();

  const gotoCreateMerchant = () => {
    router.push('/new-merchant');
  }

  return (
    <CommonCard title="Merchant Details" bordered={false}> 
      <div>
      
         <div className="flex justify-end">
          <Button onClick={gotoCreateMerchant} className="mb-2 !bg-orange-600 !text-white">
            Create New Merchant
          </Button>
        </div>
        <MerchantDataTable />
      </div>
    </CommonCard>
      
    
  );
}

export default CreateMerchant;
