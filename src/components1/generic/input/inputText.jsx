import React from 'react';
import PropTypes from 'prop-types';

const Input = ({ ref, placeHolder, onchange, id, name, value, style }) => (
  <input
    type="text"
    className="form-control"
    ref={ref}
    placeholder={placeHolder}
    onChange={onchange}
    id={id} required
    name={name}
    value={value}
    style={style}
  />
);

export default Input;

Input.PropTypes = {
  placeHolder: PropTypes.string.isRequired,
  onchange: PropTypes.func.isRequired,
  id: PropTypes.number,
  name: PropTypes.string,
  value: PropTypes.string,
  style: PropTypes.string
};
