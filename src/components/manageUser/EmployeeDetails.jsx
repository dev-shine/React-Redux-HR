import React from "react";
import {isEmpty} from 'lodash';
import profilePlaceholder from "../../static/profilePlaceholder.png";

const EmployeeDetails = ({ allEmpolyesDetails }) => {

    let data = (<div className="well well-lg" style={{'color':"red"}} >
    <i className="fa fa-exclamation-triangle fa-3x" aria-hidden="true"></i>
    No Employee available </div>);

    if (allEmpolyesDetails.length) {
        data = allEmpolyesDetails.map((employee, index) => {
        let profileImg = isEmpty(employee.image) ? profilePlaceholder : employee.image;
        return (
            <div key={index} className="row salary-blocks-margin salary-row-bg" onClick={(e) => {}}>
                <div className="col-md-12 salary-col-padding  employee-details">
                    <div className="col-md-2 col-sm-2 col-xs-12 employee-profile">
                        <div className="col-sm-12 salary-total-title">{employee.name}</div>
                        {/* <div className="col-sm-12 salary-total-title">({employee.role_name})</div> */}
                        <div className="col-sm-12 salary-total-title profile-image">
                            <span className="img-wrapper"><img src={profileImg} /></span>
                        </div>
                        <div className="col-sm-12 salary-total-title">E-id : {employee.id}</div>
                        <div className="col-sm-12 salary-total-title">{employee.jobtitle}</div>
                    </div>
                    <div className="col-sm-1 col-xs-12 cell">
                        {/* <div className="col-sm-12 salary-title">DOJ</div> */}
                        <div className="col-sm-12">{employee.dateofjoining}</div>
                    </div>
                    <div className="col-sm-2 col-xs-12 cell">
                        {/* <div className="col-sm-12 salary-title">current_salary</div> */}
                        <div className="col-sm-12">{employee.current_salary && `Rs.${employee.current_salary}`}</div>
                    </div>
                    <div className="col-sm-2 col-xs-12 cell">
                        {/* <div className="col-sm-12 salary-title">PAN No.</div> */}
                        <div className="col-sm-12">{employee.team}</div>
                    </div>
                    <div className="col-sm-1 col-xs-12 cell">
                        {/* <div className="col-sm-12 salary-title">Contact-1</div> */}
                        <div className="col-sm-12">{employee.mobile_ph}</div>
                    </div>
                    <div className="col-sm-2 col-xs-12 cell">
                        {/* <div className="col-sm-12 salary-title">Contact-1</div> */}
                        <div className="col-sm-12">{employee.emergency_ph1}</div>
                        <div className="col-sm-12">{employee.emergency_ph2}</div>
                    </div>
                    <div className="col-sm-2 col-xs-12 cell">
                        {/* <div className="col-sm-12 salary-title">Conveyance</div> */}
                        <div className="col-sm-12">{employee.work_email}</div>
                        <div className="col-sm-12">{employee.work_email}</div>
                    </div>
                </div>
            </div>
        );
     });
    }
    return(
        <div className="content-salary">
            <div className="row salary-blocks-margin salary-row-bg" onClick={(e) => {}}>
                <div className="col-md-12 salary-col-padding" >
                    <div className="col-md-2 col-sm-2 col-xs-12 employee-profile">
                        <div className="col-sm-12 salary-total-title">Profile</div>
                    </div>
                    <div className="col-sm-1 col-xs-12 cell">
                        <div className="col-sm-12 salary-title">DOJ</div>
                    </div>
                    <div className="col-sm-2 col-xs-12 cell">
                        <div className="col-sm-12 salary-title">Salary</div>
                    </div>
                    <div className="col-sm-2 col-xs-12 cell">
                        <div className="col-sm-12 salary-title">Team</div>
                    </div>
                    <div className="col-sm-1 col-xs-12 cell">
                        <div className="col-sm-12 salary-title">Mobile</div>
                    </div>
                    <div className="col-sm-2 col-xs-12 cell">
                        <div className="col-sm-12 salary-title">Emergency Contact No.</div>
                    </div>
                    <div className="col-sm-2 col-xs-12 cell">
                        <div className="col-sm-12 salary-title">Other details</div>
                    </div>
                </div>
            </div>
            {data}
        </div>
    )
};

export default EmployeeDetails;