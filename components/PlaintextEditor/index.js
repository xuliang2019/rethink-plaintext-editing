import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import css from './style.css';
import { EditorState, ContentState } from 'draft-js'
import dynamic from 'next/dynamic'; 
const Editor = dynamic(
  () => import('react-draft-wysiwyg').then(mod => mod.Editor),
  { ssr: false }
);

function PlaintextEditor({ file, write }) {
  console.log(file, write);
  const [editorState, setEditorState] = useState("");
  
  useEffect(() => {
    (async () => {
      (setEditorState(EditorState.createWithContent(ContentState.createFromText(await file.text()))));
    })(); 
  }, [file]);

  function onEditorStateChange(editorState) {
      setEditorState(editorState);
      // save modified file
      const newFile = new File(
        [editorState.getCurrentContent().getPlainText()],
        file.name,
        {
          type: file.type,
          lastModified: new Date(Date.now())
        }
      );
      write(newFile);
  }

  return (
    <div className={css.editor}>
      <h3 className={css.h3}>Editing Mode</h3>
      <Editor
        editorState={editorState}
        onEditorStateChange={onEditorStateChange}
        wrapperClassName="wrapper-class"
        editorClassName="editor-class"
        toolbarClassName="toolbar-class"
        />
    </div>
  );
}

PlaintextEditor.propTypes = {
  file: PropTypes.object,
  write: PropTypes.func
};

export default PlaintextEditor;
