import React from 'react';
import { TextareaAutosize } from '@mui/material';

function SQLDisplay({ sql }) {
  return (
    <TextareaAutosize
      minRows={10}
      style={{ width: '100%', resize: 'both' }}
      value={sql}
      readOnly
    />
  );
}

export default SQLDisplay;
