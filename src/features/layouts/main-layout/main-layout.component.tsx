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
          className="box-border rounded-[10px] duration-1000 overflow-auto h-[calc(100vh - 64px)] sticky left-0 hidden sm:hidden md:hidden lg:block ml-3 mr-3 mb-4 mt-2"
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
              className=" items-start justify-start hidden sm:hidden md:hidden lg:flex h-[64px] pt-1"
              style={{ width: collapsed ? 80 : 240 }}
            >
              <Image src={logo} alt="Optix-Pay" className="w-3/4 h-auto" />
            </div>
          </Link>
          <h2 className="text-lg text-slate-400 font-semibold mb-2 ml-5">
            Menu
          </h2>
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
        <Content className="overflow-y-auto pr-4 ">{children}</Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
