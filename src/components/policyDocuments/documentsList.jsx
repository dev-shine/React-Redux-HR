import React from 'react';
import { connect } from 'react-redux'
import { Router, browserHistory, Link, withRouter } from 'react-router'

import * as _ from 'lodash'
import Menu from '../../components/generic/Menu'
import LoadingIcon from '../../components/generic/LoadingIcon'
import * as actions_login from '../../actions/login/index'
import * as actions_salary from '../../actions/salary/index'
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import Delete from 'material-ui/svg-icons/action/delete';
import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn}from 'material-ui/Table';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import { CONFIG } from '../../config/index'

const styles = {
  block: {
    maxWidth: 250,
  },
  lable:{
    fontWeight:'normal',
    fontSize:15
  },
  container: {
    position: 'relative',
    textAlign:'center',
    paddingTop:'200px'
  },
  formInput:{
    "marginLeft": "5%",
    "marginRight": "5%",
    "width": "60%"
  },
};

class DocumentsList extends React.Component {
     constructor( props ){
        super( props );
        this.state = {
        };
        this.updateReadStatus = this.updateReadStatus.bind(this);
    }
    componentWillMount(){

    }
    componentWillReceiveProps( props ){

    }
    componentDidUpdate(){

    }
    updateReadStatus(doc_id, e){
      this.props.onUpdateReadStatus(doc_id)
    }
    render(){
    	return(
        <div className="app-body" id="view" style={{'marginTop':10}}>
          <div className="row">
            <div className="col-12">
              <LoadingIcon {...this.props}/>
            </div>
          </div>
					<div className="col-xs-12 col-sm-12" style={{ "float":"right"}}>
             <div className="row" style={{margin:'0px 4px 0px'}}>
               <div className="col-xs-12">
                 <Card>
                   <CardHeader
                     title="Policy Documents List"
                   />
                 </Card>
                 {_.map(this.props.policyDocuments, (doc, i) => (
                   <Card key={i}>
                     <CardHeader
                       title={doc.name}
                       subtitle={<a href={doc.link} target="_blanck" onClick={(e)=>{this.updateReadStatus(doc.id, e)}}>{doc.link}</a>}
                       style={{marginTop:'10px'}}
                       titleStyle={{color:doc.unread ? '#000' : 'rgba(125, 137, 230, 0.84)', fontSize:'18px'}}
                     />
                   </Card>
                 ))
                 }
               </div>
             </div>
          </div>
    	</div>
    )
  }
}



export default DocumentsList
