import React from 'react';
import * as _ from 'lodash';
import {connect} from 'react-redux';
import Menu from 'components/generic/Menu';
import Header from 'components/generic/Header';
import {withRouter} from 'react-router';
import * as actions from 'appRedux/actions';
import * as actionsUsersList from 'appRedux/generic/actions/usersList';
import * as actionsManageUsers from 'appRedux/manageUsers/actions/manageUsers';

class InventoryItem extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            
        };
    }
    
    componentWillMount () {
        this.props.onUsersList();
        this.props.onIsAlreadyLogin();
    }

    render(){
    return(
        <div>
            <div>
                <Menu {...this.props}/>
                <div id="content" className="app-content box-shadow-z0" role="main">  
                    <Header pageTitle={'Inventory Management'}  />
                    <div className="app-body" id="view" >
                        <div className="row">
                            <div className="col-12">
                                <div className="app-body" id="view">
                                    <div className="col-xs-12 col-sm-12" >
                                        <div className="col-md-5 p-r" >
                                            <div className="form-group" style={{marginLeft:"8%", marginTop:"4%"}}>
                                                <label style={{'fontSize': 15}}>Users:</label>
                                                <select onChange={(e) => this.setState({user: e.target.value})} className="form-control" ref="device_type" value={this.state.user}>
                                                    <option value="">--Select User--</option>
                                                    {
                                                        _.map(this.props.usersList.users, (val , i) => {
                                                            return(
                                                                <option key={i} value={val.username}>{val.username}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                                <div className='row m-1'>
                                                    <div className='col-sm-15 p-8 pt-8' style={{marginTop:"4%"}} >
                                                        <label style={{'fontSize': 15}}>Comment:</label>
                                                        <textarea placeholder="Your comment"  className="form-control resize-y"
                                                        value="">
                                                        </textarea>
                                                    </div>
                                                </div>
                                                <div className='row m-2'>
                                                    <div className='col-sm-15 p-8 pt-8'style={{ marginTop:"4%"}}>
                                                        <div className="streamline b-l m-l" >
                                                            <div className="sl-item b-info" >
                                                                <div className="sl-content">
                                                                    <div className="sl-date text-muted">  <b>History--1</b></div>
                                                                        <div className="sl-date text-muted">  <b>History--2</b></div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="sl-item b-info" >
                                                                        <div className="sl-content"> 
                                                                            <div className="sl-date text-muted">  <b>History--3</b></div>
                                                                                <div className="sl-date text-muted">  <b>History--4</b></div>
                                                                                </div>
                                                                            </div>
                                                                        <div className="sl-item b-info" >
                                                                    <div className="sl-content"> 
                                                                        <div className="sl-date text-muted">  <b>History--5</b></div>
                                                                            <div className="sl-date text-muted">  <b>History--6</b></div>
                                                                                <div className="sl-date text-muted">  <b>History--7</b></div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
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

function mapStateToProps (state){
    return{
        usersList:    state.usersList.toJS(),
        loggedUser:   state.logged_user.userLogin,
    };
}

const mapDispatchToProps = (dispatch) => {
    return{
        onUsersList: () => {
            return dispatch(actionsUsersList.get_users_list());
        },
        onIsAlreadyLogin: () => {
            return dispatch(actions.isAlreadyLogin());
        },
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(InventoryItem));