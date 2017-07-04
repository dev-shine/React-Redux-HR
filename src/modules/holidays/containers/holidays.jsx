import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import Menu from 'components/generic/Menu';
import {isNotUserValid} from 'src/services/generic';
import Header from 'components/generic/Header';
import HolidaysList from 'components/holidays/HolidaysList';
import * as actions_login from 'appRedux/auth/actions/index';
import * as actions_holidaysList from 'appRedux/holidays/actions/holidaysList';

class Holidays extends React.Component {
  constructor (props) {
    super(props);
    this.props.onIsAlreadyLogin();
  }
  componentWillMount () {
    this.props.onHolidaysList();
  }
  componentWillReceiveProps (props) {
    let isNotValid = isNotUserValid(this.props.route.path, props.logged_user);
    if (isNotValid.status) {
      this.props.router.push(isNotValid.redirectTo);
    }
  }
  render () {
    return (
      <div>
        <Menu {...this.props} />
        <div id="content" className="app-content box-shadow-z0" role="main">
          <Header pageTitle={'Holidays List'} showLoading={this.props.frontend.show_loading} />
          <div className="app-footer">
            <div></div>
          </div>
          <div className="app-body" id="view">
            <div className="padding">
              <div className="row">
                <div className="col-md-12">
                  <HolidaysList holidays={this.props.holidaysList.holidays} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps (state) {
  return {
    frontend:         state.frontend.toJS(),
    logged_user:      state.logged_user.toJS(),
    holidaysList:     state.holidaysList.toJS(),
    policy_documents: state.policyDocuments.toJS()
  };
}
const mapDispatchToProps = (dispatch) => {
  return {
    onIsAlreadyLogin: () => {
      return dispatch(actions_login.isAlreadyLogin());
    },
    onHolidaysList: () => {
      return dispatch(actions_holidaysList.get_holidays_list());
    }
  };
};

const VisibleHolidays = connect(mapStateToProps, mapDispatchToProps)(Holidays);

const RouterVisibleHolidays = withRouter(VisibleHolidays);

export default RouterVisibleHolidays;
