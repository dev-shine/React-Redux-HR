import React from "react";
import {isEmpty} from 'lodash';
import profilePlaceholder from "../../static/profilePlaceholder.png";

const EmployeeDetails = ({ allEmpolyesDetails }) => {

    let data = (<div className="well well-lg" style={{'color':"red"}} >
    <i className="fa fa-exclamation-triangle fa-3x" aria-hidden="true"></i>
    No Employee available </div>);

    if (allEmpolyesDetails.length) {
        data = allEmpolyesDetails.map((employee, index) => {
        let profileImg = isEmpty(employee.slack_profile.image_72) ? profilePlaceholder : employee.slack_profile.image_72;
        return (
            <div key={index} className="row salary-blocks-margin salary-row-bg" onClick={(e) => {}}>
                <div className="col-md-12 employee-details">
                    <div className="col-sm-1 col-xs-12 cell profile-image">
                        <div className="cell-item">
                            <span className="img-wrapper"><img src={profileImg} /></span>
                        </div>
                    </div>
                    <div className="col-sm-2 col-xs-12 cell">
                        {/* <div className="col-sm-12 salary-title">DOJ</div> */}
                        <div className="cell-item">{employee.name}</div>
                    </div>
                    <div className="col-sm-2 col-xs-12 cell">
                        {/* <div className="col-sm-12 salary-title">DOJ</div> */}
                        <div className="cell-item">{employee.jobtitle}</div>
                    </div>
                    <div className="col-sm-2 col-xs-12 cell">
                        {/* <div className="col-sm-12 salary-title">DOJ</div> */}
                        <div className="cell-item">{employee.id} - {employee.role_name}</div>
                    </div>
                    <div className="col-sm-2 col-xs-12 cell">
                        {/* <div className="col-sm-12 salary-title">DOJ</div> */}
                        <div className="cell-item">{employee.dateofjoining}</div>
                    </div>
                    <div className="col-sm-2 col-xs-12 cell">
                        {/* <div className="col-sm-12 salary-title">current_salary</div> */}
                        <div className="cell-item">{employee.current_salary && `Rs.${employee.current_salary}`}</div>
                    </div>
                    <div className="col-sm-1 col-xs-12 cell">
                        {/* <div className="col-sm-12 salary-title">PAN No.</div> */}
                        <div className="cell-item">{employee.team}</div>
                    </div>
                </div>
            </div>
        );
     });
    }
    return(
        <div className="content-salary">
            <div className="row salary-blocks-margin salary-row-bg" onClick={(e) => {}}>
                <div className="col-md-12 employee-details" >
                    <div className="col-sm-1 col-xs-12 cell profile-image">
                        <div className="salary-total-title">Image</div>
                    </div>
                    <div className="col-sm-2 col-xs-12 cell">
                        <div className="salary-title">Name</div>
                    </div>
                    <div className="col-sm-2 col-xs-12 cell">
                        <div className="salary-title">Job Title</div>
                    </div>
                    <div className="col-sm-2 col-xs-12 cell">
                        <div className="salary-title">Employee Id - Role</div>
                    </div>
                    <div className="col-sm-2 col-xs-12 cell">
                        <div className="salary-title">DOJ</div>
                    </div>
                    <div className="col-sm-2 col-xs-12 cell">
                        <div className="salary-title">Salary</div>
                    </div>
                    <div className="col-sm-1 col-xs-12 cell">
                        <div className="salary-title">Team</div>
                    </div>
                </div>
            </div>
            {data}
        </div>
    )
};

export default EmployeeDetails;