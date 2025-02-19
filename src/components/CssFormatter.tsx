import { useState } from 'react';
import { Button, Row, Col, Space, message } from 'antd';
import { CopyOutlined, EyeOutlined } from '@ant-design/icons';
import { MonacoEditor } from './MonacoEditor';

export function CssFormatter() {
  const [inputValue, setInputValue] = useState('');
  const [outputValue, setOutputValue] = useState('');

  const formatCss = () => {
    try {
      if (!inputValue.trim()) {
        message.warning('请输入需要格式化的CSS代码');
        return;
      }
      // 基本的CSS格式化
      const formatted = inputValue
        .replace(/\s*{\s*/g, ' {\n  ') // 在左花括号后添加换行和缩进
        .replace(/;\s*/g, ';\n  ') // 在分号后添加换行和缩进
        .replace(/\s*}\s*/g, '\n}\n') // 在右花括号前后添加换行
        .replace(/\s*:\s*/g, ': ') // 在冒号后添加空格
        .replace(/\s*,\s*/g, ',\n  ') // 在逗号后添加换行和缩进
        .replace(/\n\s*\n/g, '\n') // 删除多余的空行
        .replace(/\s*!important/g, ' !important') // 确保!important前有空格
        .trim();
      setOutputValue(formatted);
      message.success('格式化成功');
    } catch (error) {
      message.error('格式化失败，请检查CSS语法');
    }
  };

  const compressCss = () => {
    try {
      if (!inputValue.trim()) {
        message.warning('请输入需要压缩的CSS代码');
        return;
      }
      // 基本的CSS压缩
      const compressed = inputValue
        .replace(/\/\*[\s\S]*?\*\//g, '') // 移除注释
        .replace(/\s+/g, ' ') // 将多个空格替换为单个空格
        .replace(/\s*([{}:;,])\s*/g, '$1') // 移除选择器、属性和值周围的空格
        .replace(/;}/g, '}') // 移除最后一个分号
        .trim();
      setOutputValue(compressed);
      message.success('压缩成功');
    } catch (error) {
      message.error('压缩失败，请检查CSS语法');
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

  const previewCss = () => {
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
              <title>CSS预览</title>
              <style>
                body { 
                  background-color: #1e1e1e;
                  color: #d4d4d4;
                  padding: 20px;
                  font-family: Consolas, Monaco, 'Courier New', monospace;
                  line-height: 1.5;
                }
                .preview-content {
                  padding: 20px;
                  border: 1px solid #d4d4d4;
                  border-radius: 4px;
                }
                pre {
                  white-space: pre-wrap;
                  margin: 0;
                }
              </style>
              <style id="preview-styles">${outputValue}</style>
            </head>
            <body>
              <div class="preview-content">
                <pre>${outputValue}</pre>
              </div>
            </body>
          </html>
        `);
        previewWindow.document.close();
      } else {
        message.error('无法打开预览窗口，请检查浏览器设置');
      }
    } catch (error) {
      message.error('预览失败，请检查CSS语法');
    }
  };

  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col span={24} style={{ marginBottom: '8px' }}>
          <Space size="middle">
            <Button type="primary" onClick={formatCss} size="large">
              <span style={{ marginRight: '4px' }}>🔧</span>
              格式化
            </Button>
            <Button onClick={compressCss} size="large">
              <span style={{ marginRight: '4px' }}>📦</span>
              压缩
            </Button>
            <Button icon={<EyeOutlined />} onClick={previewCss} size="large">
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
            language="css"
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
            language="css"
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