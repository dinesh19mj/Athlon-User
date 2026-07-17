'use client';

import React, { useState } from 'react';
import { Row, Col, Card, Typography, Button, Input, Tag, Table, Dropdown, MenuProps, Drawer, message, Statistic } from 'antd';
import { 
  PlusOutlined, 
  MoreOutlined,
  EditOutlined,
  ToolOutlined,
  CheckCircleOutlined,
  StopOutlined
} from '@ant-design/icons';
import { useAppSelector, useAppDispatch } from '@/lib/redux/hooks';
import { updateCourtStatus, Court } from '@/lib/redux/slices/courtSlice';
import { useForm, Controller } from 'react-hook-form';

const { Title, Text } = Typography;

export default function CourtsPage() {
  const dispatch = useAppDispatch();
  const { courts } = useAppSelector((state) => state.court);
  
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [editingCourt, setEditingCourt] = useState<Court | null>(null);

  const { control, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      name: '',
      pricingPerHour: 300,
    }
  });

  const getActionMenu = (record: Court): MenuProps => ({
    items: [
      {
        key: 'edit',
        icon: <EditOutlined />,
        label: 'Edit Details',
        onClick: () => {
          setEditingCourt(record);
          reset({
            name: record.name,
            pricingPerHour: record.pricingPerHour,
          });
          setIsDrawerVisible(true);
        }
      },
      { type: 'divider' },
      {
        key: 'set-available',
        icon: <CheckCircleOutlined />,
        label: 'Mark Available',
        disabled: record.status === 'AVAILABLE',
        onClick: () => {
          dispatch(updateCourtStatus({ id: record.id, status: 'AVAILABLE' }));
          message.success(`${record.name} marked as Available`);
        }
      },
      {
        key: 'set-maintenance',
        icon: <ToolOutlined />,
        label: 'Mark Maintenance',
        disabled: record.status === 'MAINTENANCE',
        onClick: () => {
          dispatch(updateCourtStatus({ id: record.id, status: 'MAINTENANCE' }));
          message.warning(`${record.name} under maintenance`);
        }
      }
    ]
  });

  const columns = [
    {
      title: 'Court Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => <div className="font-medium text-white">{text}</div>,
    },
    {
      title: 'Pricing (per hour)',
      dataIndex: 'pricingPerHour',
      key: 'pricing',
      render: (price: number) => `₹${price}`,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        let color = status === 'AVAILABLE' ? 'success' : status === 'OCCUPIED' ? 'warning' : 'error';
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: Court) => (
        <Dropdown menu={getActionMenu(record)} trigger={['click']}>
          <Button type="text" icon={<MoreOutlined />} />
        </Dropdown>
      ),
    },
  ];

  const onSubmit = (data: any) => {
    message.success(`Court ${editingCourt ? 'updated' : 'added'} successfully!`);
    setIsDrawerVisible(false);
    reset();
    setEditingCourt(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <Title level={2} style={{ margin: 0, color: 'white' }}>Court Management</Title>
        </div>
        <Button 
          type="primary" 
          icon={<PlusOutlined />}
          onClick={() => {
            setEditingCourt(null);
            reset();
            setIsDrawerVisible(true);
          }}
        >
          Add Court
        </Button>
      </div>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={8}>
          <Card bordered={false} className="bg-card">
            <Statistic title="Total Courts" value={courts.length} />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card bordered={false} className="bg-card">
            <Statistic title="Available Now" value={courts.filter(c => c.status === 'AVAILABLE').length} valueStyle={{ color: '#19C37D' }} />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card bordered={false} className="bg-card">
            <Statistic title="Under Maintenance" value={courts.filter(c => c.status === 'MAINTENANCE').length} valueStyle={{ color: '#FF4D5A' }} />
          </Card>
        </Col>
      </Row>

      <div className="p-4 rounded-lg bg-card border border-white/10">
        <Table 
          columns={columns} 
          dataSource={courts} 
          rowKey="id"
          pagination={false}
          scroll={{ x: 'max-content' }}
        />
      </div>

      <Drawer
        title={editingCourt ? "Edit Court" : "Add New Court"}
        placement="right"
        onClose={() => setIsDrawerVisible(false)}
        open={isDrawerVisible}
        width={400}
        styles={{
          body: { paddingBottom: 80, backgroundColor: '#131B2E' },
          header: { backgroundColor: '#1C2742', borderBottomColor: 'rgba(255,255,255,0.1)' }
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Court Name</label>
            <Controller
              name="name"
              control={control}
              rules={{ required: 'Court name is required' }}
              render={({ field }) => (
                <Input {...field} status={errors.name ? 'error' : ''} placeholder="Court 1 - Premium" />
              )}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Pricing (per hour)</label>
            <Controller
              name="pricingPerHour"
              control={control}
              rules={{ required: 'Pricing is required', min: 0 }}
              render={({ field }) => (
                <Input type="number" prefix="₹" {...field} status={errors.pricingPerHour ? 'error' : ''} />
              )}
            />
          </div>
          
          <div className="pt-4 border-t border-white/10 flex justify-end gap-2">
            <Button onClick={() => setIsDrawerVisible(false)}>Cancel</Button>
            <Button type="primary" htmlType="submit">
              {editingCourt ? 'Save Changes' : 'Create Court'}
            </Button>
          </div>
        </form>
      </Drawer>
    </div>
  );
}
