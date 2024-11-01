"use client";
import { getWidthdrawData } from "@/api/withdraw";
import { Button, Card, DatePicker, Form, Input, Table, Tag } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
// import ModuleHeader from "../ui/module-header/module-header";



const PayOut = () => {
  const [form] = Form.useForm();
  const Role:string|undefined = Cookies.get("role");
  console.log(Role);
  
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
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchWidthdrawData = async () => {
    try {
      setLoading(true);
      const token: string | undefined = Cookies.get("accessToken");
      const response = await getWidthdrawData(token);
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
    fetchWidthdrawData();
  }, []);
  return (
    <div>
      {/* <ModuleHeader title="Pay Out" /> */}
      <Card bordered={false} title="Withdraw" className="!shadow">
        {/* <Form form={form} onFinish={handleSubmit} layout="vertical">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-4">
            <Form.Item
              label="Transaction ID"
              name="transactionId"
              rules={[
                { required: true, message: "Please input Transaction ID" },
              ]}
            >
              <Input placeholder="Enter Transaction ID" />
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
            <div className=" flex items-center justify-center mt-6">
            {" "}
            <Form.Item>
            <Button  htmlType="submit" className="!bg-orange-600 !text-white mr-3 !w-[100px]">
                Filter
              </Button>
              <Button htmlType="button" onClick={handleReset} className="">
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
      </Card>
     
    </div>
  );
};

export default PayOut;

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
