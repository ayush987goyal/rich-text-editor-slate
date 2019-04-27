import React, { useState, useRef } from 'react';
import { Editor } from 'slate-react';
import { Value } from 'slate';

import Icon from 'react-icons-kit';
import { bold } from 'react-icons-kit/feather/bold';
import { italic } from 'react-icons-kit/feather/italic';

import { BoldMark, ItalicMark, FormatToolbar } from './index';

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
  const editor = useRef();

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

  const onMarkClick = (e, type) => {
    e.preventDefault();

    editor.current.toggleMark(type);
  };

  return (
    <>
      <FormatToolbar>
        <button className="tooltip-icon-button" onPointerDown={e => onMarkClick(e, 'bold')}>
          <Icon icon={bold} />
        </button>
        <button className="tooltip-icon-button" onPointerDown={e => onMarkClick(e, 'italic')}>
          <Icon icon={italic} />
        </button>
      </FormatToolbar>

      <Editor
        ref={editor}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        renderMark={renderMark}
      />
    </>
  );
};

export default TextEditor;
