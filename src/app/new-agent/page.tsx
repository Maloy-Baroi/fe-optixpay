"use client";
import React, { useState } from "react";
import { Form, Input, Select, Upload, Row, Col, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const { Option } = Select;

const Page = () => {
  const [verificationType, setVerificationType] = useState("nid");
  const [frontImage, setFrontImage] = useState(null);
  const [backImage, setBackImage] = useState(null);
  const [selfieImage, setSelfieImage] = useState(null);
  const [form] = Form.useForm();
  const handleImageChange = (info: any, setImage: any) => {
    if (info.file.status !== "removed") {
      const file = info.file;
      const previewUrl = URL.createObjectURL(file);
      setImage(previewUrl);
    }
  };

  const onFinish = (values:any) => {
    const payload = {
      ...values,
      frontSideDocument: frontImage,
      backSideDocument: backImage,
      selfieWithDocument: selfieImage,
    };
    
    console.log("Payload to submit:", payload);

    // API call example
    // axios.post("/your-api-endpoint", payload)
    //   .then(response => message.success("User submitted successfully"))
    //   .catch(error => message.error("Failed to submit user"));
  };

  const onClear = () => {
    form.resetFields();
    setFrontImage(null);
    setBackImage(null);
    setSelfieImage(null);
  };
  return (
    <Form name="create_user_form" layout="vertical" onFinish={onFinish} form={form}>
      <div className="flex w-full justify-between gap-3">
        <div className="w-1/3">
          <div className=" bg-slate-50  rounded-md  p-3">
            <h2 className="text-lg font-semibold mb-4">User Information</h2>
            <Form.Item
              name="name"
              label="User Name"
              rules={[
                { required: true, message: "Please input the user name" },
              ]}
            >
              <Input placeholder="User Name" />
            </Form.Item>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: "Please input the Email" },
                {
                  type: "email",
                  message: "Please enter a valid email address",
                },
              ]}
            >
              <Input placeholder="Email" />
            </Form.Item>
            <Form.Item
              name="password"
              label="Password"
              rules={[
                { required: true, message: "Please input the password" },
              ]}
            >
              <Input.Password placeholder="Password" />
            </Form.Item>
          </div>
        </div>
        <div className="w-2/3 flex flex-col">
          <div className=" bg-slate-50  rounded-md  p-3">
            <h2 className="text-lg font-semibold mb-4">Agent Details</h2>
            <Row gutter={16}>
              <Col xs={24} md={12}>
                <Form.Item
                  name="agentName"
                  label="Full Name"
                  rules={[
                    { required: true, message: "Please input the full name" },
                  ]}
                >
                  <Input placeholder="Full Name" />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  name="agentEmail"
                  label="Email"
                  rules={[
                    { required: true, message: "Please input the email" },
                    {
                      type: "email",
                      message: "Please enter a valid email address",
                    },
                  ]}
                >
                  <Input placeholder="Email" />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  name="dateOfBirth"
                  label="Date of Birth"
                  rules={[
                    {
                      required: true,
                      message: "Please input the Date of Birth",
                    },
                  ]}
                >
                  <Input placeholder="YYYY-MM-DD" />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  name="agentPhoneNumber"
                  label="Phone Number"
                  rules={[
                    {
                      required: true,
                      message: "Please input the phone number",
                    },
                  ]}
                >
                  <Input placeholder="Phone Number" />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  name="nationality"
                  label="Nationality"
                  rules={[
                    {
                      required: true,
                      message: "Please input the nationality",
                    },
                  ]}
                >
                  <Input placeholder="Nationality" />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  name="verificationType"
                  label="Verification Type"
                  rules={[{ required: true }]}
                >
                  <Select
                    placeholder="Select Verification Type"
                    onChange={(value) => setVerificationType(value)}
                  >
                    <Option value="nid">NID</Option>
                    <Option value="passport">Passport</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  name="nidOrPassportNumber"
                  label={
                    verificationType === "nid"
                      ? "NID Number"
                      : "Passport Number"
                  }
                  rules={[
                    {
                      required: true,
                      message: "Please input the identification number",
                    },
                  ]}
                >
                  <Input
                    placeholder={
                      verificationType === "nid"
                        ? "NID Number"
                        : "Passport Number"
                    }
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item name="telegramAccount" label="Telegram Account">
                  <Input placeholder="Telegram Account" />
                </Form.Item>
              </Col>
              <Col xs={24} md={8}>
                <Form.Item
                  name="frontSideDocument"
                  label="Front Side Document"
                  rules={[
                    { required: true, message: " Provide Front Side Document" },
                  ]}
                >
                  <Upload
                    showUploadList={false}
                    beforeUpload={() => false} // prevent automatic upload
                    onChange={(info) => handleImageChange(info, setFrontImage)}
                  >
                    <div className="upload-box">
                      {frontImage ? (
                        <img
                          src={frontImage}
                          alt="Front Document"
                          className="uploaded-image"
                        />
                      ) : (
                        <div>
                          <UploadOutlined /> Upload Front Document
                        </div>
                      )}
                    </div>
                  </Upload>
                </Form.Item>
              </Col>
              <Col xs={24} md={8}>
                <Form.Item
                  name="backSideDocument"
                  label="Back Side Document"
                  rules={[
                    { required: true, message: " Provide Back Side Document" },
                  ]}
                >
                  <Upload
                    showUploadList={false}
                    beforeUpload={() => false}
                    onChange={(info) => handleImageChange(info, setBackImage)}
                  >
                    <div className="upload-box">
                      {backImage ? (
                        <img
                          src={backImage}
                          alt="Back Document"
                          className="uploaded-image"
                        />
                      ) : (
                        <div>
                          <UploadOutlined /> Upload Back Document
                        </div>
                      )}
                    </div>
                  </Upload>
                </Form.Item>
              </Col>
              <Col xs={24} md={8}>
                <Form.Item
                  name="selfieWithDocument"
                  label="Selfie with Document"
                  rules={[
                    { required: true, message: " ProvideSelfie with Document" },
                  ]}
                >
                  <Upload
                    showUploadList={false}
                    beforeUpload={() => false}
                    onChange={(info) => handleImageChange(info, setSelfieImage)}
                  >
                    <div className="upload-box">
                      {selfieImage ? (
                        <img
                          src={selfieImage}
                          alt="Selfie Document"
                          className="uploaded-image"
                        />
                      ) : (
                        <div>
                          <UploadOutlined /> Upload Selfie with Document
                        </div>
                      )}
                    </div>
                  </Upload>
                </Form.Item>
              </Col>
            </Row>
          </div>
          <div className=" bg-slate-50  rounded-md  p-3 mt-2">
            <h2 className="text-lg font-semibold mb-4">Provider Details</h2>
            <Row gutter={16}>
              <Col xs={24} md={12}>
                <Form.Item
                  name="providerType"
                  label="Provider Type"
                  rules={[{ required: true, message: "Select Provider Type" }]}
                >
                  <Select
                    placeholder="Select Verification Type"
                    onChange={(value) => setVerificationType(value)}
                  >
                    <Option value="bkash">Bkash</Option>
                    <Option value="nagad">Nagad</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  name="providerPassword"
                  label="Provider Password"
                  rules={[
                    {
                      required: true,
                      message: "Please input the Provider Password",
                    },
                  ]}
                >
                  <Input.Password placeholder="Password" />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  name="apiKey"
                  label="Api Key"
                  rules={[
                    {
                      required: true,
                      message: "Please input the Api Key",
                    },
                  ]}
                >
                  <Input placeholder="Api Key" />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  name="secretKey"
                  label="Secret Key"
                  rules={[
                    {
                      required: true,
                      message: "Please input the Secret Key",
                    },
                  ]}
                >
                  <Input placeholder="Secret Key" />
                </Form.Item>
              </Col>
            </Row>
          </div>
          <div className="flex justify-end mt-2  p-3">
          <Button type="primary" htmlType="submit"  size="large" className="mr-3">
              Submit
            </Button>
            <Button type="default" onClick={onClear} size="large" >
              Clear
            </Button>       
          </div>
        </div>
      </div>
    </Form>
  );
};

export default Page;
