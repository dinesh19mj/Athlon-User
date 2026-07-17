'use client';

import React, { useState } from 'react';
import { Typography, Card, Row, Col, Select, DatePicker, Button, Table } from 'antd';
import { DownloadOutlined, FilterOutlined } from '@ant-design/icons';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import dayjs from 'dayjs';

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;

const COLORS = ['#2979FF', '#19C37D', '#FF8A00', '#FF4D5A', '#F7B500'];

const attendanceTrend = [
  { name: 'Jan', present: 85, absent: 15 },
  { name: 'Feb', present: 88, absent: 12 },
  { name: 'Mar', present: 92, absent: 8 },
  { name: 'Apr', present: 87, absent: 13 },
  { name: 'May', present: 95, absent: 5 },
  { name: 'Jun', present: 91, absent: 9 },
];

const revenueBreakdown = [
  { name: 'Batch Fees', value: 45000 },
  { name: 'Court Bookings', value: 15000 },
  { name: 'Memberships', value: 30000 },
  { name: 'Events', value: 10000 },
];

export default function ReportsPage() {
  const [reportType, setReportType] = useState('financial');

  const financialData = [
    { key: '1', date: '2025-06-01', description: 'Monthly Batch Fees Collection', category: 'Revenue', amount: 45000 },
    { key: '2', date: '2025-06-05', description: 'Court Maintenance', category: 'Expense', amount: -5000 },
    { key: '3', date: '2025-06-10', description: 'Shuttlecock Restock (Yonex)', category: 'Expense', amount: -12000 },
    { key: '4', date: '2025-06-15', description: 'Guest Court Bookings', category: 'Revenue', amount: 15000 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <Title level={2} style={{ margin: 0, color: 'white' }}>Reports & Analytics</Title>
          <Text type="secondary">In-depth insights into academy performance</Text>
        </div>
        <div className="flex gap-2">
          <Button icon={<FilterOutlined />}>Filters</Button>
          <Button type="primary" icon={<DownloadOutlined />}>Export Report</Button>
        </div>
      </div>

      <Card bordered={false} className="bg-card mb-6">
        <div className="flex flex-wrap gap-4 items-center">
          <div>
            <div className="text-xs text-gray-400 mb-1">Report Type</div>
            <Select
              value={reportType}
              onChange={setReportType}
              style={{ width: 200 }}
              options={[
                { label: 'Financial Summary', value: 'financial' },
                { label: 'Attendance & Engagement', value: 'attendance' },
                { label: 'Player Performance', value: 'performance' },
              ]}
            />
          </div>
          <div>
            <div className="text-xs text-gray-400 mb-1">Date Range</div>
            <RangePicker defaultValue={[dayjs().subtract(1, 'month'), dayjs()]} />
          </div>
        </div>
      </Card>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <Card title="Attendance Trends (Last 6 Months)" bordered={false} className="h-full">
            <div style={{ width: '100%', height: 300 }}>
              <ResponsiveContainer>
                <BarChart data={attendanceTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="name" stroke="#B7C2D8" />
                  <YAxis stroke="#B7C2D8" />
                  <Tooltip contentStyle={{ backgroundColor: '#1C2742', borderColor: 'rgba(255,255,255,0.1)' }} />
                  <Bar dataKey="present" stackId="a" fill="#19C37D" name="Present %" />
                  <Bar dataKey="absent" stackId="a" fill="#FF4D5A" name="Absent %" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card title="Revenue Breakdown" bordered={false} className="h-full">
            <div style={{ width: '100%', height: 300 }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={revenueBreakdown}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {revenueBreakdown.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1C2742', borderColor: 'rgba(255,255,255,0.1)' }} 
                    formatter={(value) => `₹${value}`}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex justify-center gap-4 flex-wrap mt-4">
                {revenueBreakdown.map((entry, index) => (
                  <div key={entry.name} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                    <span className="text-xs text-gray-400">{entry.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      <Card title="Financial Transactions (Filtered Period)" bordered={false} className="mt-6">
        <Table 
          columns={[
            { title: 'Date', dataIndex: 'date', key: 'date' },
            { title: 'Description', dataIndex: 'description', key: 'description', render: text => <span className="text-white">{text}</span> },
            { title: 'Category', dataIndex: 'category', key: 'category' },
            { 
              title: 'Amount', 
              dataIndex: 'amount', 
              key: 'amount',
              render: (amt) => (
                <span className={`font-bold ${amt >= 0 ? 'text-success' : 'text-danger'}`}>
                  {amt >= 0 ? '+' : '-'}₹{Math.abs(amt)}
                </span>
              )
            },
          ]} 
          dataSource={financialData} 
          pagination={false}
          scroll={{ x: 'max-content' }}
        />
      </Card>
    </div>
  );
}
