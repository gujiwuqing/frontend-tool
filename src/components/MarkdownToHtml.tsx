import { useState } from 'react';
import { Input, Button, Row, Col, Space, message } from 'antd';
import { CopyOutlined, EyeOutlined } from '@ant-design/icons';
import { marked } from 'marked';

const { TextArea } = Input;

export function MarkdownToHtml() {
  const [inputValue, setInputValue] = useState('');
  const [outputValue, setOutputValue] = useState('');

  const convertToHtml = () => {
    try {
      if (!inputValue.trim()) {
        message.warning('请输入需要转换的Markdown内容');
        return;
      }
      const html = marked.parse(inputValue) as string;
      setOutputValue(html);
      message.success('转换成功');
    } catch (error) {
      message.error('转换失败，请检查输入的Markdown格式');
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

  const previewHtml = () => {
    try {
      if (!outputValue.trim()) {
        message.warning('没有可预览的内容');
        return;
      }
      const previewWindow = window.open('', '_blank');
      if (previewWindow) {
        previewWindow.document.write(`
          <html>
            <head>
              <title>HTML预览</title>
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
            <body>${outputValue}</body>
          </html>
        `);
        previewWindow.document.close();
      } else {
        message.error('无法打开预览窗口，请检查浏览器设置');
      }
    } catch (error) {
      message.error('预览失败，请检查HTML格式');
    }
  };

  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Space>
            <Button type="primary" onClick={convertToHtml}>转换为HTML</Button>
            <Button icon={<EyeOutlined />} onClick={previewHtml}>预览</Button>
            <Button icon={<CopyOutlined />} onClick={copyOutput}>复制</Button>
            <Button onClick={clearAll}>清空</Button>
          </Space>
        </Col>
        <Col xs={24} md={12}>
          <TextArea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="请输入Markdown内容"
            style={{ height: '500px', fontFamily: 'monospace' }}
          />
        </Col>
        <Col xs={24} md={12}>
          <div
            dangerouslySetInnerHTML={{ __html: outputValue }}
            style={{
              height: '500px',
              overflow: 'auto',
              padding: '12px',
              border: '1px solid #d9d9d9',
              borderRadius: '6px',
              backgroundColor: '#fff'
            }}
          />
        </Col>
      </Row>
    </div>
  );
}