import React from 'react';
import * as _ from 'lodash'
const classNames = require('classnames');

class TeamDetails extends React.Component {
    constructor( props ){
        super( props );
        this.state = {
          empList: this.props.empList.empList,
          all_Teams: this.props.empList.all_Teams,
        }
        this.onSelectTeam = this.onSelectTeam.bind(this)
    }
    onSelectTeam(e){
      let selectedTeam = e.target.value
      if(selectedTeam == ""){
        this.setState({
          empList: this.props.empList.empList
        })
      }else{
        var emps = []
        _.forEach(this.props.empList.empList,function(emp,i){
          if(emp.team == selectedTeam){
            emps.push({
              "image": emp.image,
              "empName": emp.empName,
              "designation": emp.designation,
              "salary":emp.salary,
              "holdingAmountDetail":emp.holdingAmountDetail,
              "dateOfJoining":emp.dateOfJoining,
              "noOfDaysSinceJoined":emp.noOfDaysSinceJoined,
              "preSalaryIncDetail":emp.preSalaryIncDetail,
              "nextSallaryInc":emp.nextSallaryInc,
              "team":emp.team
            })
          }
        })
        this.setState({
          empList:emps
        })
      }
    }
    render(){
      let selection_options =  _.map( this.state.all_Teams , ( team, key ) => {
        return(<option key={key} value={team}>{team}</option>)
      })
      let row =  _.map( this.state.empList , ( emp, key ) => {
        return (
            <tr key={key}>
              <td><div className="list-left">
                <span className="w-40 avatar">
                  <img src={emp.image} />
                </span>
              </div></td>
              <td>{emp.empName}</td>
              <td>{emp.designation}</td>
              <td>{emp.salary}</td>
              <td>{emp.holdingAmountDetail!=""?
                <ul>
                  <li>Holding amount : {emp.holdingAmountDetail.holding_amt}</li>
                  <li>Start date : {emp.holdingAmountDetail.holding_start_date}</li>
                  <li>End date : {emp.holdingAmountDetail.holding_end_date}</li>
                  <li>Reason : {emp.holdingAmountDetail.reason}</li>
                </ul>:""
              }</td>
              <td>{emp.dateOfJoining}</td>
              <td>{emp.noOfDaysSinceJoined}</td>
              <td>{emp.team}</td>
              <td>{emp.nextSallaryInc}</td>
            </tr>
        )
      })
      return (
        <div>
          <div className="row no-gutter">
            <div className="col-md-6 p-r">
              <div className="form-group">
                <label style={{'fontSize':15}}>Select Team:</label>
                  <select className="form-control" ref="team_status" onChange={(e)=>{this.onSelectTeam(e)}}>
                    <option value="">--Select team--</option>
                    {selection_options}
                  </select>
                </div>
              </div>
            </div>
            <div className = "row">
              <div className="col-12">
                <div className="box">
                  <div className="box">
                    <div className="box-divider m-a-0"></div>
                  <div>
                  <table className="table" >
                    <thead>
                      <tr>
                        <th >Image</th>
                        <th>Employe name</th>
                        <th>Designation</th>
                        <th>Salary</th>
                        <th style={{'textAlign':'center'}} >
                          Holding Amount Details
                        </th>
                        <th>Date of Joining</th>
                        <th >No of Days Since Joined</th>
                        <th >Team</th>
                        <th >Next Increment</th>
                      </tr>
                    </thead>
                    <tbody>
                      {row}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      )
    }
}

export default TeamDetails


