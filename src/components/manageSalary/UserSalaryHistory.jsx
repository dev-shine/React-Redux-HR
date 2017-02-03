import React,{ Component } from 'react';
import { connect } from 'react-redux'
import {notify} from '../../services/index'

import LoadingIcon from '../../components/generic/LoadingIcon'


class UserSalaryHistory extends React.Component {
    constructor( props ){
    	super( props )
    }
    componentDidMount(){

    }
	componentWillReceiveProps( props ){


    }

    render(){
      console.log(this.props);
      let test = this.props.message == undefined ? null: (
        <div className="well well-lg" style={{'color':"red"}} >
      <i className="fa fa-exclamation-triangle fa-3x" aria-hidden="true"></i>
   {this.props.message} </div>
    );

    	let salaryHistoryHtml = _.map( this.props.data, ( d,k ) => {
      let test = this.props.message == undefined ?
      (<div className="sl-item b-info"  key={k}  onClick={ () => this.props.viewSalarySummary( d.test.id ) } style={{'cursor':"pointer"}}>
                <div className="sl-content">
                  <div className="sl-date text-muted">  Applicable From  : {d.test.applicable_from}</div>
                  <div className="sl-date text-muted">  Applicable Till  : {d.test.applicable_till}</div>
                  <div className="sl-date text-muted"> Updated on : {d.test.last_updated_on} </div>
                  <div>
                       <b>Rs.{d.test.total_salary} </b>
                  </div>
                  <div>
                    <button
                      className="btn-sm btn-outline b-danger text-danger"
                      onClick={ () => this.props.callDeleteUserSalary( d.test.user_Id, d.test.id ) }
                    >Delete Salary</button>
                  </div>
                </div>
            </div>): (<span>{this.props.message}</span> );
			return (test)
		})

      	return (
      		<div>
      			<div className="box-body">
      				<div className="streamline b-l m-l">
                {test}
      					{salaryHistoryHtml}
      				</div>
      			</div>
      		</div>
      	)
    }
}

export default UserSalaryHistory
