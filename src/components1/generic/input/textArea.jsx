import React from 'react';
import PropTypes from 'prop-types';

const Textarea = ({ ref, placeHolder, onchange, id, name, value, style }) => (
  <textarea
    className="form-control"
    ref={ref}
    placeholder={placeHolder}
    onChange={onchange} id={id} required
    name={name}
    value={value}
    style={style}
  />
);

export default Textarea;

Textarea.propTypes = {
  placeHolder: PropTypes.string.isRequired,
  onchange: PropTypes.func.isRequired,
  id: PropTypes.number,
  name: PropTypes.string,
  value: PropTypes.string,
  style: PropTypes.string
};
