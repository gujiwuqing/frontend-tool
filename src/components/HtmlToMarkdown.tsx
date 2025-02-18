import { useState } from 'react';
import { Button, Row, Col, Space, message } from 'antd';
import { CopyOutlined, EyeOutlined } from '@ant-design/icons';
import TurndownService from 'turndown';
import DOMPurify from 'dompurify';
import { marked } from 'marked';
import { MonacoEditor } from './MonacoEditor';

const turndownService = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced',
  emDelimiter: '_'
});

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
      const markdown = turndownService.turndown(cleanHtml);
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

  const copyOutput = () => {
    if (!outputValue.trim()) {
      message.warning('没有可复制的内容');
      return;
    }
    navigator.clipboard.writeText(outputValue)
      .then(() => message.success('复制成功'))
      .catch(() => message.error('复制失败'));
  };

  const previewMarkdown = () => {
    try {
      if (!outputValue.trim()) {
        message.warning('没有可预览的内容');
        return;
      }
      const htmlContent = marked.parse(outputValue);
      const previewWindow = window.open('', '_blank');
      if (previewWindow) {
        previewWindow.document.write(`
          <html>
            <head>
              <title>Markdown预览</title>
              <style>
                body { 
                  background-color: #ffffff;
                  padding: 20px;
                  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                  line-height: 1.6;
                  max-width: 800px;
                  margin: 0 auto;
                }
              </style>
            </head>
            <body>${htmlContent}</body>
          </html>
        `);
        previewWindow.document.close();
      } else {
        message.error('无法打开预览窗口，请检查浏览器设置');
      }
    } catch (error) {
      message.error('预览失败，请检查Markdown格式');
    }
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
            <Button icon={<EyeOutlined />} onClick={previewMarkdown} size="large">
              预览
            </Button>
            <Button icon={<CopyOutlined />} onClick={copyOutput} size="large">
              复制
            </Button>
            <Button onClick={clearAll} size="large">
              <span style={{ marginRight: '4px' }}>🗑️</span>
              清空
            </Button>
          </Space>
        </Col>
        <Col xs={24} md={12}>
          <MonacoEditor
            value={inputValue}
            onChange={(value) => setInputValue(value || '')}
            language="html"
            height="500px"
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              lineNumbers: 'on',
              roundedSelection: false,
              scrollBeyondLastLine: false,
              readOnly: false,
              theme: 'vs-dark'
            }}
          />
        </Col>
        <Col xs={24} md={12}>
          <MonacoEditor
            value={outputValue}
            language="markdown"
            height="500px"
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              lineNumbers: 'on',
              roundedSelection: false,
              scrollBeyondLastLine: false,
              readOnly: true,
              theme: 'vs-dark'
            }}
          />
        </Col>
      </Row>
    </div>
  );
}