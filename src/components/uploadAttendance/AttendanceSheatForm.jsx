import React from 'react';
import * as _ from 'lodash'
import {notify} from '../../services/index'

import {DateField} from 'react-date-picker'
import 'react-date-picker/index.css'
import {CONFIG} from '../../config/index'
//--------
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'

class AttendanceSheatForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: '',
      open: false,
      doc_type: '',
      user_token: ''
    }
  }
  componentWillReceiveProps(props) {
    let token = localStorage.getItem('hr_logged_user')
    this.setState({user_token: token})
    console.log(this.state.user_token);
  }
  render() {
    return (
      <div>
        <div>
          <form action={CONFIG.upload_attendance_url} method="POST" encType="multipart/form-data">
            <div className="form-group">
              <input type="hidden" name="token" value={this.state.user_token}/>
              <input type="file" name="image" required/>
              <input type="submit" name="submit" value="Upload" className="col-xs-12 md-btn md-raised indigo"/>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

AttendanceSheatForm.styles = {
  checkbox: {
    verticalAlign: 'middle'
  },
  declearation: {
    display: 'inline-flex',
    width: '90%',
    marginLeft: '10px'
  }
};

export default AttendanceSheatForm
