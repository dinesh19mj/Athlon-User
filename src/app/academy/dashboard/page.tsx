'use client';

import React from 'react';
import { Row, Col, Card, Statistic, Typography, Timeline, Avatar, Progress, Space } from 'antd';
import { 
  ArrowUpOutlined, 
  ArrowDownOutlined,
  TeamOutlined,
  PlayCircleOutlined,
  ScheduleOutlined,
  DollarOutlined,
  TrophyOutlined
} from '@ant-design/icons';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend
} from 'recharts';

const { Title, Text } = Typography;

const revenueData = [
  { name: 'Mon', revenue: 4000, expenses: 2400 },
  { name: 'Tue', revenue: 3000, expenses: 1398 },
  { name: 'Wed', revenue: 2000, expenses: 9800 },
  { name: 'Thu', revenue: 2780, expenses: 3908 },
  { name: 'Fri', revenue: 1890, expenses: 4800 },
  { name: 'Sat', revenue: 2390, expenses: 3800 },
  { name: 'Sun', revenue: 3490, expenses: 4300 },
];

const attendanceData = [
  { name: 'Morning', present: 45, absent: 5 },
  { name: 'Evening', present: 80, absent: 12 },
  { name: 'Night', present: 30, absent: 8 },
];

export default function AcademyDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <Title level={2} style={{ margin: 0, color: 'white' }}>Academy Dashboard</Title>
          <Text type="secondary">Welcome back! Here's what's happening today.</Text>
        </div>
      </div>

      {/* Primary Stats */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card variant="borderless">
            <Statistic
              title="Today's Attendance"
              value={155}
              suffix="/ 180"
              prefix={<TeamOutlined className="text-primary mr-2" />}
              styles={{ content: { color: '#19C37D' } }}
            />
            <div className="mt-2 text-xs text-gray-400">
              <ArrowUpOutlined className="text-success mr-1" />
              12% higher than yesterday
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card variant="borderless">
            <Statistic
              title="Practice Matches"
              value={24}
              prefix={<PlayCircleOutlined className="text-accent mr-2" />}
            />
            <div className="mt-2 text-xs text-gray-400">
              8 currently live
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card variant="borderless">
            <Statistic
              title="Court Occupancy"
              value={8}
              suffix="/ 10"
              prefix={<ScheduleOutlined className="text-warning mr-2" />}
            />
            <Progress percent={80} strokeColor="#F7B500" showInfo={false} size="small" />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card variant="borderless">
            <Statistic
              title="Today's Revenue"
              value={12450}
              prefix={<DollarOutlined className="text-success mr-2" />}
            />
            <div className="mt-2 text-xs text-gray-400">
              <ArrowDownOutlined className="text-danger mr-1" />
              4% lower than average
            </div>
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        {/* Charts */}
        <Col xs={24} lg={16}>
          <Card title="Weekly Revenue vs Expenses" bordered={false} className="h-full">
            <div style={{ width: '100%', height: 300 }}>
              <ResponsiveContainer>
                <AreaChart data={revenueData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#19C37D" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#19C37D" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#FF4D5A" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#FF4D5A" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="name" stroke="#B7C2D8" />
                  <YAxis stroke="#B7C2D8" />
                  <Tooltip contentStyle={{ backgroundColor: '#1C2742', borderColor: 'rgba(255,255,255,0.1)' }} />
                  <Area type="monotone" dataKey="revenue" stroke="#19C37D" fillOpacity={1} fill="url(#colorRevenue)" />
                  <Area type="monotone" dataKey="expenses" stroke="#FF4D5A" fillOpacity={1} fill="url(#colorExpenses)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </Col>

        {/* Activity Timeline */}
        <Col xs={24} lg={8}>
          <Card title="Recent Activities" bordered={false} className="h-full overflow-hidden">
            <Timeline
              items={[
                {
                  color: 'green',
                  children: 'Court 1 booked for Practice Match (Batch A)',
                },
                {
                  color: 'blue',
                  children: 'Coach Vikram started Morning Batch',
                },
                {
                  color: 'red',
                  children: 'Shuttle stock alert: Less than 5 barrels remaining',
                },
                {
                  color: 'orange',
                  children: 'New player Arjun enrolled in Evening Batch',
                },
                {
                  color: 'gray',
                  children: 'Monthly court maintenance scheduled',
                },
              ]}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <Card title="Batch Attendance Overview" bordered={false}>
            <div style={{ width: '100%', height: 250 }}>
              <ResponsiveContainer>
                <BarChart data={attendanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="name" stroke="#B7C2D8" />
                  <YAxis stroke="#B7C2D8" />
                  <Tooltip cursor={{ fill: 'rgba(255,255,255,0.05)' }} contentStyle={{ backgroundColor: '#1C2742', borderColor: 'rgba(255,255,255,0.1)' }} />
                  <Legend />
                  <Bar dataKey="present" fill="#2979FF" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="absent" fill="#FF4D5A" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </Col>

        <Col xs={24} md={12}>
          <Card title="Top Performers" bordered={false}>
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/5">
                <div className="flex items-center gap-3">
                  <Avatar style={{ backgroundColor: '#FF8A00' }} icon={<TrophyOutlined />} />
                  <div>
                    <div className="font-semibold text-white">Rohan Sharma</div>
                    <div className="text-xs text-gray-400">Best Performer (Weekly)</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-success font-bold">14 Wins</div>
                  <div className="text-xs text-gray-400">0 Losses</div>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/5">
                <div className="flex items-center gap-3">
                  <Avatar style={{ backgroundColor: '#2979FF' }} icon={<TrophyOutlined />} />
                  <div>
                    <div className="font-semibold text-white">Ananya Iyer</div>
                    <div className="text-xs text-gray-400">Most Consistent</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-primary font-bold">98%</div>
                  <div className="text-xs text-gray-400">Attendance</div>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/5">
                <div className="flex items-center gap-3">
                  <Avatar style={{ backgroundColor: '#19C37D' }} icon={<TrophyOutlined />} />
                  <div>
                    <div className="font-semibold text-white">Coach Vikram</div>
                    <div className="text-xs text-gray-400">Highest Rated Coach</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-success font-bold">4.9/5</div>
                  <div className="text-xs text-gray-400">From 120 Ratings</div>
                </div>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
