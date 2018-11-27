import React from 'react';
import * as _ from 'lodash';
import DateField from 'react-date-picker';
import ButtonRaised from "../../components/generic/buttons/ButtonRaised";
import {confirm} from '../../services/notify';
import InputText from '../../components/generic/input/InputText';

class HolidaysList extends React.Component{

  render(){
    const { holidayType, yearArray } = this.props;
    let img = <img src='./socialMediaIcons/holidays.svg' className="w-40 img-circle m-x-md" />;
    let holidaysList = <tr><td className="text-muted text-center" colSpan={4}><h2>{img} Loading Holidays...</h2></td></tr>;
    if (this.props.holidays !== undefined && _.size(this.props.holidays) === 0) {
      holidaysList = <tr><td className="text-muted text-center" colSpan={4}><h2>{img} No Holidays This Year.</h2></td></tr>;
    } else if (this.props.holidays !== undefined) {
        this.props.holidays.sort(function compare (a, b) {
          var dateA = new Date(a.date);
          var dateB = new Date(b.date);
          return dateA - dateB;
        });
        holidaysList = _.map(this.props.holidays, (holiday, key) => {
        return (
          <tr key={key}>
            <td>{holiday.month}</td>
            <td>{holiday.date}</td>
            <td>{holiday.dayOfWeek}</td>
            <td>{holiday.name}</td>
            <td>{holiday.type_text}</td>
            {this.props.isAdmin?<td><button
                className="md-btn md-raised m-b-sm danger"
                id={holiday.id}
                onClick={(e) => {
                  confirm(
                    "Are you sure ?",
                    "Do you want to delete this holiday ?",
                    "warning"
                  ).then(res => {
                    if (res) {
                      this.props.deleteHoliday(
                        holiday.id
                      );
                    }
                  });
                }}
                aria-hidden="true"
              >
                Delete
              </button></td>:null}
          </tr>
        );
      });
    } 
  
  
    return (
      <div>
        <div className="row">
          <div className="col-md-5" style={{float:"left"}}>
            <div className="col-md-3" style={{paddingLeft:"1px", paddingLeft:"1px"}}>
              <select
                      className="form-control"
                      ref="year_holidays"
                      onChange={e => {
                        this.props.handleYearChange(e);
                      }}
                      value={this.props.state.year}
                      style={{minHeight:'0'}}
                  >
                    {yearArray && yearArray.map((data,index)=><option key={index} value={data}>{data}</option>)}
              </select>
            </div>
          </div>
      {this.props.isAdmin ? 
          <div className="col-md-7" style={{float:"right"}}>
            <div className="col-md-3" style={{paddingTop:"2px", paddingRight:"1px"}}>
            <DateField dateFormat="YYYY-MM-DD" onChange={(date) =>{this.props.handleDateChnage(date)} } value={this.props.state.date}/>
            </div>
            <div className="col-md-3" style={{paddingLeft:"1px", paddingRight:"1px"}}>
                          <InputText onchange={e =>{
                              this.props.handleHolidayNameChnage(e);
                            }} value={this.props.state.holidayName}
                            placeHolder="Holiday Name"
                            style={{minHeight:'0'}}
                            />
            </div>
            <div className="col-md-3" style={{paddingLeft:"1px", paddingRight:"1px"}}>
              <select
                  className="form-control"
                  ref="holiday_type"
                  onChange={e => {
                    this.props.handleTypeChnage(e);
                  }}
                  value={this.props.state.type}
                  style={{minHeight:'0'}}
              >
                {holidayType && holidayType.map((data,index)=><option key={index} value={data.type}>{data.text}</option>)}
              </select>
            </div>
            <div className="col-md-3" style={{paddingTop:"2px", paddingLeft:"1px", paddingRight:"1px"}}>
              <ButtonRaised
                          className="col-xs-10 p-y-2 m-b-sm indigo"
                          onClick={() => this.props.addHoliday()}
                          label={"Add Holiday"}
                          style={{width:"100%"}}
                          disabled={this.props.state.date === "" || this.props.state.holidayName === "" || this.props.state.type === ""}
                        />
                
            </div>
          </div>
      :null}
      </div>
      <div className="row">
        <div className="col-12">
          <div className="table-responsive box">
            <div className="box-divider m-a-0"></div>
            <table className="table table-striped">
              <thead className="success">
                <tr><th>Month</th><th>Date</th><th>Day</th><th>Holiday</th><th>Type</th>{this.props.isAdmin?<th>Actions</th>:null}</tr>
              </thead>
              <tbody>
                {holidaysList}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    );
  }
}

export default HolidaysList;
