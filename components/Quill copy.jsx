import { useEffect, useState } from 'react';
import { useQuill } from 'react-quilljs';

export const Quill = () => {
  const { quill, quillRef } = useQuill();
  const [content, setContent] = useState('');

  useEffect(() => {
    if (quill) {
      quill.on('text-change', () => {
        setContent(quill.root.innerHTML);
      });
    }
  }, [quill]);

  // add inital value to quill
  useEffect(() => {
    if (quill) {
      quill.root.innerHTML = content;
    }
  }, [quill]);

  return (
    <div ref={quillRef}></div>
  );
};