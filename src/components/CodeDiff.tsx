import { useState } from 'react';
import { Button, Row, Col, Space, message, Select } from 'antd';
import { DiffEditor } from '@monaco-editor/react';

const languages = [
  { label: 'JavaScript', value: 'javascript' },
  { label: 'TypeScript', value: 'typescript' },
  { label: 'HTML', value: 'html' },
  { label: 'CSS', value: 'css' },
  { label: 'JSON', value: 'json' },
  { label: 'Python', value: 'python' },
  { label: 'Java', value: 'java' },
  { label: 'C++', value: 'cpp' },
  { label: 'Go', value: 'go' },
  { label: 'Rust', value: 'rust' },
  { label: 'SQL', value: 'sql' },
  { label: 'Markdown', value: 'markdown' },
  { label: 'YAML', value: 'yaml' },
  { label: 'Shell', value: 'shell' }
];

export function CodeDiff() {
  const [originalCode, setOriginalCode] = useState('');
  const [modifiedCode, setModifiedCode] = useState('');
  const [language, setLanguage] = useState('javascript');

  const clearAll = () => {
    setOriginalCode('');
    setModifiedCode('');
    message.success('已清空');
  };

  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col span={24} style={{ marginBottom: '8px' }}>
          <Space size="middle">
            <Select
              value={language}
              onChange={setLanguage}
              options={languages}
              style={{ width: 120 }}
              placeholder="选择语言"
            />
            <Button onClick={clearAll} size="large">
              <span style={{ marginRight: '4px' }}>🗑️</span>
              清空
            </Button>
          </Space>
        </Col>
        <Col span={24}>
          <div style={{ border: '1px solid #d9d9d9', borderRadius: '8px', overflow: 'hidden' }}>
            <DiffEditor
              height="600px"
              language={language}
              original={originalCode}
              modified={modifiedCode}
              onMount={(editor) => {
                editor.getOriginalEditor().onDidChangeModelContent(() => {
                  setOriginalCode(editor.getOriginalEditor().getValue());
                });
                editor.getModifiedEditor().onDidChangeModelContent(() => {
                  setModifiedCode(editor.getModifiedEditor().getValue());
                });
              }}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                lineNumbers: 'on',
                roundedSelection: false,
                scrollBeyondLastLine: false,
                readOnly: false,
                renderSideBySide: true,
                originalEditable: true
              }}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
}