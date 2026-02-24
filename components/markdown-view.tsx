import ReactMarkdown from 'react-markdown';

export function MarkdownView({ content }: { content: string }) {
  return <article className="prose-md max-w-none"><ReactMarkdown>{content}</ReactMarkdown></article>;
}
