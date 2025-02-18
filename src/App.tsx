import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import './App.css';

const { Content } = Layout;

function App() {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Content>
        <Outlet />
      </Content>
    </Layout>
  );
}

export default App
