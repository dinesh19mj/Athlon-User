'use client';

import React, { useState } from 'react';
import { Table, Button, Input, Tag, Space, Typography, Dropdown, MenuProps, Drawer, message, Rate } from 'antd';
import { 
  SearchOutlined, 
  PlusOutlined, 
  MoreOutlined,
  EditOutlined,
  EyeOutlined
} from '@ant-design/icons';
import { useAppSelector, useAppDispatch } from '@/lib/redux/hooks';
import { setCoachSearchQuery, Coach } from '@/lib/redux/slices/coachSlice';
import { useForm, Controller } from 'react-hook-form';

const { Title } = Typography;

export default function CoachesPage() {
  const dispatch = useAppDispatch();
  const { coaches, searchQuery } = useAppSelector((state) => state.coach);
  
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [editingCoach, setEditingCoach] = useState<Coach | null>(null);

  const { control, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      specialization: '',
    }
  });

  const filteredCoaches = coaches.filter(c => 
    (c.firstName + ' ' + c.lastName).toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.specialization.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getActionMenu = (record: Coach): MenuProps => ({
    items: [
      {
        key: 'view',
        icon: <EyeOutlined />,
        label: 'View Profile',
      },
      {
        key: 'edit',
        icon: <EditOutlined />,
        label: 'Edit Details',
        onClick: () => {
          setEditingCoach(record);
          reset({
            firstName: record.firstName,
            lastName: record.lastName,
            email: record.email,
            phone: record.phone,
            specialization: record.specialization,
          });
          setIsDrawerVisible(true);
        }
      }
    ]
  });

  const columns = [
    {
      title: 'Name',
      key: 'name',
      render: (_: any, record: Coach) => (
        <div className="font-medium text-white">
          {record.firstName} {record.lastName}
        </div>
      ),
    },
    {
      title: 'Contact',
      key: 'contact',
      render: (_: any, record: Coach) => (
        <div className="text-sm">
          <div>{record.email}</div>
          <div className="text-gray-400">{record.phone}</div>
        </div>
      ),
    },
    {
      title: 'Specialization',
      dataIndex: 'specialization',
      key: 'specialization',
      render: (text: string) => <Tag color="orange">{text}</Tag>,
    },
    {
      title: 'Rating',
      dataIndex: 'rating',
      key: 'rating',
      render: (rating: number) => (
        <div className="flex items-center gap-2">
          <Rate disabled defaultValue={rating} className="text-sm" />
          <span className="text-xs text-gray-400">({rating})</span>
        </div>
      ),
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
      render: (_: any, record: Coach) => (
        <Dropdown menu={getActionMenu(record)} trigger={['click']}>
          <Button type="text" icon={<MoreOutlined />} />
        </Dropdown>
      ),
    },
  ];

  const onSubmit = (data: any) => {
    message.success(`Coach ${editingCoach ? 'updated' : 'added'} successfully!`);
    setIsDrawerVisible(false);
    reset();
    setEditingCoach(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <Title level={2} style={{ margin: 0, color: 'white' }}>Coach Management</Title>
        </div>
        <Button 
          type="primary" 
          icon={<PlusOutlined />}
          onClick={() => {
            setEditingCoach(null);
            reset();
            setIsDrawerVisible(true);
          }}
        >
          Add Coach
        </Button>
      </div>

      <div className="p-4 rounded-lg bg-card border border-white/10">
        <div className="mb-4 flex flex-col sm:flex-row gap-4 justify-between">
          <Input 
            placeholder="Search coaches by name or specialization..." 
            prefix={<SearchOutlined className="text-gray-400" />}
            value={searchQuery}
            onChange={(e) => dispatch(setCoachSearchQuery(e.target.value))}
            style={{ maxWidth: 400 }}
          />
        </div>

        <Table 
          columns={columns} 
          dataSource={filteredCoaches} 
          rowKey="id"
          scroll={{ x: 'max-content' }}
          pagination={{ pageSize: 10 }}
        />
      </div>

      <Drawer
        title={editingCoach ? "Edit Coach" : "Add New Coach"}
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
            <label className="block text-sm font-medium text-gray-400 mb-1">First Name</label>
            <Controller
              name="firstName"
              control={control}
              rules={{ required: 'First name is required' }}
              render={({ field }) => (
                <Input {...field} status={errors.firstName ? 'error' : ''} placeholder="Vikram" />
              )}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Last Name</label>
            <Controller
              name="lastName"
              control={control}
              rules={{ required: 'Last name is required' }}
              render={({ field }) => (
                <Input {...field} status={errors.lastName ? 'error' : ''} placeholder="Nair" />
              )}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Email</label>
            <Controller
              name="email"
              control={control}
              rules={{ required: 'Email is required' }}
              render={({ field }) => (
                <Input {...field} status={errors.email ? 'error' : ''} placeholder="coach@example.com" />
              )}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Specialization</label>
            <Controller
              name="specialization"
              control={control}
              rules={{ required: 'Specialization is required' }}
              render={({ field }) => (
                <Input {...field} status={errors.specialization ? 'error' : ''} placeholder="Advanced Tactics" />
              )}
            />
          </div>
          
          <div className="pt-4 border-t border-white/10 flex justify-end gap-2">
            <Button onClick={() => setIsDrawerVisible(false)}>Cancel</Button>
            <Button type="primary" htmlType="submit">
              {editingCoach ? 'Save Changes' : 'Create Coach'}
            </Button>
          </div>
        </form>
      </Drawer>
    </div>
  );
}
