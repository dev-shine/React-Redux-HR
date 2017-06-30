import React from 'react';
import PropTypes from 'prop-types';

const UserHorizontalView = ({profileImage, name, jobtitle, dateofjoining, gender, dob, work_email, inventory}) => {
  let joining, details;
  if (!inventory) {
    joining = <p className="text-muted">
      <span className="m-r">Joining Date : {this.props.dateofjoining}</span>
    </p>;
    details = <div className="col-sm-5">
      <p className="text-muted">
        <span className="m-r">Gender :<b>{this.props.gender}</b></span>
      </p>
      <p className="text-muted">
        <span className="m-r">Date Of Birth :<b>{this.props.dob}</b></span>
      </p>
      <p className="text-muted">
        <span className="m-r">Work Email :<b>{this.props.work_email}</b></span>
      </p>
    </div>;
  }
  return (
    <div className="item">
      <div className="item-bg">
        <img src={profileImage} className="blur opacity-3" />
      </div>
      <div className="p-a-md">
        <div className="row m-t">
          <div className="col-sm-7">
            <a href="" className="pull-left m-r-md">
              <span className="avatar w-96">
                <img src={profileImage} />
                <i className="on b-white"></i>
              </span>
            </a>
            <div className="clear m-b">
              <h3 className="m-a-0 m-b-xs">{name}</h3>
              <p className="text-muted">
                <span className="m-r">{jobtitle}</span>
              </p>
              {joining}
            </div>
          </div>
          {details}
        </div>
      </div>
    </div>
  );
};

UserHorizontalView.propTypes = {
  profileImage:  PropTypes.string,
  name:          PropTypes.string,
  jobtitle:      PropTypes.string,
  dateofjoining: PropTypes.string,
  dob:           PropTypes.string,
  gender:        PropTypes.string,
  work_email:    PropTypes.string,
  inventory:     PropTypes.bool
};
UserHorizontalView.defaultProps = {
  profileImage:  null,
  name:          null,
  jobtitle:      null,
  dateofjoining: null,
  dob:           null,
  gender:        null,
  work_email:    null,
  inventory:     false
};
export default UserHorizontalView;
