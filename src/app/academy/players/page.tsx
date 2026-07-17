'use client';

import React, { useState } from 'react';
import { Table, Button, Input, Tag, Space, Typography, Dropdown, MenuProps, Drawer, message, Popconfirm } from 'antd';
import { 
  SearchOutlined, 
  PlusOutlined, 
  MoreOutlined,
  EditOutlined,
  StopOutlined,
  EyeOutlined
} from '@ant-design/icons';
import { useAppSelector, useAppDispatch } from '@/lib/redux/hooks';
import { setSearchQuery, deactivatePlayer, Player } from '@/lib/redux/slices/playerSlice';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const { Title } = Typography;

const playerSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email'),
  phone: z.string().min(10, 'Phone number is required'),
  membershipType: z.string().min(1, 'Membership type is required'),
  skillLevel: z.enum(['Beginner', 'Intermediate', 'Advanced', 'Professional']),
  dominantHand: z.enum(['Right', 'Left', 'Ambidextrous']),
  playingStyle: z.enum(['Attacking', 'Defensive', 'All-Round']),
});

type PlayerFormData = z.infer<typeof playerSchema>;

export default function PlayersPage() {
  const dispatch = useAppDispatch();
  const { players, searchQuery } = useAppSelector((state) => state.player);
  
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [editingPlayer, setEditingPlayer] = useState<Player | null>(null);

  const { control, handleSubmit, reset, formState: { errors } } = useForm<PlayerFormData>({
    resolver: zodResolver(playerSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      membershipType: 'Monthly',
      skillLevel: 'Beginner',
      dominantHand: 'Right',
      playingStyle: 'All-Round',
    }
  });

  const filteredPlayers = players.filter(p => 
    (p.firstName + ' ' + p.lastName).toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getActionMenu = (record: Player): MenuProps => ({
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
          setEditingPlayer(record);
          reset({
            firstName: record.firstName,
            lastName: record.lastName,
            email: record.email,
            phone: record.phone,
            membershipType: record.membershipType,
            skillLevel: record.skillLevel,
            dominantHand: record.dominantHand,
            playingStyle: record.playingStyle,
          });
          setIsDrawerVisible(true);
        }
      },
      {
        type: 'divider',
      },
      {
        key: 'deactivate',
        icon: <StopOutlined />,
        label: 'Deactivate',
        danger: true,
        disabled: record.status !== 'ACTIVE',
        onClick: () => {
          dispatch(deactivatePlayer(record.id));
          message.success('Player deactivated successfully');
        }
      },
    ]
  });

  const columns = [
    {
      title: 'Name',
      key: 'name',
      render: (_: any, record: Player) => (
        <div className="font-medium text-white">
          {record.firstName} {record.lastName}
        </div>
      ),
    },
    {
      title: 'Contact',
      key: 'contact',
      render: (_: any, record: Player) => (
        <div className="text-sm">
          <div>{record.email}</div>
          <div className="text-gray-400">{record.phone}</div>
        </div>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        let color = status === 'ACTIVE' ? 'success' : 'error';
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: 'Skill Level',
      dataIndex: 'skillLevel',
      key: 'skillLevel',
    },
    {
      title: 'Membership',
      dataIndex: 'membershipType',
      key: 'membershipType',
      render: (text: string) => <Tag color="blue">{text}</Tag>,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: Player) => (
        <Dropdown menu={getActionMenu(record)} trigger={['click']}>
          <Button type="text" icon={<MoreOutlined />} />
        </Dropdown>
      ),
    },
  ];

  const onSubmit = (data: PlayerFormData) => {
    // In a real app, this would dispatch an action to create/update via API
    message.success(`Player ${editingPlayer ? 'updated' : 'added'} successfully!`);
    setIsDrawerVisible(false);
    reset();
    setEditingPlayer(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <Title level={2} style={{ margin: 0, color: 'white' }}>Player Management</Title>
        </div>
        <Button 
          type="primary" 
          icon={<PlusOutlined />}
          onClick={() => {
            setEditingPlayer(null);
            reset();
            setIsDrawerVisible(true);
          }}
        >
          Add Player
        </Button>
      </div>

      <div className="p-4 rounded-lg bg-card border border-white/10">
        <div className="mb-4 flex flex-col sm:flex-row gap-4 justify-between">
          <Input 
            placeholder="Search players by name or email..." 
            prefix={<SearchOutlined className="text-gray-400" />}
            value={searchQuery}
            onChange={(e) => dispatch(setSearchQuery(e.target.value))}
            style={{ maxWidth: 400 }}
          />
        </div>

        <Table 
          columns={columns} 
          dataSource={filteredPlayers} 
          rowKey="id"
          scroll={{ x: 'max-content' }}
          pagination={{ pageSize: 10 }}
        />
      </div>

      <Drawer
        title={editingPlayer ? "Edit Player" : "Add New Player"}
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
              render={({ field }) => (
                <Input {...field} status={errors.firstName ? 'error' : ''} placeholder="John" />
              )}
            />
            {errors.firstName && <span className="text-danger text-xs">{errors.firstName.message}</span>}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Last Name</label>
            <Controller
              name="lastName"
              control={control}
              render={({ field }) => (
                <Input {...field} status={errors.lastName ? 'error' : ''} placeholder="Doe" />
              )}
            />
            {errors.lastName && <span className="text-danger text-xs">{errors.lastName.message}</span>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Email</label>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Input {...field} status={errors.email ? 'error' : ''} placeholder="john@example.com" />
              )}
            />
            {errors.email && <span className="text-danger text-xs">{errors.email.message}</span>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Phone</label>
            <Controller
              name="phone"
              control={control}
              render={({ field }) => (
                <Input {...field} status={errors.phone ? 'error' : ''} placeholder="+1234567890" />
              )}
            />
            {errors.phone && <span className="text-danger text-xs">{errors.phone.message}</span>}
          </div>

          {/* ... Add more fields as needed for real usage */}
          
          <div className="pt-4 border-t border-white/10 flex justify-end gap-2">
            <Button onClick={() => setIsDrawerVisible(false)}>Cancel</Button>
            <Button type="primary" htmlType="submit">
              {editingPlayer ? 'Save Changes' : 'Create Player'}
            </Button>
          </div>
        </form>
      </Drawer>
    </div>
  );
}
