import {
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SwapOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Dropdown, Layout,  theme, Typography } from "antd";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { FC } from "react";
const { Header } = Layout;
interface HeaderProps {
  collapsed: boolean;
  toggle: () => void;
  isMobile: boolean;
}

const SiteHeader: FC<HeaderProps> = ({ collapsed, toggle }) => {
  const { Text } = Typography;
  const status = "authenticated"; // dummy for testing
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    Cookies.remove("role");
    Cookies.remove("csrftoken");
    Cookies.remove("sessionid");

    router.push("/signin");
  };
  return (
    <Header
      className="bg-white shadow-[0_2px_4px_rgba(0,0,20,0.08),0_1px_2px_rgba(0,0,20,0.08)] flex items-center justify-between !p-0 z-10 sticky top-0"
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
          <div className="">
            <Button
              name="Prepayment"
              size="large"
              className="!bg-black !text-white !border-none"
            >
              
              <span>Prepayment</span>
              <span></span>
            </Button>
          </div>
          <div className="">
            <Button
              name="Balance"
              size="large"
              className="!bg-black !text-white !border-none"
            >
              <span>Balance</span>
              <span>1000.00 BDT</span>
            </Button>
          </div>

          <div className="flex items-center bg-slate-100 p-2 rounded-md">
            <Text strong>1 USDT</Text>
            <SwapOutlined style={{ margin: "0 8px", color: "#b0b0b0" }} />
            <Text style={{ color: "#1890ff", fontWeight: "bold" }}>
              124.6 BDT
            </Text>
          </div>
          <div className="ml-7 h-full flex ">
            {
              <Dropdown
                menu={{
                  items: [
                    status === "authenticated"
                      ? {
                          key: "1",
                          icon: <UserOutlined />,
                          label: <span onClick={() => {}}>Name</span>,
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
  );
};

export default SiteHeader;
