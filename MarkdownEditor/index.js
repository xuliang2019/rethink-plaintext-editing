import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import MDEditor from '@uiw/react-md-editor';

import css from './style.css';

function MarkdownEditor({ file, write }) {
  console.log(file, write);
  const [value, setValue] = useState("");

  useEffect(() => {
    (async () => {
      setValue(await file.text());
    })();
  }, [file]);

  function handleOnChange(value) {
    setValue(value)
    // save modified file
    const newFile = new File(
      [value],
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
      <MDEditor
        value={value}
        onChange={handleOnChange}
      />
      <MDEditor.Markdown source={value} />
    </div>
  );
}

MarkdownEditor.propTypes = {
  file: PropTypes.object,
  write: PropTypes.func
};

export default MarkdownEditor;
