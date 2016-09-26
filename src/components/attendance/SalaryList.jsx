import React from 'react';
import * as _ from 'lodash'
const classNames = require('classnames');
//import Holiday from '../../components/holidaysList/Holiday'

class SalaryList extends React.Component {
    constructor( props ){
        super( props );
        this.state = {
          empList: this.props.empList,
          sorting:[{
            "className":"fa fa-fw fa-sort",
            "headName":"empName",
            "orderIn":"non"
          },
          {
            "className":"fa fa-fw fa-sort",
            "headName":"designation",
            "orderIn":"non"
          },
          {
            "className":"fa fa-fw fa-sort",
            "headName":"salary",
            "orderIn":"non"
          },
          {
            "className":"fa fa-fw fa-sort",
            "headName":"dateOfJoining",
            "orderIn":"non"
          },
          {
            "className":"fa fa-fw fa-sort",
            "headName":"noOfDaysSinceJoined",
            "orderIn":"non"
          },
          {
            "className":"fa fa-fw fa-sort",
            "headName":"preSalaryIncDetail",
            "orderIn":"non"
          },
          {
            "className":"fa fa-fw fa-sort",
            "headName":"nextSallaryInc",
            "orderIn":"non"
          }]
        }
        this.search = this.search.bind( this )
        this.sort = this.sort.bind(this)
    }
    search(searchValue){
      if(searchValue != "null" && searchValue != ""){
        var emps = []
        _.forEach(this.props.empList, function(emp, i) {
          if((emp.empName.toLowerCase().indexOf(searchValue.toLowerCase()) != -1)
           || (emp.designation.toLowerCase().indexOf(searchValue.toLowerCase()) != -1)
           || (emp.salary.indexOf(searchValue) != -1)
           || (emp.dateOfJoining.indexOf(searchValue) != -1)
           || (emp.noOfDaysSinceJoined.indexOf(searchValue) != -1)
           || (emp.preSalaryIncDetail.toLowerCase().indexOf(searchValue.toLowerCase()) != -1)
           || (emp.nextSallaryInc.toLowerCase().indexOf(searchValue.toLowerCase()) != -1)){
               
                emps.push({
                    "image": emp.image,
                    "empName": emp.empName,
                    "designation": emp.designation,
                    "salary":emp.salary,
                    "holdingAmountDetail":emp.holdingAmountDetail,
                    "dateOfJoining":emp.dateOfJoining,
                    "noOfDaysSinceJoined":emp.noOfDaysSinceJoined,
                    "preSalaryIncDetail":emp.preSalaryIncDetail,
                    "nextSallaryInc":emp.nextSallaryInc
                })
          }
        })
        this.setState({
          empList:emps
        })
      }else{
        this.setState({
          empList:this.props.empList
        })
      }
    }
    sort(id){
      let newSorting = []
      let self = this;
      _.forEach(this.state.sorting, function(ob, i) {
        if(i==id){
          let sortBy = ob.headName
          let empList = self.state.empList
          let orderIn = "non"
          let clsName = "fa fa-fw fa-sort"
          if(ob.orderIn=="non"){
            empList.sort(function(i,j){
                if(i[sortBy].toString().localeCompare(j[sortBy].toString())==1)
                  return 1;
                if(i[sortBy].toString().localeCompare(j[sortBy].toString())==0)
                  return 0;
                if(i[sortBy].toString().localeCompare(j[sortBy].toString())==-1)
                  return -1;
            })
            orderIn = "asc"
            clsName = "fa fa-fw fa-sort-asc"
          }else if(ob.orderIn=="asc"){
            empList.sort(function(i,j){
                if(j[sortBy].toString().localeCompare(i[sortBy].toString())==1)
                  return 1;
                if(j[sortBy].toString().localeCompare(i[sortBy].toString())==0)
                  return 0;
                if(j[sortBy].toString().localeCompare(i[sortBy].toString())==-1)
                  return -1;
            })
            orderIn = "desc"
            clsName = "fa fa-fw fa-sort-desc"
          }else{
            empList.sort(function(i,j){
                if(i[sortBy].toString().localeCompare(j[sortBy].toString())==1)
                  return 1;
                if(i[sortBy].toString().localeCompare(j[sortBy].toString())==0)
                  return 0;
                if(i[sortBy].toString().localeCompare(j[sortBy].toString())==-1)
                  return -1;
            })
            orderIn = "asc"
            clsName = "fa fa-fw fa-sort-asc"
          }
          newSorting.push({
            "className":clsName,
            "headName":ob.headName,
            "orderIn":orderIn
          })
          self.setState({
            empList:empList
          })
        }else{
          newSorting.push({
            "className":"fa fa-fw fa-sort",
            "headName":ob.headName,
            "orderIn":"non"
          })
        }
      })
     this.setState({
      sorting:newSorting
     })
    }
    render(){
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
              <td>{emp.preSalaryIncDetail}</td>
              <td>{emp.nextSallaryInc}</td>
            </tr>
        )
      })
      return (
        <div>
        <div className="row no-gutter">
                    <div className="col-md-6 p-r">
                      <div className="form-group">
                        <label style={{'fontSize':15}}>Search:</label>
                        <input type="text" className="form-control" ref="search" onChange={ () => {
                          this.search(this.refs.search.value)
                        } }/>
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
              <th>Employe name<i style={{'cursor':'pointer'}} ref="empName" id={0} className={this.state.sorting[0].className} onClick={()=>{
                this.sort(this.refs.empName.id)
              }}></i></th>
              <th>Designation<i style={{'cursor':'pointer'}} ref="desig" id={1} className={this.state.sorting[1].className} onClick={()=>{
                this.sort(this.refs.desig.id)
              }}></i></th>
              <th>Salary<i style={{'cursor':'pointer'}} ref="salary" id={2} className={this.state.sorting[2].className} onClick={()=>{
                this.sort(this.refs.salary.id)
              }}></i></th>
              <th style={{'textAlign':'center'}} >
              Holding Amount Details
              </th>
              <th>Date of Joining<i style={{'cursor':'pointer'}} ref="dateOfJoining" id={3} className={this.state.sorting[3].className} onClick={()=>{
                this.sort(this.refs.dateOfJoining.id)
              }}></i></th>
              <th >No of Days Since Joined<i style={{'cursor':'pointer'}} ref="noOfDaysSinceJoined" id={4} className={this.state.sorting[4].className} onClick={()=>{
                this.sort(this.refs.noOfDaysSinceJoined.id)
              }}></i></th>
              <th >Previous Increment Details<i style={{'cursor':'pointer'}} ref="preSalaryIncDetail" id={5} className={this.state.sorting[5].className} onClick={()=>{
                this.sort(this.refs.preSalaryIncDetail.id)
              }}></i></th>
              <th >Next Increment<i style={{'cursor':'pointer'}} ref="nextSallaryInc" id={6} className={this.state.sorting[6].className} onClick={()=>{
                this.sort(this.refs.nextSallaryInc.id)
              }}></i></th>
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

export default SalaryList


