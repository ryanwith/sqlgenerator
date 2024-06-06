import React from 'react';
import { Button } from '@mui/material';

function CopyToClipboard({ textToCopy, disabled }) {
  const handleCopy = () => {
    navigator.clipboard.writeText(textToCopy).then(() => {
      alert('SQL copied to clipboard!');
    }).catch(err => {
      console.error('Failed to copy: ', err);
    });
  };

  return (
    <Button variant="contained" onClick={handleCopy} disabled={disabled}>
      Copy to Clipboard
    </Button>
  );
}

export default CopyToClipboard;
