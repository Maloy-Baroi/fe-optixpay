import { Divider } from "antd";

const ModuleHeader = ({ title }: { title: string }) => {
  return (
    <div>
      <h1 className="text-2xl">{title}</h1>
      <Divider />
    </div>
  );
};

export default ModuleHeader;
