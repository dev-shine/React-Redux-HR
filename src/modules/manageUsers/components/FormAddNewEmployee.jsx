import React from "react";
import Dialog from "material-ui/Dialog";
import TextField from "material-ui/TextField";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { notify } from "../../../services/notify";
import Menu from "../../../components/generic/Menu";
import { isNotUserValid } from "../../../services/generic";
import Header from "../../../components/generic/Header";
import { CONFIG } from "../../../config/index";
import { DateField } from "react-date-picker";
import AddNewEmployeeDetails from "./FormAddNewEmployeeDetails";
// import "react-date-picker/index.css";
import { withRouter } from "react-router";
import CircularProgress from "material-ui/CircularProgress";
import Button from "../../../components/generic/buttons/Button";
import DatePicker from "material-ui/DatePicker";
import ButtonRaised from "../../../components/generic/buttons/ButtonRaised";
import * as actions from "../../../redux/actions";
import * as actionsUsersList from "../../../redux/generic/actions/usersList";
import * as actionsManageUsers from "../../../redux/manageUsers/actions/manageUsers";

class FormAddNewEmployee extends React.Component {
  constructor(props) {
    super(props);
    this.props.onIsAlreadyLogin();
    this.state = {
      loading: false,
      dateofjoining: new Date(),
      name: "",
      user_id: "",
      jobtitle: "",
      gender: "",
      dob: new Date(),
      username: "",
      training_month: "",
      workemail: ""
    };
    this.callAddNewEmployee = this.callAddNewEmployee.bind(this);
  }
  componentWillMount() {
    this.props.onUsersList();
  }

  callAddNewEmployee(newEmployeeDetails) {
    this.setState({
      loading: true
    });
    this.props.onAddNewEmployee(newEmployeeDetails).then(
      data => {
        notify(data.message);
        this.props.onUsersList();
        this.setState({
          user_id: data.user_id
        });
        this.props.router.push(`/add_new_employee/${this.state.user_id}`);
        let uname = this.props.usersList.username;
      },
      error => {
        this.setState({
          loading: false
        });
        notify(error);
      }
    );
  }

  render() {
    return (
      <div>
        <Menu {...this.props} />
        <div id="content" className="app-content box-shadow-z0" role="main">
          <Header
            pageTitle={"Add New Employee Details"}
            showLoading={this.props.frontend.show_loading}
          />
          <div className="app-body" id="view">
            <div className="padding">
              <div className="row">
                <div className="col-md-12">
                  <div className="col-md-1" />
                  <div className="text-danger">

                    <i>
                      *Create a slack profile first and enter email in Work
                      Email
                    </i>
                  </div>
                  <div className="col-md-1" />
                  <div className="text-info">
                    *Default password is : {CONFIG.DEFAULT_PASSWORD}
                  </div>
                  <div className="row">
                    <div className="row p-y">
                      <div className="col-md-12">
                        <div className="col-md-1 input-wrapper" />
                        <div className="col-md-4 input-wrapper">
                          Date of Joining
                          <DatePicker
                            hintText="Date of Joining"
                            value={this.state.dateofjoining}
                            onChange={(event, date) => {
                              this.setState({ dateofjoining: date });
                            }}
                          />
                        </div>
                        <div className="col-md-4 input-wrapper">
                          Date of Birth
                          <DatePicker
                            hintText="Date of Birth"
                            value={this.state.dob}
                            onChange={(event, date) => {
                              this.setState({ dob: date });
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row p-y">
                      <div className="col-xs-12">
                        <div className="col-md-1 input-wrapper" />
                        <div className="col-md-4 input-wrapper">
                          Training Month
                          <select
                            className="form-control"
                            ref="training_month"
                            onChange={evt => {
                              this.setState({
                                training_month: evt.target.value
                              });
                            }}
                          >
                            <option disabled>--select month--</option>
                            <option value="0">0 month </option>
                            <option value="1">1 month</option>
                            <option value="2">2 month</option>
                            <option value="3">3 month</option>
                            <option value="4">4 month</option>
                          </select>
                        </div>
                        <div className="col-md-4 p-y input-wrapper">
                          Gender
                          <select
                            className="form-control"
                            ref="gender"
                            onChange={e =>
                              this.setState({ gender: e.target.value })
                            }
                            value={this.state.gender}
                          >
                            <option value="">--Select gender--</option>
                            <option value="Female">Female</option>
                            <option value="Male">Male</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="row p-y">
                      <div className="col-xs-12">
                        <div className="col-md-1 input-wrapper" />
                        <div className="col-md-4 input-wrapper">
                          <TextField
                            floatingLabelText="Name"
                            floatingLabelFixed
                            fullWidth
                            onChange={e =>
                              this.setState({ name: e.target.value })
                            }
                            value={this.state.name}
                          />
                        </div>

                        <div className="col-md-4 input-wrapper">
                          <TextField
                            floatingLabelText="Job Title"
                            floatingLabelFixed
                            fullWidth
                            onChange={e =>
                              this.setState({ jobtitle: e.target.value })
                            }
                            value={this.state.jobtitle}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-1 input-wrapper" />
                    <div className="col-md-4 input-wrapper">
                      <TextField
                        floatingLabelText="UserName"
                        floatingLabelFixed
                        fullWidth
                        onChange={e =>
                          this.setState({ username: e.target.value })
                        }
                        value={this.state.username}
                      />
                    </div>
                    <div className="col-md-4 input-wrapper">
                      <TextField
                      type="email"
                        floatingLabelText="Work Email"
                        floatingLabelFixed
                        fullWidth
                        onChange={e =>
                          this.setState({ workemail: e.target.value })
                        }
                        value={this.state.workemail}
                      />
                    </div>
                    <div className="col-xs-4 input-wrapper" />
                  </div>
                  <br />
                  <br />
                  <div className="col-md-8  input-wrapper">
                    <div className="col-md-1 input-wrapper" />
                    {this.state.loading == false ? (
                      <ButtonRaised
                        className="col-xs-10 p-y-2 m-b-sm indigo"
                        onClick={() => this.callAddNewEmployee(this.state)}
                        label={"Next"}
                      />
                    ) : (
                      <CircularProgress />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    frontend: state.frontend.toJS(),
    loggedUser: state.logged_user.userLogin,
    manageUsers: state.manageUsers.toJS(),
    usersList: state.usersList.toJS()
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onIsAlreadyLogin: () => {
      return dispatch(actions.isAlreadyLogin());
    },
    onAddNewEmployee: newEmployeeDetails => {
      return dispatch(actionsManageUsers.addNewEmployee(newEmployeeDetails));
    },
    onUsersList: () => {
      return dispatch(actionsUsersList.get_users_list());
    }
  };
};

const AddNewEmployee = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(FormAddNewEmployee)
);

export default AddNewEmployee;

AddNewEmployee.PropTypes = {
  onIsAlreadyLogin: PropTypes.func.isRequired,
  usersList: PropTypes.object.isRequired,
  onAddNewEmployee: PropTypes.func.isRequired,
  router: PropTypes.object.isRequired
};
