import { useParams, useNavigate } from 'react-router-dom';
import { Card, Layout, Menu } from 'antd';
import { JsonFormatter } from '../components/JsonFormatter';
import { Base64Converter } from '../components/Base64Converter';
import { UrlEncoder } from '../components/UrlEncoder';
import { HtmlToMarkdown } from '../components/HtmlToMarkdown';
import { JsonToTypeScript } from '../components/JsonToTypeScript';
import { MarkdownToHtml } from '../components/MarkdownToHtml';

interface ToolDetailProps extends Record<string, string | undefined> {
  id: string;
}

const tools = [
  {
    id: 'json-formatter',
    name: 'JSON 格式化工具',
    icon: '🔧',
  },
  {
    id: 'base64',
    name: 'Base64 转换器',
    icon: '🔄',
  },
  {
    id: 'url-encoder',
    name: 'URL 编解码器',
    icon: '🔗',
  },
  {
    id: 'html-to-markdown',
    name: 'HTML转Markdown',
    icon: '📝',
  },
  {
    id: 'json-to-typescript',
    name: 'JSON转TypeScript',
    icon: '📋',
  },
  {
    id: 'markdown-to-html',
    name: 'Markdown转HTML',
    icon: '📄',
  },
];

export function ToolDetail() {
  const { id } = useParams<ToolDetailProps>();
  const navigate = useNavigate();

  const renderToolContent = () => {
    switch (id) {
      case 'json-formatter':
        return <JsonFormatter />;
      case 'base64':
        return <Base64Converter />;
      case 'url-encoder':
        return <UrlEncoder />;
      case 'html-to-markdown':
        return <HtmlToMarkdown />;
      case 'json-to-typescript':
        return <JsonToTypeScript />;
      case 'markdown-to-html':
        return <MarkdownToHtml />;
      default:
        return <div>未找到该工具</div>;
    }
  };

  return (
    <Layout style={{ minHeight: '100vh', background: 'var(--bg-color)' }}>
      <Layout.Sider 
        theme="light" 
        width={240} 
        style={{ 
          padding: '24px 0',
          borderRight: '1px solid var(--border-color)',
          boxShadow: 'var(--card-shadow)',
          background: 'var(--bg-color)',
          position: 'fixed',
          height: '100vh',
          left: 0,
          top: 0,
          zIndex: 100
        }}
      >
        <div style={{ 
          padding: '0 24px 20px', 
          borderBottom: '1px solid var(--border-color)',
          marginBottom: '16px',
          fontSize: '20px',
          fontWeight: 600,
          color: 'var(--text-color)'
        }}>
          工具列表
        </div>
        <Menu
          mode="inline"
          selectedKeys={[id || '']}
          style={{ 
            height: 'calc(100vh - 80px)',
            border: 'none',
            padding: '0 12px'
          }}
          className="tool-menu"
          items={tools.map((tool) => ({
            key: tool.id,
            icon: <span style={{ 
              fontSize: '16px',
              marginRight: '8px',
              opacity: 0.85,
              transition: 'opacity 0.3s'
            }}>{tool.icon}</span>,
            label: <span style={{ 
              fontSize: '14px',
              color: 'var(--text-color)',
              transition: 'color 0.3s'
            }}>{tool.name}</span>,
            style: {
              margin: '4px 0',
              borderRadius: '8px',
              transition: 'all 0.3s ease'
            },
            onClick: () => navigate(`/tool/${tool.id}`)
          }))}
        />
      </Layout.Sider>
      <Layout.Content style={{ 
        padding: '32px 32px 32px 272px',
        background: 'var(--bg-color)',
        minHeight: '100vh'
      }}>
        <Card
          style={{ 
            borderRadius: '12px',
            boxShadow: 'var(--card-shadow)',
            border: 'none',
            transition: 'box-shadow 0.3s ease'
          }}
          bodyStyle={{ 
            padding: '32px',
            minHeight: '600px'
          }}
          hoverable
        >
          {renderToolContent()}
        </Card>
      </Layout.Content>
    </Layout>
  );
}