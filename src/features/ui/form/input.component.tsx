import { Form } from "antd";
import { SizeType } from "antd/es/config-provider/SizeContext";
import { Rule } from "antd/es/form";
import { FC } from "react";
import { findInput } from "./find-input.component";
type InputPropsType = {
  name: string;
  label: string;
  rules?: Rule[];
  type?: string;
  size?: SizeType;
};

export const Input: FC<InputPropsType> = ({
  name,
  label,
  rules,
  type = "text",
  size,
}) => {
  return (
    <Form.Item name={name} label={label} rules={rules}>
      {findInput(type, size)}
    </Form.Item>
  );
};
