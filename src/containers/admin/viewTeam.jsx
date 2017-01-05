import React from 'react';
import { connect } from 'react-redux'
import { Router, browserHistory, Link, withRouter } from 'react-router'

import * as _ from 'lodash'
import {notify} from '../../services/index'
import { CONFIG } from '../../config/index'
import Menu from '../../components/generic/Menu'
import LoadingIcon from '../../components/generic/LoadingIcon'
import TeamDetails from '../../components/attendance/TeamDetails'
import * as actions_login from '../../actions/login/index'
//import * as actions_salary from '../../actions/salary/index'

const details = [{
  slack_image:"https://avatars.slack-edge.com/2016-11-15/104728004914_d2281a242d28195a4891_72.jpg",
  name:"Deepak Mishra",
  jobtitle:"Sr. PHP Developer",
  salary_detail:"7511.54",
  holdin_amt_detail:{
    holding_amt:"100",
    holding_end_date:"2016-09-26",
    holding_start_date:"2016-09-04",
    id:"18",
    last_updated_on:"2016-09-23",
    reason:"a",
    user_Id:"288"
  },
  dateofjoining:"2010-07-01",
  no_of_days_join:"6 years, 6 months, 5 days ",
  previous_increment:1,
  next_increment_date:"2016-10-01",
  team:'PHP'
},
{
  slack_image:"https://avatars.slack-edge.com/2016-11-07/101943188647_b50876a3f25604bb78b2_72.jpg",
  name:"Arun Kumar",
  jobtitle:"Sr. PHP Developer",
  salary_detail:"7511.54",
  holdin_amt_detail:{
    holding_amt:"100",
    holding_end_date:"2016-09-26",
    holding_start_date:"2016-09-04",
    id:"18",
    last_updated_on:"2016-09-23",
    reason:"a",
    user_Id:"288"
  },
  dateofjoining:"2010-07-01",
  no_of_days_join:"6 years, 6 months, 5 days ",
  previous_increment:1,
  next_increment_date:"2016-10-01",
  team:'ReactJs'
},
{
  slack_image:"https://avatars.slack-edge.com/2016-06-30/55725060256_a9fb4121b09b62f5943c_72.jpg",
  name:"Saurabh Khatri",
  jobtitle:"Sr. PHP Developer",
  salary_detail:"7511.54",
  holdin_amt_detail:{
    holding_amt:"100",
    holding_end_date:"2016-09-26",
    holding_start_date:"2016-09-04",
    id:"18",
    last_updated_on:"2016-09-23",
    reason:"a",
    user_Id:"288"
  },
  dateofjoining:"2010-07-01",
  no_of_days_join:"6 years, 6 months, 5 days ",
  previous_increment:1,
  next_increment_date:"2016-10-01",
  team:'AngularJs'
},
{
  slack_image:"https://avatars.slack-edge.com/2016-10-11/89681924850_f02d5572097e326302a9_72.jpg",
  name:"Shubham Mathur",
  jobtitle:"Sr. PHP Developer",
  salary_detail:"7511.54",
  holdin_amt_detail:{
    holding_amt:"100",
    holding_end_date:"2016-09-26",
    holding_start_date:"2016-09-04",
    id:"18",
    last_updated_on:"2016-09-23",
    reason:"a",
    user_Id:"288"
  },
  dateofjoining:"2010-07-01",
  no_of_days_join:"6 years, 6 months, 5 days ",
  previous_increment:1,
  next_increment_date:"2016-10-01",
  team:'Magento1'
},
{
  slack_image:"https://avatars.slack-edge.com/2016-10-16/91874934646_82c2e1255fab3f3e7f22_72.jpg",
  name:"Abhishek singh",
  jobtitle:"Jr. PHP Developer",
  salary_detail:"7511.54",
  holdin_amt_detail:{
    holding_amt:"100",
    holding_end_date:"2016-09-26",
    holding_start_date:"2016-09-04",
    id:"18",
    last_updated_on:"2016-09-23",
    reason:"a",
    user_Id:"288"
  },
  dateofjoining:"2010-07-01",
  no_of_days_join:"6 years, 6 months, 5 days ",
  previous_increment:1,
  next_increment_date:"2016-10-01",
  team:'ReactJs'
}]

const all_Teams = ['ReactJs','Magento1','AngularJs','PHP']

class ViewTeam extends React.Component {
     constructor( props ){
        super( props );
        this.props.onIsAlreadyLogin()
        this.state = {
            empList:[],
            all_Teams:''
        }
    }
    componentWillMount(){
        //this.props.onFetchUserSalaryDetails( )
        let emp = []
        if(details.length>0){
            _.forEach(details, function(ob, i) {
                emp.push({
                    "image": ob.slack_image,
                    "empName": ob.name,
                    "designation": ob.jobtitle,
                    "salary":ob.salary_detail,
                    "holdingAmountDetail":ob.holdin_amt_detail,
                    "dateOfJoining":ob.dateofjoining,
                    "noOfDaysSinceJoined":String(ob.no_of_days_join),
                    "preSalaryIncDetail":String(ob.previous_increment),
                    "nextSallaryInc":ob.next_increment_date,
                    "team":ob.team
                })
            })
            this.setState({
                empList:emp,
                all_Teams:all_Teams
            })
        }
    }
    componentWillReceiveProps( props ){
      window.scrollTo(0, 0);

      if( props.logged_user.logged_in == -1 ){
            this.props.router.push('/logout');
        }else{
            if( props.logged_user.role == CONFIG.ADMIN){
            }else{
                this.props.router.push('/home');
            }
        }
        let emp = []
        if(details.length>0){
            _.forEach(details, function(ob, i) {
                emp.push({
                    "image": ob.slack_image,
                    "empName": ob.name,
                    "designation": ob.jobtitle,
                    "salary":ob.salary_detail,
                    "holdingAmountDetail":ob.holdin_amt_detail,
                    "dateOfJoining":ob.dateofjoining,
                    "noOfDaysSinceJoined":String(ob.no_of_days_join),
                    "preSalaryIncDetail":String(ob.previous_increment),
                    "nextSallaryInc":ob.next_increment_date,
                    "team":ob.team
                })
            })
            this.setState({
                empList:emp
            })
        }
    }
    componentDidUpdate(){
    }
    render(){
      let table =(this.state.empList.length > 0 && this.state.all_Teams.length > 0)? <TeamDetails {...this.props} empList={this.state}/>:""
      return(
        <div>
            <Menu {...this.props }/>
        <div id="content" className="app-content box-shadow-z0" role="main">
          <div className="app-header white box-shadow">
                <div className="navbar">
              <a data-toggle="modal" data-target="#aside" className="navbar-item pull-left hidden-lg-up">
                 <i className="material-icons">&#xe5d2;</i>
            </a>
              <div className="navbar-item pull-left h5" id="pageTitle">
                 View Team
              </div>
          </div>
        </div>
        <div className="app-body" id="view">
          <div className="row">
            <div className="col-12">
              <LoadingIcon {...this.props}/>
            </div>
          </div>
          <div className="padding">
            {table}
          </div>
        </div>
        </div>
        </div>
        )
    }
}
function mapStateToProps( state ){
    return {
      frontend : state.frontend.toJS(),
        logged_user : state.logged_user.toJS(),
        usersList : state.usersList.toJS(),
        employee: state.empSalaryList.toJS()
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
      onIsAlreadyLogin : () => {
        return dispatch( actions_login.isAlreadyLogin(  ))
      },
      /*onFetchUserSalaryDetails: () =>{
        return dispatch( actions_salary.fetchUserSalaryDetails(  ))
      }*/
    }
}

const VisibleViewTeam = connect(
  mapStateToProps,
  mapDispatchToProps
)( ViewTeam )

const RouterVisibleViewTeam = withRouter( VisibleViewTeam )

export default RouterVisibleViewTeam
