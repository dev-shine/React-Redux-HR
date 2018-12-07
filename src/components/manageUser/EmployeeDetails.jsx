import React from "react";
import {isEmpty} from 'lodash';
import profilePlaceholder from "../../static/profilePlaceholder.png";

const EmployeeDetails = ({ employee, displayPage }) => {
    let profileImg = isEmpty(employee.image) ? profilePlaceholder : employee.image;
    return (
        <div className="row salary-blocks-margin salary-row-bg" onClick={(e) => {}}>
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
                    <div className="col-sm-12">{employee.current_salary}</div>
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
};

export default EmployeeDetails;