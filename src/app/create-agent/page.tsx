"use client";

import React, { useEffect, useState } from "react";
import MerchantDataTable from "@/app/create-merchant/merchant_list";
import { Button, Card, Table, Tag } from "antd";
import { useRouter } from "next/navigation";
const columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "User",
    dataIndex: "user",
    key: "user",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Contact Number",
    dataIndex: "contact_number",
    key: "contact_number",
  },
  {
    title: "API Key",
    dataIndex: "api_key",
    key: "api_key",
    render: (text: string) => (
      <div style={{ wordBreak: "break-all" }}>{text}</div> // Makes the API key more readable in the table
    ),
  },
  {
    title: "Secret Key",
    dataIndex: "secret_key",
    key: "secret_key",
    render: (text: string) => (
      <div style={{ wordBreak: "break-all" }}>{text}</div> // Makes the secret key more readable in the table
    ),
  },
  {
    title: "Status",
    dataIndex: "is_active",
    key: "is_active",
    render: (status: string) => (
      <Tag color={status === "active" ? "green" : "red"}>
        {status.toUpperCase()}
      </Tag>
    ),
  },
  {
    title: "Registration Date",
    dataIndex: "registration_date",
    key: "registration_date",
  },
];
const CreateAgent: React.FC = () => {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const gotoCreateMerchant = () => {
    router.push("/new-agent");
  };
  const fetchMerchants = async () => {
    setLoading(true);
    setError(null); // Reset error before fetching
    // try {
    //   const token:string|undefined = Cookies.get("accessToken");
    //   const response = await getMerchants(token);
    //   setData(response.data);  // Assuming response.data contains the merchants array
    // } catch {
    //   setError('Failed to fetch merchant data');
    //   message.error('Error fetching merchants');
    // } finally {
    //   setLoading(false);  // Stop loading once data is fetched
    // }
    setLoading(false);
  };
  useEffect(() => {
    fetchMerchants();
  }, []);

  return (
    <>
      {error && <div>{error}</div>}
      <div className="">
        <div>
          <Button className={`float-end`} onClick={gotoCreateMerchant}>
            Create New Agent
          </Button>
        </div>
        <div>
          <Table
           className="mt-4"
            dataSource={data?.length > 0 ? data : []}
            bordered
            columns={columns}
            rowKey="id" // Ensure rowKey is set to a unique field like 'id'
            loading={loading} // Show loading spinner while data is being fetched
            pagination={false}
          />
        </div>
      </div>
    </>
  );
};

export default CreateAgent;
