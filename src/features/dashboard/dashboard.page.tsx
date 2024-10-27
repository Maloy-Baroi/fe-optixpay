import React from "react";
import { Card, Typography, Row, Col, Avatar, List, Divider, Select, Table } from "antd";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ChartOptions,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;
const { Option } = Select;

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,

  Tooltip,
  Legend
);

const chartData = {
  labels: ["Apr 7", "Apr 8", "Apr 9", "Apr 10", "Apr 11", "Apr 12", "Apr 13", "Apr 14"],
  datasets: [
    {
      label: "Revenue",
      data: [40000, 45000, 50000, 62000, 38000, 52000, 60000, 57000],
      fill: true,
      backgroundColor: "rgba(24, 144, 255, 0.2)",
      borderColor: "#1890ff",
      pointBackgroundColor: "#1890ff",
      tension: 0.4,
    },
  ],
};

const chartOptions: ChartOptions<'line'> = {
  maintainAspectRatio: false,
  responsive: true,
  scales: {
    x: {
      type: 'category', // Use category scale for X-axis
    },
    y: {
      type: 'linear', // Use linear scale for Y-axis
      beginAtZero: true,
    },
  },
  plugins: {
    tooltip: {
      enabled: true,
    },
  },
};

const transactionData = [
  {
    key: "1",
    name: "John Doe",
    date: "2024-10-22",
    amount: "$150.00",
    status: "Completed",
    paymentMethod: "Bkash",
  },
  {
    key: "2",
    name: "Jane Smith",
    date: "2024-10-21",
    amount: "$250.00",
    status: "Pending",
    paymentMethod: "Nagad",
  },
  {
    key: "3",
    name: "Michael Johnson",
    date: "2024-10-20",
    amount: "$100.00",
    status: "Completed",
    paymentMethod: "Bkash",
  },
  {
    key: "4",
    name: "Emily Brown",
    date: "2024-10-19",
    amount: "$300.00",
    status: "Failed",
    paymentMethod: "Income",
  },
];

// Columns for the Recent Transactions Table
const transactionColumns = [
  {
    title: "Customer Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
  },
  {
    title: "Payment Method",
    dataIndex: "paymentMethod",
    key: "paymentMethod",
  },
];

// Sample agent data
const agentData = [
  {
    id: 1,
    name: "John Doe",
    amount: "$5000",
    avatar: "https://i.pravatar.cc/150?img=1",
  },
  {
    id: 2,
    name: "Jane Smith",
    amount: "$4300",
    avatar: "https://i.pravatar.cc/150?img=2",
  },
  {
    id: 3,
    name: "Chris Evans",
    amount: "$3700",
    avatar: "https://i.pravatar.cc/150?img=3",
  },
  {
    id: 4,
    name: "Patricia Johnson",
    amount: "$3400",
    avatar: "https://i.pravatar.cc/150?img=4",
  },
  {
    id: 5,
    name: "Patricia Johnson",
    amount: "$3400",
    avatar: "https://i.pravatar.cc/150?img=4",
  },

];

const Dashboard = () => {
  return (
    <>
    <Row gutter={[16, 16]}>
      {/* Revenue Chart Section (2/3 width) */}
      <Col xs={24} sm={24} md={16} lg={16} xl={16}>
        <Card bordered={false} className="bg-white rounded-md">
          <div className="flex justify-between items-center mb-4">
            <div>
              <Title level={4}>Total Revenue</Title>
              <Text style={{ fontSize: "24px", fontWeight: "bold" }}>$17,086.92</Text>
              <Text style={{ color: "green", marginLeft: "8px" }}>
                <ArrowUpOutlined /> 8.34%
              </Text>
              <Text style={{ display: "block", color: "#8c8c8c" }}>Gained $9,721.54 this month</Text>
            </div>
          </div>
          <div style={{ height: "300px" }}>
            <Line data={chartData} options={chartOptions} />
          </div>
        </Card>
      </Col>

      {/* Top Agents Section (1/3 width) */}
      <Col xs={24} sm={24} md={8} lg={8} xl={8}>
        <Card title="Top Agents" bordered={false} className="bg-white rounded-md">
          <List
            itemLayout="horizontal"
            dataSource={agentData}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar src={item.avatar} />}
                  title={<Text strong>{item.name}</Text>}
                  description={<Text style={{ color: "#8c8c8c" }}>{item.amount}</Text>}
                />
              </List.Item>
            )}
          />
        </Card>
      </Col>
    </Row>
    <div>
      {/* Cards Section */}
      <Row gutter={[16, 16]} className="mb-2 mt-2">
        {/* Total Income Card */}
        <Col xs={24} sm={8}>
          <Card bordered={false} className="rounded-md bg-white">
            <Title level={4}>Total Income</Title>
            <Text style={{ fontSize: "32px", fontWeight: "bold" }}>$25,300.00</Text>
            <div>
              <Text style={{ color: "green", fontSize: "14px" }}>
                <ArrowUpOutlined /> 12.5% Increase
              </Text>
            </div>
          </Card>
        </Col>

        {/* Total Bkash Payment Card */}
        <Col xs={24} sm={8}>
          <Card bordered={false} style={{ borderRadius: "8px" }}>
            <Title level={4}>Total Bkash Payment</Title>
            <Text style={{ fontSize: "32px", fontWeight: "bold" }}>$10,750.00</Text>
            <div>
              <Text style={{ color: "green", fontSize: "14px" }}>
                <ArrowUpOutlined /> 8.3% Increase
              </Text>
            </div>
          </Card>
        </Col>

        {/* Total Nagad Payment Card */}
        <Col xs={24} sm={8}>
          <Card bordered={false} style={{ borderRadius: "8px" }}>
            <Title level={4}>Total Nagad Payment</Title>
            <Text style={{ fontSize: "32px", fontWeight: "bold" }}>$8,500.00</Text>
            <div>
              <Text style={{ color: "red", fontSize: "14px" }}>
                <ArrowDownOutlined /> 5.2% Decrease
              </Text>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Recent Transactions Table */}
      <Card
        title="Recent Transactions"
        bordered={false}
        className="rounded-md"
      >
        <Table
          dataSource={transactionData}
          columns={transactionColumns}
          pagination={{ pageSize: 5 }}
        />
      </Card>
    </div>
    </>
  );
};

export default Dashboard;



