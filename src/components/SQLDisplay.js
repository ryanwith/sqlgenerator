import React from 'react';

function SQLDisplay({ sql, onChange }) {
  return (
    <textarea
      rows="10"
      style={{ width: '100%', resize: 'both' }}
      value={sql}
      placeholder='Your SQL will appear here'
    />
  );
}

export default SQLDisplay;