import React from 'react';
import MDEditor from '@uiw/react-md-editor';

const MarkdownEditor = ({ content, setContent }: { content: string; setContent: (content: string) => void }) => {
  return (
    <div className="container" data-color-mode="light">
      <MDEditor
        value={content}
        onChange={(val) => setContent(val || '')}
        preview="edit"
        height="80vh"
        visibleDragbar={false}
      />
    </div>
  );
};

export default MarkdownEditor; 