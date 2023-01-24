import { useState } from 'react';
import { Quill } from './Quill';

export const Editor = () => {
  const [content, setContent] = useState('');

  return (
    <div>
      <Quill content={content} setContent={setContent} />
    </div>
  );
};