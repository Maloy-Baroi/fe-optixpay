"use client";
import { Button, Card, DatePicker, Form, Input, Select } from "antd";
import dayjs from "dayjs";
import CommonCard from "../ui/card/common-card";
import ModuleHeader from "../ui/module-header/module-header";
const { Option } = Select;
const PayIn = () => {
  const [form] = Form.useForm();

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
      {/* <ModuleHeader title="Transaction" /> */}
      <div>
        <CommonCard title="Deposit" bordered={false}>
          <Card bordered={false} className="!shadow">
            <Form form={form} onFinish={handleSubmit} layout="vertical">
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
             
            </Form>
          </Card>
          <div className="py-3">
            <p className="text-center">No transactions found!</p>
          </div>
        </CommonCard>
      </div>
    </div>
  );
};

export default PayIn;
