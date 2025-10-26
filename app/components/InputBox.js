import React from 'react';
import './InputBox.css';

function InputBox({ label, value, onChange, onClear }) {
  return (
    <div className="input-box">
      <div className="input-box-header">
        <label>{label}</label>
        {value && (
          <button className="clear-btn" onClick={onClear}>
            Clear
          </button>
        )}
      </div>
      <textarea
        className="input-textarea"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Paste school updates, emails, or ParentSquare messages here..."
        rows={10}
      />
    </div>
  );
}

export default InputBox;
