"use client";

import { createPrePayment, getCriptoUrl, getRateOfExchange } from "@/api/header";
import {
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SwapOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Button,
  Dropdown,
  Layout,
  Menu,
  theme,
  Typography,
  Modal,
  Input,
  Upload,
  Form,
  message,
  Select,
} from "antd";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";
import { UploadOutlined, CopyOutlined } from "@ant-design/icons";
const { Header } = Layout;
interface HeaderProps {
  collapsed: boolean;
  toggle: () => void;
  isMobile: boolean;
}

const SiteHeader: FC<HeaderProps> = ({ collapsed, toggle }) => {
  const { Option } = Select;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [data, setData] = useState<any>([]);
  const [selectedItem, setSelectedItem] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { Text } = Typography;
  const status = "authenticated";
  const [form] = Form.useForm();
  const [addressTRC, setAddressTRC] = useState();
  const [addressTRCId, setAddressTRCId] = useState<number>();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [role, setRole] = useState<string>();
  const [name, setName] = useState<string>();

  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    Cookies.remove("role");
    Cookies.remove("csrftoken");
    Cookies.remove("sessionid");

    router.push("/signin");
  };
  useEffect(() => {
    fetchRateOfExchenge();
    fetchCriptoUrl();
    const group = Cookies.get('role');
    const name = Cookies.get('name');
    setRole(group);
    setName(name);
  }, []);
  const fetchRateOfExchenge = async () => {
    setLoading(true);
    setError(null); // Reset error before fetching
    try {
      const token: string | undefined = Cookies.get("accessToken");
      const response = await getRateOfExchange(token);
      setData(response?.data); // Assuming response.data contains the merchants array
      setSelectedItem(response?.data[0]);
    } catch {
    } finally {
      setLoading(false); // Stop loading once data is fetched
    }
  };
  const fetchCriptoUrl = async () => {
    setLoading(true);
    setError(null); // Reset error before fetching
    try {
      const token: string | undefined = Cookies.get("accessToken");
      const response = await getCriptoUrl(token);
      setAddressTRC(response?.data?.address);
      setAddressTRCId(response?.data?.id);
    } catch {
    } finally {
      setLoading(false); // Stop loading once data is fetched
    }
  };
  const menu = (
    <Menu>
      {data.map((item: any) => (
        <Menu.Item
          key={item.id}
          onClick={() => setSelectedItem(item)} // Update selected item on click
        >
          {item.amount_per_unit} {item.source_from} to {item.converted_to}
        </Menu.Item>
      ))}
    </Menu>
  );

  // Function to show the modal
  const showModal = () => {
    setIsModalVisible(true);
  };

  // Function to handle modal close
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // Function to handle form submission
  const handleSubmit = async (values: any) => {
    setLoading(true);
    const payload = {
      address_trc: addressTRCId,
      currency:values.currency,
      amount: parseFloat(values.amount),
      trxID: values.trxId,
      payment_screenshot: fileList[0]?.thumbUrl || null,
      transaction_type: "prepayment"
    };

    try {
      await createPrePayment(payload);
      // message.success('Prepayment successful !');
      // router.push('/success-page'); // Redirect to success page
    } catch {
      message.error("Couldn't create new merchant"); // Display error message
    } finally {
      setLoading(false);
    }

  };


   const handleImageUpload = (file: any) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  // File change handler - ensures fileList is always in array format
  const handleFileChange = ({ fileList: newFileList }: any) => {
    setFileList(Array.isArray(newFileList) ? newFileList : []); // Ensure fileList is an array
  };


  // State to manage file list
  const [fileList, setFileList] = useState<any>([]);


  // Function to copy Address TRC to clipboard
  const handleCopy = () => {
    if (addressTRC) {
      navigator.clipboard
        .writeText(addressTRC)
        .then(() => {
          message.success("Address copied to clipboard!");
        })
        .catch(() => {
          message.error("Failed to copy address!");
        });
    } else {
      message.error("No address available to copy!");
    }
  };


  return (
    <>
      <Header
        className="bg-white shadow-[0_2px_4px_rgba(0,0,20,0.08),0_1px_2px_rgba(0,0,20,0.08)] flex items-center justify-between !p-0 !mr-4 !mt-2 !mb-3 rounded-md z-10 sticky top-0"
        style={{
          background: colorBgContainer,
        }}
      >
        <div className="flex items-center justify-between flex-1 py-0 px-4">
          <Button
            type="text"
            size="large"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={toggle}
          />
          <div className="flex justify-end items-center gap-5">
            {
              role === 'agent' ? (
                <div className="">
                  <Button
                    name="Prepayment"
                    size="large"
                    className="!bg-orange-600 !text-white !border-none"
                    onClick={showModal}
                  >
                    <span>Prepayment</span>
                    <span></span>
                  </Button>
                </div>
              )
                :
                (
                  <></>
                )
            }
            <div className="">
              <Button
                name="Balance"
                size="large"
                className="!bg-orange-600 !text-white !border-none"
              >
                <span>Balance</span>
                <span>1000.00 BDT</span>
              </Button>
            </div>
            <Dropdown overlay={menu} trigger={["hover"]}>
              <div className="flex items-center bg-slate-100 p-2 rounded-md cursor-pointer">
                <Text strong>1 {selectedItem?.source_from}</Text>
                <SwapOutlined style={{ margin: "0 8px", color: "#b0b0b0" }} />
                <Text style={{ color: "#1890ff", fontWeight: "bold" }}>
                  {selectedItem?.amount_per_unit} {selectedItem?.converted_to}
                </Text>
              </div>
            </Dropdown>
            <div className="ml-7 h-full flex ">
              {
                <Dropdown
                  menu={{
                    items: [
                      status === "authenticated"
                        ? {
                            key: "1",
                            icon: <UserOutlined />,
                            label: <span onClick={() => {}}>
                              {name}
                            </span>,
                          }
                        : null,
                      {
                        key: "2",
                        icon: <LogoutOutlined />,
                        label: <span onClick={handleLogout}>Sign Out</span>,
                        danger: true,
                      },
                    ],
                  }}
                >
                  <span className=" items-center cursor-pointer flex">
                    <Avatar size={38} icon={<UserOutlined />} />
                  </span>
                </Dropdown>
              }
            </div>
          </div>
        </div>
      </Header>
      {isModalVisible && (
        <Modal
          open={isModalVisible}
          onCancel={handleCancel}
          footer={null}
          centered
          maskClosable={true}
          zIndex={1500}
          style={{ padding: "20px" }}
        >
          {/* Form Content */}
          <Form form={form} layout="vertical" onFinish={handleSubmit}>
            <Form.Item label="Address TRC">
              <Input
                value={addressTRC}
                readOnly
                addonAfter={
                  <Button
                    icon={<CopyOutlined />}
                    type="text"
                    onClick={handleCopy}
                    style={{ border: "none", padding: 0 }}
                  />
                }
              />
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
              name="amount"
              label="Amount"
              rules={[{ required: true, message: "Please enter the amount" }]}
            >
              <Input placeholder="Enter amount (e.g., 500 USD)" />
            </Form.Item>

            <Form.Item
              name="trxId"
              label="TrxID"
              rules={[{ required: true, message: "Please enter the Transaction ID" }]}
            >
              <Input placeholder="Enter Transaction ID" />
            </Form.Item>

            <Form.Item
              name="screenshot"
              label="Screenshot"
              valuePropName="fileList"
              getValueFromEvent={(e) => Array.isArray(e?.fileList) ? e.fileList : []} // Ensure fileList is an array
              rules={[{ required: true, message: "Please upload a screenshot" }]}
            >
              <Upload
                name="screenshot"
                listType="picture"
                fileList={fileList}
                onChange={handleFileChange} // Update fileList in state
                beforeUpload={() => false} // Prevent auto-upload
                customRequest={({ file, onSuccess }) => {
                  handleImageUpload(file)
                    .then((base64) => {
                      if (onSuccess) {
                        onSuccess("ok");
                      }
                      form.setFieldsValue({ screenshot: base64 });
                    })
                    .catch(() => message.error("Failed to upload image"));
                }}
              >
                <Button icon={<UploadOutlined />}>Upload Screenshot</Button>
              </Upload>
            </Form.Item>

            <Form.Item>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Button
                  danger
                  onClick={() => form.resetFields(["amount", "trxId", "screenshot"])}
                >
                  Clear
                </Button>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </div>
            </Form.Item>
          </Form>
        </Modal>
      )}
    </>
  );
};

export default SiteHeader;



