'use client';

import React from 'react';
import { Layout } from 'antd';
import { AcademySidebar } from '@/components/academy/Sidebar';
import { AcademyTopNav } from '@/components/academy/TopNav';

const { Content } = Layout;

export default function AcademyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <AcademySidebar />
      <Layout>
        <AcademyTopNav />
        <Content
          style={{
            margin: '24px',
            minHeight: 280,
            background: 'transparent',
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}
