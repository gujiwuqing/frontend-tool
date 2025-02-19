import { useState, useEffect } from 'react';
import { Button, Row, Col, Space, message, Input, Switch } from 'antd';
import { MonacoEditor } from './MonacoEditor';

interface MatchResult {
  line?: number;
  index: number;
  match: string;
  groups: string[];
}

export function RegexTester() {
  const [pattern, setPattern] = useState('');
  const [flags, setFlags] = useState('g');
  const [testText, setTestText] = useState('');
  const [result, setResult] = useState('');
  const [isMultiline, setIsMultiline] = useState(false);

  useEffect(() => {
    testRegex();
  }, [pattern, flags, testText]);

  const testRegex = () => {
    try {
      if (!pattern.trim()) {
        setResult('');
        return;
      }

      const regex = new RegExp(pattern, flags);
      const matches: MatchResult[] = [];
      let match;

      // 处理多行模式
      if (isMultiline) {
        const lines = testText.split('\n');
        lines.forEach((line, lineIndex) => {
          const lineMatches: MatchResult[] = [];
          while ((match = regex.exec(line)) !== null) {
            lineMatches.push({
              line: lineIndex + 1,
              index: match.index,
              match: match[0],
              groups: match.slice(1)
            });
            if (!flags.includes('g')) break;
          }
          if (lineMatches.length > 0) {
            matches.push(...lineMatches);
          }
        });
      } else {
        while ((match = regex.exec(testText)) !== null) {
          matches.push({
            index: match.index,
            match: match[0],
            groups: match.slice(1)
          });
          if (!flags.includes('g')) break;
        }
      }

      if (matches.length === 0) {
        setResult('无匹配结果');
        return;
      }

      const resultText = matches.map((m, i) => {
        const groups = m.groups.length > 0
          ? `\n  捕获组: ${m.groups.map((g, i) => `${i + 1}: ${g}`).join(', ')}`
          : '';
        return `匹配项 ${i + 1}:\n  位置: ${m.line ? `第${m.line}行, ` : ''}索引${m.index}\n  内容: ${m.match}${groups}`;
      }).join('\n\n');

      setResult(resultText);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setResult(`正则表达式错误: ${error.message}`);
      } else {
        setResult('正则表达式错误: 未知错误');
      }
    }
  };

  const clearAll = () => {
    setPattern('');
    setFlags('g');
    setTestText('');
    setResult('');
    message.success('已清空');
  };

  const copyResult = () => {
    if (!result) {
      message.warning('没有可复制的内容');
      return;
    }
    navigator.clipboard.writeText(result)
      .then(() => message.success('复制成功'))
      .catch(() => message.error('复制失败'));
  };

  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Space size="middle" style={{ marginBottom: '16px' }}>
            <Input
              addonBefore="/"
              addonAfter={"/" + flags}
              placeholder="输入正则表达式"
              value={pattern}
              onChange={(e) => setPattern(e.target.value)}
              style={{ width: '400px' }}
            />
            <Space>
              <Switch
                checked={flags.includes('g')}
                onChange={(checked) => setFlags(f => checked ? f + 'g' : f.replace('g', ''))}
                checkedChildren="g"
                unCheckedChildren="g"
              />
              <Switch
                checked={flags.includes('i')}
                onChange={(checked) => setFlags(f => checked ? f + 'i' : f.replace('i', ''))}
                checkedChildren="i"
                unCheckedChildren="i"
              />
              <Switch
                checked={flags.includes('m')}
                onChange={(checked) => setFlags(f => checked ? f + 'm' : f.replace('m', ''))}
                checkedChildren="m"
                unCheckedChildren="m"
              />
              <Switch
                checked={isMultiline}
                onChange={setIsMultiline}
                checkedChildren="多行"
                unCheckedChildren="单行"
              />
            </Space>
            <Button onClick={clearAll}>清空</Button>
            <Button onClick={copyResult}>复制结果</Button>
          </Space>
        </Col>
        <Col xs={24} md={12}>
          <MonacoEditor
            value={testText}
            onChange={(value) => setTestText(value || '')}
            language="plaintext"
            height="500px"
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              lineNumbers: 'on',
              roundedSelection: false,
              scrollBeyondLastLine: false,
              readOnly: false,
              theme: 'vs-light'
            }}
          />
        </Col>
        <Col xs={24} md={12}>
          <MonacoEditor
            value={result}
            language="plaintext"
            height="500px"
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              lineNumbers: 'on',
              roundedSelection: false,
              scrollBeyondLastLine: false,
              readOnly: true,
              theme: 'vs-light'
            }}
          />
        </Col>
      </Row>
    </div>
  );
}