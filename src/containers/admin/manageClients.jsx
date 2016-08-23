import React from 'react';
import { connect } from 'react-redux'
import { Router, browserHistory, Link, withRouter } from 'react-router'
import ReactDOM from 'react-dom'

import * as _ from 'lodash'
import {notify} from '../../services/index'

import Menu from '../../components/generic/Menu'
import LoadingIcon from '../../components/generic/LoadingIcon'
import AlertNotification from '../../components/generic/AlertNotification'

//-----------------------------------------
import * as actions_login from '../../actions/login/index'
import * as actions_clientsList from '../../actions/generic/clientsList'
import * as actions_manageClients from '../../actions/admin/manageClients'

import ClientsList from '../../components/generic/clientsList'
import FormClientDetails from '../../components/manageClients/FormClientDetails'
import InvoicesList from '../../components/manageClients/InvoicesList'
import FormAddNewClient from '../../components/manageClients/FormAddNewClient'


class ManageClients extends React.Component {
    constructor( props ){
        super( props );
        this.props.onIsAlreadyLogin()
        this.state = {
            'status_message' : "",
            'clientsList' : [],
            'selected_client_id' : "",
            'selected_client_name' : "",
            'selected_client_address' : "",
            'client_info' : {},
            'client_invoices' : []
        }
        this.onClientClick = this.onClientClick.bind( this )
        this.callAddNewClient = this.callAddNewClient.bind(this)
    }    
    componentWillMount(){
      this.props.onClientsList()
    }
    componentWillReceiveProps( props ){
      window.scrollTo(0, 0);
      if( props.logged_user.logged_in == -1 ){
          this.props.router.push('/logout');
      }else{
          if( props.logged_user.role == 'Admin'){
              //this.props.onUsersList( )
          }else{
              this.props.router.push('/home');    
          }
      }

      this.setState({
        clientsList : props.clientsList.clients,
        client_info : props.manageClients.client_info,
        client_invoices : props.manageClients.client_invoices,        
      })
    }
    componentDidUpdate(){
      if( this.state.selected_client_id  == '' ){
          if( this.state.clientsList.length > 0 ){
              let firstUser = this.state.clientsList[0]
              let defaultUserId = firstUser.id
              this.onClientClick( defaultUserId )
          }
      }
    }
    onClientClick( clientid ){
      let selected_client_id = ""
      let selected_client_name = ""
      let selected_client_address = ""
      if( this.state.clientsList.length > 0 ){
        let clientDetails = _.find( this.state.clientsList, { 'id' : clientid } )
        if( typeof clientDetails != 'undefined' ){
          selected_client_id = clientDetails.id
          selected_client_name = clientDetails.name
          selected_client_address = clientDetails.address
        }
      }
      this.setState({
          selected_client_id : selected_client_id,
          selected_client_name : selected_client_name,
          selected_client_address : selected_client_address
      })
      this.props.onClientDetails( clientid )
    }
    callAddNewClient( new_client_details ){
      this.props.onAddNewClient( new_client_details ).then( 
        (data) => {
          //on success of adding a new client referch list
          this.props.onClientsList()
        },(error) => {
          notify( error );
        }
      )
    }

  	render(){


      
       

		return(
    		<div>

          <AlertNotification alert_message={this.props.manageClients.status_message}/>

    			<Menu {...this.props }/>
            <div id="content" className="app-content box-shadow-z0" role="main">
    				  
              <div className="app-header white box-shadow">
                <div className="navbar">
    						  <a data-toggle="modal" data-target="#aside" className="navbar-item pull-left hidden-lg-up">
      						  <i className="material-icons">&#xe5d2;</i>
    						  </a>
    						  <div className="navbar-item pull-left h5" id="pageTitle">Manage Clients</div>
						    </div>
                <div className="row no-gutter">
                  <div className="col-12">
                    <LoadingIcon {...this.props}/>
                  </div>
                </div>
    				  </div>

					    <div className="app-body" id="view">
						    <div className="padding">


                  <div className="row">


                            <div className="col-md-12 p-t p-b">
                              
                                <FormAddNewClient callAddNewClient={this.callAddNewClient}/>
                            </div>
                        </div>
                    
                    <div className="row">

                    <div className="col-md-2">
                        <ClientsList clients = { this.state.clientsList } selectedClientId={this.state.selected_client_id} onClientClick = { this.onClientClick }/>
                    </div>

                    <div className="col-md-10 p">

                        

                        <div className="row box">
                          <div className="col-md-5 p-t p-b p-r b-r">
                            <FormClientDetails clienDetails={this.state.client_info} />
                          </div>
                          <div className="col-md-7 p-t p-b">
                          
                          <InvoicesList invoicesList={ this.state.client_invoices } />

                            
                          </div>
                        </div>
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
        clientsList : state.clientsList.toJS(),
        manageClients : state.manageClients.toJS()
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        onIsAlreadyLogin : () => {
            return dispatch( actions_login.isAlreadyLogin(  ))
        },
        onClientsList : () => {
        	return dispatch( actions_clientsList.get_clients_list(  ))	
        },
        onClientDetails : ( clientid ) => {
          return dispatch( actions_manageClients.get_client_details( clientid )) 
        },
        onAddNewClient: ( new_client_details ) => {
          return dispatch( actions_manageClients.add_new_client( new_client_details )) 
        }
    }
}

const VisibleManageClients = connect(
  mapStateToProps,
  mapDispatchToProps
)( ManageClients )

const RouterVisibleManageClients = withRouter( VisibleManageClients )

export default RouterVisibleManageClients