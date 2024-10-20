"use client";

import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider } from "antd";
import { PropsWithChildren } from "react";
import { theme } from "./theme";
const Provider: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <AntdRegistry>
      <ConfigProvider componentSize='large' theme={theme}>{children}</ConfigProvider>
    </AntdRegistry>
  );
};

export default Provider;
