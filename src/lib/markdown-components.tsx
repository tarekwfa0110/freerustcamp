/**
 * Shared ReactMarkdown component map for challenge instructions and descriptions.
 * Used by ChallengeDescription and ChallengeView to keep styling and behavior consistent.
 */

import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

export interface MarkdownCodeProps {
  className?: string;
  children?: React.ReactNode;
}

export interface MarkdownComponentsOptions {
  /** Custom code block renderer (e.g. with scroll persistence). Omit for default. */
  code?: React.ComponentType<MarkdownCodeProps & Record<string, unknown>>;
  /** Inline/code block class names. */
  codeInlineClassName?: string;
  codeBlockWrapperClassName?: string;
}

const defaultCodeInlineClassName =
  'inline font-mono bg-amber-950/60 text-amber-100 px-1.5 py-0.5 rounded text-sm font-semibold border border-amber-900/50';
const defaultCodeBlockWrapperClassName = 'bg-metal-900 border border-metal-700 rounded-lg p-4 my-4';

function defaultCodeComponent(props: MarkdownCodeProps) {
  const { className, children, ...rest } = props;
  const match = /language-(\w+)/.exec(className || '');
  const language = match ? match[1] : '';
  const inline = !className || !match;

  if (inline || !language) {
    return (
      <code
        className={defaultCodeInlineClassName}
        style={{ display: 'inline' }}
        {...rest}
      >
        {children}
      </code>
    );
  }

  return (
    <div className={defaultCodeBlockWrapperClassName}>
      <SyntaxHighlighter
        language={language}
        style={oneDark as Record<string, React.CSSProperties>}
        PreTag="div"
      >
        {String(children).replace(/\n$/, '')}
      </SyntaxHighlighter>
    </div>
  );
}

interface ChildProps {
  children?: React.ReactNode;
}

export function getMarkdownComponents(options: MarkdownComponentsOptions = {}): Record<string, React.ComponentType<Record<string, unknown>>> {
  const { code: customCode } = options;

  const codeComponent = customCode ?? defaultCodeComponent;

  return {
    p: ({ children }: ChildProps) => <p className="mb-4 last:mb-0">{children}</p>,
    strong: ({ children }: ChildProps) => <strong className="font-bold">{children}</strong>,
    code: codeComponent as React.ComponentType<Record<string, unknown>>,
    pre: ({ children }: ChildProps) => <>{children}</>,
    ul: ({ children }: ChildProps) => <ul className="list-disc mb-4 space-y-1 pl-6">{children}</ul>,
    ol: ({ children }: ChildProps) => <ol className="list-decimal mb-4 space-y-1 pl-6">{children}</ol>,
    li: ({ children }: ChildProps) => <li className="mb-1">{children}</li>,
    h1: ({ children }: ChildProps) => <h1 className="text-2xl font-bold mb-4 mt-6 first:mt-0">{children}</h1>,
    h2: ({ children }: ChildProps) => <h2 className="text-xl font-bold mb-3 mt-5 first:mt-0">{children}</h2>,
    h3: ({ children }: ChildProps) => <h3 className="text-lg font-bold mb-2 mt-4 first:mt-0">{children}</h3>,
    blockquote: ({ children }: ChildProps) => (
      <blockquote className="border-l-4 border-rust-500 pl-4 italic my-4 text-muted-foreground">
        {children}
      </blockquote>
    ),
    table: ({ children }: ChildProps) => (
      <div className="my-6 overflow-x-auto">
        <table className="w-full border-collapse border border-metal-700 rounded-lg">
          {children}
        </table>
      </div>
    ),
    thead: ({ children }: ChildProps) => (
      <thead className="bg-metal-700/50">{children}</thead>
    ),
    tbody: ({ children }: ChildProps) => (
      <tbody className="bg-metal-800/30">{children}</tbody>
    ),
    tr: ({ children }: ChildProps) => (
      <tr className="border-b border-metal-700/50">{children}</tr>
    ),
    th: ({ children }: ChildProps) => (
      <th className="px-4 py-3 text-left font-semibold text-foreground border-r border-metal-700/50 last:border-r-0">
        {children}
      </th>
    ),
    td: ({ children }: ChildProps) => (
      <td className="px-4 py-3 text-foreground border-r border-metal-700/50 last:border-r-0">
        {children}
      </td>
    ),
  };
}

/** For ChallengeView step content: adds link styling; optional custom code (e.g. with scroll persistence). */
export function getMarkdownComponentsWithLink(
  options?: Pick<MarkdownComponentsOptions, 'code'>
): Record<string, React.ComponentType<Record<string, unknown>>> {
  const base = getMarkdownComponents(options);
  return {
    ...base,
    a: ({ href, children }: { href?: string; children?: React.ReactNode }) => (
      <a
        href={href}
        className="inline font-mono bg-metal-800/50 text-foreground px-1 py-0.5 rounded-sm text-sm border border-metal-700/50 break-all"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),
  };
}
