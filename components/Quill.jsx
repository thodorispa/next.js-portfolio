import { useEffect, useState } from 'react';
import { useQuill } from 'react-quilljs';

export const Quill = ({ content, setContent, id }) => {
  const { quill, quillRef } = useQuill();

  useEffect(() => {
    if (quill) {
      quill.on('text-change', () => {
        setContent(quill.root.innerHTML);
      });
    }
  }, [quill]);

  useEffect(() => {
    if (quill) {
      const index = quill.getSelection()?.index || 0;
      // add content to quill at the index
      quill.insertText(index, content);
    }
  }, [quill, content, setContent]);

  // add inital value to quill
  useEffect(() => {
    if (quill) {

      // append to quill
      quill.root.innerHTML = content;
    }
  }, [quill]);

  return (
    <div id={id} ref={quillRef}></div>
  );
};

//   content: '',
// })