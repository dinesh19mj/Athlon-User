'use client';

import React, { useState } from 'react';
import { Row, Col, Card, Typography, Select, Table, Tag, Button, Calendar, Badge, DatePicker, message, Avatar } from 'antd';
import { 
  CheckCircleOutlined, 
  CloseCircleOutlined, 
  ClockCircleOutlined,
  SaveOutlined,
  UserOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';
import { useAppSelector } from '@/lib/redux/hooks';
import type { Dayjs } from 'dayjs';

const { Title, Text } = Typography;

export default function AttendancePage() {
  const { batches } = useAppSelector((state) => state.batch);
  const { players } = useAppSelector((state) => state.player);
  
  const [selectedBatchId, setSelectedBatchId] = useState<string>(batches[0]?.id || '');
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs());
  const [attendanceMode, setAttendanceMode] = useState<'mark' | 'view'>('mark');

  // For real implementation, attendance state should be in Redux. Using local state for UI demonstration.
  const [attendanceRecord, setAttendanceRecord] = useState<Record<string, 'PRESENT' | 'ABSENT' | 'LATE' | 'LEAVE'>>({
    'p1': 'PRESENT',
    'p2': 'LATE',
    'p3': 'ABSENT'
  });

  const selectedBatch = batches.find(b => b.id === selectedBatchId);
  const enrolledPlayers = players.filter(p => selectedBatch?.enrolledPlayerIds.includes(p.id));

  const handleStatusChange = (playerId: string, status: 'PRESENT' | 'ABSENT' | 'LATE' | 'LEAVE') => {
    setAttendanceRecord(prev => ({ ...prev, [playerId]: status }));
  };

  const columns = [
    {
      title: 'Player',
      key: 'player',
      render: (_: any, record: any) => (
        <div className="flex items-center gap-3">
          <Avatar icon={<UserOutlined />} style={{ backgroundColor: '#2979FF' }} />
          <div>
            <div className="font-medium text-white">{record.firstName} {record.lastName}</div>
            <div className="text-xs text-gray-400">{record.phone}</div>
          </div>
        </div>
      ),
    },
    {
      title: 'Status',
      key: 'status',
      render: (_: any, record: any) => {
        const currentStatus = attendanceRecord[record.id] || 'PRESENT';
        return (
          <div className="flex gap-2">
            <Button 
              size="small" 
              type={currentStatus === 'PRESENT' ? 'primary' : 'default'}
              className={currentStatus === 'PRESENT' ? 'bg-success border-success' : ''}
              onClick={() => handleStatusChange(record.id, 'PRESENT')}
              icon={<CheckCircleOutlined />}
            >
              Present
            </Button>
            <Button 
              size="small"
              type={currentStatus === 'LATE' ? 'primary' : 'default'}
              className={currentStatus === 'LATE' ? 'bg-warning border-warning' : ''}
              onClick={() => handleStatusChange(record.id, 'LATE')}
              icon={<ClockCircleOutlined />}
            >
              Late
            </Button>
            <Button 
              size="small"
              type={currentStatus === 'ABSENT' ? 'primary' : 'default'}
              className={currentStatus === 'ABSENT' ? 'bg-danger border-danger' : ''}
              onClick={() => handleStatusChange(record.id, 'ABSENT')}
              icon={<CloseCircleOutlined />}
            >
              Absent
            </Button>
            <Button 
              size="small"
              type={currentStatus === 'LEAVE' ? 'primary' : 'default'}
              onClick={() => handleStatusChange(record.id, 'LEAVE')}
            >
              Leave
            </Button>
          </div>
        );
      },
    }
  ];

  const getListData = (value: Dayjs) => {
    let listData;
    // Mock data for calendar visualization
    if (value.date() === 8) {
      listData = [
        { type: 'success', content: 'Morning Batch: 100%' },
        { type: 'warning', content: 'Evening Batch: 80%' },
      ];
    }
    if (value.date() === 10) {
      listData = [
        { type: 'error', content: 'Weekend Batch: 60%' },
      ];
    }
    return listData || [];
  };

  const dateCellRender = (value: Dayjs) => {
    const listData = getListData(value);
    return (
      <ul className="m-0 p-0 list-none text-xs">
        {listData.map((item, index) => (
          <li key={index}>
            <Badge status={item.type as any} text={<span className="text-gray-400 text-[10px]">{item.content}</span>} />
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <Title level={2} style={{ margin: 0, color: 'white' }}>Attendance Management</Title>
        </div>
        <div className="flex gap-2">
          <Button 
            type={attendanceMode === 'mark' ? 'primary' : 'default'}
            onClick={() => setAttendanceMode('mark')}
          >
            Mark Daily Attendance
          </Button>
          <Button 
            type={attendanceMode === 'view' ? 'primary' : 'default'}
            onClick={() => setAttendanceMode('view')}
          >
            View Calendar
          </Button>
        </div>
      </div>

      {attendanceMode === 'mark' ? (
        <Card bordered={false} className="bg-card">
          <div className="flex flex-wrap gap-4 items-center mb-6 pb-6 border-b border-white/10">
            <div>
              <div className="text-xs text-gray-400 mb-1">Select Batch</div>
              <Select
                value={selectedBatchId}
                onChange={setSelectedBatchId}
                style={{ width: 250 }}
                options={batches.map(b => ({ label: `${b.name} (${b.schedule})`, value: b.id }))}
              />
            </div>
            <div>
              <div className="text-xs text-gray-400 mb-1">Select Date</div>
              <DatePicker 
                value={selectedDate} 
                onChange={(d) => d && setSelectedDate(d)}
                allowClear={false}
              />
            </div>
            <div className="ml-auto">
              <Button type="primary" icon={<SaveOutlined />} onClick={() => message.success('Attendance saved successfully')}>
                Save Attendance
              </Button>
            </div>
          </div>

          <div className="mb-4 flex gap-4">
            <div className="bg-success/20 text-success px-3 py-1 rounded-full text-xs border border-success/30">
              Present: {Object.values(attendanceRecord).filter(v => v === 'PRESENT').length}
            </div>
            <div className="bg-danger/20 text-danger px-3 py-1 rounded-full text-xs border border-danger/30">
              Absent: {Object.values(attendanceRecord).filter(v => v === 'ABSENT').length}
            </div>
            <div className="bg-warning/20 text-warning px-3 py-1 rounded-full text-xs border border-warning/30">
              Late: {Object.values(attendanceRecord).filter(v => v === 'LATE').length}
            </div>
          </div>

          <Table 
            columns={columns} 
            dataSource={enrolledPlayers} 
            rowKey="id"
            pagination={false}
          />
        </Card>
      ) : (
        <Card bordered={false} className="bg-card">
          <div className="mb-4">
            <Select
                value={selectedBatchId}
                onChange={setSelectedBatchId}
                style={{ width: 250 }}
                options={[{ label: 'All Batches', value: 'all' }, ...batches.map(b => ({ label: b.name, value: b.id }))]}
                defaultValue="all"
              />
          </div>
          <Calendar cellRender={dateCellRender} className="bg-transparent text-white" />
        </Card>
      )}
    </div>
  );
}
