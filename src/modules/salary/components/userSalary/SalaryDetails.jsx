import React from 'react';
import {Button} from 'components/generic/buttons';

class SalaryDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      holdingAmount: ''
    }
  }
  componentWillReceiveProps(props) {
    this.setState({holdingAmount: props.data});
  }
  render() {
    let F_total_salary = ""
    let F_leaves_allocated = ""
    let F_applicable_from = ""
    if (typeof typeof this.props.data != 'undefined' && typeof this.props.data.test != 'undefined') {
      F_total_salary = this.props.data.test.total_salary
      F_leaves_allocated = this.props.data.test.leaves_allocated
      F_applicable_from = this.props.data.test.applicable_from
    }

    return (
      <div>
        <hr/>
        <div className="row">
          <div className="col-xs-12">
            <div className="p-y text-center text-sm-left">
              <a href="" className="inline p-x text-center">
                <span className="h4 block m-a-0">{F_total_salary}</span>
                <small className="text-xs text-muted">Total Salary</small>
              </a>
              <a href="" className="inline p-x b-l b-r text-center">
                <span className="h4 block m-a-0">{F_leaves_allocated}</span>
                <small className="text-xs text-muted">Leaves Allocated</small>
              </a>
              <a href="" className="inline p-x text-center">
                <span className="h4 block m-a-0">{F_applicable_from}</span>
                <small className="text-xs text-muted">Applicable From</small>
              </a>
            </div>
          </div>
        </div>
        <hr/>
        <div className="row">
          <div className="col-xs-6 col-sm-4">
            <div className="box p-a">
              <div className="clear">
                <h5 className="m-a-0 _500">
                  {this.props.data.Basic}<span className="text-sm"></span>
                </h5>
                <small className="text-muted">
                  Basic
                </small>
              </div>
            </div>
          </div>
          <div className="col-xs-6 col-sm-4">
            <div className="box p-a">
              <div className="clear">
                <h5 className="m-a-0 _500">
                  {this.props.data.EPF}<span className="text-sm"></span>
                </h5>
                <small className="text-muted">
                  EPF
                </small>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-6 col-sm-4">
            <div className="box p-a">
              <div className="clear">
                <h5 className="m-a-0 _500">
                  {this.props.data.HRA}<span className="text-sm"></span>
                </h5>
                <small className="text-muted">
                  HRA
                </small>
              </div>
            </div>
          </div>
          <div className="col-xs-6 col-sm-4">
            <div className="box p-a">
              <div className="clear">
                <h5 className="m-a-0 _500">
                  {this.props.data.Loan}<span className="text-sm"></span>
                </h5>
                <small className="text-muted">
                  Loan
                </small>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-6 col-sm-4">
            <div className="box p-a">
              <div className="clear">
                <h5 className="m-a-0 _500">
                  {this.props.data.Conveyance}<span className="text-sm"></span>
                </h5>
                <small className="text-muted">
                  Conveyance
                </small>
              </div>
            </div>
          </div>
          <div className="col-xs-6 col-sm-4">
            <div className="box p-a">
              <div className="clear">
                <h5 className="m-a-0 _500">
                  {this.props.data.Advance}<span className="text-sm"></span>
                </h5>
                <small className="text-muted">
                  Advance
                </small>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-6 col-sm-4">
            <div className="box p-a">
              <div className="clear">
                <h5 className="m-a-0 _500">
                  {this.props.data.Medical_Allowance}<span className="text-sm"></span>
                </h5>
                <small className="text-muted">
                  Medical Allowance
                </small>
              </div>
            </div>
          </div>
          <div className="col-xs-6 col-sm-4">
            <div className="box p-a">
              <div className="clear">
                <h5 className="m-a-0 _500">
                  {this.props.data.Misc_Deductions}<span className="text-sm"></span>
                </h5>
                <small className="text-muted">
                  Misc Deductions
                </small>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-6 col-sm-4">
            <div className="box p-a">
              <div className="clear">
                <h5 className="m-a-0 _500">
                  {this.props.data.Special_Allowance}<span className="text-sm"></span>
                </h5>
                <small className="text-muted">
                  Special Allowance
                </small>
              </div>
            </div>
          </div>
          <div className="col-xs-6 col-sm-4">
            <div className="box p-a">
              <div className="clear">
                <h5 className="m-a-0 _500">
                  {this.props.data.TDS}<span className="text-sm"></span>
                </h5>
                <small className="text-muted">
                  TDS
                </small>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-6 col-sm-4">
            <div className="box p-a">
              <div className="clear">
                <h5 className="m-a-0 _500">
                  {this.props.data.Arrears}<span className="text-sm"></span>
                </h5>
                <small className="text-muted">
                  Arrears
                </small>
              </div>
            </div>
          </div>
          <div className="col-xs-6 col-sm-4">
            <div className="box p-a">
              <div className="clear">
                <small className="text-muted">
                  Holding Amount
                </small>
                <input type="text" style={{'width': 84}} onChange={(evt) => {this.setState({holdingAmount: evt.target.value})}} value={this.state.holdingAmount} />
                <Button style={{'marginTop': 10, 'marginLeft': 5}} type="button" label="Submit" />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default SalaryDetails
