import type { ReactNode } from 'react';
import { Layout } from 'antd';
import AppHeader from './AppHeader';

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <AppHeader />
      <Layout.Content style={{ width: '100%', maxWidth: 1200, margin: '0 auto', padding: 24 }}>
        {children}
      </Layout.Content>
    </Layout>
  );
}