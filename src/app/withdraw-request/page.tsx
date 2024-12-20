"use client";
import { createWithdrawRequest } from "@/api/withdraw";
import CommonCard from "@/features/ui/card/common-card";
import { Button, Form, Input, message, Select } from "antd";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
const Page = () => {
  const router = useRouter();
  const { Option } = Select;
  const [loading, setLoading] = useState<boolean>(false);

  const onFinish = async (values: any) => {
    setLoading(true);
    const payload = {
      paymentMethod: values.paymentMethod,
      amount: values.amount,
      currency: values.currency,
      payerReference: values.payerReference,
    };

    try {
      await createWithdrawRequest(payload);
      message.success('User and merchant created successfully!');
      router.push('/pay-out'); // Redirect to success page
    } catch {
      message.error("Couldn't create new merchant"); // Display error message
    } finally {
      setLoading(false);
    }
  };
  return (
    <CommonCard title="Create A Withdraw Request" bordered={false}>
      <Form
        name="create_user_form"
        layout="vertical"
        initialValues={{
          paymentMethod: undefined,
          currency: undefined,
        }}
        onFinish={onFinish}
      >
        <div className=" grid grid-cols-1 md:grid-cols-5 lg:grid-cols-5 gap-x-4">
          <Form.Item
            label="Payment Method"
            name="paymentMethod"
            rules={[
              { required: true, message: "Please select a payment method!" },
            ]}
          >
            <Select placeholder="Select Payment Method">
              <Option value="bkash">Bkash</Option>
              <Option value="nagad">Nagad</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Amount"
            name="amount"
            rules={[{ required: true, message: "Please enter the amount!" }]}
          >
            <Input type="text" placeholder="Enter amount" />
          </Form.Item>
          <Form.Item
            label="Currency"
            name="currency"
            rules={[{ required: true, message: "Please select a currency!" }]}
          >
            <Select placeholder="Select Currency">
              <Option value="bdt">BDT</Option>
              <Option value="usd">USD</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Payer Reference"
            name="payerReference"
            rules={[
              { required: true, message: "Please enter the payer reference!" },
            ]}
          >
            <Input placeholder="Enter payer reference" />
          </Form.Item>

          <Form.Item>
            <Button
              className="!bg-orange-600 !text-white mt-8 !w-[100px]"
              htmlType="submit"
              loading={loading}
            >
              Submit
            </Button>
          </Form.Item>
        </div>
      </Form>
    </CommonCard>
  );
};

export default Page;
