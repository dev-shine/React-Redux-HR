import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import PropTypes from 'prop-types';
import * as _ from 'lodash';
import {notify} from 'src/services/index';
import {isNotUserValid} from 'src/services/generic';
import AlertNotification from 'components/generic/AlertNotification';
import Header from 'components/generic/Header';
import Menu from 'components/generic/Menu';
import ClientsList from 'components/manageClients/ClientsList';
import FormAddNewClient from 'modules/manageClients/components/FormAddNewClient';
import FormClientDetails from 'modules/manageClients/components/FormClientDetails';
import FormCreateClientInvoice from 'modules/manageClients/components/FormCreateClientInvoice';
import InvoicesList from 'components/manageClients/InvoicesList';
import * as actionsLogin from 'appRedux/auth/actions/index';
import * as actionsClientsList from 'appRedux/manageClients/actions/clientsList';
import * as actionsManageClients from 'appRedux/manageClients/actions/manageClients';

class ManageClients extends React.Component {
  constructor (props) {
    super(props);
    this.props.onIsAlreadyLogin();
    this.state = {
      'status_message':           '',
      'clientsList':              [],
      'selected_client_id':       '',
      'selected_client_name':     '',
      'selected_client_address':  '',
      'client_info':              {},
      'client_invoices':          [],
      'show_create_invoice_form': ''
    };
    this.onClientClick = this.onClientClick.bind(this);
    this.callAddNewClient = this.callAddNewClient.bind(this);
    this.callCreateClientInvoice = this.callCreateClientInvoice.bind(this);
    this.callUpdateClientDetails = this.callUpdateClientDetails.bind(this);
    this.callDeleteInvoice = this.callDeleteInvoice.bind(this);
  }
  componentWillMount () {
    this.props.onClientsList();
  }
  componentWillReceiveProps (props) {
    let isNotValid = isNotUserValid(this.props.route.path, props.logged_user);
    if (isNotValid.status) {
      this.props.router.push(isNotValid.redirectTo);
    }
    let pSelectedClientId = '';
    let pSelectedClientName = '';
    let pSelectedClientAddress = '';
    if (typeof props.manageClients.client_info.id !== 'undefined') {
      pSelectedClientId = props.manageClients.client_info.id;
    }
    if (typeof props.manageClients.client_info.name !== 'undefined') {
      pSelectedClientName = props.manageClients.client_info.name;
    }
    if (typeof props.manageClients.client_info.address !== 'undefined') {
      pSelectedClientAddress = props.manageClients.client_info.address;
    }
    this.setState({
      clientsList:             props.clientsList.clients,
      client_info:             props.manageClients.client_info,
      client_invoices:         props.manageClients.client_invoices,
      selected_client_id:      pSelectedClientId,
      selected_client_name:    pSelectedClientName,
      selected_client_address: pSelectedClientAddress
    });
  }
  componentDidUpdate () {
    if (this.state.selected_client_id === '') {
      if (this.state.clientsList.length > 0) {
        let firstUser = this.state.clientsList[0];
        let defaultUserId = firstUser.id;
        this.onClientClick(defaultUserId);
      }
    }
  }
  onClientClick (clientid) {
    let selectedClientId = '';
    let selectedClientName = '';
    let selectedClientAddress = '';
    if (this.state.clientsList.length > 0) {
      let clientDetails = _.find(this.state.clientsList, {'id': clientid});
      if (typeof clientDetails !== 'undefined') {
        selectedClientId = clientDetails.id;
        selectedClientName = clientDetails.name;
        selectedClientAddress = clientDetails.address;
      }
    }
    this.setState({
      selected_client_id:      selectedClientId,
      selected_client_name:    selectedClientName,
      selected_client_address: selectedClientAddress
    });
    this.props.onClientDetails(clientid);
  }
  callAddNewClient (newClientDetails) {
    this.props.onAddNewClient(newClientDetails).then(
      (data) => { this.props.onClientsList(); },
      (error) => { notify(error); }
    );
  }
  callCreateClientInvoice (newClientInvoiceDetails) {
    this.props.onCreateClientInvoice(newClientInvoiceDetails).then(
      (data) => {
        this.setState({'show_create_invoice_form': false});
        this.props.onClientsList();
        this.onClientClick(data);
      }, (error) => { notify(error); }
    );
  }
  callUpdateClientDetails (updatedClientDetails) {
    this.props.onUpdateClientDetails(updatedClientDetails).then(
      (data) => {
        this.props.onClientsList();
        this.onClientClick(data);
      }, (error) => { notify(error); }
    );
  }
  callDeleteInvoice (invoiceId) {
    this.props.onDeleteInvoice(invoiceId).then(
      (data) => { this.onClientClick(this.state.selected_client_id); },
      (error) => { notify(error); }
    );
  }
  render () {
    return (
      <div>
        <AlertNotification message={this.props.manageClients.status_message} />
        <Menu {...this.props} />
        <div id="content" className="app-content box-shadow-z0" role="main">
          <Header pageTitle={'Manage Clients'} showLoading={this.props.frontend.show_loading} />
          <div className="app-body" id="view">
            <div className="padding">
              <div className="row">
                <div className="col-md-12 p-t p-b">
                  <FormAddNewClient callAddNewClient={this.callAddNewClient} />
                </div>
              </div>
              <div className="row">
                <div className="col-md-2">
                  <ClientsList clients={this.state.clientsList} selectedClientId={this.state.selected_client_id} onClientClick={this.onClientClick} />
                </div>
                <div className="col-md-10 p">
                  <div className="row box">
                    <div className="col-md-5 p-t p-b p-r">
                      <FormClientDetails
                        clientId={this.state.selected_client_id}
                        clientName={this.state.selected_client_name}
                        clientAddress={this.state.selected_client_address}
                        callUpdateClientDetails={this.callUpdateClientDetails}
                      />
                    </div>
                    <div className="col-md-7 p-t p-b b-l">
                      <h6 className="text-center"><u>Client Invoices</u></h6>
                      <FormCreateClientInvoice
                        showForm={this.state.show_create_invoice_form}
                        clientId={this.state.selected_client_id}
                        clientName={this.state.selected_client_name}
                        clientAddress={this.state.selected_client_address}
                        callCreateClientInvoice={this.callCreateClientInvoice}
                      />
                      <InvoicesList
                        invoicesList={this.state.client_invoices}
                        callDeleteInvoice={this.callDeleteInvoice}
                      />
                    </div>
                  </div>
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
    frontend:      state.frontend.toJS(),
    logged_user:   state.logged_user.toJS(),
    clientsList:   state.clientsList.toJS(),
    manageClients: state.manageClients.toJS()
  };
}
const mapDispatchToProps = (dispatch) => {
  return {
    onIsAlreadyLogin:      () => { return dispatch(actionsLogin.isAlreadyLogin()); },
    onClientsList:         () => { return dispatch(actionsClientsList.get_clients_list()); },
    onClientDetails:       (clientid) => { return dispatch(actionsManageClients.getClientDetails(clientid)); },
    onAddNewClient:        (newClientDetails) => { return dispatch(actionsManageClients.addNewClient(newClientDetails)); },
    onCreateClientInvoice: (newClientInvoiceDetails) => { return dispatch(actionsManageClients.create_client_invoice(newClientInvoiceDetails)); },
    onUpdateClientDetails: (updatedClientDetails) => { return dispatch(actionsManageClients.update_client_details(updatedClientDetails)); },
    onDeleteInvoice:       (invoiceId) => { return dispatch(actionsManageClients.delete_invoice(invoiceId)); }
  };
};
const VisibleManageClients = connect(mapStateToProps, mapDispatchToProps)(ManageClients);

const RouterVisibleManageClients = withRouter(VisibleManageClients);

export default RouterVisibleManageClients;

ManageClients.PropTypes = {
  onIsAlreadyLogin: PropTypes.func.isRequired,
  manageClients:    PropTypes.shape({
    status_message:  PropTypes.string.isRequired,
    client_info:     PropTypes.array.isRequired,
    client_invoices: PropTypes.object.isRequired
  }).isRequired,
  clientsList: PropTypes.shape({
    clients: PropTypes.object.isRequired
  }).isRequired,
  onClientsList: PropTypes.func.isRequired,
  logged_user:   PropTypes.shape({
    logged_in:   PropTypes.string.isRequired,
    logged_role: PropTypes.string.isRequired
  }).isRequired,
  router:                PropTypes.object.isRequired,
  onClientDetails:       PropTypes.func.isRequired,
  onAddNewClient:        PropTypes.func.isRequired,
  onCreateClientInvoice: PropTypes.func.isRequired,
  onUpdateClientDetails: PropTypes.func.isRequired,
  onDeleteInvoice:       PropTypes.func.isRequired,
  frontend:              PropTypes.object.isRequired
};
