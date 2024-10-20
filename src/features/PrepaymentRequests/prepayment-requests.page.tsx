"use client";

import {
  Button,
  Card,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Select,
} from "antd";
import CommonCard from "../ui/card/common-card";
import ModuleHeader from "../ui/module-header/module-header";
const { Option } = Select;
const PrepaymentRequests = () => {
  const [form] = Form.useForm();
  const [formFilter] = Form.useForm();

  const handleSubmit = (values: any) => {
    console.log(values);
  };
  const handleSubMitPayment = (values: any) => {
    console.log("Payment Request:", values);
  };

  const handleReset = () => {
    form.resetFields();
  };
  return (
    <div>
      <ModuleHeader title="Prepayment Requests" />
      <div className=" grid gap-5">
        <Card bordered={false} className="!shadow">
          <Form form={form} layout="vertical" onFinish={handleSubMitPayment}>
            <div className="grid grid-cols-1 md:grid-cols-2  gap-x-4">
              <Form.Item
                label="Payment Method"
                name="paymentMethod"
                rules={[
                  {
                    required: true,
                    message: "Please select a payment method!",
                  },
                ]}
              >
                <Select placeholder="Select a payment method">
                  <Option value="credit_card">Credit Card</Option>
                  <Option value="paypal">PayPal</Option>
                  <Option value="bank_transfer">Bank Transfer</Option>
                </Select>
              </Form.Item>

              <Form.Item
                label="Amount"
                name="amount"
                rules={[
                  { required: true, message: "Please enter the amount!" },
                ]}
              >
                <InputNumber
                  style={{ width: "100%" }}
                  min={0}
                  placeholder="Enter amount"
                />
              </Form.Item>

              <Form.Item
                label="Channel"
                name="channel"
                rules={[
                  { required: true, message: "Please select a channel!" },
                ]}
              >
                <Select placeholder="Select a channel">
                  <Option value="USDT">USDT</Option>
                  <Option value="Bank">Bank</Option>
                </Select>
              </Form.Item>

              <Form.Item label="Note" name="note">
                <Input placeholder="Enter a note (optional)" />
              </Form.Item>
            </div>

            <div className="flex items-center justify-center">
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Submit Payment request
                </Button>
              </Form.Item>
            </div>
          </Form>
        </Card>
        <CommonCard title="Requests" bordered={false}>
          <Card bordered={false} className="!shadow">
            <Form form={formFilter} onFinish={handleSubmit} layout="vertical">
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
          <div className="py-3">
            <p className="text-center">No Pending Requests</p>
          </div>
        </CommonCard>{" "}
      </div>
    </div>
  );
};
export default PrepaymentRequests;
