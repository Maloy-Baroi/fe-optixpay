"use client";

import { EditOutlined } from "@ant-design/icons";
import { Button, Form, Input, message, Modal, Select, Switch, Table } from "antd";
import { useEffect, useState } from "react";
import CommonCard from "../ui/card/common-card";
import ModuleHeader from "../ui/module-header/module-header";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { getBankData, updateBankAccountStatus } from "@/api/bank";
const { Option } = Select;




const Balances = () => {
  const columns = [
    {
      title: "Bank Id",
      dataIndex: "bank_id",
      key: "bank_id",
    },
    {
      title: "Bank Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Bank Number",
      dataIndex: "phone_number",
      key: "phone_number",
    },
    {
      title: "Trx Type",
      dataIndex: "trx_type",
      key: "trx_type",
    },
    {
      title: "Bank Status",
      dataIndex: "is_active",
      key: "is_active",
      render: (isActive:any, record:any) => (
        <Switch
          style={{
            backgroundColor: isActive ? "green" : "red",  // Green for active, red for inactive
            borderColor: isActive ? "green" : "red",      // Border color to match the background
          }}
          checked={isActive}
          onChange={(checked) => handleStatusChange(checked, record.id)}
          checkedChildren="Active"
          unCheckedChildren="Inactive"
        />
      ),
    },
  ];
  const router = useRouter();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const gotoCreateAgent = () => {
    router.push("/new-bank-account");
  };

  const fetchBankData = async () => {
    setLoading(true);
    setError(null); // Reset error before fetching
    try {
      const token:string|undefined = Cookies.get("accessToken");
      const response = await getBankData(token);
      if(response.status==200){
        const bankDataWithId = response?.data?.map((item:any, index:any) => ({
          ...item,
          id: index + 1, // Add a sequential id starting from 1
        }));
        setData(bankDataWithId);
      }
        // Assuming response.data contains the merchants array
    } catch {
      // setError('Failed to fetch merchant data');
      // message.error('Error fetching merchants');
    } finally {
      setLoading(false);  // Stop loading once data is fetched
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchBankData();
  }, []);
  const handleStatusChange = async (isActive:any, Id:any) => {
    try {
      // Construct the payload for updating the status
      const payload = { is_active: isActive };
      await updateBankAccountStatus(payload,Id);
      // API call to update the status
     
      // Optionally show a success message
      message.success(`Status updated to ${isActive ? "Active" : "Inactive"}`);
    } catch (error) {
      // Handle any error that occurs
      message.error("Failed to update status. Please try again.");
    }
  };
  return (
    <div>
      <div className="">
        <div className="flex justify-end mb-3">
          <Button onClick={gotoCreateAgent} className="!bg-orange-600 !text-white">
            Create Bank Account
          </Button>
        </div>
        <Table dataSource={data} columns={columns} loading={loading}/>
    </div>
    </div>
  );
};

export default Balances;
