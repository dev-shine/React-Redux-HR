import React from 'react';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import PropTypes from 'prop-types';
import {CONFIG} from 'src/config/index';
import {DateField} from 'react-date-picker';
import 'react-date-picker/index.css';
import Button from 'components/generic/buttons/Button';
import ButtonRaised from 'components/generic/buttons/ButtonRaised';

var moment = require('moment');

class AddUserPendingHour extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      open: false,
      officetime: '9:00',
      pendingTime: '',
      user_Id: '',
      username: '',
      date: '',
      reason: ''
    };
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleAddData = this.handleAddData.bind(this);
  }
  handleOpen () {
    this.setState({
      open: true
    });
  }
  handleClose () {
    this.setState({open: false});
  }
  componentWillReceiveProps (props) {
    this.setState({
      pendingTime: props.val.extra_time,
      user_Id: props.val.user_Id,
      username: props.val.name,
      date: props.val.date
    });
  }

  handleAddData () {

  }

  render () {
    return (
      <div>
        <div>
        <ButtonRaised
          className="m-b-sm green"
          onClick={this.handleOpen}
          label={'Merge'} />

        <ButtonRaised
          className="m-b-sm indigo"
          style={{marginLeft: '5%'}}
          label={'Add As Leave'} />
      </div>
        <Dialog
          title="Pending Time "
          modal={false}
          open={this.state.open}
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
                    onChange={(e) => {
                      this.setState({
                        officetime: e.target.value
                      });
                    }}
                    value={this.state.officetime}
                    fullWidth
                    required />
                </td>
              </tr>
              <tr>
                <td>
                 Date
                 <DateField style={{marginTop: '4%'}}
                   dateFormat="YYYY-MM-DD"
                   placeholder="YYYY-MM-DD"
                   value={this.state.date}
                   className="form-control"
                   required />
               </td>
                <td>
                  {'Reason'}
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
