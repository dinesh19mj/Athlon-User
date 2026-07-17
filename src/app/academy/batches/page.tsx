'use client';

import React, { useState } from 'react';
import { Table, Button, Input, Tag, Space, Typography, Dropdown, MenuProps, Drawer, message, Progress } from 'antd';
import { 
  SearchOutlined, 
  PlusOutlined, 
  MoreOutlined,
  EditOutlined,
  EyeOutlined,
  UsergroupAddOutlined
} from '@ant-design/icons';
import { useAppSelector, useAppDispatch } from '@/lib/redux/hooks';
import { setBatchSearchQuery, Batch } from '@/lib/redux/slices/batchSlice';
import { useForm, Controller } from 'react-hook-form';

const { Title } = Typography;

export default function BatchesPage() {
  const dispatch = useAppDispatch();
  const { batches, searchQuery } = useAppSelector((state) => state.batch);
  const { coaches } = useAppSelector((state) => state.coach);
  
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [editingBatch, setEditingBatch] = useState<Batch | null>(null);

  const { control, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      name: '',
      type: 'Morning',
      skillLevel: 'Beginner',
      schedule: '',
      maxCapacity: 10,
    }
  });

  const filteredBatches = batches.filter(b => 
    b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getActionMenu = (record: Batch): MenuProps => ({
    items: [
      {
        key: 'view',
        icon: <EyeOutlined />,
        label: 'View Details',
      },
      {
        key: 'manage-players',
        icon: <UsergroupAddOutlined />,
        label: 'Manage Players',
      },
      {
        key: 'edit',
        icon: <EditOutlined />,
        label: 'Edit Batch',
        onClick: () => {
          setEditingBatch(record);
          reset({
            name: record.name,
            type: record.type,
            skillLevel: record.skillLevel,
            schedule: record.schedule,
            maxCapacity: record.maxCapacity,
          });
          setIsDrawerVisible(true);
        }
      }
    ]
  });

  const columns = [
    {
      title: 'Batch Name',
      key: 'name',
      render: (_: any, record: Batch) => (
        <div>
          <div className="font-medium text-white">{record.name}</div>
          <div className="text-xs text-gray-400">{record.schedule}</div>
        </div>
      ),
    },
    {
      title: 'Type & Level',
      key: 'type',
      render: (_: any, record: Batch) => (
        <Space direction="vertical" size={0}>
          <Tag color="purple">{record.type}</Tag>
          <div className="text-xs text-gray-400 mt-1">{record.skillLevel}</div>
        </Space>
      ),
    },
    {
      title: 'Coach',
      key: 'coach',
      render: (_: any, record: Batch) => {
        const coach = coaches.find(c => c.id === record.assignedCoachId);
        return <div className="text-sm">{coach ? `${coach.firstName} ${coach.lastName}` : 'Unassigned'}</div>;
      },
    },
    {
      title: 'Capacity',
      key: 'capacity',
      render: (_: any, record: Batch) => {
        const count = record.enrolledPlayerIds.length;
        const max = record.maxCapacity;
        const percent = Math.round((count / max) * 100);
        let color = percent >= 100 ? '#FF4D5A' : percent >= 80 ? '#F7B500' : '#19C37D';
        
        return (
          <div style={{ minWidth: 100 }}>
            <div className="flex justify-between text-xs mb-1">
              <span>{count} / {max}</span>
            </div>
            <Progress percent={percent} size="small" showInfo={false} strokeColor={color} />
          </div>
        );
      },
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        let color = status === 'ACTIVE' ? 'success' : 'default';
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: Batch) => (
        <Dropdown menu={getActionMenu(record)} trigger={['click']}>
          <Button type="text" icon={<MoreOutlined />} />
        </Dropdown>
      ),
    },
  ];

  const onSubmit = (data: any) => {
    message.success(`Batch ${editingBatch ? 'updated' : 'created'} successfully!`);
    setIsDrawerVisible(false);
    reset();
    setEditingBatch(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <Title level={2} style={{ margin: 0, color: 'white' }}>Batch Management</Title>
        </div>
        <Button 
          type="primary" 
          icon={<PlusOutlined />}
          onClick={() => {
            setEditingBatch(null);
            reset();
            setIsDrawerVisible(true);
          }}
        >
          Create Batch
        </Button>
      </div>

      <div className="p-4 rounded-lg bg-card border border-white/10">
        <div className="mb-4 flex flex-col sm:flex-row gap-4 justify-between">
          <Input 
            placeholder="Search batches..." 
            prefix={<SearchOutlined className="text-gray-400" />}
            value={searchQuery}
            onChange={(e) => dispatch(setBatchSearchQuery(e.target.value))}
            style={{ maxWidth: 400 }}
          />
        </div>

        <Table 
          columns={columns} 
          dataSource={filteredBatches} 
          rowKey="id"
          pagination={{ pageSize: 10 }}
        />
      </div>

      <Drawer
        title={editingBatch ? "Edit Batch" : "Create New Batch"}
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
            <label className="block text-sm font-medium text-gray-400 mb-1">Batch Name</label>
            <Controller
              name="name"
              control={control}
              rules={{ required: 'Batch name is required' }}
              render={({ field }) => (
                <Input {...field} status={errors.name ? 'error' : ''} placeholder="Morning Elite" />
              )}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Schedule</label>
            <Controller
              name="schedule"
              control={control}
              rules={{ required: 'Schedule is required' }}
              render={({ field }) => (
                <Input {...field} status={errors.schedule ? 'error' : ''} placeholder="Mon-Wed-Fri, 6AM-8AM" />
              )}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Max Capacity</label>
            <Controller
              name="maxCapacity"
              control={control}
              rules={{ required: 'Capacity is required', min: 1 }}
              render={({ field }) => (
                <Input type="number" {...field} status={errors.maxCapacity ? 'error' : ''} />
              )}
            />
          </div>
          
          <div className="pt-4 border-t border-white/10 flex justify-end gap-2">
            <Button onClick={() => setIsDrawerVisible(false)}>Cancel</Button>
            <Button type="primary" htmlType="submit">
              {editingBatch ? 'Save Changes' : 'Create Batch'}
            </Button>
          </div>
        </form>
      </Drawer>
    </div>
  );
}
