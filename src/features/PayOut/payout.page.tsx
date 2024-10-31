"use client";
import { Button, Card, DatePicker, Form, Input } from "antd";
import dayjs from "dayjs";
// import ModuleHeader from "../ui/module-header/module-header";
const PayOut = () => {
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
      {/* <ModuleHeader title="Pay Out" /> */}
      <Card bordered={false} title="Withdraw" className="!shadow">
        <Form form={form} onFinish={handleSubmit} layout="vertical">
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
         
        </Form>
      </Card>
      <div className="py-3">
        <p className="text-center">No Payout Request found!</p>
      </div>
    </div>
  );
};

export default PayOut;
