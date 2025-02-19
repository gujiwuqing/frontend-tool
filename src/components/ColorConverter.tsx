import { useState, useEffect } from 'react';
import { Input, Button, Row, Col, Space, message, Radio } from 'antd';
import type { RadioChangeEvent } from 'antd';

type ColorFormat = 'hex' | 'rgb' | 'hsl';

export function ColorConverter() {
  const [inputValue, setInputValue] = useState('');
  const [outputValue, setOutputValue] = useState('');
  const [fromFormat, setFromFormat] = useState<ColorFormat>('hex');
  const [toFormat, setToFormat] = useState<ColorFormat>('rgb');
  const [previewColor, setPreviewColor] = useState('#ffffff');

  // 将十六进制颜色转换为RGB
  const hexToRgb = (hex: string): number[] | null => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? [
          parseInt(result[1], 16),
          parseInt(result[2], 16),
          parseInt(result[3], 16)
        ]
      : null;
  };

  // 将RGB转换为十六进制颜色
  const rgbToHex = (r: number, g: number, b: number): string => {
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
  };

  // 将RGB转换为HSL
  const rgbToHsl = (r: number, g: number, b: number): number[] => {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0, s, l = (max + min) / 2;

    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }

      h /= 6;
    }

    return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
  };

  // 将HSL转换为RGB
  const hslToRgb = (h: number, s: number, l: number): number[] => {
    h /= 360;
    s /= 100;
    l /= 100;

    let r, g, b;

    if (s === 0) {
      r = g = b = l;
    } else {
      const hue2rgb = (p: number, q: number, t: number) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1/6) return p + (q - p) * 6 * t;
        if (t < 1/2) return q;
        if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
        return p;
      };

      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;

      r = hue2rgb(p, q, h + 1/3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1/3);
    }

    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
  };

  // 解析RGB字符串
  const parseRgb = (rgb: string): number[] | null => {
    const match = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    return match ? [Number(match[1]), Number(match[2]), Number(match[3])] : null;
  };

  // 解析HSL字符串
  const parseHsl = (hsl: string): number[] | null => {
    const match = hsl.match(/^hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)$/);
    return match ? [Number(match[1]), Number(match[2]), Number(match[3])] : null;
  };

  const convertColor = () => {
    try {
      if (!inputValue.trim()) {
        message.warning('请输入需要转换的颜色值');
        return;
      }

      let result = '';
      let previewHex = '';

      if (fromFormat === 'hex' && inputValue.match(/^#?[0-9A-Fa-f]{6}$/)) {
        const rgb = hexToRgb(inputValue);
        if (rgb) {
          if (toFormat === 'rgb') {
            result = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
          } else if (toFormat === 'hsl') {
            const hsl = rgbToHsl(rgb[0], rgb[1], rgb[2]);
            result = `hsl(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%)`;
          }
          previewHex = inputValue.startsWith('#') ? inputValue : `#${inputValue}`;
        }
      } else if (fromFormat === 'rgb') {
        const rgb = parseRgb(inputValue);
        if (rgb) {
          if (toFormat === 'hex') {
            result = rgbToHex(rgb[0], rgb[1], rgb[2]);
          } else if (toFormat === 'hsl') {
            const hsl = rgbToHsl(rgb[0], rgb[1], rgb[2]);
            result = `hsl(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%)`;
          }
          previewHex = rgbToHex(rgb[0], rgb[1], rgb[2]);
        }
      } else if (fromFormat === 'hsl') {
        const hsl = parseHsl(inputValue);
        if (hsl) {
          const rgb = hslToRgb(hsl[0], hsl[1], hsl[2]);
          if (toFormat === 'hex') {
            result = rgbToHex(rgb[0], rgb[1], rgb[2]);
          } else if (toFormat === 'rgb') {
            result = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
          }
          previewHex = rgbToHex(rgb[0], rgb[1], rgb[2]);
        }
      }

      if (result) {
        setOutputValue(result);
        setPreviewColor(previewHex);
        message.success('转换成功');
      } else {
        message.error('无效的颜色格式');
      }
    } catch (error) {
      message.error('转换失败，请检查输入格式');
    }
  };

  const clearAll = () => {
    setInputValue('');
    setOutputValue('');
    setPreviewColor('#ffffff');
    message.success('已清空');
  };

  const copyOutput = () => {
    if (!outputValue) {
      message.warning('没有可复制的内容');
      return;
    }
    navigator.clipboard.writeText(outputValue)
      .then(() => message.success('复制成功'))
      .catch(() => message.error('复制失败'));
  };

  useEffect(() => {
    if (fromFormat === toFormat) {
      setToFormat(fromFormat === 'hex' ? 'rgb' : 'hex');
    }
  }, [fromFormat]);

  const handleFromFormatChange = (e: RadioChangeEvent) => {
    setFromFormat(e.target.value);
    setInputValue('');
  };

  const handleToFormatChange = (e: RadioChangeEvent) => {
    setToFormat(e.target.value);
    setOutputValue('');
  };

  const getPlaceholder = (format: ColorFormat) => {
    switch (format) {
      case 'hex':
        return '#ffffff 或 ffffff';
      case 'rgb':
        return 'rgb(255, 255, 255)';
      case 'hsl':
        return 'hsl(0, 100%, 100%)';
    }
  };

  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Space size="large" style={{ marginBottom: '16px' }}>
            <div>
              <span style={{ marginRight: '8px' }}>从：</span>
              <Radio.Group value={fromFormat} onChange={handleFromFormatChange}>
                <Radio.Button value="hex">HEX</Radio.Button>
                <Radio.Button value="rgb">RGB</Radio.Button>
                <Radio.Button value="hsl">HSL</Radio.Button>
              </Radio.Group>
            </div>
            <div>
              <span style={{ marginRight: '8px' }}>到：</span>
              <Radio.Group value={toFormat} onChange={handleToFormatChange}>
                <Radio.Button value="hex">HEX</Radio.Button>
                <Radio.Button value="rgb">RGB</Radio.Button>
                <Radio.Button value="hsl">HSL</Radio.Button>
              </Radio.Group>
            </div>
          </Space>
        </Col>
        <Col span={24}>
          <Space>
            <Button type="primary" onClick={convertColor}>转换</Button>
            <Button onClick={copyOutput}>复制</Button>
            <Button onClick={clearAll}>清空</Button>
          </Space>
        </Col>
        <Col xs={24} md={8}>
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={getPlaceholder(fromFormat)}
            style={{ fontFamily: 'monospace' }}
          />
        </Col>
        <Col xs={24} md={8}>
          <Input
            value={outputValue}
            readOnly
            placeholder="转换结果"
            style={{ fontFamily: 'monospace' }}
          />
        </Col>
        <Col xs={24} md={8}>
          <div
            style={{
              width: '100%',
              height: '32px',
              backgroundColor: previewColor,
              border: '1px solid #d9d9d9',
              borderRadius: '6px'
            }}
          />
        </Col>
      </Row>
    </div>
  );
}