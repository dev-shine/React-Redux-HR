import React from 'react';

const ButtonRaised = ({label, style, className, onClick}) => {
  let classname = "md-btn md-raised " + className;
  return (
    <button className={classname} style={style} onTouchTap={() => { onClick() }}>{label}</button>
  )
}

export default ButtonRaised;
