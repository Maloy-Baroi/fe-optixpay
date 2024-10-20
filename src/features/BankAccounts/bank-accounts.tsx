"use client";

import { Button, Form, Input, Select, Switch, Table } from "antd";
import { useState } from "react";
import CommonCard from "../ui/card/common-card";
import ModuleHeader from "../ui/module-header/module-header";
const { Option } = Select;
const BankAccounts = () => {
  const [form] = Form.useForm();

  const [dataSource, setDataSource] = useState([
    {
      key: "1",
      paymentMethod: "Credit Card",
      accountNumber: "1234 5678 9012 3456",
      status: true,
    },
    {
      key: "2",
      paymentMethod: "Bank Transfer",
      accountNumber: "9876 5432 1098 7654",
      status: false,
    },
    {
      key: "3",
      paymentMethod: "PayPal",
      accountNumber: "user@example.com",
      status: true,
    },
  ]);

  const columns = [
    {
      title: "Payment Method",
      dataIndex: "paymentMethod",
      key: "paymentMethod",
    },
    {
      title: "Account Number",
      dataIndex: "accountNumber",
      key: "accountNumber",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: boolean, record: any) => (
        <Switch
          checked={status}
          onChange={(checked) => handleStatusChange(checked, record.key)}
        />
      ),
    },
  ];

  const handleStatusChange = (checked: boolean, key: string) => {
    setDataSource((prev) =>
      prev.map((item) =>
        item.key === key ? { ...item, status: checked } : item
      )
    );
  };

  const onFinish = (values: any) => {
    console.log("Form values:", values);
  };

  const handleReset = () => {
    form.resetFields();
  };
  return (
    <div>
      <ModuleHeader title="Bank Accounts" />
      <CommonCard title="" bordered={false}>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{ activeAccount: "yes" }} // Default to 'Yes'
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
            {" "}
            <Form.Item
              label="Account Number"
              name="accountNumber"
              rules={[
                { required: true, message: "Please enter the account number" },
                {
                  pattern: /^\d{10}$/,
                  message: "Account number must be 10 digits",
                },
              ]}
            >
              <Input placeholder="Enter account number" />
            </Form.Item>
            <Form.Item
              label="Active Account"
              name="activeAccount"
              rules={[
                {
                  required: true,
                  message: "Please select active account status",
                },
              ]}
            >
              <Select placeholder="Select active account status">
                <Option value="yes">Yes</Option>
                <Option value="no">No</Option>
              </Select>
            </Form.Item>
          </div>
          <div className="flex justify-center">
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

        <CommonCard title="Bank Accounts" bordered={false}>
          <Table dataSource={dataSource} columns={columns} />
        </CommonCard>
      </CommonCard>
    </div>
  );
};

export default BankAccounts;
