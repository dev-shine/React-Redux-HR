import React from 'react';
import * as _ from 'lodash';
import { DateField } from 'react-date-picker';
import 'react-date-picker/index.css';
import { ButtonRaised } from 'components/generic/buttons';


class AddSalaryForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: "",
      applicable_from: null,
      applicable_till: null,
      applicable_month: '',
      total_salary: '0',
      total_earning: '0',
      total_deduction: '0',
      leave: '0',
      increment_amount: '0',
      basic: '0',
      hra: '0',
      conveyance: '0',
      medical_allowance: '0',
      special_allowance: '0',
      arrear: "",
      epf: '0',
      loan: '0',
      advance: '0',
      misc_deduction: '0',
      tds: '0',
    }
    this.handleApplicableFrom = this.handleApplicableFrom.bind(this);
    this.handleApplicableTill = this.handleApplicableTill.bind(this);
  }
  handleApplicableFrom(date) {
    this.setState({
      applicable_from: date
    });
  }
  handleApplicableTill(date) {
    this.setState({
      applicable_till: date
    });
  }

  componentDidUpdate() {
    let e_basic = this.state.basic
    let e_hra = this.state.hra
    let e_conveyance = this.state.conveyance
    let e_medical_allowance = this.state.medical_allowance
    let e_special_allowance = this.state.special_allowance
    let e_arrear = this.state.arrear
    let n_total_earning = +e_basic + +e_hra + +e_conveyance + +e_medical_allowance + +e_special_allowance + +e_arrear

    let e_epf = this.state.epf
    let e_loan = this.state.loan
    let e_advance = this.state.advance
    let e_misc_deduction = this.state.misc_deduction
    let e_tds = this.state.tds
    let n_total_deduction = +e_epf + +e_loan + +e_advance + +e_misc_deduction + +e_tds

    let n_total_salary = (n_total_earning - n_total_deduction).toFixed(2);

    if (n_total_salary != this.state.total_salary
      || n_total_earning != this.state.total_earning
      || n_total_deduction != this.state.total_deduction) {
      this.setState({
        total_earning: n_total_earning,
        total_salary: n_total_salary,
        total_deduction: n_total_deduction
      })
    }
  }

  componentWillReceiveProps(props) {
    let applicable_from = null
    let applicable_till = null
    let total_salary = "0"
    let leave = '0'
    let increment_amount = '0'
    let basic = '0'
    let hra = '0'
    let conveyance = '0'
    let medical_allowance = '0'
    let special_allowance = '0'
    let arrear = '0'
    let epf = '0'
    let loan = '0'
    let advance = '0'
    let misc_deduction = '0'
    let tds = '0'

    if (typeof props.user_latest_salary_details.test != 'undefined') {
      if (typeof props.user_latest_salary_details.test.applicable_from != 'undefined') {
        //applicable_from = props.user_latest_salary_details.test.applicable_from
      }
      if (typeof props.user_latest_salary_details.test.applicable_till != 'undefined') {
        //applicable_till = props.user_latest_salary_details.test.applicable_till
      }
      if (typeof props.user_latest_salary_details.test.total_salary != 'undefined') {
        total_salary = props.user_latest_salary_details.test.total_salary
      }

      if (typeof props.user_latest_salary_details.test.leaves_allocated != 'undefined') {
        leave = props.user_latest_salary_details.test.leaves_allocated
      }
      if (typeof props.user_latest_salary_details.test.increment_amount != 'undefined') {
        increment_amount = props.user_latest_salary_details.test.increment_amount
      }
    }
    if (typeof props.user_latest_salary_details.Basic != 'undefined') {
      basic = props.user_latest_salary_details.Basic
    }
    if (typeof props.user_latest_salary_details.HRA != 'undefined') {
      hra = props.user_latest_salary_details.HRA
    }
    if (typeof props.user_latest_salary_details.Conveyance != 'undefined') {
      conveyance = props.user_latest_salary_details.Conveyance
    }
    if (typeof props.user_latest_salary_details.Medical_Allowance != 'undefined') {
      medical_allowance = props.user_latest_salary_details.Medical_Allowance
    }
    if (typeof props.user_latest_salary_details.Medical_Allowance != 'undefined') {
      special_allowance = props.user_latest_salary_details.Special_Allowance
    }
    if (typeof props.user_latest_salary_details.Arrears != 'undefined') {
      arrear = props.user_latest_salary_details.Arrears
    }
    if (typeof props.user_latest_salary_details.EPF != 'undefined') {
      epf = props.user_latest_salary_details.EPF
    }
    if (typeof props.user_latest_salary_details.Loan != 'undefined') {
      loan = props.user_latest_salary_details.Loan
    }
    if (typeof props.user_latest_salary_details.Advance != 'undefined') {
      advance = props.user_latest_salary_details.Advance
    }
    if (typeof props.user_latest_salary_details.Misc_Deductions != 'undefined') {
      misc_deduction = props.user_latest_salary_details.Misc_Deductions
    }
    if (typeof props.user_latest_salary_details.TDS != 'undefined') {
      tds = props.user_latest_salary_details.TDS
    }

    this.setState({
      user_id: props.userid,
      total_salary: total_salary,
      leave: leave,
      increment_amount: increment_amount,
      basic: basic,
      hra: hra,
      conveyance: conveyance,
      medical_allowance: medical_allowance,
      special_allowance: special_allowance,
      arrear: arrear,
      epf: epf,
      loan: loan,
      advance: advance,
      misc_deduction: misc_deduction,
      tds: tds,
    })
  }

  render() {
    let styles = _.cloneDeep(this.constructor.styles);
    let date = this.state.applicable_from;
    let opt = [];
    for(var i = 1; i <= 24; i++){
      opt.push(<option key={i} value={i}>{i} months</option>)
    }
    return (
      <div className="row salary-blocks-margin salary-row-bg">
        <div className="col-md-12 col-sm-12 salary-range-wrapper">
          <div className="applicable-from">
            <span className="salary-title">Applicable From : </span>
            <DateField dateFormat="YYYY-MM-DD" onChange={this.handleApplicableFrom} className="form-control date-field" />
          </div>
          <div className="applicable-till">
            <span className="salary-title">Applicable Months : </span>
            <select className="form-control" value={this.state.applicable_month} onChange={(e)=>this.setState({applicable_month: e.target.value})}>
              <option value=''>Select</option>
              {opt}
            </select>
          </div>
          <div className="leaves">
            <span className="salary-title">Leaves : </span>
            <input type="text" className="form-control leave-field" ref="leave" onChange={() => this.setState({ leave: this.refs.leave.value })} value={this.state.leave} />
          </div>
          <div className="incremented-value">
            <span className="salary-title">Incremented Amount : </span>
            <input type="text" className="form-control" onChange={(e) => this.setState({ increment_amount: e.target.value })} value={this.state.increment_amount} />
          </div>
        </div>
        <div className="col-md-12 salary-col-padding salary-add-details">
          <div className="col-md-1 col-sm-2 col-xs-12 salary-total-width">
            <div className="col-sm-12 salary-total-title">Total</div>
            <div className="col-sm-12 salary-total-value">{this.state.total_salary}</div>
          </div>
          <div className="col-md-5 col-sm-10 col-xs-12 bg-success salary-add-block salary-addition-width">
            <div className="col-sm-12">
              <div className="col-sm-12 salary-total-title">Total Earnings</div>
              <div className="col-sm-12 salary-total-value">{this.state.total_earning}</div>
            </div>
            <div className="col-sm-2 cell salary-basic-width">
              <div className="col-sm-12 salary-title">Basic</div>
              <div className="col-sm-12 salary-input-wrapper">
                <input type="text" className="form-control input-sm" ref="basic" onChange={() => this.setState({ basic: this.refs.basic.value })} value={this.state.basic} />
              </div>
            </div>
            <div className="col-sm-2 cell salary-hra-width">
              <div className="col-sm-12 salary-title">HRA</div>
              <div className="col-sm-12 salary-input-wrapper">
                <input type="text" className="form-control input-sm" ref="hra" onChange={() => this.setState({ hra: this.refs.hra.value })} value={this.state.hra} />
              </div>
            </div>
            <div className="col-sm-2 cell salary-conveyance-width">
              <div className="col-sm-12 salary-title">Conveyance</div>
              <div className="col-sm-12 salary-input-wrapper">
                <input type="text" className="form-control input-sm" ref="conveyance" onChange={() => this.setState({ conveyance: this.refs.conveyance.value })} value={this.state.conveyance} />
              </div>
            </div>
            <div className="col-sm-2 cell salary-medical-width">
              <div className="col-sm-12 salary-title">Medical Allowance</div>
              <div className="col-sm-12 salary-input-wrapper">
                <input type="text" className="form-control input-sm" ref="medical_allowance" onChange={() => this.setState({ medical_allowance: this.refs.medical_allowance.value })} value={this.state.medical_allowance} />
              </div>
            </div>
            <div className="col-sm-2 cell salary-special-width">
              <div className="col-sm-12 salary-title">Special Allowance</div>
              <div className="col-sm-12 salary-input-wrapper">
                <input type="text" className="form-control input-sm" ref="special_allowance" onChange={() => this.setState({ special_allowance: this.refs.special_allowance.value })} value={this.state.special_allowance} />
              </div>
            </div>
            <div className="col-sm-2 cell salary-arrears-width">
              <div className="col-sm-12 salary-title">Arrears</div>
              <div className="col-sm-12 salary-input-wrapper">
                <input type="text" className="form-control input-sm" ref="arrear" onChange={() => this.setState({ arrear: this.refs.arrear.value })} value={this.state.arrear} />
              </div>
            </div>
          </div>
          <div className="col-md-6 col-sm-12 col-xs-12 bg-danger salary-add-block salary-deduction-width">
          <div className="col-sm-12">
              <div className="col-sm-12 salary-total-title">Total Deductions</div>
              <div className="col-sm-12 salary-total-value">{this.state.total_deduction}</div>
            </div>
            <div className="col-sm-2 cell salary-epf-width">
              <div className="col-sm-12 salary-title">EPF</div>
              <div className="col-sm-12 salary-input-wrapper">
                <input type="text" className="form-control input-sm" ref="epf" onChange={() => this.setState({ epf: this.refs.epf.value })} value={this.state.epf} />
              </div>
            </div>
            <div className="col-sm-2 cell salary-loan-width">
              <div className="col-sm-12 salary-title">Loan</div>
              <div className="col-sm-12 salary-input-wrapper">
                <input type="text" className="form-control input-sm" ref="loan" onChange={() => this.setState({ loan: this.refs.loan.value })} value={this.state.loan} />
              </div>
            </div>
            <div className="col-sm-2 cell salary-advance-width">
              <div className="col-sm-12 salary-title">Advance</div>
              <div className="col-sm-12 salary-input-wrapper">
                <input type="text" className="form-control input-sm" ref="advance" onChange={() => this.setState({ advance: this.refs.advance.value })} value={this.state.advance} />
              </div>
            </div>
            <div className="col-sm-2 cell salary-miscdeductions-width">
              <div className="col-sm-12 salary-title">Misc Deductions</div>
              <div className="col-sm-12 salary-input-wrapper">
                <input type="text" className="form-control input-sm" ref="misc_deduction" onChange={() => this.setState({ misc_deduction: this.refs.misc_deduction.value })} value={this.state.misc_deduction} />
              </div>
            </div>
            <div className="col-sm-1 cell salary-tds-width">
              <div className="col-sm-12 salary-title">TDS</div>
              <div className="col-sm-12 salary-input-wrapper">
                <input type="text" className="form-control input-sm" ref="tds" onChange={() => this.setState({ tds: this.refs.tds.value })} value={this.state.tds} />
              </div>
            </div>
            <div className="col-sm-3 cell center salary-options-width">
              <i className="material-icons add-icon" onClick={() => this.props.callAddUserSalary(this.state)}>
                add_circle_outline
              </i>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

AddSalaryForm.styles = {
  leaveDiv: {
    'marginBottom': '10px'
  }
};

export default AddSalaryForm;
