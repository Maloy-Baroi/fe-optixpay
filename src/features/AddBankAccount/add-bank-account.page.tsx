"use client";

import { Button, Form, Input, Select } from "antd";
import CommonCard from "../ui/card/common-card";
import ModuleHeader from "../ui/module-header/module-header";
const AddBankAccount = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log("Form Values: ", values);
  };
  return (
    <div>
      <ModuleHeader title="Add Bank Account" />
      <CommonCard title="" bordered={false}>
        <Form form={form} layout="vertical" onFinish={onFinish}>
          {/* Account Holder Name */}
          <Form.Item
            name="accountHolderName"
            label="Account Holder Name"
            rules={[
              {
                required: true,
                message: "Please enter the account holder name",
              },
            ]}
          >
            <Input placeholder="Enter account holder name" />
          </Form.Item>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
            {/* Bank Name */}
            <Form.Item
              name="bankName"
              label="Bank Name"
              rules={[
                { required: true, message: "Please enter the bank name" },
              ]}
            >
              <Input placeholder="Enter bank name" />
            </Form.Item>

            {/* Account Number */}
            <Form.Item
              name="accountNumber"
              label="Account Number"
              rules={[
                { required: true, message: "Please enter the account number" },
              ]}
            >
              <Input placeholder="Enter account number" />
            </Form.Item>

            {/* Bank Branch */}
            <Form.Item
              name="bankBranch"
              label="Bank Branch"
              rules={[
                { required: true, message: "Please enter the bank branch" },
              ]}
            >
              <Input placeholder="Enter bank branch" />
            </Form.Item>

            {/* Routing Number / IFSC Code */}
            <Form.Item
              name="routingNumber"
              label="Routing Number / IFSC Code"
              rules={[
                {
                  required: true,
                  message: "Please enter the routing number or IFSC code",
                },
              ]}
            >
              <Input placeholder="Enter routing number or IFSC code" />
            </Form.Item>

            {/* Account Type */}
            <Form.Item
              name="accountType"
              label="Account Type"
              rules={[
                { required: true, message: "Please select the account type" },
              ]}
            >
              <Select placeholder="Select account type">
                <Select.Option value="savings">Savings</Select.Option>
                <Select.Option value="checking">Checking</Select.Option>
              </Select>
            </Form.Item>

            {/* Currency */}
            <Form.Item
              name="currency"
              label="Currency"
              rules={[
                { required: true, message: "Please select the currency" },
              ]}
            >
              <Select placeholder="Select currency">
                <Select.Option value="USD">USD</Select.Option>
                <Select.Option value="EUR">EUR</Select.Option>
                <Select.Option value="INR">INR</Select.Option>
              </Select>
            </Form.Item>
          </div>
          {/* Submit and Reset */}
          <div className="flex items-center justify-center">
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
              <Button
                htmlType="reset"
                onClick={() => form.resetFields()}
                style={{ marginLeft: "10px" }}
              >
                Reset
              </Button>
            </Form.Item>
          </div>
        </Form>
      </CommonCard>
    </div>
  );
};

export default AddBankAccount;
