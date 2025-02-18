import { useState } from 'react';
import { Input, Button, Row, Col, Space, message } from 'antd';
import { marked } from 'marked';
import DOMPurify from 'dompurify';

const { TextArea } = Input;

export function HtmlToMarkdown() {
  const [inputValue, setInputValue] = useState('');
  const [outputValue, setOutputValue] = useState('');

  const convertToMarkdown = () => {
    try {
      if (!inputValue.trim()) {
        message.warning('请输入需要转换的HTML代码');
        return;
      }
      // 首先净化HTML以防止XSS攻击
      const cleanHtml = DOMPurify.sanitize(inputValue);
      // 将HTML转换为Markdown
      const markdown = marked.parse(cleanHtml, { mangle: false, headerIds: false });
      setOutputValue(markdown);
      message.success('转换成功');
    } catch (error) {
      message.error('转换失败，请检查输入的HTML格式');
    }
  };

  const clearAll = () => {
    setInputValue('');
    setOutputValue('');
    message.success('已清空');
  };

  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col span={24} style={{ marginBottom: '8px' }}>
          <Space size="middle">
            <Button type="primary" onClick={convertToMarkdown} size="large">
              <span style={{ marginRight: '4px' }}>📝</span>
              转换为Markdown
            </Button>
            <Button onClick={clearAll} size="large">
              <span style={{ marginRight: '4px' }}>🗑️</span>
              清空
            </Button>
          </Space>
        </Col>
        <Col xs={24} md={12}>
          <TextArea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="请输入HTML代码"
            style={{
              height: '500px',
              fontFamily: 'monospace',
              fontSize: '14px',
              borderRadius: '8px',
              resize: 'none',
              boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.1)'
            }}
          />
        </Col>
        <Col xs={24} md={12}>
          <TextArea
            value={outputValue}
            readOnly
            placeholder="转换后的Markdown将在这里显示"
            style={{
              height: '500px',
              fontFamily: 'monospace',
              fontSize: '14px',
              borderRadius: '8px',
              resize: 'none',
              boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.1)',
              backgroundColor: '#fafafa'
            }}
          />
        </Col>
      </Row>
    </div>
  );
}