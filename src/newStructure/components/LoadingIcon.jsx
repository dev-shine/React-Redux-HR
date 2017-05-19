import React from 'react';

const loadingIcon = ({self}) => {
  const styles = {
    progressWidth: {
      'width' : '100%'
    },
    loadingDivHeight : {
      'height' : '10px'
    }
  }
  if (self.props.frontend.show_loading == 1) {
    return (
      <div style={styles.loadingDivHeight}>
        <div className="progress progress-striped active">
           <div className="progress-bar info" style={styles.progressWidth}></div>
       </div>
      </div>
    )
  }
  return;
}

export default loadingIcon
