import React from 'react';


const ButtonFlat = ({label, style, className, onClick}) => {
  let classname = "md-btn md-flat " + className;
  return (
    <button className={classname} style={style} onTouchTap={() => { onClick() }}>{label}</button>
  )
}

export default ButtonFlat;
