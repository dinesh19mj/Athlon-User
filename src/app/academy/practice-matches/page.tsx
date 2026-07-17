'use client';

import React, { useState } from 'react';
import { Typography, Button, Card, Row, Col, Tag, Modal, Form, Select, DatePicker, TimePicker, InputNumber, Input, message } from 'antd';
import { PlusOutlined, PlayCircleOutlined, TrophyOutlined } from '@ant-design/icons';
import { useAppSelector } from '@/lib/redux/hooks';
import dayjs from 'dayjs';

const { Title, Text } = Typography;

export default function PracticeMatchesPage() {
  const { players } = useAppSelector((state) => state.player);
  const { courts } = useAppSelector((state) => state.court);
  
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  // Mock matches state
  const [matches, setMatches] = useState([
    {
      id: 'm1',
      type: 'Singles',
      player1Id: 'p1',
      player2Id: 'p2',
      courtId: 'crt1',
      date: dayjs().format('YYYY-MM-DD'),
      status: 'ONGOING',
      score: { p1: 15, p2: 12, sets: [ '21-18', 'LIVE' ] },
      remarks: ''
    },
    {
      id: 'm2',
      type: 'Doubles',
      player1Id: 'p1',
      player2Id: 'p2',
      player3Id: 'p3', // Need more players in mock but using same for demo
      player4Id: 'p4',
      courtId: 'crt2',
      date: dayjs().subtract(1, 'day').format('YYYY-MM-DD'),
      status: 'COMPLETED',
      score: { p1: 2, p2: 0, sets: [ '21-15', '21-19' ] },
      remarks: 'Great teamwork by team 1'
    }
  ]);

  const onFinish = (values: any) => {
    const newMatch = {
      id: `m${Date.now()}`,
      type: values.type,
      player1Id: values.player1Id,
      player2Id: values.player2Id,
      courtId: values.courtId,
      date: dayjs().format('YYYY-MM-DD'),
      status: 'SCHEDULED',
      score: { p1: 0, p2: 0, sets: [] },
      remarks: ''
    };
    setMatches([newMatch, ...matches]);
    message.success('Practice Match scheduled!');
    setIsModalVisible(false);
    form.resetFields();
  };

  const updateScore = (matchId: string, p1Score: number, p2Score: number) => {
    setMatches(matches.map(m => {
      if (m.id === matchId) {
        return { ...m, score: { ...m.score, p1: p1Score, p2: p2Score } };
      }
      return m;
    }));
  };

  const getPlayerName = (id: string) => {
    const p = players.find(x => x.id === id);
    return p ? `${p.firstName} ${p.lastName}` : 'Player';
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <Title level={2} style={{ margin: 0, color: 'white' }}>Practice Matches</Title>
          <Text type="secondary">Track live scores, history, and remarks</Text>
        </div>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsModalVisible(true)}>
          New Match
        </Button>
      </div>

      <Row gutter={[16, 16]}>
        {matches.map(match => (
          <Col xs={24} lg={12} key={match.id}>
            <Card 
              bordered={false} 
              className={`bg-card relative overflow-hidden ${match.status === 'ONGOING' ? 'border border-primary' : ''}`}
            >
              {match.status === 'ONGOING' && (
                <div className="absolute top-0 right-0 bg-primary text-white text-xs px-2 py-1 rounded-bl-lg flex items-center gap-1">
                  <PlayCircleOutlined /> LIVE
                </div>
              )}
              {match.status === 'COMPLETED' && (
                <div className="absolute top-0 right-0 bg-success text-white text-xs px-2 py-1 rounded-bl-lg">
                  COMPLETED
                </div>
              )}

              <div className="flex justify-between items-center mb-4">
                <Tag color="purple">{match.type}</Tag>
                <Text type="secondary" className="text-xs">
                  {courts.find(c => c.id === match.courtId)?.name} • {match.date}
                </Text>
              </div>

              <div className="flex justify-between items-center bg-[#131B2E] p-4 rounded-lg">
                <div className="text-center flex-1">
                  <div className="font-semibold text-lg text-white mb-2">{getPlayerName(match.player1Id)}</div>
                  {match.status === 'ONGOING' ? (
                    <InputNumber 
                      min={0} 
                      value={match.score.p1} 
                      onChange={(v) => updateScore(match.id, v || 0, match.score.p2)}
                      className="text-xl font-bold text-center w-20" 
                    />
                  ) : (
                    <div className="text-2xl font-bold text-white">{match.score.p1}</div>
                  )}
                </div>
                
                <div className="px-4 text-center">
                  <div className="text-xs text-gray-500 mb-1">SETS</div>
                  <div className="flex flex-col gap-1">
                    {match.score.sets.map((set, i) => (
                      <Tag key={i} color="default">{set}</Tag>
                    ))}
                  </div>
                </div>

                <div className="text-center flex-1">
                  <div className="font-semibold text-lg text-white mb-2">{getPlayerName(match.player2Id)}</div>
                  {match.status === 'ONGOING' ? (
                    <InputNumber 
                      min={0} 
                      value={match.score.p2} 
                      onChange={(v) => updateScore(match.id, match.score.p1, v || 0)}
                      className="text-xl font-bold text-center w-20" 
                    />
                  ) : (
                    <div className="text-2xl font-bold text-white">{match.score.p2}</div>
                  )}
                </div>
              </div>

              {match.remarks && (
                <div className="mt-4 text-sm text-gray-400 bg-white/5 p-3 rounded">
                  <strong>Coach Remarks:</strong> {match.remarks}
                </div>
              )}
              
              {match.status === 'ONGOING' && (
                <div className="mt-4 flex gap-2">
                  <Button className="flex-1">Add Set</Button>
                  <Button type="primary" className="flex-1 bg-success border-success hover:bg-success/80">End Match</Button>
                </div>
              )}
            </Card>
          </Col>
        ))}
      </Row>

      <Modal
        title="Schedule Practice Match"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        styles={{
          content: { backgroundColor: '#1C2742' },
          header: { backgroundColor: '#1C2742', borderBottom: '1px solid rgba(255,255,255,0.1)' }
        }}
      >
        <Form form={form} layout="vertical" onFinish={onFinish} className="mt-4">
          <Form.Item name="type" label="Match Type" rules={[{ required: true }]} initialValue="Singles">
            <Select>
              <Select.Option value="Singles">Singles</Select.Option>
              <Select.Option value="Doubles">Doubles</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item name="courtId" label="Court" rules={[{ required: true }]}>
            <Select>
              {courts.filter(c => c.status !== 'MAINTENANCE').map(c => (
                <Select.Option key={c.id} value={c.id}>{c.name}</Select.Option>
              ))}
            </Select>
          </Form.Item>

          <div className="flex gap-4">
            <Form.Item name="player1Id" label="Player/Team 1" className="flex-1" rules={[{ required: true }]}>
              <Select showSearch optionFilterProp="children">
                {players.map(p => (
                  <Select.Option key={p.id} value={p.id}>{p.firstName} {p.lastName}</Select.Option>
                ))}
              </Select>
            </Form.Item>
            
            <div className="flex items-center justify-center pt-6 text-gray-500 font-bold">VS</div>

            <Form.Item name="player2Id" label="Player/Team 2" className="flex-1" rules={[{ required: true }]}>
              <Select showSearch optionFilterProp="children">
                {players.map(p => (
                  <Select.Option key={p.id} value={p.id}>{p.firstName} {p.lastName}</Select.Option>
                ))}
              </Select>
            </Form.Item>
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t border-white/10">
            <Button onClick={() => setIsModalVisible(false)}>Cancel</Button>
            <Button type="primary" htmlType="submit">Start Match</Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
}
