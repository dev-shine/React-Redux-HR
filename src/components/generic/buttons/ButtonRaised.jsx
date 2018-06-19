import React from 'react';
import PropTypes from 'prop-types';

const ButtonRaised = ({label, style, id, className, onClick}) => {
  let classname = 'md-btn md-raised ' + className;
  let idName = id !== undefined ? id : '';
  return (
    <button className={classname} style={style} id={idName} onTouchTap={onClick}>{label}</button>
  );
};

ButtonRaised.PropTypes = {
  label: PropTypes.string.isRequired,
  style: PropTypes.object,
  className: PropTypes.string,
  onClick: PropTypes.func
};

export default ButtonRaised;
