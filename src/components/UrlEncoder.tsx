import { useState } from 'react';
import { Input, Button, Row, Col, Space, message } from 'antd';

const { TextArea } = Input;

export function UrlEncoder() {
  const [inputValue, setInputValue] = useState('');
  const [outputValue, setOutputValue] = useState('');

  const encodeUrl = () => {
    try {
      if (!inputValue.trim()) {
        message.warning('请输入需要编码的URL');
        return;
      }
      const encoded = encodeURIComponent(inputValue);
      setOutputValue(encoded);
      message.success('编码成功');
    } catch (error) {
      message.error('编码失败，请检查输入内容');
    }
  };

  const decodeUrl = () => {
    try {
      if (!inputValue.trim()) {
        message.warning('请输入需要解码的URL');
        return;
      }
      const decoded = decodeURIComponent(inputValue);
      setOutputValue(decoded);
      message.success('解码成功');
    } catch (error) {
      message.error('解码失败，请确保输入的是有效的编码URL');
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
            <Button type="primary" onClick={encodeUrl}>编码</Button>
            <Button onClick={decodeUrl}>解码</Button>
            <Button onClick={clearAll}>清空</Button>
          </Space>
        </Col>
        <Col xs={24} md={12}>
          <TextArea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="请输入要转换的URL"
            style={{ height: '500px', fontFamily: 'monospace' }}
          />
        </Col>
        <Col xs={24} md={12}>
          <TextArea
            value={outputValue}
            readOnly
            placeholder="转换结果将在这里显示"
            style={{ height: '500px', fontFamily: 'monospace' }}
          />
        </Col>
      </Row>
    </div>
  );
}