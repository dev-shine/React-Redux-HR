import React from 'react';
import 'react-date-picker/index.css';
import Dialog from 'material-ui/Dialog';
import {DateField} from 'react-date-picker';
import {notify} from 'src/services/notify';
import TextField from 'material-ui/TextField';
import AlertNotification from 'components/generic/AlertNotification';

export default class UnassignDevice extends React.Component{
    constructor (props){
        super(props);
        this.state = {
          };
    }
    
    render(){
        return(
            <div>
                <Dialog
                    title="Unassign Device"
                    titleStyle={{opacity: '0.56'}}
                    modal={false}
                    open={this.props.open}
                    onRequestClose={this.props.handleClose}
                    contentStyle={{width: '70%', maxWidth: 'none'}}
                    autoScrollBodyContent>
                    <div className="col-md-12">
                        <div className="row -py-sm">
                            <div className="col-sm-3">
                                <p style={{opacity: '0.56'}}>Device Name:</p>
                            </div>

                            <div className="col-sm-2">
                                <p>{this.props.device.machine_name}</p>
                            </div>

                            <div className="col-sm-3">
                                <p style={{opacity: '0.56'}}>Device Type:</p>
                            </div>

                            <div className="col-sm-4">
                                <p>{this.props.device.machine_type}</p>
                            </div>
                        </div>

                        <div className="row p-y-sm">
                            <div className="col-sm-3">
                                <p style={{opacity: '0.56'}}>Assign Date:</p>
                            </div>

                            <div className="col-sm-2">
                                <p>{this.props.device.assign_date}</p>
                            </div>

                            <div className="col-sm-3">
                                <p style={{opacity: '0.56'}}>Serial Number:</p>
                            </div>

                            <div className="col-sm-4">
                                <p>{this.props.device.serial_number}</p>
                            </div>
                        </div>
                        
                        <div className="row p-y-sm">
                            <div className="col-md-12" style={{opacity: '0.56'}} >
                                {'Comment:'}
                                <textarea
                                    style={{width: '100%'}}
                                />
                            </div>
                        </div>

                            <button className="col-md-12 md-btn md-raised m-b-sm indigo" style={{opacity: '0.76', marginTop: '2%'}}> 
                            Unassign Device
                            </button>
                        </div>
                </Dialog>
            </div>
        )
    }
}