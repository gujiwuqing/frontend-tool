import { useEffect, useRef } from 'react';
import Editor, { EditorProps } from '@monaco-editor/react';

interface MonacoEditorProps extends Omit<EditorProps, 'theme'> {
  value: string;
  language?: string;
  height?: string | number;
  readOnly?: boolean;
}

export function MonacoEditor({
  value,
  onChange,
  language = 'plaintext',
  height = '500px',
  readOnly = false,
  ...props
}: MonacoEditorProps) {
  const editorRef = useRef(null);
  // 使用固定的暗色主题
  const editorTheme = 'vs-dark';

  const handleEditorDidMount = (editor: any) => {
    editorRef.current = editor;
    editor.updateOptions({
      minimap: { enabled: false },
      scrollBeyondLastLine: false,
      fontFamily: 'monospace',
      fontSize: 14,
      lineNumbers: 'on',
      roundedSelection: true,
      scrollbar: {
        vertical: 'visible',
        horizontal: 'visible',
        useShadows: false,
        verticalScrollbarSize: 10,
        horizontalScrollbarSize: 10
      },
      padding: { top: 16, bottom: 16 },
    });
  };

  useEffect(() => {
    return () => {
      editorRef.current = null;
    };
  }, []);

  return (
    <Editor
      height={height}
      language={language}
      theme={editorTheme}
      value={value}
      onChange={onChange as any}
      options={{
        readOnly,
        automaticLayout: true,
        wordWrap: 'on',
      }}
      onMount={handleEditorDidMount}
      {...props}
    />
  );
}