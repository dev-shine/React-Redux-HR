import React from 'react';
import PropTypes from 'prop-types';

const Textarea = ({ className, ref, placeHolder, onchange, id, name, value, style }) => {
  let classname = 'form-control' + (className || '');
  return (
    <textarea
      className={classname}
      ref={ref}
      placeholder={placeHolder}
      onChange={onchange} id={id} required
      name={name}
      style={style}
    >{value}</textarea>
  );
};

export default Textarea;

Textarea.propTypes = {
  classname: PropTypes.string.isRequired,
  placeHolder: PropTypes.string.isRequired,
  onchange: PropTypes.func.isRequired,
  id: PropTypes.number,
  name: PropTypes.string,
  value: PropTypes.string,
  style: PropTypes.string
};
