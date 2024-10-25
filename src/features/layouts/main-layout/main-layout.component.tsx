"use client";
import useDeviceDetect from "@/features/hooks/useDeviceDetect";
import { Drawer, Layout } from "antd";
import Link from "next/link";
import { useState } from "react";
import SiteHeader from "./header.component";
import Menu from "./menubar.component";
import Image from "next/image";
import logo from "../../../../public/logo-sign.png";

const { Sider, Content } = Layout;

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const toggle = () => {
    setCollapsed(!collapsed);
  };

  const { isMobile } = useDeviceDetect();

  return (
    <Layout className="mr-2  mt-5" >
      {" "}
      {/* Ensure full viewport height */}
      {!isMobile ? (
        <Sider
          className="box-border overflow-auto "
          trigger={null}
          collapsible
          collapsedWidth={0}
          collapsed={collapsed}
          breakpoint="md"
          width={250}
          theme="light"
          // style={{ height: "100vh" }} // Set full height for Sider
        >
          <div className="bg-slate-100 rounded-md mr-2 ml-5 mt-16 pb-3">
            <Link href={"/"} scroll={false}>
              <div
                className="items-center justify-center hidden sm:hidden md:hidden lg:flex h-[64px] sticky"
                style={{ width: collapsed ? 80 : 240 }}
              >
                <Image src={logo} alt="Optix-Pay" className="w-[80%] h-auto" />
              </div>
            </Link>
            <Menu />
          </div>
        </Sider>
      ) : (
        <Drawer
          width={200}
          placement="left"
          bodyStyle={{ padding: 0 }} // Ensure padding is adjusted
          closable={false}
          onClose={toggle}
          open={collapsed}
          className="!bg-[#001529]"
        >
          <Menu toggle={toggle} />
        </Drawer>
      )}
      <Layout style={{ overflow: "hidden" }}>
        {" "}
        {/* Prevent overflow in main layout */}
        <SiteHeader collapsed={collapsed} toggle={toggle} isMobile={isMobile} />
        <Content
          className="overflow-y-auto p-5 bg-white"
          style={{ minHeight: "calc(100vh - 64px)", overflow: "auto" }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
