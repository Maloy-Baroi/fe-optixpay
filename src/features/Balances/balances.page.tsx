"use client";

import { EditOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { Button, Form, Input, message, Modal, Select, Switch, Table } from "antd";
import { useEffect, useState } from "react";
import CommonCard from "../ui/card/common-card";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { getBankData, updateBankAccountStatus } from "@/api/bank";

const { Option } = Select;

interface BankData {
  id: number;
  bank_id: string;
  name: string;
  phone_number: string;
  trx_type: string;
  api_key: string;
  secret_key: string;
  is_active: boolean;
}

const Balances = () => {
  const [data, setData] = useState<BankData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedBank, setSelectedBank] = useState<BankData | null>(null);

  const router = useRouter();

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
      render: (isActive: boolean, record: BankData) => (
        <Switch
          style={{
            backgroundColor: isActive ? "green" : "red",
            borderColor: isActive ? "green" : "red",
          }}
          checked={isActive}
          onChange={(checked) => handleStatusChange(checked, record.id)}
          checkedChildren="Active"
          unCheckedChildren="Inactive"
        />
      ),
    },
    {
      title: "Details",
      key: "details",
      render: (text: any, record: BankData) => (
        <Button
          icon={<InfoCircleOutlined />}
          onClick={() => showBankDetails(record)}
        >
          View Details
        </Button>
      ),
    },
  ];

  const gotoCreateAgent = () => {
    router.push("/new-bank-account");
  };

  const fetchBankData = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = Cookies.get("accessToken");
      const response = await getBankData(token);
      if (response.status === 200) {
        const bankDataWithId = response.data.map((item: any, index: number) => ({
          ...item,
          id: index + 1,
        }));
        setData(bankDataWithId);
      }
    } catch {
      setError("Failed to fetch bank data.");
      message.error("Error fetching bank data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBankData();
  }, []);

  const handleStatusChange = async (isActive: boolean, id: number) => {
    try {
      const payload = { is_active: isActive };
      await updateBankAccountStatus(payload, id);
      message.success(`Status updated to ${isActive ? "Active" : "Inactive"}`);
      fetchBankData();
    } catch {
      message.error("Failed to update status. Please try again.");
    }
  };

  const showBankDetails = (bank: BankData) => {
    setSelectedBank(bank);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedBank(null);
  };

  return (
    <div>
      <CommonCard title="Bank Account" bordered={false}>
        <div className="flex justify-end mb-3">
          <Button onClick={gotoCreateAgent} className="!bg-orange-600 !text-white">
            Create Bank Account
          </Button>
        </div>
        <Table dataSource={data} columns={columns} loading={loading} rowKey="id" />
      </CommonCard>

      <Modal
        title="Bank Details"
        open={isModalVisible}
        onCancel={handleModalClose}
        footer={[
          <Button key="close" onClick={handleModalClose}>
            Close
          </Button>,
        ]}
      >
        {selectedBank && (
          <div>
            <p><strong>Bank ID:</strong> {selectedBank.bank_id}</p>
            <p><strong>Bank Name:</strong> {selectedBank.name}</p>
            <p><strong>Phone Number:</strong> {selectedBank.phone_number}</p>
            <p><strong>Transaction Type:</strong> {selectedBank.trx_type}</p>
            <p><strong>API Key:</strong> {selectedBank.api_key}</p>
            <p><strong>Secret Key:</strong> {selectedBank.secret_key}</p>
            <p><strong>Status:</strong> {selectedBank.is_active ? "Active" : "Inactive"}</p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Balances;
