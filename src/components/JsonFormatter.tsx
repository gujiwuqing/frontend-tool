import { useState } from 'react';
import { Input, Button, Row, Col, Space, message } from 'antd';
import { CopyOutlined, EyeOutlined } from '@ant-design/icons';

const { TextArea } = Input;

export function JsonFormatter() {
  const [inputValue, setInputValue] = useState('');
  const [outputValue, setOutputValue] = useState('');

  const formatJson = () => {
    try {
      if (!inputValue.trim()) {
        message.warning('请输入需要格式化的JSON字符串');
        return;
      }
      const parsedJson = JSON.parse(inputValue);
      setOutputValue(JSON.stringify(parsedJson, null, 2));
      message.success('格式化成功');
    } catch (error) {
      message.error('无效的JSON格式');
    }
  };

  const compressJson = () => {
    try {
      if (!inputValue.trim()) {
        message.warning('请输入需要压缩的JSON字符串');
        return;
      }
      const parsedJson = JSON.parse(inputValue);
      setOutputValue(JSON.stringify(parsedJson));
      message.success('压缩成功');
    } catch (error) {
      message.error('无效的JSON格式');
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

  const previewJson = () => {
    try {
      if (!outputValue.trim()) {
        message.warning('没有可预览的内容');
        return;
      }
      // 尝试解析JSON以确保格式正确
      JSON.parse(outputValue);
      // 在新窗口中打开预览
      const previewWindow = window.open('', '_blank');
      if (previewWindow) {
        previewWindow.document.write(`
          <html>
            <head>
              <title>JSON预览</title>
              <style>
                body { 
                  background-color: #f0f0f0;
                  padding: 20px;
                  font-family: monospace;
                  white-space: pre-wrap;
                  word-wrap: break-word;
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
      message.error('预览失败，JSON格式无效');
    }
  };

  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Space>
            <Button type="primary" onClick={formatJson}>格式化</Button>
            <Button onClick={compressJson}>压缩</Button>
            <Button icon={<EyeOutlined />} onClick={previewJson}>预览</Button>
            <Button icon={<CopyOutlined />} onClick={copyOutput}>复制</Button>
            <Button onClick={clearAll}>清空</Button>
          </Space>
        </Col>
        <Col xs={24} md={12}>
          <TextArea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="请输入JSON字符串"
            style={{ height: '500px', fontFamily: 'monospace' }}
          />
        </Col>
        <Col xs={24} md={12}>
          <TextArea
            value={outputValue}
            readOnly
            placeholder="格式化结果将在这里显示"
            style={{ height: '500px', fontFamily: 'monospace' }}
          />
        </Col>
      </Row>
    </div>
  );
}