import React from 'react';
import { connect } from 'react-redux'
import { Router, browserHistory, Link, withRouter } from 'react-router'
import * as _ from 'lodash'



const styles = {
	headerMain : {
		background : '#3EA8F5'
	},
	textWhite : {
		color : 'white'
	}
};


class Header extends React.Component {
    constructor( props ){
        super( props );
        this.state = {
            role : props.logged_user.role,
        }
    }
    render(){
		let link_welcome_page = <Link to='/welcome' style={ styles.textWhite }>Welcome Page</Link>
        let link_manage_users = <Link to='/manage_users' style={ styles.textWhite }>Manage Users</Link>
        let link_manage_polls = <Link to='/manage_polls' style={ styles.textWhite }>Manage Polls</Link>
        let link_polls_list = <Link to='/polls_list' style={ styles.textWhite }>Polls List</Link>

        let displayLinks =  "";

        if( this.state.role == 'admin' ){
        	displayLinks =  <ul className="nav navbar-nav" >
        		<li role="presentation">{ link_welcome_page }</li>
        		<li role="presentation">{ link_manage_users }</li>
        		<li role="presentation">{ link_manage_polls }</li>
        		<li role="presentation">{ link_polls_list }</li>
			</ul>	
        }else if( this.state.role == 'guest' ){
        	displayLinks =  <ul className="nav navbar-nav">
        		<li role="presentation">{ link_welcome_page }</li>
        		<li role="presentation">{ link_polls_list }</li>
			</ul>	
        }else{
        	displayLinks =  <ul className="nav navbar-nav">
			</ul>
        }

        let displayUsername = "Guest"
        let displayRole = ""

        if( this.props.logged_user.username != -1  && this.props.logged_user.username != '' ){
        	displayUsername = this.props.logged_user.username
        	displayRole = ', Your role is : ' + this.props.logged_user.role
        }


        
		return (
            <div> </div>
			// <nav className="navbar navbar-default" style={ styles.headerMain }>
	  //     		<div className="container-fluid">
	  //       		<div className="navbar-header">
			// 			<a className="navbar-brand" href="#" style={ styles.textWhite }>Poll Management System</a>
	  //       		</div>
			// 		<div className="collapse navbar-collapse" id="bs-example-navbar-collapse-6">
	          			
			// 			{ displayLinks }
	          			
	  //         			<p className="navbar-text navbar-right" style={ styles.textWhite }> Welcome <i>{ displayUsername }</i> { displayRole } </p>
	  //       		</div>

	  //     		</div>
	  //   	</nav>





  





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
    }
}

const VisibleHeader = connect(
  mapStateToProps,
  mapDispatchToProps
)( Header )



export default VisibleHeader


