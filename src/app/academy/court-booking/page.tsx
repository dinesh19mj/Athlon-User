'use client';

import React, { useState } from 'react';
import { Typography, Card, Calendar, Badge, Modal, Form, Select, DatePicker, TimePicker, Input, Button, message, Tag } from 'antd';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { useAppSelector, useAppDispatch } from '@/lib/redux/hooks';
import { addBooking } from '@/lib/redux/slices/courtSlice';

const { Title, Text } = Typography;

export default function CourtBookingPage() {
  const dispatch = useAppDispatch();
  const { courts, bookings } = useAppSelector((state) => state.court);
  
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs());
  const [form] = Form.useForm();

  const getListData = (value: Dayjs) => {
    const dateStr = value.format('YYYY-MM-DD');
    const dayBookings = bookings.filter(b => b.date === dateStr);
    
    return dayBookings.map(b => {
      const court = courts.find(c => c.id === b.courtId);
      return {
        type: b.bookedBy === 'BATCH' ? 'success' : b.bookedBy === 'MATCH' ? 'warning' : 'processing',
        content: `${b.startTime} - ${court?.name.split(' - ')[0]}`,
      };
    });
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

  const handleSelectDate = (value: Dayjs) => {
    setSelectedDate(value);
  };

  const onFinish = (values: any) => {
    const newBooking = {
      id: `bk${Date.now()}`,
      courtId: values.courtId,
      date: values.date.format('YYYY-MM-DD'),
      startTime: values.timeRange[0].format('HH:mm'),
      endTime: values.timeRange[1].format('HH:mm'),
      bookedBy: values.bookedBy,
      paymentStatus: 'PENDING' as const,
    };
    
    dispatch(addBooking(newBooking));
    message.success('Court booked successfully');
    setIsModalVisible(false);
    form.resetFields();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <Title level={2} style={{ margin: 0, color: 'white' }}>Court Booking</Title>
          <Text type="secondary">Manage schedules and reserve courts</Text>
        </div>
        <Button type="primary" onClick={() => {
          form.setFieldsValue({ date: selectedDate });
          setIsModalVisible(true);
        }}>
          New Booking
        </Button>
      </div>

      <Card bordered={false} className="bg-card">
        <div className="flex gap-4 mb-4">
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <Badge status="success" /> Batch Class
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <Badge status="processing" /> Member Booking
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <Badge status="warning" /> Practice Match
          </div>
        </div>
        <Calendar 
          value={selectedDate} 
          onSelect={handleSelectDate}
          cellRender={dateCellRender} 
          className="bg-transparent text-white" 
        />
      </Card>

      <Modal
        title="Book Court"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        styles={{
          content: { backgroundColor: '#1C2742' },
          header: { backgroundColor: '#1C2742', borderBottom: '1px solid rgba(255,255,255,0.1)' }
        }}
      >
        <Form form={form} layout="vertical" onFinish={onFinish} className="mt-4">
          <Form.Item name="courtId" label="Select Court" rules={[{ required: true }]}>
            <Select>
              {courts.filter(c => c.status !== 'MAINTENANCE').map(c => (
                <Select.Option key={c.id} value={c.id}>{c.name} - ₹{c.pricingPerHour}/hr</Select.Option>
              ))}
            </Select>
          </Form.Item>
          
          <div className="flex gap-4">
            <Form.Item name="date" label="Date" className="flex-1" rules={[{ required: true }]}>
              <DatePicker className="w-full" />
            </Form.Item>
            <Form.Item name="timeRange" label="Time Range" className="flex-1" rules={[{ required: true }]}>
              <TimePicker.RangePicker className="w-full" format="HH:mm" />
            </Form.Item>
          </div>

          <Form.Item name="bookedBy" label="Booking Type" rules={[{ required: true }]}>
            <Select>
              <Select.Option value="BATCH">Batch Class</Select.Option>
              <Select.Option value="MEMBER">Member Booking</Select.Option>
              <Select.Option value="GUEST">Guest Booking</Select.Option>
              <Select.Option value="MATCH">Practice Match</Select.Option>
            </Select>
          </Form.Item>

          <div className="flex justify-end gap-2 pt-4">
            <Button onClick={() => setIsModalVisible(false)}>Cancel</Button>
            <Button type="primary" htmlType="submit">Confirm Booking</Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
}
