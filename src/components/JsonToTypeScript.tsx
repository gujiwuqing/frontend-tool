import { useState } from 'react';
import { Input, Button, Row, Col, Space, message } from 'antd';

const { TextArea } = Input;

interface JsonToTypeOptions {
  rootInterfaceName?: string;
}

function generateTypeScriptInterface(obj: any, options: JsonToTypeOptions = {}): string {
  const rootName = options.rootInterfaceName || 'RootObject';

  function getType(value: any): string {
    if (value === null) return 'null';
    if (Array.isArray(value)) {
      const itemType = value.length > 0 ? getType(value[0]) : 'any';
      return `${itemType}[]`;
    }
    if (typeof value === 'object') {
      return generateInterface(value, '');
    }
    return typeof value;
  }

  function generateInterface(obj: any, indent: string): string {
    const properties = Object.entries(obj).map(([key, value]) => {
      const type = getType(value);
      return `${indent}  ${key}: ${type};`;
    });

    return `{
${properties.join('\n')}
${indent}}`;
  }

  return `interface ${rootName} ${generateInterface(obj, '')}`;
}

export function JsonToTypeScript() {
  const [inputValue, setInputValue] = useState('');
  const [outputValue, setOutputValue] = useState('');

  const convertToTypeScript = () => {
    try {
      if (!inputValue.trim()) {
        message.warning('请输入需要转换的JSON数据');
        return;
      }
      const jsonData = JSON.parse(inputValue);
      const typeScript = generateTypeScriptInterface(jsonData);
      setOutputValue(typeScript);
      message.success('转换成功');
    } catch (error) {
      message.error('转换失败，请检查输入的JSON格式');
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
            <Button type="primary" onClick={convertToTypeScript}>转换为TypeScript</Button>
            <Button onClick={clearAll}>清空</Button>
          </Space>
        </Col>
        <Col xs={24} md={12}>
          <TextArea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="请输入JSON数据"
            style={{ height: '500px', fontFamily: 'monospace' }}
          />
        </Col>
        <Col xs={24} md={12}>
          <TextArea
            value={outputValue}
            readOnly
            placeholder="转换后的TypeScript接口将在这里显示"
            style={{ height: '500px', fontFamily: 'monospace' }}
          />
        </Col>
      </Row>
    </div>
  );
}