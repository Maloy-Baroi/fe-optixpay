"use client";
import {
  Button,
  Card,
  DatePicker,
  Form,
  Input,
  Select,
  Table,
  Tag,
} from "antd";
import dayjs from "dayjs";
import CommonCard from "../ui/card/common-card";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { getDepositData } from "@/api/depositPage";

// const { Option } = Select;
const PayIn = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchDepositData = async () => {
    try {
      setLoading(true);
      const token: string | undefined = Cookies.get("accessToken");
      const response = await getDepositData(token);
      if (response.status == 200) {
        setData(response.data);
      }
    } catch {
      // Assuming response.data contains the merchants array
      // setError('Failed to fetch merchant data');
      // message.error('Error fetching merchants');
    } finally {
      setLoading(false); // Stop loading once data is fetched
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchDepositData();
  }, []);
  // const [form] = Form.useForm();

  // const handleSubmit = (values: any) => {
  //   const formattedValues = {
  //     ...values,
  //     startDate: values.startDate
  //       ? dayjs(values.startDate).format("DD-MM-YYYY")
  //       : null,
  //     endDate: values.endDate
  //       ? dayjs(values.endDate).format("DD-MM-YYYY")
  //       : null,
  //   };
  //   console.log("Form Submitted:", formattedValues);
  // };

  // const handleReset = () => {
  //   form.resetFields();
  // };
  return (
    <div>
      {/* <ModuleHeader title="Transaction" /> */}
      <div>
        <CommonCard title="Deposit" bordered={false}>
          {/* <Card bordered={false} className="!shadow"> */}
          {/* <Form form={form} onFinish={handleSubmit} layout="vertical">
              <div className=" grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-x-4">
                <Form.Item
                  label="Payment ID"
                  name="paymentId"
                  rules={[
                    { required: true, message: "Please input Payment ID" },
                  ]}
                >
                  <Input placeholder="Enter Payment ID" />
                </Form.Item>

                <Form.Item
                  label="TrxID"
                  name="trxId"
                  rules={[{ required: true, message: "Please input TrxID" }]}
                >
                  <Input placeholder="Enter TrxID" />
                </Form.Item>

                <Form.Item
                  label="Bank Account"
                  name="bankAccount"
                  rules={[
                    {
                      required: true,
                      message: "Please select a Bank Account",
                    },
                  ]}
                >
                  <Select placeholder="Select a bank account">
                    <Option value="account1">Bank Account 1</Option>
                    <Option value="account2">Bank Account 2</Option>
                    <Option value="account3">Bank Account 3</Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  label="Payment Method"
                  name="paymentMethod"
                  rules={[
                    {
                      required: true,
                      message: "Please select a Payment Method",
                    },
                  ]}
                >
                  <Select placeholder="Select a payment method">
                    <Option value="creditCard">Credit Card</Option>
                    <Option value="bankTransfer">Bank Transfer</Option>
                    <Option value="paypal">PayPal</Option>
                  </Select>
                </Form.Item>

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

                <Form.Item
                  label="Status"
                  name="status"
                  rules={[
                    { required: true, message: "Please select a status" },
                  ]}
                >
                  <Select placeholder="Select status">
                    <Option value="pending">Pending</Option>
                    <Option value="completed">Completed</Option>
                    <Option value="failed">Failed</Option>
                  </Select>
                </Form.Item>
                <div className=" flex items-center justify-center mt-6">
                {" "}
                <Form.Item>
                <Button type="primary" htmlType="submit"  className="!bg-orange-600 !text-white mr-3 !w-[100px]">
                    Filter
                  </Button>
                  <Button
                    htmlType="button"
                    onClick={handleReset}
                    className="mr-3"
                  >
                    Reset
                  </Button>
                  
                </Form.Item>
              </div>
              </div>
             
            </Form> */}
          <div className="mt-2">
            <Table
              dataSource={data?.length > 0 ? data : []}
              bordered
              columns={columns}
              rowKey="id" // Ensure rowKey is set to a unique field like 'id'
              loading={loading} // Show loading spinner while data is being fetched
              pagination={false}
            />
          </div>
          {/* </Card> */}
        </CommonCard>
      </div>
    </div>
  );
};

export default PayIn;

const columns = [
  {
    title: "Order ID || Date and Time",
    dataIndex: "trxID",
    key: "id",
    render: (text: any, record: any) => (
      <>
        <div>{record.trxID}</div>
        <div>{record.created_at}</div>
      </>
    ),
  },

  {
    title: "Bank",
    dataIndex: "paymentMethod",
    key: "paymentMethod",
  },
  {
    title: "Bank Number",
    dataIndex: "payerAccount",
    key: "payerAccount",
  },
  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
  },
  {
    title: "Commission",
    dataIndex: "commission",
    key: "commission",
  },
  {
    title: "After Commission",
    dataIndex: "after_commission",
    key: "after_commission",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (status: string) => (
      <Tag
        color={
          status === "successful"
            ? "green"
            : status === "failed" || status === "rejected"
            ? "red"
            : "pink"
        }
      >
        {status}
      </Tag>
    ),
  },
];
