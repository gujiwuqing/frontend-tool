import { Card, Row, Col } from 'antd';
import { Link } from 'react-router-dom';

interface Tool {
  id: string;
  name: string;
  description: string;
  icon: string;
}

const tools: Tool[] = [
  {
    id: 'json-formatter',
    name: 'JSON 格式化工具',
    description: '格式化和验证 JSON 数据，支持压缩和美化功能',
    icon: '🔧',
  },
  {
    id: 'base64',
    name: 'Base64 转换器',
    description: '在文本和 Base64 编码之间进行转换',
    icon: '🔄',
  },
  {
    id: 'url-encoder',
    name: 'URL 编解码器',
    description: '对 URL 进行编码和解码操作',
    icon: '🔗',
  },
  {
    id: 'html-to-markdown',
    name: 'HTML转Markdown',
    description: '将HTML代码转换为Markdown格式',
    icon: '📝',
  },
  {
    id: 'json-to-typescript',
    name: 'JSON转TypeScript',
    description: '将JSON数据转换为TypeScript接口定义',
    icon: '📋',
  },
  {
    id: 'markdown-to-html',
    name: 'Markdown转HTML',
    description: '将Markdown内容转换为HTML格式',
    icon: '📄',
  },
];

export function ToolList() {
  return (
    <div style={{ padding: '32px', background: '#f5f5f5', minHeight: '100vh' }}>
      <h1 style={{ 
        marginBottom: '32px', 
        fontSize: '28px',
        fontWeight: 500,
        color: '#262626'
      }}>前端工具箱</h1>
      <Row gutter={[24, 24]}>
        {tools.map((tool) => (
          <Col key={tool.id} xs={24} sm={12} md={8} lg={6}>
            <Link to={`/tool/${tool.id}`} style={{ textDecoration: 'none' }}>
              <Card
                hoverable
                style={{
                  height: '100%',
                  borderRadius: '12px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                  transition: 'all 0.3s ease'
                }}
                title={
                  <span style={{ 
                    fontSize: '16px',
                    fontWeight: 500,
                    color: '#262626'
                  }}>
                    <span style={{ 
                      fontSize: '20px',
                      marginRight: '8px',
                      opacity: 0.8
                    }}>{tool.icon}</span>
                    {tool.name}
                  </span>
                }
              >
                <div style={{ 
                  color: '#595959',
                  fontSize: '14px',
                  lineHeight: '1.5'
                }}>
                  {tool.description}
                </div>
              </Card>
            </Link>
          </Col>
        ))}  
      </Row>
    </div>
  );
}