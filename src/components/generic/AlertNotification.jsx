import React from 'react';
import Snackbar from 'material-ui/Snackbar';

class AlertNotification extends React.Component {
  constructor (props) {
    super(props);
  }
  render () {
    let showAlert = false;
    let alertMessage = '';
    if (this.props.alert_message !== 'undefined' && this.props.alert_message !== '') {
      showAlert = true;
      alertMessage = this.props.alert_message;
    }
    return (
      <Snackbar
        open={showAlert}
        message={alertMessage}
        autoHideDuration={4000}
      />
    );
  }
}

export default AlertNotification;

AlertNotification.propTypes = {
  alert_message: React.PropTypes.isRequired
};
