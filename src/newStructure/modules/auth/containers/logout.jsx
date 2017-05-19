import React from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import * as actions_login from '../../../redux/auth/actions/index';
import {notify} from '../../../../services/index';

class Logout extends React.Component {
    constructor( props ){
        super( props );
    }
    componentWillMount( ){
        if( this.props.logged_user.logged_in == 0 ){
            this.props.router.push('/')
        }else{
            this.props.onLogout()
        }

    }
    componentWillReceiveProps( props ){
        props.router.push('/')
    }
    render(){
        return(
          <div></div>
        )
    }
}

function mapStateToProps( state ){
    return {
      logged_user : state.logged_user.toJS()
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        onLogout : ( ) => {
            return dispatch( actions_login.logout(  ))
        }
    }
}

const VisibleLogout = connect(
  mapStateToProps,
  mapDispatchToProps
)( Logout )

const RouterVisibleLogout = withRouter( VisibleLogout )

export default RouterVisibleLogout
