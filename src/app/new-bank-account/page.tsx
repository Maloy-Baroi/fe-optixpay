"use client";
import React from "react";
import { Form, Input, Button, Select, Row, Col, message } from "antd";
import { createBankAccount } from "@/api/bank";
import { useRouter } from "next/navigation";

const { Option } = Select;

const MyForm = () => {
  const [form] = Form.useForm();
  const router = useRouter();
 

  const onFinish = async (values: any) => {
    // Construct payload for API call
    const payload = {
      name: values.name,
      provider: values.provider,
      phone_number: values.phone_number,
      trx_type: values.trx_type,
      password: values.password,
      api_key: values.api_key,
      secret_key: values.secret_key,
      minimum_transaction_amount: values.minimum_transaction_amount,
      maximum_transaction_amount: values.maximum_transaction_amount,
    };
    console.log("Payload:", payload);

    try {
    const res:any= await createBankAccount(payload);
     if(res.status ===201){
        message.success('Prepayment successful !');
        router.push('/balances');
     }
       // Redirect to success page
    } catch {
      // message.error("Couldn't create new merchant"); // Display error message
    } finally {
      // setLoading(false);
    }
  };
  const onReset = () => {
    form.resetFields();
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      
    >
      <div className=" bg-slate-50 p-5 rounded-md">
        <Row gutter={[16, 16]}>
          <Col xs={24} md={8}>
            <Form.Item
              name="name"
              label="Name"
              rules={[{ required: true, message: "Please enter your name" }]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col xs={24} md={8}>
            <Form.Item
              name="provider"
              label="Provider"
              rules={[{ required: true, message: "Please select a provider" }]}
            >
              <Select placeholder="Select Provider">
                <Option value="bkash">Bkash</Option>
                <Option value="nagad">Nagad</Option>
              </Select>
            </Form.Item>
          </Col>

          <Col xs={24} md={8}>
            <Form.Item
              name="phone_number"
              label="Phone Number"
              rules={[
                { required: true, message: "Please enter your phone number" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col xs={24} md={8}>
            <Form.Item
              name="trx_type"
              label="Transaction Type"
              rules={[
                { required: true, message: "Please select a transaction type" },
              ]}
            >
              <Select placeholder="Select Transaction Type">
                <Option value="deposit">Deposit</Option>
                <Option value="withdraw">Withdraw</Option>
              </Select>
            </Form.Item>
          </Col>

          <Col xs={24} md={8}>
            <Form.Item
              name="password"
              label="Password"
              rules={[
                { required: true, message: "Please enter your password" },
              ]}
            >
              <Input.Password />
            </Form.Item>
          </Col>

          <Col xs={24} md={8}>
            <Form.Item
              name="api_key"
              label="API Key"
              rules={[{ required: true, message: "Please enter your API key" }]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col xs={24} md={8}>
            <Form.Item
              name="secret_key"
              label="Secret Key"
              rules={[
                { required: true, message: "Please enter your secret key" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col xs={24} md={8}>
            <Form.Item
              name="minimum_transaction_amount"
              label="Minimum Transaction Amount"
              rules={[
                {
                  required: true,
                  message: "Please enter the minimum transaction amount",
                },
              ]}
            >
              <Input type="text" />
            </Form.Item>
          </Col>

          <Col xs={24} md={8}>
            <Form.Item
              name="maximum_transaction_amount"
              label="Maximum Transaction Amount"
              rules={[
                {
                  required: true,
                  message: "Please enter the maximum transaction amount",
                },
              ]}
            >
              <Input type="text" />
            </Form.Item>
          </Col>
        </Row>
      </div>
      <div className="p-5">
        <Form.Item style={{ textAlign: "right" }}>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            className="mr-8 !bg-orange-600"
          >
            Submit
          </Button>
          <Button htmlType="button" onClick={onReset}>
            Clear
          </Button>
        </Form.Item>
      </div>
    </Form>
  );

  
};

export default MyForm;
