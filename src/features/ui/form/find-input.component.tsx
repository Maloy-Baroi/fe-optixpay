import { Input } from "antd";
import { SizeType } from "antd/es/config-provider/SizeContext";

export const findInput = (type: string, size: SizeType) => {
  if (type === "password") return <Input.Password size={size}/>;
  return <Input type={type} size={size} />;
};
