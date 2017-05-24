import React from 'react';


const Button = ({type, label, style, className, onClick}) => {
  let classname = "btn " + className;
  return (
    <button type={type} className={classname} style={style} onTouchTap={onClick}>{label}</button>
  )
}

export default Button;
