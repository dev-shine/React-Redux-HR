import React from 'react';
import Snackbar from 'material-ui/Snackbar';

class AlertNotification extends React.Component {
    constructor( props ){
        super( props );
    }
    render(){
      let show_alert = false
      let alert_message = ""

      if( this.props.alert_message != 'undefined' && this.props.alert_message != '' ){
        show_alert = true
        alert_message = this.props.alert_message
      }

      return (
        <Snackbar
          open={show_alert}
          message={alert_message}
          autoHideDuration={4000}
        />
      )

    }
}

export default AlertNotification


