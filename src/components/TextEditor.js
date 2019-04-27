import React, { useState } from 'react';
import { Editor } from 'slate-react';
import { Value } from 'slate';

import BoldMark from './BoldMark';
import ItalicMark from './ItalicMark';

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

  const onKeyDown = (e, change) => {
    if (!e.ctrlKey) return;
    e.preventDefault();

    switch (e.key) {
      case 'b': {
        change.toggleMark('bold');
        return true;
      }

      case 'i': {
        change.toggleMark('italic');
        return true;
      }

      default:
        return true;
    }
  };

  const renderMark = props => {
    switch (props.mark.type) {
      case 'bold':
        return <BoldMark {...props} />;

      case 'italic':
        return <ItalicMark {...props} />;

      default:
        return null;
    }
  };

  return <Editor value={value} onChange={onChange} onKeyDown={onKeyDown} renderMark={renderMark} />;
};

export default TextEditor;
