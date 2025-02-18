import { Layout, Switch } from 'antd';
import { Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { BulbOutlined, BulbFilled } from '@ant-design/icons';
import './App.css';

const { Header, Content } = Layout;

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // 检查系统主题偏好
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkMode(darkModeMediaQuery.matches);

    const handleThemeChange = (e: MediaQueryListEvent) => {
      setIsDarkMode(e.matches);
    };

    darkModeMediaQuery.addEventListener('change', handleThemeChange);
    return () => darkModeMediaQuery.removeEventListener('change', handleThemeChange);
  }, []);

  useEffect(() => {
    // 应用主题
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
    document.body.style.backgroundColor = isDarkMode ? '#1a1a1a' : '#ffffff';
  }, [isDarkMode]);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{
        position: 'fixed',
        width: '100%',
        zIndex: 1000,
        height: '64px',
        padding: '0 24px',

        borderBottom: `1px solid ${isDarkMode ? '#303030' : '#f0f0f0'}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{
          fontSize: '18px',
          fontWeight: 600,
          color: isDarkMode ? '#fff' : '#000'
        }}>
          前端工具箱
        </div>
        <Switch
          checkedChildren={<BulbOutlined />}
          unCheckedChildren={<BulbFilled />}
          checked={isDarkMode}
          onChange={(checked) => setIsDarkMode(checked)}
          style={{ backgroundColor: isDarkMode ? '#177ddc' : '#1677ff' }}
        />
      </Header>
      <Content style={{ marginTop: 64 }}>
        <Outlet />
      </Content>
    </Layout>
  );
}

export default App;
