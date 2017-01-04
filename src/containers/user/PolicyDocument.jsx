import React from 'react';
import { connect } from 'react-redux'
import { Router, browserHistory, Link, withRouter } from 'react-router'

import * as _ from 'lodash'
import Menu from '../../components/generic/Menu'
import LoadingIcon from '../../components/generic/LoadingIcon'
import * as actions_login from '../../actions/login/index'
import * as actions_policy from '../../actions/policyDocuments/index'
import DocumentsList from '../../components/policyDocuments/documentsList'
import { CONFIG } from '../../config/index'


class PolicyDocumentContainer extends React.Component {
     constructor( props ){
        super( props );
        this.props.onIsAlreadyLogin()
        this.state = {
          docs:[
            {id:"111", name:"Policy document 1", link:"http://www.material-ui.com/#/components/card", unread:0},
            {id:"112", name:"Policy document 2", link:"http://www.material-ui.com/#/components/card", unread:0},
            {id:"113", name:"Policy document 3", link:"http://www.material-ui.com/#/components/card", unread:1},
            {id:"114", name:"Policy document 4", link:"http://www.material-ui.com/#/components/card", unread:0},
          ],
        }
    }
    componentWillMount(){
      // this.props.onIsUserAcceptedDocumentPolicy().then((msg)=>{
      //   console.log(msg);
      // })
    }
    componentWillReceiveProps( props ){

      //window.scrollTo(0, 0);
      if (props.logged_user.logged_in == -1) {
        this.props.router.push('/logout');
      } else {}
    }
    componentDidUpdate(){
    }
    render(){
      console.log('-------------------');
    	return(
    		<div>
            <Menu {...this.props }/>
    		<div id="content" className="app-content box-shadow-z0" role="main">
    		  <div className="app-header white box-shadow">
                <div className="navbar">
    			    <a data-toggle="modal" data-target="#aside" className="navbar-item pull-left hidden-lg-up">
      				   <i className="material-icons">&#xe5d2;</i>
    				</a>
    			    <div className="navbar-item pull-left h5" id="pageTitle">
    			       Policy Documents
    			    </div>
			    </div>
				</div>
				<DocumentsList docs={this.state.docs} {...this.props} />
    		</div>
    		</div>
    		)
    }
}
function mapStateToProps( state ){
    return {
    	frontend : state.frontend.toJS(),
      logged_user : state.logged_user.toJS(),
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
    	  onIsAlreadyLogin: () => {
            return dispatch( actions_login.isAlreadyLogin())
        },
        onIsUserAcceptedDocumentPolicy: () => {
          return dispatch(actions_policy.isUserAcceptedDocumentPolicy())
        },
        onUpdateReadStatus: (doc_id)=>{
          return dispatch(actions_policy.updateReadStatus())
        }
    }
}

const VisiblePolicyDocumentContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)( PolicyDocumentContainer )

const RouterVisiblePolicyDocumentContainer = withRouter( VisiblePolicyDocumentContainer )

export default RouterVisiblePolicyDocumentContainer
