import React from 'react';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import PropTypes from 'prop-types';
import {CONFIG} from 'src/config/index';
import {DateField} from 'react-date-picker';
import 'react-date-picker/index.css';
import {notify} from 'src/services/index';
import Button from 'components/generic/buttons/Button';
import ButtonRaised from 'components/generic/buttons/ButtonRaised';

var moment = require('moment');

class AddUserPendingHour extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      openMerge: false,
      officetime: '9:00',
      pendingTime: '',
      user_Id: '',
      username: '',
      date: '',
      reason: '',
      empId: '',
      year: '',
      month: ''
    };
    this.handleOpenMerge = this.handleOpenMerge.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleAddData = this.handleAddData.bind(this);
  }
  componentWillMount () {
    this.setState({
      pendingTime: this.props.val.extra_time,
      user_Id: this.props.val.user_Id,
      username: this.props.val.name,
      date: this.props.val.date,
      empId: this.props.val.id,
      year: this.props.manageUserPendingHours.year,
      month: this.props.manageUserPendingHours.displayData.month
    });
  }
  handleOpenMerge () {
    this.setState({
      openMerge: true
    });
  }
  handleClose () {
    this.setState({
      openMerge: false,
      reason: ''
    });
  }
  componentWillReceiveProps (props) {
    this.setState({
      pendingTime: props.val.extra_time,
      user_Id: props.val.user_Id,
      username: props.val.name,
      date: props.val.date,
      empId: props.val.id,
      year: props.manageUserPendingHours.year,
      month: props.manageUserPendingHours.displayData.month
    });
  }

  handleAddData () {
    var min = this.state.officetime;
    var penMin = this.state.pendingTime;
    var times = [];
    var times1 = min.split(':');
    var times2 = penMin.split(':');

    for (var i = 0; i < 2; i++) {
      times1[i] = (isNaN(parseInt(times1[i]))) ? 0 : parseInt(times1[i]);
      times2[i] = (isNaN(parseInt(times2[i]))) ? 0 : parseInt(times2[i]);
      times[i] = times1[i] + times2[i];
    }

    var minutes = times[1];
    var hours = times[0];

    if (minutes % 60 === 0) {
      let res = minutes / 60;
      hours += res;
      minutes = minutes - (60 * res);
    }

    var pendingHour = (hours <= 9 ? ('0' + hours + ':' + minutes) : hours + ':' + minutes);
    let d = moment().format('YYYY-MM-DD');
    const userId = this.state.user_Id;
    const date = d;
    const reason = this.state.reason;
    const empId = this.state.empId;
    this.props.callAddUserPendingHours(userId, pendingHour, date, reason, empId, this.state.year, this.state.month);
  }
  render () {
    return (
      <div>
        <div>
          <ButtonRaised
            className="m-b-sm green"
            onClick={this.handleOpenMerge}
            label={'Merge Hour'} />
        </div>
        <Dialog
          title={'Pending Time'}
          modal={false}
          open={this.state.openMerge}
          onRequestClose={this.handleClose}
          contentStyle={{width: '70%', maxWidth: 'none'}}
          autoScrollBodyContent>
          <table className="table">
            <tbody>
              <tr style={{opacity: '0.56'}}>
                <td >
                  {'Employee Id'}
                  <TextField
                    name='userid'
                    value={this.state.user_Id}
                    fullWidth
                    required />
                </td>
                <td>
                  {'Employee Name'}
                  <TextField
                    name='name'
                    value={this.state.username}
                    fullWidth
                    required />
                </td>
              </tr>
              <tr style={{opacity: '0.56'}}>
                <td >
                  {'Pending Time (hh:mm)'}
                  <TextField
                    onChange={(e) => {
                      this.setState({
                        pendingtime: e.target.value
                      });
                    }}
                    value={this.state.pendingTime}
                    fullWidth
                    name='pendingtime'
                    required />
                </td>
                <td>
                  {'Office Time (hh:mm)'}
                  <TextField
                    name="officetime"
                    value={this.state.officetime}
                    fullWidth
                    required />
                </td>
              </tr>
              <tr>
                <td>
                  {'Comment'}
                  <textarea
                    onChange={(e) => this.setState({
                      reason: e.target.value
                    })}
                    value={this.state.reason}
                    style={{width: '100%', marginTop: '1%', opacity: '0.56'}} />
                </td>
              </tr>
            </tbody>
          </table>
          <br />
          <br />
          <ButtonRaised
            onClick={this.handleAddData}
            className="col-md-12 m-b-sm indigo"
            label={'Merge Pending Time'}
          />
        </Dialog>
      </div>
    );
  }
}

export default AddUserPendingHour;
