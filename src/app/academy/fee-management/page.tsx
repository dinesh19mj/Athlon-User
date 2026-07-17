'use client';

import React, { useState } from 'react';
import { Typography, Card, Row, Col, Table, Button, Tag, Statistic, Dropdown, MenuProps, message } from 'antd';
import { DollarOutlined, ExclamationCircleOutlined, CheckCircleOutlined, MoreOutlined, SyncOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

export default function FeeManagementPage() {
  const [feeRecords] = useState([
    { id: 'f1', playerName: 'Rohan Sharma', type: 'Monthly Batch Fee', amount: 3500, dueDate: '2025-07-01', status: 'PAID', paidOn: '2025-06-28' },
    { id: 'f2', playerName: 'Ananya Iyer', type: 'Quarterly Batch Fee', amount: 9500, dueDate: '2025-07-01', status: 'PENDING', paidOn: null },
    { id: 'f3', playerName: 'Arjun Desai', type: 'Annual Membership', amount: 30000, dueDate: '2025-06-15', status: 'OVERDUE', paidOn: null },
    { id: 'f4', playerName: 'Neha Singh', type: 'Monthly Batch Fee', amount: 3500, dueDate: '2025-07-05', status: 'PENDING', paidOn: null },
  ]);

  const getActionMenu = (record: any): MenuProps => ({
    items: [
      {
        key: 'mark-paid',
        icon: <CheckCircleOutlined />,
        label: 'Mark as Paid',
        disabled: record.status === 'PAID',
        onClick: () => {
          message.success(`Fee for ${record.playerName} marked as paid.`);
        }
      },
      {
        key: 'send-reminder',
        icon: <SyncOutlined />,
        label: 'Send Reminder',
        disabled: record.status === 'PAID',
        onClick: () => {
          message.info(`Reminder sent to ${record.playerName}`);
        }
      }
    ]
  });

  const columns = [
    {
      title: 'Player',
      dataIndex: 'playerName',
      key: 'playerName',
      render: (text: string) => <div className="font-medium text-white">{text}</div>,
    },
    {
      title: 'Fee Type',
      dataIndex: 'type',
      key: 'type',
      render: (text: string) => <span className="text-gray-300">{text}</span>,
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount: number) => <span className="font-bold">₹{amount}</span>,
    },
    {
      title: 'Due Date',
      dataIndex: 'dueDate',
      key: 'dueDate',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        let color = status === 'PAID' ? 'success' : status === 'OVERDUE' ? 'error' : 'warning';
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: any) => (
        <Dropdown menu={getActionMenu(record)} trigger={['click']}>
          <Button type="text" icon={<MoreOutlined />} />
        </Dropdown>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <Title level={2} style={{ margin: 0, color: 'white' }}>Fee Management</Title>
          <Text type="secondary">Track player fees, payments, and dues</Text>
        </div>
        <Button type="primary">
          Generate Invoices
        </Button>
      </div>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={8}>
          <Card bordered={false} className="bg-card">
            <Statistic 
              title="Total Collected (This Month)" 
              value={45000} 
              prefix={<DollarOutlined className="text-success mr-2" />} 
              valueStyle={{ color: '#19C37D' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card bordered={false} className="bg-card">
            <Statistic 
              title="Pending Amount" 
              value={13000} 
              prefix={<SyncOutlined className="text-warning mr-2" />} 
              valueStyle={{ color: '#F7B500' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card bordered={false} className="bg-card">
            <Statistic 
              title="Overdue Amount" 
              value={30000} 
              prefix={<ExclamationCircleOutlined className="text-danger mr-2" />} 
              valueStyle={{ color: '#FF4D5A' }}
            />
          </Card>
        </Col>
      </Row>

      <div className="p-4 rounded-lg bg-card border border-white/10">
        <Table 
          columns={columns} 
          dataSource={feeRecords} 
          rowKey="id"
          pagination={{ pageSize: 10 }}
          scroll={{ x: 'max-content' }}
        />
      </div>
    </div>
  );
}
