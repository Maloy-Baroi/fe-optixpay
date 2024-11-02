"use client";
import React, { useEffect, useState } from "react";
import { Button, Card, message, Table, Tag } from "antd";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import CommonCard from "@/features/ui/card/common-card";
import { getAgents } from "@/api/merchant";

// Define columns for Ant Design table
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
    dataIndex: "full_name",
    key: "full_name",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
    render: (text:any) => text || "-", // Display '-' if email is null
  },
  {
    title: "Contact Number",
    dataIndex: "phone_number",
    key: "phone_number",
  },
  // {
  //   title: "API Key",
  //   key: "api_key",
  //   render: (record:any) => {
  //     // Access all API keys from agent_bank_details and join them
  //     const apiKeys = record.agent_bank_details
  //       .flat()
  //       .map((detail:any) => detail.api_key)
  //       .join(", ");
  //     return <div style={{ wordBreak: "break-all" }}>{apiKeys || "-"}</div>;
  //   },
  // },
  // {
  //   title: "Secret Key",
  //   key: "secret_key",
  //   render: (record: any) => {
  //     // Access all Secret keys from agent_bank_details and join them
  //     const secretKeys = record.agent_bank_details
  //       .flat()
  //       .map((detail: any) => detail.secret_key)
  //       .join(", ");
  //     return <div style={{ wordBreak: "break-all" }}>{secretKeys || "-"}</div>;
  //   },
  // },
  {
    title: "Status",
    dataIndex: ["agent_bank_details", 0, "is_active"], // Only checks first bank detail's status
    key: "is_active",
    render: (isActive: any) => (
      <Tag color={isActive ? "green" : "red"}>
        {isActive ? "ACTIVE" : "INACTIVE"}
      </Tag>
    ),
  },
  {
    title: "Registration Date",
    dataIndex: "date_of_birth",
    key: "date_of_birth",
  },
];


const CreateAgent = () => {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const gotoCreateAgent = () => {
    router.push("/new-agent");
  };

  const fetchAgents = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = Cookies.get("accessToken");
      const response = await getAgents(token);
      // Ensure response data is structured correctly
      if (response?.data) {
        setData(response.data);
      }
    } catch {
      // setError("Failed to fetch agent data");
      message.error("Error fetching agents");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAgents();
  }, []);

  return (
    <>
      {error && <div>{error}</div>}
      <CommonCard title="Agent Details" bordered={false}>
        <div className="flex justify-end">
          <Button onClick={gotoCreateAgent} className="!bg-orange-600 !text-white">
            Create New Agent
          </Button>
        </div>
        <div className="mt-2">
          <Table
            dataSource={data?.length > 0 ? data : []}
            bordered
            columns={columns}
            rowKey="id"
            loading={loading}
            pagination={false}
          />
        </div>
      </CommonCard>
    </>
  );
};

export default CreateAgent;
