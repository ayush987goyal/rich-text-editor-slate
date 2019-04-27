import React, { useState } from 'react';
import { Editor } from 'slate-react';
import { Value } from 'slate';

const initialValue = Value.fromJSON({
  document: {
    nodes: [
      {
        object: 'block',
        type: 'paragraph',
        nodes: [
          {
            object: 'text',
            leaves: [
              {
                text: 'My first paragraph!'
              }
            ]
          }
        ]
      }
    ]
  }
});

const TextEditor = () => {
  const [value, setValue] = useState(initialValue);

  const onChange = ({ value: newValue }) => {
    setValue(newValue);
  };

  return <Editor value={value} onChange={onChange} />;
};

export default TextEditor;
