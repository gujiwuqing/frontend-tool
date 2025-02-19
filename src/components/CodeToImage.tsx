import { useState } from 'react';
import { Button, Row, Col, Space, message, Select } from 'antd';
import { DownloadOutlined, CopyOutlined } from '@ant-design/icons';
import { MonacoEditor } from './MonacoEditor';
import html2canvas from 'html2canvas';

const themes = [
  { label: 'VS Dark', value: 'vs-dark' },
  { label: 'Light', value: 'vs-light' },
  { label: 'High Contrast', value: 'hc-black' }
];

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

export function CodeToImage() {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [theme, setTheme] = useState('vs-dark');

  const generateImage = async () => {
    try {
      if (!code.trim()) {
        message.warning('请输入需要转换的代码');
        return;
      }

      const editorElement = document.querySelector('.output-editor') as HTMLElement;
      if (!editorElement) {
        message.error('无法找到编辑器元素');
        return;
      }

      const canvas = await html2canvas(editorElement, {
        backgroundColor: theme === 'vs-dark' ? '#1e1e1e' : '#ffffff',
        scale: 2, // 提高图片质量
        useCORS: true,
        logging: false
      });

      // 将Canvas转换为图片并下载
      const link = document.createElement('a');
      link.download = `code-${Date.now()}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();

      message.success('图片生成成功');
    } catch (error) {
      message.error('图片生成失败');
      console.error(error);
    }
  };

  const copyImage = async () => {
    try {
      if (!code.trim()) {
        message.warning('没有可复制的内容');
        return;
      }

      const editorElement = document.querySelector('.output-editor') as HTMLElement;
      if (!editorElement) {
        message.error('无法找到编辑器元素');
        return;
      }

      const canvas = await html2canvas(editorElement, {
        backgroundColor: theme === 'vs-dark' ? '#1e1e1e' : '#ffffff',
        scale: 2,
        useCORS: true,
        logging: false
      });

      canvas.toBlob(async (blob) => {
        if (blob) {
          try {
            await navigator.clipboard.write([
              new ClipboardItem({ 'image/png': blob })
            ]);
            message.success('图片已复制到剪贴板');
          } catch (error) {
            message.error('复制失败，请检查浏览器权限');
            console.error(error);
          }
        }
      }, 'image/png');
    } catch (error) {
      message.error('图片生成失败');
      console.error(error);
    }
  };

  const clearAll = () => {
    setCode('');
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
            <Select
              value={theme}
              onChange={setTheme}
              options={themes}
              style={{ width: 120 }}
              placeholder="选择主题"
            />
            <Button type="primary" onClick={generateImage} size="large">
              <DownloadOutlined />
              保存图片
            </Button>
            <Button onClick={copyImage} size="large">
              <CopyOutlined />
              复制图片
            </Button>
            <Button onClick={clearAll} size="large">
              <span style={{ marginRight: '4px' }}>🗑️</span>
              清空
            </Button>
          </Space>
        </Col>
        <Col span={24}>
          <div className="output-editor" style={{ padding: '20px', borderRadius: '8px', backgroundColor: theme === 'vs-dark' ? '#1e1e1e' : '#ffffff' }}>
            <MonacoEditor
              value={code}
              onChange={(value) => setCode(value || '')}
              language={language}
              height="500px"
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                lineNumbers: 'on',
                roundedSelection: false,
                scrollBeyondLastLine: false,
                readOnly: false,
                theme: theme
              }}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
}