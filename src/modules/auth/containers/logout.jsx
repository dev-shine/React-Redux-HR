import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import * as actions from 'appRedux/actions';

class Logout extends React.Component {
  constructor (props) {
    super(props);
  }
  componentWillMount () {
    if (this.props.logged_user.logged_in == 0) {
      this.props.router.push('/');
    } else {
      console.log('aaaaaaaaaaa');
      this.props.onLogout();
    }
  }
  componentWillReceiveProps (props) {
    console.log('sssssssssss');
    props.router.push('/');
  }
  render () {
    return (
      <div></div>
    );
  }
}

function mapStateToProps (state) {
  return {
    logged_user: state.logged_user.toJS()
  };
}
const mapDispatchToProps = (dispatch) => {
  return {
    onLogout: () => {
      return dispatch(actions.requestLogout());
    }
  };
};

const VisibleLogout = connect(
  mapStateToProps,
  mapDispatchToProps
)(Logout);

const RouterVisibleLogout = withRouter(VisibleLogout);

export default RouterVisibleLogout;
