// pages/index.js (or any component file in your Next.js project)
import React from 'react';
import { Table } from 'antd';

const ShowTable = () => {
  // Define your data (this is your JSON data)
  const data = [
    {
      id: 1,
      user: 2,
      full_name: "Maloy Baroi",
      email: null,
      date_of_birth: "2000-01-01",
      phone_number: "+8801303838765",
      agent_bank_details: [
        {
          id: 2,
          name: "nagad p2c",
          provider: "nagad",
          api_key: "0vWQuCRGiUX7EPVjQDr0EUAYtc",
          secret_key: "2eT0GzCRHGNWOGqO7XiF1-Dq2zMqQM_FkNfhx8GJLNM~",
          is_active: true,
        },
      ],
    },
    {
      id: 2,
      user: 9,
      full_name: "Sheikh Tuhin",
      email: "sheikhtuhin@gmail.com",
      date_of_birth: "2001-01-01",
      phone_number: "+8801888888888",
      agent_bank_details: [
        {
          id: 1,
          name: "2024-01-01",
          provider: "bkash",
          api_key: "0vWQuCRGiUX7EPVjQDr0EUAYtc",
          secret_key: "jcUNPBgbcqEDedNKdvE4G1cAK7D3hCjmJccNPZZBq96QIxxwAMEx",
          is_active: false,
        },
      ],
    },
    // Add more data as needed
  ];

  // Define the columns for the Ant Design Table
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'User',
      dataIndex: 'user',
      key: 'user',
    },
    {
      title: 'Name',
      dataIndex: 'full_name',
      key: 'full_name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Contact Number',
      dataIndex: 'phone_number',
      key: 'phone_number',
    },
    {
      title: 'API Key',
      dataIndex: ['agent_bank_details', 0, 'api_key'], // Accessing nested data
      key: 'api_key',
    },
    {
      title: 'Secret Key',
      dataIndex: ['agent_bank_details', 0, 'secret_key'], // Accessing nested data
      key: 'secret_key',
    },
    {
      title: 'Status',
      dataIndex: ['agent_bank_details', 0, 'is_active'],
      key: 'status',
    },
    {
      title: 'Registration Date',
      dataIndex: 'date_of_birth',
      key: 'date_of_birth',
    },
  ];

  // Render the Table component with data and columns
  return (
    <div style={{ padding: 24 }}>
      <h2>User Data Table</h2>
      <Table
        dataSource={data}
        columns={columns}
        rowKey="id" // unique key for each row
        pagination={{ pageSize: 10 }} // Set pagination for easier reading
      />
    </div>
  );
};

export default ShowTable;
