import { useState } from 'react';
import { Input, Button, Row, Col, Space, message } from 'antd';
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

  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Space>
            <Button type="primary" onClick={convertToHtml}>转换为HTML</Button>
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