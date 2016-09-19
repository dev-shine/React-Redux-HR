import React from 'react';
import { connect } from 'react-redux'
import { Router, browserHistory, Link, withRouter } from 'react-router'
import * as actions_login from '../../actions/login/index'
import * as _ from 'lodash'
import {notify} from '../../services/index'
import Menu from '../../components/generic/Menu'
import * as actions_myProfile from '../../actions/user/myProfile'

import FormMyDocuments from '../../components/myDocuments/FormMyDocuments'
import LoadingIcon from '../../components/generic/LoadingIcon'


class MyDoduments extends React.Component {
	constructor( props ){
        super( props );
    }

    componentWillReceiveProps( props ){
        window.scrollTo(0, 0);
        if( props.logged_user.logged_in == -1 ){
            this.props.router.push('/logout');
        }else{
            
        }
    }
   
	render(){
        return(
          <div>
          	<Menu {...this.props }/>
          	<div id="content" className="app-content box-shadow-z0" role="main">

                    <div className="app-header white box-shadow">
                <div className="navbar">
                  <a data-toggle="modal" data-target="#aside" className="navbar-item pull-left hidden-lg-up">
                    <i className="material-icons">&#xe5d2;</i>
                  </a>
                  <div className="navbar-item pull-left h5" id="pageTitle">My Document</div>
                </div>
                <div className="row no-gutter">
                  <div className="col-12">
                    <LoadingIcon {...this.props}/>
                  </div>
                </div>
              </div>

             		 <div className="app-body" id="view">

            			<div className="padding">
                                <div className="row no-gutter">
                                    <div className="col-xs-12 p-t p-l">
                                        <FormMyDocuments  callUpdateDocuments={this.props.onUpdatedocuments} {...this.props}/>
                                    </div>
                                </div>
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
        myProfile : state.myProfile.toJS(),
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        onUpdatedocuments : ( document_link ) => {
            return dispatch( actions_myProfile.updateDocument( document_link ))
        }
    }
}

const VisibleMyDoduments = connect(
  mapStateToProps,
  mapDispatchToProps
)( MyDoduments )

const RouterVisibleMyDoduments = withRouter( VisibleMyDoduments )

export default RouterVisibleMyDoduments