import type { CardProps } from "antd";
import { Card } from "antd";
import React from "react";

interface CommonCardProps extends CardProps {
  title?: string;
  footer?: React.ReactNode;
}

const CommonCard: React.FC<CommonCardProps> = ({
  title,
  footer,
  children,
  ...cardProps
}) => {
  return (
    <Card
      title={title}
      {...cardProps}
      actions={footer ? [footer] : undefined}
      className="!shadow"
    >
      {children}
    </Card>
  );
};

export default CommonCard;
