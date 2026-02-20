import React, { useState, useCallback } from 'react';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import js from 'react-syntax-highlighter/dist/esm/languages/hljs/javascript';
import json from 'react-syntax-highlighter/dist/esm/languages/hljs/json';
import css from 'react-syntax-highlighter/dist/esm/languages/hljs/css';
import bash from 'react-syntax-highlighter/dist/esm/languages/hljs/bash';
import { a11yLight } from 'react-syntax-highlighter/dist/esm/styles/hljs';

SyntaxHighlighter.registerLanguage('javascript', js);
SyntaxHighlighter.registerLanguage('js', js);
SyntaxHighlighter.registerLanguage('json', json);
SyntaxHighlighter.registerLanguage('css', css);
SyntaxHighlighter.registerLanguage('bash', bash);
SyntaxHighlighter.registerLanguage('shell', bash);

const customStyle = {
  background: 'transparent',
  padding: '20px 24px',
  margin: 0,
  fontSize: '0.875rem',
  lineHeight: '1.6',
  fontFamily: "'JetBrains Mono', 'Courier New', monospace",
};

export default function CodeBlock({ className, children }) {
  const [copied, setCopied] = useState(false);
  const code = String(children).replace(/\n$/, '');
  const match = /language-(\w+)/.exec(className || '');
  const language = match ? match[1] : '';

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [code]);

  return (
    <div className="code-block-wrapper">
      <div className="code-block-header">
        {language && <span className="code-block-language">{language}</span>}
        <button
          className={`code-block-copy${copied ? ' copied' : ''}`}
          onClick={handleCopy}
        >
          {copied ? 'Copied ✓' : 'Copy'}
        </button>
      </div>
      <SyntaxHighlighter
        language={language || 'plaintext'}
        style={a11yLight}
        customStyle={customStyle}
        codeTagProps={{
          style: {
            fontFamily: "'JetBrains Mono', 'Courier New', monospace",
            fontSize: '0.875rem',
          },
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}
