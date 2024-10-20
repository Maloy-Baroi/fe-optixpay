"use client";

import { Button, Card, DatePicker, Form } from "antd";
import Table, { ColumnsType, TablePaginationConfig } from "antd/es/table";
import axios from "axios";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import CommonCard from "../ui/card/common-card";
import ModuleHeader from "../ui/module-header/module-header";

interface PaymentData {
  _id: string;
  current_balance: number;
  request_amount: number;
  paid_amount: number;
  channel: string;
  note: string;
  created_date: string;
  update_date: string;
  status: string;
  paymentmethod: {
    method_name: string;
  };
  currency: {
    currency_name: string;
    currency_code: string;
  };
}

const dummyPaymentData: PaymentData[] = [
  {
    _id: "66c3323144cc3c17a884db3d",
    current_balance: 96874.79,
    request_amount: 499591,
    paid_amount: 499591,
    status: "Resolved",
    channel: "USDT",
    note: "4042",
    created_date: "2024-08-19T11:53:21.737Z",
    update_date: "2024-08-19T17:19:41.760Z",
    paymentmethod: { method_name: "BKASH P2C" },
    currency: { currency_name: "Bangladeshi Taka", currency_code: "BDT" },
  },
  {
    _id: "66b9f40a44cc3c17a883a8c9",
    current_balance: 94499.84,
    request_amount: 308250,
    paid_amount: 308250,
    status: "Resolved",
    channel: "USDT",
    note: "2500",
    created_date: "2024-08-12T11:37:46.883Z",
    update_date: "2024-08-12T19:31:22.713Z",
    paymentmethod: { method_name: "BKASH P2C" },
    currency: { currency_name: "Bangladeshi Taka", currency_code: "BDT" },
  },
  {
    _id: "66b767d144cc3c17a8839c5d",
    current_balance: 0,
    request_amount: 307000,
    paid_amount: 307000,
    status: "Resolved",
    channel: "USDT",
    note: "2500",
    created_date: "2024-08-10T13:14:57.950Z",
    update_date: "2024-08-10T15:21:20.873Z",
    paymentmethod: { method_name: "BKASH P2C" },
    currency: { currency_name: "Bangladeshi Taka", currency_code: "BDT" },
  },
];
const PrepaymentHistory = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState<PaymentData[]>(dummyPaymentData);
  const [loading, setLoading] = useState<boolean>(false);
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  useEffect(() => {
    fetchData({ pagination });
  }, [pagination]);

  //   example of fetching data with pagination

  const fetchData = async (params: { pagination: TablePaginationConfig }) => {
    setLoading(true);
    try {
      const response = await axios.get("/api/payments", {
        params: {
          page: params.pagination.current,
          pageSize: params.pagination.pageSize,
        },
      });

      if (response.status === 200) {
        setData(response.data);
        setPagination({
          ...params.pagination,
          total: response?.data?.length,
        });
      } else {
        console.error("Failed to fetch data: Status", response.status);
      }
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setLoading(false);
    }
  };

  const columns: ColumnsType<PaymentData> = [
    {
      title: "Payment Method",
      dataIndex: ["paymentmethod", "method_name"],
      key: "paymentmethod",
    },
    {
      title: "Currency",
      dataIndex: ["currency", "currency_name"],
      key: "currency",
      render: (_, record) =>
        `${record.currency.currency_name} (${record.currency.currency_code})`,
    },
    {
      title: "Current Balance",
      dataIndex: "current_balance",
      key: "current_balance",
    },
    {
      title: "Request Amount",
      dataIndex: "request_amount",
      key: "request_amount",
    },
    {
      title: "Paid Amount",
      dataIndex: "paid_amount",
      key: "paid_amount",
    },
    {
      title: "Channel",
      dataIndex: "channel",
      key: "channel",
    },
    {
      title: "Note",
      dataIndex: "note",
      key: "note",
    },
    {
      title: "Request Date",
      dataIndex: "created_date",
      key: "created_date",
      render: (text) => dayjs(text).format("YYYY-MM-DD HH:mm:ss"),
    },
    {
      title: "Update Date",
      dataIndex: "update_date",
      key: "update_date",
      render: (text) => dayjs(text).format("YYYY-MM-DD HH:mm:ss"),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
  ];
  const handleTableChange = (newPagination: TablePaginationConfig) => {
    fetchData({
      pagination: newPagination,
    });
  };

  const handleSubmit = (values: any) => {
    const formattedValues = {
      ...values,
      startDate: values.startDate
        ? dayjs(values.startDate).format("DD-MM-YYYY")
        : null,
      endDate: values.endDate
        ? dayjs(values.endDate).format("DD-MM-YYYY")
        : null,
    };
    console.log("Form Submitted:", formattedValues);
  };

  const handleReset = () => {
    form.resetFields();
  };

  return (
    <div>
      <ModuleHeader title="Prepayment History" />
      <CommonCard title="History" bordered={false}>
        <Card bordered={false} className="!shadow">
          {" "}
          <Form form={form} onFinish={handleSubmit} layout="vertical">
            <div className=" grid grid-cols-1 md:grid-cols-2  gap-x-4">
              <Form.Item
                label="Start Date"
                name="startDate"
                rules={[
                  {
                    required: true,
                    message: "Please select the start date",
                  },
                ]}
              >
                <DatePicker
                  style={{ width: "100%" }}
                  placeholder="Select start date"
                />
              </Form.Item>

              <Form.Item
                label="End Date"
                name="endDate"
                rules={[
                  { required: true, message: "Please select the end date" },
                ]}
              >
                <DatePicker
                  style={{ width: "100%" }}
                  placeholder="Select end date"
                />
              </Form.Item>
            </div>
            <div className=" flex items-center justify-center">
              {" "}
              <Form.Item>
                <Button
                  htmlType="button"
                  onClick={handleReset}
                  className="mr-3"
                >
                  Reset
                </Button>
                <Button type="primary" htmlType="submit">
                  Filter
                </Button>
              </Form.Item>
            </div>
          </Form>
        </Card>

        <div className="mt-4">
          <Table
            loading={loading}
            columns={columns}
            dataSource={data}
            rowKey={(record) => record._id}
            pagination={{
              ...pagination,
              position: ["bottomRight"],
              showSizeChanger: true,
              showTotal: (total) => `Total ${total} items`,
            }}
            onChange={handleTableChange}
          />
        </div>
      </CommonCard>
    </div>
  );
};

export default PrepaymentHistory;
