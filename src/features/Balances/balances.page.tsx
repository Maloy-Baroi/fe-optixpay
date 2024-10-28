"use client";

import { EditOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, Select, Table } from "antd";
import { useState } from "react";
import CommonCard from "../ui/card/common-card";
import ModuleHeader from "../ui/module-header/module-header";
const { Option } = Select;
const Balances = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const dataSource = [
    {
      key: "1",
      paymentMethod: "Credit Card",
      paymentAmount: 1000,
      commission: 100,
      providerNet: 900,
      paidAmount: 800,
      adjustment: 50,
      balance: 50,
    },
    {
      key: "2",
      paymentMethod: "Credit Card",
      paymentAmount: 1000,
      commission: 100,
      providerNet: 900,
      paidAmount: 8060,
      adjustment: 503,
      balance: 580,
    },
    {
      key: "3",
      paymentMethod: "Debit Card",
      paymentAmount: 106700,
      commission: 10540,
      providerNet: 900,
      paidAmount: 80450,
      adjustment: 580,
      balance: 540,
    },
    // Add more data as needed
  ];

  const columns = [
    {
      title: "Bank Id",
      dataIndex: "paymentMethod",
      key: "paymentMethod",
    },
    {
      title: "Bank Name",
      dataIndex: "paymentAmount",
      key: "paymentAmount",
    },
    {
      title: "Bank Number",
      dataIndex: "commission",
      key: "commission",
    },
    {
      title: "Trx Type",
      dataIndex: "providerNet",
      key: "providerNet",
    },
    {
      title: "Bank Status",
      dataIndex: "paidAmount",
      key: "paidAmount",
    },
   
  ];

  const showModal = (record: any) => {
    setIsModalVisible(true);
    console.log(record);
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        console.log("Form Values: ", values);
        setIsModalVisible(false);
        form.resetFields();
      })
      .catch((info) => {
        console.log("Validation Failed:", info);
      });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <div>
      <ModuleHeader title="Balances" />
      <CommonCard title="Bangladeshi Taka (BDT)" bordered={false}>
        <Table dataSource={dataSource} columns={columns} />

        <Modal
          title="Request Prepayment"
          open={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <Form form={form} layout="vertical">
            <Form.Item
              name="prepaymentAmount"
              label="Prepayment Amount"
              rules={[
                {
                  required: true,
                  message: "Please enter the prepayment amount",
                },
              ]}
            >
              <Input type="number" />
            </Form.Item>

            <Form.Item
              name="channel"
              label="Channel"
              rules={[{ required: true, message: "Please select a channel" }]}
            >
              <Select placeholder="Select a channel">
                <Option value="bank">Bank</Option>
                <Option value="paypal">PayPal</Option>
              </Select>
            </Form.Item>

            <Form.Item name="note" label="Note">
              <Input.TextArea rows={3} />
            </Form.Item>
          </Form>
        </Modal>
      </CommonCard>
    </div>
  );
};

export default Balances;
