'use client';

import React, { useState } from 'react';
import { Typography, Card, Row, Col, Table, Button, Tag, Statistic, Drawer, Form, Input, InputNumber, message, Select } from 'antd';
import { PlusOutlined, ShoppingCartOutlined, HistoryOutlined, AlertOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

export default function ShuttleInventoryPage() {
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [form] = Form.useForm();

  // Mock Data
  const [inventory, setInventory] = useState([
    { id: '1', brand: 'Yonex Aerosensa 2', type: 'Feather', totalBarrels: 20, usedBarrels: 15, remainingBarrels: 5, alertThreshold: 5, lastRestocked: '2025-05-15' },
    { id: '2', brand: 'Victor Gold', type: 'Feather', totalBarrels: 10, usedBarrels: 2, remainingBarrels: 8, alertThreshold: 3, lastRestocked: '2025-06-01' },
    { id: '3', brand: 'Mavis 350', type: 'Nylon', totalBarrels: 30, usedBarrels: 28, remainingBarrels: 2, alertThreshold: 5, lastRestocked: '2025-04-10' },
  ]);

  const [usageHistory] = useState([
    { id: 'h1', date: '2025-06-15', brand: 'Yonex Aerosensa 2', quantity: 2, batch: 'Morning Elite', coach: 'Vikram Nair' },
    { id: 'h2', date: '2025-06-14', brand: 'Mavis 350', quantity: 1, batch: 'Weekend Beginners', coach: 'Sneha Reddy' },
  ]);

  const onFinish = (values: any) => {
    const newItem = {
      id: Date.now().toString(),
      brand: values.brand,
      type: values.type,
      totalBarrels: values.quantity,
      usedBarrels: 0,
      remainingBarrels: values.quantity,
      alertThreshold: values.alertThreshold,
      lastRestocked: new Date().toISOString().split('T')[0]
    };
    setInventory([...inventory, newItem]);
    message.success('Inventory restocked successfully!');
    setIsDrawerVisible(false);
    form.resetFields();
  };

  const columns = [
    {
      title: 'Brand / Model',
      dataIndex: 'brand',
      key: 'brand',
      render: (text: string, record: any) => (
        <div>
          <div className="font-medium text-white">{text}</div>
          <div className="text-xs text-gray-400">{record.type}</div>
        </div>
      ),
    },
    {
      title: 'Remaining',
      dataIndex: 'remainingBarrels',
      key: 'remainingBarrels',
      render: (remaining: number, record: any) => {
        const isLow = remaining <= record.alertThreshold;
        return (
          <div className="flex items-center gap-2">
            <span className={`font-bold text-lg ${isLow ? 'text-danger' : 'text-success'}`}>{remaining}</span>
            <span className="text-xs text-gray-400">barrels</span>
            {isLow && <AlertOutlined className="text-danger" title="Low Stock" />}
          </div>
        );
      },
    },
    {
      title: 'Total Used',
      dataIndex: 'usedBarrels',
      key: 'usedBarrels',
      render: (used: number) => <span className="text-gray-300">{used} barrels</span>,
    },
    {
      title: 'Last Restocked',
      dataIndex: 'lastRestocked',
      key: 'lastRestocked',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: () => (
        <Button size="small" type="primary" ghost>Record Usage</Button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <Title level={2} style={{ margin: 0, color: 'white' }}>Shuttle Inventory</Title>
          <Text type="secondary">Manage shuttlecock stock and usage tracking</Text>
        </div>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsDrawerVisible(true)}>
          Restock Inventory
        </Button>
      </div>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={8}>
          <Card bordered={false} className="bg-card">
            <Statistic 
              title="Total Remaining Barrels" 
              value={inventory.reduce((acc, curr) => acc + curr.remainingBarrels, 0)} 
              prefix={<ShoppingCartOutlined className="text-primary mr-2" />} 
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card bordered={false} className="bg-card">
            <Statistic 
              title="Total Used This Month" 
              value={17} 
              prefix={<HistoryOutlined className="text-accent mr-2" />} 
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card bordered={false} className="bg-card">
            <Statistic 
              title="Low Stock Alerts" 
              value={inventory.filter(i => i.remainingBarrels <= i.alertThreshold).length} 
              valueStyle={{ color: '#FF4D5A' }}
              prefix={<AlertOutlined className="text-danger mr-2" />} 
            />
          </Card>
        </Col>
      </Row>

      <div className="p-4 rounded-lg bg-card border border-white/10">
        <Title level={4} style={{ color: 'white', marginTop: 0, marginBottom: 16 }}>Current Stock</Title>
        <Table 
          columns={columns} 
          dataSource={inventory} 
          rowKey="id"
          pagination={false}
          scroll={{ x: 'max-content' }}
        />
      </div>

      <div className="p-4 rounded-lg bg-card border border-white/10">
        <Title level={4} style={{ color: 'white', marginTop: 0, marginBottom: 16 }}>Recent Usage</Title>
        <Table 
          columns={[
            { title: 'Date', dataIndex: 'date', key: 'date' },
            { title: 'Brand', dataIndex: 'brand', key: 'brand' },
            { title: 'Quantity', dataIndex: 'quantity', key: 'quantity', render: (q) => `${q} barrel(s)` },
            { title: 'Batch', dataIndex: 'batch', key: 'batch' },
            { title: 'Coach', dataIndex: 'coach', key: 'coach' },
          ]} 
          dataSource={usageHistory} 
          rowKey="id"
          pagination={false}
          scroll={{ x: 'max-content' }}
        />
      </div>

      <Drawer
        title="Restock Inventory"
        placement="right"
        onClose={() => setIsDrawerVisible(false)}
        open={isDrawerVisible}
        width={400}
        styles={{
          body: { paddingBottom: 80, backgroundColor: '#131B2E' },
          header: { backgroundColor: '#1C2742', borderBottomColor: 'rgba(255,255,255,0.1)' }
        }}
      >
        <Form form={form} layout="vertical" onFinish={onFinish} className="mt-4">
          <Form.Item name="brand" label="Brand / Model" rules={[{ required: true }]}>
            <Input placeholder="e.g. Yonex Aerosensa 2" />
          </Form.Item>
          
          <Form.Item name="type" label="Shuttle Type" rules={[{ required: true }]} initialValue="Feather">
            <Select>
              <Select.Option value="Feather">Feather</Select.Option>
              <Select.Option value="Nylon">Nylon</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item name="quantity" label="Quantity (Barrels)" rules={[{ required: true }]}>
            <InputNumber min={1} className="w-full" />
          </Form.Item>

          <Form.Item name="alertThreshold" label="Low Stock Alert Threshold" rules={[{ required: true }]} initialValue={5}>
            <InputNumber min={1} className="w-full" />
          </Form.Item>
          
          <div className="pt-4 border-t border-white/10 flex justify-end gap-2">
            <Button onClick={() => setIsDrawerVisible(false)}>Cancel</Button>
            <Button type="primary" htmlType="submit">Restock</Button>
          </div>
        </Form>
      </Drawer>
    </div>
  );
}
