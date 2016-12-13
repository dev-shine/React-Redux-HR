import React from 'react';
import * as _ from 'lodash'

class FormUserProfileDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      user_id: "",
      name: "",
      jobtitle: "",
      dateofjoining: "",
      dob: "",
      gender: "",
      marital_status: "",
      address1: "",
      address2: "",
      emergency_ph1: "",
      emergency_ph2: "",
      blood_group: "",
      medical_condition: "",
      work_email: ""
    }
  }
  componentWillReceiveProps(props) {
    let username : ""
    let user_id = ""
    let name = ""
    let jobtitle = ""
    let dateofjoining = ""
    let dob = " "
    let gender = " "
    let marital_status = " "
    let address1 = " "
    let address2 = " "
    let emergency_ph1 = " "
    let emergency_ph2 = " "
    let blood_group = " "
    let medical_condition = " "
    let work_email = " "

    if (typeof props.username != 'undefined' && props.username != null) {
      username = props.username
    }
    if (typeof props.user_profile_detail.user_Id != 'undefined' && props.user_profile_detail.user_Id != null) {
      user_id = props.user_profile_detail.user_Id
    }
    if (typeof props.user_profile_detail.name != 'undefined' && props.user_profile_detail.name != null) {
      name = props.user_profile_detail.name
    }
    if (typeof props.user_profile_detail.jobtitle != 'undefined' && props.user_profile_detail.jobtitle != null) {
      jobtitle = props.user_profile_detail.jobtitle
    }
    if (typeof props.user_profile_detail.dateofjoining != 'undefined' && props.user_profile_detail.dateofjoining != null) {
      dateofjoining = props.user_profile_detail.dateofjoining
    }
    if (typeof props.user_profile_detail.dob != 'undefined' && props.user_profile_detail.dob != null) {
      var mydate = new Date(props.user_profile_detail.dob);
      dob = (mydate.getDate() + '/' + (mydate.getMonth() + 1) + '/' +  mydate.getFullYear());
    }
    if (typeof props.user_profile_detail.gender != 'undefined' && props.user_profile_detail.gender != null) {
      gender = props.user_profile_detail.gender
    }
    if (typeof props.user_profile_detail.marital_status != 'undefined' && props.user_profile_detail.marital_status != null) {
      marital_status = props.user_profile_detail.marital_status
    }
    if (typeof props.user_profile_detail.current_address != 'undefined' && props.user_profile_detail.current_address != null) {
      address1 = props.user_profile_detail.current_address
    }
    if (typeof props.user_profile_detail.permanent_address != 'undefined' && props.user_profile_detail.permanent_address != null) {
      address2 = props.user_profile_detail.permanent_address
    }
    if (typeof props.user_profile_detail.emergency_ph1 != 'undefined' && props.user_profile_detail.emergency_ph1 != null) {
      emergency_ph1 = props.user_profile_detail.emergency_ph1
    }
    if (typeof props.user_profile_detail.emergency_ph2 != 'undefined' && props.user_profile_detail.emergency_ph2 != null) {
      emergency_ph2 = props.user_profile_detail.emergency_ph2
    }
    if (typeof props.user_profile_detail.blood_group != 'undefined' && props.user_profile_detail.blood_group != null) {
      blood_group = props.user_profile_detail.blood_group
    }
    if (typeof props.user_profile_detail.medical_condition != 'undefined' && props.user_profile_detail.medical_condition != null) {
      medical_condition = props.user_profile_detail.medical_condition
    }
    if (typeof props.user_profile_detail.work_email != 'undefined' && props.user_profile_detail.work_email != null) {
      work_email = props.user_profile_detail.work_email
    }

    this.setState({
      username: username,
      user_id: user_id,
      name: name,
      jobtitle: jobtitle,
      dateofjoining: dateofjoining,
      dob: dob,
      gender: gender,
      marital_status: marital_status,
      address1: address1,
      address2: address2,
      emergency_ph1: emergency_ph1,
      emergency_ph2: emergency_ph2,
      blood_group: blood_group,
      medical_condition: medical_condition,
      work_email: work_email
    })
  }

  render() {
    return (
      <div>

        <h6 className="text-center">Personal Details</h6>
        <br/>
        <div className="row no-gutter">
          <div className="col-md-6">
            Employee Id :
            <b>{this.state.user_id}</b><br/>
            Username :
            <b>{this.state.username}</b>
          </div>
        </div>
        <hr/>
        <div className="row no-gutter">
          <div className="col-md-6 p-r">
            <div className="form-group">
              <label>Name</label>
              <input type="text" className="form-control" ref="name" onChange={() => this.setState({name: this.refs.name.value})} value={this.state.name}/>
            </div>
          </div>
          <div className="col-md-6">

            <div className="form-group">
              <label>Job Title</label>
              <input type="text" className="form-control" ref="jobtitle" onChange={() => this.setState({jobtitle: this.refs.jobtitle.value})} value={this.state.jobtitle}/>
            </div>

          </div>
        </div>

        <div className="row no-gutter">
          <div className="col-md-6 p-r">
            <div className="form-group">
              <label>Date Of Joining ( eg. 2016-12-30 )</label>

              <input type="text" className="form-control" ref="dateofjoining" onChange={() => this.setState({dateofjoining: this.refs.dateofjoining.value})} value={this.state.dateofjoining}/>
            </div>

          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label>Work Email</label>
              <input type="text" className="form-control" ref="work_email" onChange={() => this.setState({work_email: this.refs.work_email.value})} value={this.state.work_email}/>
            </div>
          </div>
        </div>

        <div className="row no-gutter">
          <div className="col-md-6 p-r">

            <div className="form-group">
              <label>Gender</label>
              <select className="form-control" ref="gender" onChange={() => this.setState({gender: this.refs.gender.value})} value={this.state.gender}>
                <option value="">--Select gender--</option>
                <option value="Female">Female</option>
                <option value="Male">Male</option>
                <option value="Other">Other</option>
              </select>
            </div>

          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label>Date Of Birth ( eg. 30/12/2016 )</label>
              <input type="text" className="form-control" ref="dob" onChange={() => this.setState({dob: this.refs.dob.value})} value={this.state.dob}/>
            </div>
          </div>
        </div>

        <div className="form-group">
          <label>Marital Status</label>

          <select className="form-control" ref="marital_status" onChange={() => this.setState({marital_status: this.refs.marital_status.value})} value={this.state.marital_status}>
            <option value="">--Select marital status--</option>
            <option value="Single">Single</option>
            <option value="Married">Married</option>
            <option value="Other">Other</option>
          </select>

        </div>

        <div className="row no-gutter">
          <div className="col-md-6 p-r">
            <div className="form-group">
              <label>Current Address</label>
              <textarea placeholder="your current address..." className="form-control" ref="address1" onChange={() => this.setState({address1: this.refs.address1.value})} value={this.state.address1}></textarea>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label>Permanent Address</label>
              <textarea placeholder="your permanent address..." className="form-control" ref="address2" onChange={() => this.setState({address2: this.refs.address2.value})} value={this.state.address2}></textarea>
            </div>
          </div>
        </div>

        <div className="row no-gutter">
          <div className="col-md-6 p-r">
            <div className="form-group">
              <label>Emergency Contact Information 1</label>
              <input type="text" className="form-control" ref="emergency_ph1" onChange={() => this.setState({emergency_ph1: this.refs.emergency_ph1.value})} value={this.state.emergency_ph1}/>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label>
                Emergency Contact Information 2</label>
              <input type="text" className="form-control" ref="emergency_ph2" onChange={() => this.setState({emergency_ph2: this.refs.emergency_ph2.value})} value={this.state.emergency_ph2}/>
            </div>
          </div>
        </div>

        <div className="form-group">
          <label>Blood Group</label>

          <select className="form-control" ref="blood_group" onChange={() => this.setState({blood_group: this.refs.blood_group.value})} value={this.state.blood_group}>
            <option value="">--select your blood group--</option>
            <option value="O+">O-</option>
            <option value="O-">O+</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
          </select>

        </div>

        <div className="form-group">
          <label>Any Medical Conditions</label>
          <textarea placeholder="your medical conditions..." className="form-control" ref="medical_condition" onChange={() => this.setState({medical_condition: this.refs.medical_condition.value})} value={this.state.medical_condition}></textarea>
        </div>

        <button className="col-xs-12 md-btn md-raised indigo" onClick={() => this.props.callUpdateUserProfileDetails(this.state)}>Update Profile Details</button>

      </div>

    )
  }
}

export default FormUserProfileDetails
