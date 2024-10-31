"use client"

import React, {Suspense, useState} from 'react';
import { Form, Input, Button, message } from 'antd';
// import { useRouter } from 'next/navigation';
import { createUserAndMerchant, UserValues, MerchantValues } from '@/api/merchant'; // Adjust the path
import CommonCard from '@/features/ui/card/common-card';

const CreateUserMerchantForm: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const onFinish = async (values: any) => {
    setLoading(true);

    const user: UserValues = {
      email: values.email,
      name: values.name,
      password: values.password,
    };

    const merchant: MerchantValues = {
      name: values.merchantName,
      email: values.merchantEmail,
      contact_number: values.contactNumber,
      api_key: values.apiKey,
      secret_key: values.secretKey,
    };

    try {
      await createUserAndMerchant(user, merchant);
      message.success('User and merchant created successfully!');
      // router.push('/success-page'); // Redirect to success page
    } catch {
      message.error("Couldn't create new merchant"); // Display error message
    } finally {
      setLoading(false);
    }
  };

  return (
    <CommonCard title="Merchant Form" bordered={false}>
    <Form
      name="create_user_form"
      layout="vertical"
      onFinish={onFinish}
    >
      <h2>Create New User</h2>
      <div className=" grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-x-4">
      <Form.Item
        name="email"
        label="User Email"
        rules={[{ required: true, message: 'Please input the user email!' }]}
      >
        <Input placeholder="User Email" />
      </Form.Item>

      <Form.Item
        name="name"
        label="User Name"
        rules={[{ required: true, message: 'Please input the user name!' }]}
      >
        <Input placeholder="User Name" />
      </Form.Item>

      <Form.Item
        name="password"
        label="Password"
        rules={[{ required: true, message: 'Please input the password!' }]}
      >
        <Input.Password placeholder="Password" />
      </Form.Item>
      </div>
      

      <h2>Create Merchant</h2>
      <div className=" grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-x-4">
      <Form.Item
        name="merchantName"
        label="Merchant Name"
        rules={[{ required: true, message: 'Please input the merchant name!' }]}
      >
        <Input placeholder="Merchant Name" />
      </Form.Item>

      <Form.Item
        name="merchantEmail"
        label="Merchant Email"
        rules={[{ required: true, message: 'Please input the merchant email!' }]}
      >
        <Input placeholder="Merchant Email" />
      </Form.Item>

      <Form.Item
        name="contactNumber"
        label="Contact Number"
        rules={[{ required: true, message: 'Please input the contact number!' }]}
      >
        <Input placeholder="Contact Number" />
      </Form.Item>

      <Form.Item>
        <Button className='!bg-orange-600 !text-white mt-6' htmlType="submit" loading={loading}>
          Submit
        </Button>
      </Form.Item>
      </div>
     
    </Form>
    </CommonCard>
   
  );
};

export default function WrappedCallbackPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CreateUserMerchantForm />
    </Suspense>
  );
}
