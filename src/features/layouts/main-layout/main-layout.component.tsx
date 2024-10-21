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
    <Layout className="h-screen">
      {!isMobile ? (
        <Sider
          className="box-border rounded-[10px] duration-1000 overflow-auto h-[calc(100vh - 64px)] sticky left-0 hidden sm:hidden md:hidden lg:block m-4"
          trigger={null}
          collapsible
          collapsedWidth={0}
          collapsed={collapsed}
          breakpoint="md"
          width={240}
          theme="light"
        >
          <Link href={"/"} scroll={false}>
            <div
              className=" items-center justify-center hidden sm:hidden md:hidden lg:flex h-[64px]"
              style={{ width: collapsed ? 80 : 240 }}
            >
              <Image src={logo} alt="Optix-Pay" className="w-3/4 h-auto" />
            </div>
          </Link>
          <Menu />
        </Sider>
      ) : (
        <Drawer
          width={200}
          placement="left"
          styles={{ body: { padding: 0, height: 100 } }}
          closable={false}
          onClose={toggle}
          open={collapsed}
          className="!bg-[#001529]"
        >
          <Menu toggle={toggle} />
        </Drawer>
      )}
      <Layout>
        <SiteHeader collapsed={collapsed} toggle={toggle} isMobile={isMobile} />{" "}
        <Content className="overflow-y-auto p-5 bg-white">{children}</Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
