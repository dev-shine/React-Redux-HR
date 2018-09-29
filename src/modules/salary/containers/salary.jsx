import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import * as _ from 'lodash';
import Menu from 'components/generic/Menu';
import { isNotUserValid } from 'src/services/generic';
import Header from 'components/generic/Header';
import SalaryDetails from 'modules/salary/components/userSalary/SalaryDetails';
import SalaryHistory from 'components/salary/userSalary/SalaryHistory';
import PayslipHistory from 'components/salary/userSalary/PayslipHistory';
import * as actions from 'appRedux/actions';
import * as actions_salary from 'appRedux/salary/actions/viewSalary';

class Salary extends React.Component {
  constructor(props) {
    super(props);
    this.props.onIsAlreadyLogin();
    this.viewSalarySummary = this.viewSalarySummary.bind(this);
    this.state = {
      view_salary_id: false,
      salary_details: {},
      holding_amt: '',
      payslip_history: []
    };
  }
  componentWillMount() {
    this.props.onSalaryDetails();
  }
  componentWillReceiveProps(props) {
    let isNotValid = isNotUserValid(this.props.route.path, props.loggedUser);
    if (isNotValid.status) {
      this.props.router.push(isNotValid.redirectTo);
    }

    let s_salary_details = {};
    let s_salary_history = [];
    let s_payslip_history = [];

    if (this.state.view_salary_id === false) {
      if (typeof props.salary.salary_history !== 'undefined' && props.salary.salary_history.length > 0) {
        let viewSalaryInfo = props.salary.salary_history[0];
        s_salary_details = viewSalaryInfo;
        s_salary_history = props.salary.salary_history;
      }
      if (typeof props.salary.payslip_history !== 'undefined' && props.salary.payslip_history.length > 0) {
        s_payslip_history = props.salary.payslip_history;
      }
    }

    this.setState({ salary_details: s_salary_details, salary_history: s_salary_history, payslip_history: s_payslip_history });
  }

  viewSalarySummary(id) {
    let new_details = this.state.salary_details;
    _.forEach(this.state.salary_history, (d, k) => {
      if (d.test.id === id) {
        new_details = d;
      }
    });
    this.setState({ 'salary_details': new_details });
  }
  render() {
    console.log(this.props.salary.salary_history);
    let data;
    if (this.props.salary.salary_history) {
      data = this.props.salary.salary_history.map((item, index) => {
        console.log(item);

        return (
          <div className="row" key={index} style={{ margin: "10px 0" }}>

            <div className="col-md-12 col-sm-12 salary-col-title-padding">
              <div className="col-sm-2">
                <div className="col-sm-12 salary-title">Applicable From</div>
                <div className="col-sm-12">{item.test.applicable_from}</div>
              </div>
              <div className="col-sm-2">
                <div className="col-sm-12 salary-title">Leaves Allocated</div>
                <div className="col-sm-12">{item.test.leaves_allocated}</div>
              </div>
              <div className="col-sm-2">
                <div className="col-sm-12 salary-title">Updated On</div>
                <div className="col-sm-12">{item.test.last_updated_on}</div>
              </div>
            </div>
            <div className="col-md-12 salary-col-padding">
              <div className="col-md-1 col-sm-2">
                <div className="col-sm-12 salary-title">Total Salary</div>
                <div className="col-sm-12">{item.test.total_salary}</div>
              </div>

              <div className="col-md-5 col-sm-10 bg-success salary-block">
                <div className="col-sm-2">
                  <div className="col-sm-12 salary-title">Basic</div>
                  <div className="col-sm-12">{item.Basic}</div>
                </div>
                <div className="col-sm-2">
                  <div className="col-sm-12 salary-title">HRA</div>
                  <div className="col-sm-12">{item.HRA}</div>
                </div>
                <div className="col-sm-2">
                  <div className="col-sm-12 salary-title">Conveyance</div>
                  <div className="col-sm-12">{item.Conveyance}</div>
                </div>
                <div className="col-sm-3">
                  <div className="col-sm-12 salary-title">Medical Allowance</div>
                  <div className="col-sm-12">{item.Medical_Allowance}</div>
                </div>
                <div className="col-sm-3">
                  <div className="col-sm-12 salary-title">Special Allowance</div>
                  <div className="col-sm-12">{item.Special_Allowance}</div>
                </div>
              </div>
              <div className="col-md-6 col-sm-12 bg-danger salary-block">
                <div className="col-sm-2">
                  <div className="col-sm-12 salary-title">EPF</div>
                  <div className="col-sm-12">{item.EPF}</div>
                </div>
                <div className="col-sm-2">
                  <div className="col-sm-12 salary-title">Loan</div>
                  <div className="col-sm-12">{item.Loan}</div>
                </div>
                <div className="col-sm-2">
                  <div className="col-sm-12 salary-title">Advance</div>
                  <div className="col-sm-12">{item.Advance}</div>
                </div>
                <div className="col-sm-2">
                  <div className="col-sm-12 salary-title">Misc Deductions</div>
                  <div className="col-sm-12">{item.Misc_Deductions}</div>
                </div>
                <div className="col-sm-1">
                  <div className="col-sm-12 salary-title">TDS</div>
                  <div className="col-sm-12">{item.TDS}</div>
                </div>
                <div className="col-sm-3">
                  <div className="col-sm-12 salary-title">Holding Amount</div>
                  <div className="col-sm-12 salary-holding-btn">
                    <input type="text"
                      className="col-md-12 col-sm-6"
                    //id="hold1"
                    //fullWidth
                    //onChange={(evt) => { this.setState({ holdingAmount: evt.target.value }); }}
                    //value={this.state.holdingAmount}
                    />
                    <input type="button"
                      //id="addHolding" 
                      className="col-md-12 col-sm-6 sm-btn md-raised info"
                      value="Add Holding" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      });
    }
    return (
      <div >
        <Menu {...this.props} />
        <div id="content" className="app-content box-shadow-z0" role="main">
          <Header pageTitle={'Salary'} showLoading={this.props.frontend.show_loading} />
          <div className="app-body" id="view">
            <div className="padding">
              <div className="box">
                <div className="box-divider m-a-0"></div>
                <div className="box-body">
                  <div style={{ fontSize: "10px" }}>
                    {data}
                  </div>
                  <div className="row">
                    <div className="col-sm-6 col-xs-12" id={'salaryDetail'}>
                      <h6 className="text-center">Salary Details</h6>
                      <SalaryDetails holdingAmount={this.state.holding_amt} data={this.state.salary_details} />
                    </div>
                    <div className="col-sm-3 col-xs-6 salary-border-left" id={'salaryRevision'}>
                      <h6 className="text-center">Salary Revisions</h6>
                      <h6 className="text-center" >(Click on Salary for details)</h6>
                      <hr />
                      <SalaryHistory data={this.props.salary.salary_history} viewSalarySummary={this.viewSalarySummary} />
                    </div>
                    <div className="col-sm-3 col-xs-6 salary-border-left" id={'payslips'}>
                      <h6 className="text-center">Previous Payslips</h6>
                      <hr />
                      <PayslipHistory payslip_history={this.state.payslip_history} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div >
    );
  }
}

Salary.styles = {
  height100per: {
    'minHeight': '150px'
  }
};

function mapStateToProps(state) {
  return {
    frontend: state.frontend.toJS(),
    loggedUser: state.logged_user.userLogin,
    salary: state.salary.toJS()
  };
}
const mapDispatchToProps = (dispatch) => {
  return {
    onIsAlreadyLogin: () => {
      return dispatch(actions.isAlreadyLogin());
    },
    onSalaryDetails: () => {
      return dispatch(actions_salary.getSalaryDetails());
    }
  };
};

const VisibleSalary = connect(mapStateToProps, mapDispatchToProps)(Salary);

const RouterVisibleSalary = withRouter(VisibleSalary);

export default RouterVisibleSalary;
