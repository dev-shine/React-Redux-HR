import React from 'react';

class UserHorizontalView extends React.Component {
  constructor(props) {
    super(props);
  }
  componentWillReceiveProps(props) {}

  render() {
    return (

      <div className="item">
        <div className="item-bg">
          <img src={this.props.profileImage} className="blur opacity-3"/>
        </div>
        <div className="p-a-md">
          <div className="row m-t">
            <div className="col-sm-7">
              <a href="" className="pull-left m-r-md">
                <span className="avatar w-96">
                  <img src={this.props.profileImage}/>
                  <i className="on b-white"></i>
                </span>
              </a>
              <div className="clear m-b">
                <h3 className="m-a-0 m-b-xs">{this.props.name}</h3>
                <p className="text-muted">
                  <span className="m-r">{this.props.jobtitle}</span>
                </p>
                <p className="text-muted">
                  <span className="m-r">Joining Date : {this.props.dateofjoining}</span>
                </p>

              </div>
            </div>

            <div className="col-sm-5">
              <p className="text-muted">
                <span className="m-r">Gender :
                  <b>{this.props.gender}</b>
                </span>
              </p>
              <p className="text-muted">
                <span className="m-r">Date Of Birth :
                  <b>{this.props.dob}</b>
                </span>
              </p>
              <p className="text-muted">
                <span className="m-r">Work Email :
                  <b>{this.props.work_email}</b>
                </span>
              </p>
            </div>

          </div>
        </div>
      </div>

    )
  }
}
UserHorizontalView.propTypes = {
  name: React.PropTypes.string,
  jobtitle: React.PropTypes.string,
  dateofjoining: React.PropTypes.instanceOf(Date),
  dob: React.PropTypes.instanceOf(Date),
  Gender: React.PropTypes.string,
  Email: React.PropTypes.string
};
export default UserHorizontalView
