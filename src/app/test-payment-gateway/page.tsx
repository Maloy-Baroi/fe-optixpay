"use client";

import { SendOutlined } from "@ant-design/icons";
import { Button, Form, InputNumber, Select } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Dashboard = () => {
  const router = useRouter();
  const [amount, setAmount] = useState<number>();
  // const [paymentCurrency, setPaymentCurrency] = useState("");
  const [gateway, setGateway] = useState("");
  const [form] = Form.useForm();
  const handleSubmit = (values: any) => {
    console.log(values);
  };
  const handleClick = async () => {
    // Redirect user to the payment processing page
    router.push(
      `/paymentProcessing?apiKey=gAAAAABnEmIaBJyYxI42qUZvP08SrWlGEU7EuI7qDesyHG9kibGvSs5mr1BIf5PVWA61uyb_Pu_SJ2rkReAe3084gVrHeBwVc-YHBD5yIBiRx-FFCjKtIUrbvcuuMVPnOYv9yX_tlGMZ&secretKey=2eT0GzCRHGNWOGqO7XiF1-Dq2zMqQM_FkNfhx8GJLNM~&paymentAmount=${amount}&paymentMethod=${gateway}&paymentCurrency=BDT`
    );
  };

  const onGatewayChange = (value: string) => {
    setGateway(value)
  };

  const onAmountChange = (value: number | null) => {
    if (value !== null) {
      setAmount(value);
    } else {
      setAmount(0); // or handle `null` case as you prefer
    }
  };

  return (
    <>
      <div className="h-screen">
        <p>Due to Testing purpose</p>
        <Form form={form} onFinish={handleSubmit} layout="vertical">
          <div className="flex items-center justify-center">
            <div className="grid grid-col-6">
              <Form.Item
                label="Deposit Amount"
                name="deposit_amount"
                rules={[
                  { required: true, message: "Please input Payment Amount" },
                  {
                    validator: (_, value) =>
                      value && value >= 5
                        ? Promise.resolve()
                        : Promise.reject(new Error("Amount must be more than 500")),
                  },
                ]}
              >
                <InputNumber
                  type="number"
                  value={amount}
                  onChange={onAmountChange}
                  style={{ width: 150, marginRight: 30 }}
                />
              </Form.Item>

            </div>
            <div className="grid grid-col-4">
              <Form.Item
                label="Select Gateway"
                name="select_gateway"
                rules={[{ required: true, message: "Please input Gateway" }]}
              >
                <Select
                  style={{ width: 150, marginRight: 30 }}
                  onChange={onGatewayChange}
                  options={[
                    { value: 'bkash', label: 'BKash' },
                    { value: 'nagad', label: 'Nagad' },
                    // { value: 'Yiminghe', label: 'yiminghe' },
                    // { value: 'disabled', label: 'Disabled', disabled: true },
                  ]}
                />
              </Form.Item>
            </div>
          </div>
        </Form>
        <br />
        <div className="flex items-center justify-center">
          {
            amount && amount >= 5 && gateway.length > 0 ? (
              <Button type="primary" icon={<SendOutlined />} onClick={handleClick}>
                Pay Now
              </Button>
            ) : (
              <Button type="primary" disabled={true} icon={<SendOutlined />} onClick={handleClick}>
                Pay Now
              </Button>
            )
          }
        </div>
      </div>
    </>
  );
};

export default Dashboard;
