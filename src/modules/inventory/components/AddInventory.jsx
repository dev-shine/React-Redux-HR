import React from 'react';
import 'react-date-picker/index.css';
import Dialog from 'material-ui/Dialog';
import {DateField} from 'react-date-picker';
import {show_loading, hide_loading} from 'appRedux/generic/actions/frontend';
import {notify} from 'src/services/notify';
import TextField from 'material-ui/TextField';
import AlertNotification from 'components/generic/AlertNotification';
import CircularProgress from 'material-ui/CircularProgress';
import DatePicker from 'material-ui/DatePicker';

export default class FormAddNewInventory extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      open:             false,
      edit:             false,
      id:               '',
      user:             '',
      autoOk:           true,
      machine_type:     '',
      machine_name:     '',
      machine_price:    '',
      serial_no:        '',
      purchase_date:    '',
      operating_system: '',
      comment:          '',
      warranty_comment: '',
      repair_comment:   '',
      warranty:         '',
      user_Id:          '',
      msg:              '',
      deviceTypeList:   [],
      deviceStatusList: [],
      loading:          false,
      unassign_comment: ''
    };
    this.handleOpen = this.handleOpen.bind(this);
    this.handleChangeDate = this.handleChangeDate.bind(this);
    this.handleAddDevice = this.handleAddDevice.bind(this);
    this.handleAssign = this.handleAssign.bind(this);
  }

  componentWillReceiveProps (props) {
    // let {open, edit} = props;
    this.setState({
      open:             props.open,
      edit:             props.edit,
      deviceTypeList:   props.manageDevice.deviceList,
      deviceStatusList: props.manageDevice.statusList
    });
    <CircularProgress />

    if (props.edit) {
      this.setState({
        id:               props.getByIdData.id,
        machine_type:     props.getByIdData.machine_type,
        machine_name:     props.getByIdData.machine_name,
        machine_price:    props.getByIdData.machine_price,
        serial_no:        props.getByIdData.serial_number,
        purchase_date:    props.getByIdData.date_of_purchase,
        operating_system: props.getByIdData.operating_system,
        status:           props.getByIdData.status,
        comment:          props.getByIdData.comments,
        warranty_comment: props.getByIdData.warranty_comment,
        repair_comment:   props.getByIdData.repair_comment,
        warranty:         props.getByIdData.warranty_end_date,
        user_Id:          props.getByIdData.user_Id,
        unassign_comment: props.getByIdData.unassign_comment
      });
    } 
    else if(this.props.manageDevice.status_message=='Machine added Successfully !!'||this.props.manageDevice.status_message=='Successfully Updated into table'){
      this.setState({
        id:               '',
        machine_type:     '',
        machine_name:     '',
        machine_price:    '',
        serial_no:        '',
        purchase_date:    '',
        operating_system: '',
        status:           '',
        comment:          '',
        warranty_comment: '',
        repair_comment:   '',
        warranty:         '',
        user_Id:          '',
        loading:          false,
        unassign_comment: ''
      });
      this.props.manageDevice.status_message='';
    }
  }

 

  handleOpen (e) {
    e.stopPropagation();
    this.props.handleAddDialog();
  }

  handleAddDevice () {

    let apiData = {
      machine_type:     this.state.machine_type,
      machine_name:     this.state.machine_name.trim(),
      machine_price:    this.state.machine_price.trim(),
      serial_no:        this.state.serial_no.trim(),
      purchase_date:    this.state.purchase_date,
      operating_system: this.state.operating_system,
      status:           this.state.status,
      comment:          this.state.comment.trim(),
      warranty_comment: this.state.warranty_comment.trim(),
      repair_comment:   this.state.repair_comment.trim(),
      warranty:         this.state.warranty,
      user_Id:          this.state.user_Id,
      unassign_comment: this.state.unassign_comment
    };
    let resetFields = {
      machine_type:     '',
      machine_name:     '',
      machine_price:    '',
      serial_no:        '',
      purchase_date:    '',
      operating_system: '',
      comment:          '',
      warranty_comment: '',
      repair_comment:   '',
      warranty:         '',
      user_Id:          '',
      unassign_comment: ''
    };
    let validate = true;
    this.setState({
      loading:true
    })
   
    if (validate && !this.props.edit) {
      this.props.onAddNewMachine(apiData).then((val) => {
        notify('Success !', val, 'success');
        this.props.onFetchDevice();
        this.props.handleClose();

      }, (error) => {
        notify('Error !', error, 'error');
        this.setState({
          loading:false
        })
      });
      
    } else if (validate) {
      this.props.onUpdateDevice(this.state.id, apiData).then((message) => {
        notify('', message, '');
        if(message=='No fields updated into table'){
          this.setState({
            loading:false
          })
        }
        this.props.handleClose();
        this.props.onFetchDevice();
      }).catch((message) => {
        this.setState({
          msg: message
        });
      });
    }
    return false;
  }
  handleAssign (deviceId, Userid) {
    this.setState({userId: Userid});
    this.props.callAssign(deviceId, Userid);
  }

  handleChangeDate (event, date) {
    this.setState({
      purchase_date: date
    });
  }
 
  render () {
    console.log(this.state.user_Id);
    
    let userList = this.props.usersList.users.map((val, i) => {
      return <option key={val.id} id={i} value={val.user_Id} >{val.name}</option>;
    });
    return (
      <div>
        <AlertNotification message={this.state.msg} />
        <div>
          {/* <button style={{display:'inline-block',float:'left',marginRight:'2%'}} className="md-btn md-raised m-b-sm indigo">Approved Inventory</button>
          <button style={{display:'inline-block',float:'left',marginRight:'2%'}} className="md-btn md-raised m-b-sm indigo">Unapproved Inventory</button> */}
          <button style={{display:'inline-block',float:'left'}} className="md-btn md-raised m-b-sm indigo"
            onTouchTap={this.handleOpen}>Add New Inventory </button>
        </div>
        <Dialog
          title={this.state.edit ? 'UPDATE INVENTORY' : 'ADD INVENTORY'}
          titleStyle={{opacity: '0.56'}}
          modal={false}
          open={this.state.open}
          onRequestClose={this.props.handleClose}
          contentStyle={{width: '70%', maxWidth: 'none'}}
          autoScrollBodyContent
          >
          <div className="col-md-12">
            <div className="row">
              <div className="col-md-6" >
                <DatePicker 
                  hintText="Date of Purchase"
                  onChange={(e,date) => { this.setState({purchase_date: date})}}
                  textFieldStyle={{width:"100%"}}
                  value={this.state.purchase_date}
                  required />
              </div>

              <div className="col-md-6">
                <DatePicker hintText="Date Of Warrenty Expiry"
                 onChange={(e,date) => { this.setState({warranty: date}); }}
                 value={this.state.warranty}
                 required
                 textFieldStyle={{width:"100%"}}
                 />
              </div>

              <div className="col-md-6" style={{opacity: '0.56', marginTop: '2%'}}>
                {'Machine/Device Type'}
                <select className="form-control"
                  ref="machine_type"
                  value={this.state.machine_type}
                  onChange={(evt) => {
                    this.setState({machine_type: evt.target.value});
                  }}>
                  <option value='' disabled>--Select Device--</option>
                  {this.state.deviceTypeList.map((val, i) => {
                    return <option key={i} value={val} > {val}</option>;
                  })}
                </select>
              </div>

              <div className="col-md-6" style={{opacity: '0.56', marginTop: '2%'}}>
                {'Status'}
                <select className="form-control" ref="status" value={this.state.status}
                  onChange={(e) => (this.setState({status: e.target.value}))} required>
                  <option value='' disabled selected>--Select Status--</option>
                  {this.state.deviceStatusList.map((val, i) => {
                    return <option key={i} value={val.status}> {val.status}</option>;
                  })}
                </select>
              </div>

              <div className="col-md-6">
                <TextField
                  floatingLabelText="Machine Name"
                  fullWidth
                  onChange={(e) => (this.setState({machine_name: e.target.value}))}
                  onBlur={(e) => { this.setState({machine_name: this.state.machine_name.trim()}); }}
                  value={this.state.machine_name}
                  required />
              </div>

              <div className="col-md-6" style={{opacity: '0.56', marginTop: '2%'}}>
                {'Assign User'}
                <select
                  value={this.state.user_Id}
                  onChange={(evt) => { this.setState({user_Id: evt.target.value}); }}
                  className="form-control" required>
                  <option value=''  disabled selected>Select User</option>
                  <option value="unassign">Unassign</option>
                  {userList}
                </select>
              </div>
             <div className="col-md-6">
                <TextField
                  floatingLabelText="Price"
                  hintText='₹'
                  fullWidth
                  onChange={(e) => (this.setState({machine_price: e.target.value}))}
                  onBlur={(e) => { this.setState({machine_price: this.state.machine_price.trim()}); }}
                  value={this.state.machine_price} required />
              </div>
             {this.state.user_Id=='unassign'?<div className="col-md-6">
                <TextField
                  floatingLabelText="Unassign Device comment"
                  hintText='₹'
                  fullWidth
                  onChange={(e) => (this.setState({unassign_comment: e.target.value}))}
                  onBlur={(e) => { this.setState({unassign_comment: this.state.unassign_comment.trim()}); }}
                  value={this.state.unassign_comment} required />
              </div>:null}

              <div className="col-md-6">
                <TextField
                  floatingLabelText="Serial No"
                  fullWidth
                  onChange={(e) => (this.setState({serial_no: e.target.value}))}
                  onBlur={(e) => { this.setState({serial_no: this.state.serial_no.trim()}); }}
                  value={this.state.serial_no} />
              </div>
              {this.state.machine_price >5000?
              <div className="col-md-6">
              <h4>Upload inovice of Device</h4>
                <input type="file" name="inoviceUpload"/>
              </div>:null
              }
              <div className="col-md-12" style={{opacity: '0.56'}} >
                {'Comment'}
                <textarea
                  style={{width: '100%'}}
                  onBlur={(e) => { this.setState({comment: this.state.comment.trim()}); }}
                  onChange={(e) => { this.setState({comment: e.target.value}); }}
                  value={this.state.comment}
                  />
              </div>

              <div className="col-md-6" style={{opacity: '0.56'}}>
                {'Extended Warranty Comment'}
                <textarea
                  style={{width: '100%'}}
                  onBlur={(e) => { this.setState({warranty_comment: this.state.warranty_comment.trim()}); }}
                  onChange={(e) => { this.setState({warranty_comment: e.target.value}); }}
                  value={this.state.warranty_comment} />
              </div>

              <div className="col-md-6" style={{opacity: '0.56'}}>
                {'Previous Repair Comment'}
                <textarea
                  style={{width: '100%'}}
                  onBlur={(e) => { this.setState({repair_comment: this.state.repair_comment.trim()}); }}
                  onChange={(e) => { this.setState({repair_comment: e.target.value}); }}
                  value={this.state.repair_comment} />
              </div>
            </div>
          </div>
     {this.state.loading? <CircularProgress  size={30} thickness={3} style={{marginLeft:'50%'}} />:null}
         {this.state.loading==false? <button className="col-md-12 md-btn md-raised m-b-sm indigo" style={{opacity: '0.76', marginTop: '2%'}} onClick={(e)=>this.handleAddDevice(e)}>
       {this.state.edit ? 'Update Inventory' : 'Add Inventory'}
          </button>:null}
        </Dialog>
      </div>
    );
  }
}
