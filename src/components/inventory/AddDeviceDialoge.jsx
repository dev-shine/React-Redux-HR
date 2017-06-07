import React, {PropTypes} from 'react';
import Dialog from 'material-ui/Dialog';
import _ from 'lodash';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {notify} from '../../services/index';
import { CONFIG } from '../../config/index';
import 'react-date-picker/index.css';

var moment = require('moment');

export default class AddDeviceDialoge extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      background: '',
      deviceType: '',
      open: false,
      deviceList: [],
      checkValue: []
    };

    this.addMoreDevice = this.addMoreDevice.bind(this);
    // this.addDeviceType = this.addDeviceType.bind(this)
    this.handleDelete = this.handleDelete.bind(this);
    this.setValue = this.setValue.bind(this);
  }
  componentWillReceiveProps (props) {
    this.setState({deviceList: props.deviceTypeList, open: props.open});
  }

  handleDelete () {
    let checkValue = this.state.checkValue;
    let deviceList = this.state.deviceList;
    checkValue.map((val) => {
      _.pull(deviceList, val);
    });
    this.props.onCallDeviceType(deviceList).then((val) => {
      if (val.data.not_delete) {
        this.setState({deviceList: this.state.deviceList, checkValue: []});
        alert('This Device Type Is In Use');
        this.props.handleClose();
      } else {
        this.setState({deviceList, deviceType: '', checkValue: []});
        this.props.handleClose();
      }
    });
  }

  setValue (e) {
    if (e.target.checked) {
      let array = this.state.checkValue;
      array.push(e.target.value);
      this.setState({checkValue: array});
    } else if (!e.target.checked) {
      let array = this.state.checkValue;
      _.pull(array, e.target.value);
      this.setState({
        checkValue: array
      });
    }
  }

  addMoreDevice () {
    if (!_.isEmpty(this.state.deviceType)) {
      var deviceList = this.state.deviceList;
      let arr = _.filter(deviceList, device => device === this.state.deviceType);
      if (arr.length > 0) {
        alert('This Device Type Already In Use');
        this.setState({
          deviceType: ''
        });
      } else {
        deviceList.push(this.state.deviceType);
        this.setState({
          deviceType: '',
          deviceList: deviceList
        });
      }
    }
    this.props.callAddDevice(this.state.deviceList);
  }

  // addDeviceType () {
  //   this.props.callAddDevice(this.state.deviceList)
  // }

  render () {
    var text = <div>
          <TextField
            ref='value'
            floatingLabelText={'Device Type'}
            fullWidth
            value={this.state.deviceType}
            onChange={(e) => {
              this.setState({
                deviceType: e.target.value
              });
            }}
            />
      </div>;

    const actions = [
      <FlatButton
        label="Delete"
        secondary
        onTouchTap={() => {
          if (this.state.checkValue != '') {
            if (confirm('Are you sure you want to delete this Device Type ?')) {
              this.handleDelete();
            };
          }
        }}
        style={{marginRight: 5}}
    />,
      <FlatButton
        label="Cancel"
        primary
        onTouchTap={this.props.handleClose}
        style={{marginRight: 5}}
    />,
      <RaisedButton
        label="Submit"
        primary
        onTouchTap={this.addMoreDevice}
    />
    ];
    return (
      <div>
        {
          this.props.logged_user.role === CONFIG.ADMIN
         ? <button className="md-btn md-raised m-b-sm indigo"
           onTouchTap={this.props.handleOpen}>Add Device Type</button>
         : null
       }
        <Dialog
          title={'ADD DEVICE TYPE'}
          titleStyle={{opacity: '0.56'}}
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.props.handleClose}
                  ><div className="row m-0">
                  <div className='col-sm-5'style={{overflowY: 'auto', maxHeight: '250px'}}>
                    <label>Device Type List</label>
                    <ol>
                  {this.state.deviceList.map((val, i) => {
                    return <li key={i}>
                      <input type='checkbox' name="checked" id={i} value={val} onChange={(e) => {
                        this.setValue(e);
                      }}>

                      </input> {val}</li>;
                  })}
                </ol>
                </div>
                <div className='col-sm-7' style={{marginTop: '5%'}}>
                {text}
            </div>
              </div>
          </Dialog>
        </div>
    );
  }
}
