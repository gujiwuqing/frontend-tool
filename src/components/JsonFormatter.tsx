import { useState } from 'react';
import { Input, Button, Row, Col, Space, message } from 'antd';

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

  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Space>
            <Button type="primary" onClick={formatJson}>格式化</Button>
            <Button onClick={compressJson}>压缩</Button>
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