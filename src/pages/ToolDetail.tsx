import { useParams, useNavigate } from 'react-router-dom';
import { Card, Layout, Menu } from 'antd';
import { JsonFormatter } from '../components/JsonFormatter';
import { Base64Converter } from '../components/Base64Converter';
import { UrlEncoder } from '../components/UrlEncoder';
import { HtmlToMarkdown } from '../components/HtmlToMarkdown';
import { JsonToTypeScript } from '../components/JsonToTypeScript';
import { MarkdownToHtml } from '../components/MarkdownToHtml';
import { JavaScriptFormatter } from '../components/JavaScriptFormatter';
import { CssFormatter } from '../components/CssFormatter';
import { RegexTester } from '../components/RegexTester';
import { CodeToImage } from '../components/CodeToImage';
import { ColorConverter } from '../components/ColorConverter';
import { CodeDiff } from '../components/CodeDiff';

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
  {
    id: 'javascript-formatter',
    name: 'JavaScript 格式化工具',
    icon: '📦',
  },
  {
    id: 'css-formatter',
    name: 'CSS 格式化工具',
    icon: '🎨',
  },
  {
    id: 'regex-tester',
    name: '正则表达式测试工具',
    icon: '🔍',
  },
  {
    id: 'code-to-image',
    name: '代码转图片工具',
    icon: '📸',
  },
  {
    id: 'color-converter',
    name: '颜色格式转换器',
    icon: '🎨',
  },
  {
    id: 'code-diff',
    name: '代码对比工具',
    icon: '🔄',
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
      case 'javascript-formatter':
        return <JavaScriptFormatter />;
      case 'css-formatter':
        return <CssFormatter />;
      case 'regex-tester':
        return <RegexTester />;
      case 'code-to-image':
        return <CodeToImage />;
      case 'color-converter':
        return <ColorConverter />;
      case 'code-diff':
        return <CodeDiff />;
      default:
        return <div>未找到该工具</div>;
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Layout.Sider 
        theme="light" 
        width={240} 
        style={{ 
          padding: '24px 0',
          borderRight: '1px solid var(--border-color)',
          boxShadow: 'var(--card-shadow)',
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
        <div 
          style={{ 
            padding: '0 16px',
            marginBottom: '16px',
            fontSize: '18px',
            fontWeight: 'bold',
            color: '#1890ff',
            cursor: 'pointer',
            transition: 'opacity 0.3s ease'
          }}
          onClick={() => navigate('/')}
          onMouseEnter={(e) => e.currentTarget.style.opacity = '0.8'}
          onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
        >
          开发工具箱
        </div>
        <Menu
          mode="inline"
          selectedKeys={[id || '']}
          style={{ border: 'none' }}
          onClick={({ key }) => navigate(`/tool/${key}`)}
          items={tools.map(tool => ({
            key: tool.id,
            icon: <span>{tool.icon}</span>,
            label: tool.name
          }))}
        />
      </Layout.Sider>
      <Layout style={{ marginLeft: 240, padding: '24px', background: '#fff' }}>
        <Card bordered={false}>
          {renderToolContent()}
        </Card>
      </Layout>
    </Layout>
  );
}