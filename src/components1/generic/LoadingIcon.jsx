import React from 'react';

const styles = {
  progressWidth: {
    'width' : '100%'
  },
  loadingDivHeight : {
    'height' : '10px'
  }
}

const LoadingIcon = ({loading}) => {
  if (loading == 1) {
    return (
      <div style={styles.loadingDivHeight}>
        <div className="progress progress-striped active">
           <div className="progress-bar info" style={styles.progressWidth}></div>
       </div>
      </div>
    )
  }
  return (
    <div></div>
  );
}

export default LoadingIcon
