import React from 'react';

const Input = ({ name, label, error, ...props }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input id={name} name={name} className="form-control mb-2" {...props} />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
