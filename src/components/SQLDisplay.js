import React from 'react';

function SQLDisplay({ sql }) {
  return (
    <textarea
      rows="10"
      style={{ width: '100%', resize: 'both' }}
      value={sql}
      readOnly
    />
  );
}

export default SQLDisplay;
