"use client";
import { getPaymentList } from "@/api/payment";
import { Button, Card, DatePicker, Form, Table, TablePaginationConfig } from "antd";
import dayjs from "dayjs";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import CommonCard from "../ui/card/common-card";
import ModuleHeader from "../ui/module-header/module-header";

const PayInApproval = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState([]);

  const formatDate = (date: any) =>
    date ? dayjs(date).format("YYYY-MM-DD") : null;

  const handleSubmit = async (values: any) => {
    const { startDate, endDate } = values;
    const formattedValues = {
      startDate: formatDate(startDate),
      endDate: formatDate(endDate),
    };

    const token = Cookies.get("accessToken");
    const myData = await getPaymentList(
      token,
      formattedValues.startDate,
      formattedValues.endDate
    );
    setData(myData);
  };

  const fetchData = async () => {
    const token = Cookies.get("accessToken");
    const myData = await getPaymentList(token);
    setData(myData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleReset = () => {
    form.resetFields();
    fetchData();
  };

  const columns = [
    {
      title: "Payment ID",
      dataIndex: "paymentID",
      key: "paymentID",
      render: (text: any) => text || "N/A",
    },
    {
      title: "Transaction ID",
      dataIndex: "trxID",
      key: "trxID",
      render: (text: any) => text || "N/A",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Currency",
      dataIndex: "currency",
      key: "currency",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Payment Method",
      dataIndex: "paymentMethod",
      key: "paymentMethod",
      render: (text: any) => text || "N/A",
    },
    {
      title: "Payer Reference",
      dataIndex: "payerReference",
      key: "payerReference",
      render: (text: any) => text || "N/A",
    },
    {
      title: "Customer Msisdn",
      dataIndex: "customerMsisdn",
      key: "customerMsisdn",
      render: (text: any) => text || "N/A",
    },
    {
      title: "Merchant Invoice Number",
      dataIndex: "merchantInvoiceNumber",
      key: "merchantInvoiceNumber",
      render: (text: any) => text || "N/A",
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      key: "created_at",
    },
    {
      title: "Updated At",
      dataIndex: "updated_at",
      key: "updated_at",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
  ];

  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 20, // Page size is set to 10
    total: data.length, // Total number of records
});

const handleTableChange = (newPagination: TablePaginationConfig) => {
    setPagination(newPagination);
};

  return (

    <div>

      <CommonCard title="Balance History" bordered={false}>
        {/* <Card bordered={false} className="!shadow">
          <Form form={form} onFinish={handleSubmit} layout="vertical">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
              <Form.Item
                label="Start Date"
                name="startDate"
                rules={[{ required: true, message: "Please select the start date" }]}
              >
                <DatePicker style={{ width: "100%" }} placeholder="Select start date" />
              </Form.Item>

              <Form.Item
                label="End Date"
                name="endDate"
                rules={[{ required: true, message: "Please select the end date" }]}
              >
                <DatePicker style={{ width: "100%" }} placeholder="Select end date" />
              </Form.Item>
            </div>
            <div className="flex items-center justify-center">
              <Form.Item>
                <Button htmlType="button" onClick={handleReset} className="mr-3">
                  Reset
                </Button>
                <Button type="primary" htmlType="submit">
                  Filter
                </Button>
              </Form.Item>
            </div>
          </Form>
        </Card> */}
        <div className="py-3" style={{ maxWidth: '100%', overflowX: 'auto' }}>
        <Table
            dataSource={data}
            columns={columns}
            rowKey="id"
            pagination={{
              ...pagination,
              showSizeChanger: true
            }}
            onChange={handleTableChange}
        />
        </div>
      </CommonCard>
    </div>
  );
};

export default PayInApproval;
