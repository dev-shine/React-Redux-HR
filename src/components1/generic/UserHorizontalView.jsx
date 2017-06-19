import React from 'react'

const UserHorizontalView = ({UserInventoryDetails}) => {
  return (
    <div className="item">
      <div className="item-bg">
        <img src={UserInventoryDetails.profileImage} className="blur opacity-3" />
      </div>
      <div className="p-a-md">
        <div className="row m-t">
          <div className="col-sm-7">
            <a href="" className="pull-left m-r-md">
              <span className="avatar w-96">
                <img src={UserInventoryDetails.profileImage} />
                <i className="on b-white"></i>
              </span>
            </a>
            <div className="clear m-b">
              <h3 className="m-a-0 m-b-xs">{UserInventoryDetails.name}</h3>
              <p className="text-muted">
                <span className="m-r">{UserInventoryDetails.jobtitle}</span>
              </p>
              {this.props.inventory ? null
                : <p className="text-muted">
                <span className="m-r">Joining Date : {UserInventoryDetails.dateofjoining}</span>
              </p>
            }
          </div>
        </div>

        {UserInventoryDetails.inventory ? null
          : <div className="col-sm-5">
          <p className="text-muted">
            <span className="m-r">Gender :
              <b>{this.props.gender}</b>
            </span>
          </p>
          <p className="text-muted">
            <span className="m-r">Date Of Birth :
              <b>{UserInventoryDetails.dob}</b>
            </span>
          </p>
          <p className="text-muted">
            <span className="m-r">Work Email :
              <b>{UserInventoryDetails.work_email}</b>
            </span>
          </p>
        </div>
        }
      </div>
    </div>
  </div>

  )
}
UserHorizontalView.propTypes = {
  name: React.PropTypes.string,
  jobtitle: React.PropTypes.string,
  dateofjoining: React.PropTypes.string,
  dob: React.PropTypes.string,
  Gender: React.PropTypes.string,
  Email: React.PropTypes.string
}
export default UserHorizontalView
