import React from 'react';
import * as _ from 'lodash';
import {DateField} from 'react-date-picker';
import ButtonRaised from "components/generic/buttons/ButtonRaised";
import InputText from 'components/generic/input/InputText';
import { getToken } from 'src/services/generic';

class HolidaysList extends React.Component{
  constructor(props){
    super(props);
    this.state={
      date:"",
      holidayName:"",
      type:""
    };
  }
  componentWillReceiveProps(props){
    if(props.holidayType){
      this.setState({type:props.holidayType[0].type})
    }
  }
  render(){
    const { holidayType } = this.props;
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
        </tr>
      );
    });
  } 
  
  
    return (
      <div>
      {this.props.isAdmin ? <div className="row">
        <div className="col-md-7" style={{float:"right"}}>
          <div className="col-md-3" style={{paddingTop:"2px", paddingRight:"1px"}}>
          <DateField dateFormat="YYYY-MM-DD" onChange={(date) => this.setState(
                    { date: date }
                  )} value={this.state.date}/>
          </div>
          <div className="col-md-3" style={{paddingLeft:"1px", paddingRight:"1px"}}>
                        <InputText onchange={e =>
                            this.setState({ holidayName: e.target.value })
                          } value={this.state.holidayName}
                          placeHolder="Holiday Name"
                          style={{minHeight:'0'}}
                          />
          </div>
          <div className="col-md-3" style={{paddingLeft:"1px", paddingRight:"1px"}}>
            <select
                className="form-control"
                ref="training_month"
                onChange={e => {
                  this.setState({ type: e.target.value });
                }}
                value={this.state.type}
                style={{minHeight:'0'}}
            >
              {holidayType && holidayType.map((data,index)=><option value={data.type}>{data.text}</option>)}
            </select>
          </div>
          <div className="col-md-3" style={{paddingTop:"2px", paddingLeft:"1px", paddingRight:"1px"}}>
             <ButtonRaised
                        className="col-xs-10 p-y-2 m-b-sm indigo"
                        onClick={() => this.props.addHoliday({data:this.state,token:getToken()})}
                        label={"Add Holiday"}
                        style={{width:"100%"}}
                        disabled={this.state.date === "" || this.state.holidayName === "" || this.state.type === ""}
                      />
              
          </div>
        </div>
      </div>:null}
      <div className="row">
        <div className="col-12">
          <div className="table-responsive box">
            <div className="box-divider m-a-0"></div>
            <table className="table table-striped">
              <thead className="success">
                <tr><th>Month</th><th>Date</th><th>Day</th><th>Holiday</th></tr>
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
