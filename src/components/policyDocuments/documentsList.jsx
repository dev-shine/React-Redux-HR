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
  errorAlert: {
    "marginLeft": "5%",
    "marginRight": "5%",
    "width": "90%",
    "display":"none",
  },
}
class DocumentsList extends React.Component {
     constructor( props ){
        super( props );
        this.state = {
          policyDocuments: [],
        };
        this.updateReadStatus = this.updateReadStatus.bind(this);
    }
    componentWillMount(){

    }
    componentWillReceiveProps( props ){
      this.setState({
        policyDocuments: props.policyDocuments,
      });
    }
    componentDidUpdate(){

    }
    showError(id, errorMsg){
      $('#'+id+ " span").remove();
      $('#'+id).fadeIn().append("<span>"+errorMsg+"<span>")
    }
    hideError(e, id){
      e.preventDefault();
      $('#'+id).fadeOut(0);
      $('#'+id+ " span").remove();
    }
    updateReadStatus(doc, e){
      let updateDoc = [];
      _.map(this.state.policyDocuments,(document, i)=>{
        if(document.read !== 0){
          updateDoc.push(document.name);
        }
      });
      updateDoc.push(doc.name);

      this.props.onUpdateReadStatus(updateDoc)
      .then((updated)=>{
        this.showError('updateSuccessful',updated);
      })
      .catch((err)=>{
        this.showError('updateFailed',err);
      })
    }

    render(){
      console.log('this.state',this.state);
    	return(
        <div className="app-body" id="view" style={{'marginTop':10}}>
          <div className="row">
            <div className="col-12">
              <LoadingIcon {...this.props}/>
            </div>
          </div>
          <div className='col-xs-12' style={{paddingTop:'10px',paddingRight:'0px',textAlign:'center'}}>
            <div id="mailsentsuccessfully" className="alert alert-success pull-left" style={styles.errorAlert}>
              <a href="#" className="close" onClick={(e)=>this.hideError(e, 'mailsentsuccessfully')} aria-label="close">&times;</a>
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
                 {_.map(this.state.policyDocuments, (doc, i) => (
                   <Card key={i}>
                     <CardHeader
                       title={doc.name}
                       subtitle={<a href={doc.link} target="_blanck" onClick={()=>{this.updateReadStatus(doc)}}>{doc.link}</a>}
                       style={{marginTop:'10px'}}
                       titleStyle={{color:doc.read ? 'rgba(125, 137, 230, 0.84)' : '#000' , fontSize:'18px'}}
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
