import React from 'react';

const styles = {
  errorAlert: {
    "width": "100%",
    "display":"none",
  },
}

const Message = ({message, style, className, onClick}) => {
  let classname = "alert " + className;
  return (
    <div className={classname} style={style}>
      <a href="#" className="close" onClick={onClick} aria-label="close">&times;</a>
      <span>{message}</span>
    </div>
  )
}

export default Message;
