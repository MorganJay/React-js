import React from 'react';

const Input = ({ name, label, value, type, onChange, error, ...props }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        {...props}
        autoFocus
        type={type}
        className="form-control mb-2"
        id={name}
        name={name}
        value={value}
        onChange={onChange}
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
