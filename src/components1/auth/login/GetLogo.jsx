import React from 'react';

const GetLogo = () => {
  const css = {
    log: {
      "backgroundColor": "#284665",
      "padding": "30px 40px 30px 40px",
      "width": "300px",
      "marginLeft": "5px",
      "borderRadius": "6px",
      paddingBottom: '20px',
    }
  }
  return (
    <div style={css.log}>
      <img src="./logo.png" height="40" width="220"/>
    </div>
  )
}

export default GetLogo;
