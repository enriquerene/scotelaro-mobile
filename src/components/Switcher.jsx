import React from 'react';

const Switcher = ({texto, checked, onChange}) => {
  const inputStyle = {
    width: 40,
    padding: 10,
    marginRight: 12
  };
  return (
    <div className="form-check form-switch d-flex align-items-center justify-content-center">
      <input style={inputStyle} className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" checked={checked} onChange={() => {
        onChange(!checked)
      }} />
      <label className="form-check-label text-white" htmlFor="flexSwitchCheckDefault">{texto}</label>
    </div>
  );
}

export default Switcher;