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
  formInput:{
    "marginLeft": "5%",
    "marginRight": "5%",
    "width": "80%"
  },
};

class FormUploadPolicyDocument extends React.Component {
     constructor( props ){
        super( props );
        this.state = {
          docs: [],
          nameofdoc:'',
          linkofdoc:'',
          errName:'',
          errLink:'',
        };
        this.addMoreDocs = this.addMoreDocs.bind(this);
        this.submitDocs = this.submitDocs.bind(this);
    }
    componentWillMount(){

    }
    componentWillReceiveProps( props ){

    }
    componentDidUpdate(){

    }
    addMoreDocs(){
      let name = this.state.nameofdoc.trim(),
          link = this.state.linkofdoc.trim(),
          state = true;
          this.setState({
            errName:'',
            errLink:'',
          });
          if(state && _.isEmpty(name)){
            state = false;
            this.setState({
              errName:"Please enter document name",
            });
          }
          if(state && _.isEmpty(link)){
            state = false;
            this.setState({
              errLink:"Please enter document link",
            });
          }
          if(state){
            let docs = this.state.docs;
            docs.push({name:name, link:link});
            this.setState({
              docs: docs,
              errName: '',
              errLink: '',
              nameofdoc:'',
              linkofdoc:'',
            });
          }
    }
    submitDocs(){
      let docs = this.state.docs;
      if(docs.length > 0){
        let policyDocuments = this.props.policy_documents.policyDocuments;
        let finalDoc = _.union(policyDocuments, docs);
        this.props.onSubmitDocs(docs).then(()=>{
          alert("submitted");
          this.setState({
            docs:[],
          });
        })
        .catch(()=>{
          alert("submit faild");
        });
      }else{
        alert("Please save the doc data first");
      }
    }
    render(){
      console.log('this.state',this.state);
    	return(
        <div>
        <div className="col-xs-7">
        <Paper  zDepth={1} >
            <div>
            <form className="form-inline">
            <div className="form-group" style={styles.formInput}>
            <TextField
                  ref='name'
                  style={{width:'100%'}}
                  floatingLabelText="Name of doc"
                  errorText={this.state.errName}
                  value={this.state.nameofdoc}
                  onChange={(e)=>{
                    this.setState({
                        nameofdoc: e.target.value,
                    });
                  }}
            />
            </div>
            <div className="form-group" style={styles.formInput}>
            <TextField
                  ref='link'
                  style={{width:'100%'}}
                  floatingLabelText="Link of doc"
                  errorText={this.state.errLink}
                  value={this.state.linkofdoc}
                  onChange={(e)=>{
                    this.setState({
                        linkofdoc: e.target.value,
                    });
                  }}
            />
            </div>
            <div className="form-group" style={styles.formInput}>
              <FlatButton
                label="Add More"
                primary={true}
                style={{margin:"20px 10px"}}
                onTouchTap={this.addMoreDocs}
              />
              <RaisedButton
                label="SUBMIT"
                primary={true}
                style={{margin:"20px 10px"}}
                onClick={this.submitDocs}
              />
            </div>
            </form>
          </div>
        </Paper>
        </div>
        <div className="col-xs-5">
          <Paper  zDepth={1}>
            <div style={{padding:"15px"}}>

            <div className="text-center p-t">
              <strong>Documents in queue</strong>
              <hr />
            </div>
          {this.state.docs.length > 0 ?
            _.map(this.state.docs,(doc, i)=>(
              <div className="m-b p-l" key={i} style={{overflow:'hidden',textOverflow:'ellipsis'}}>
                <div><strong>Name :</strong><span>{doc.name}</span></div>
                <div><strong>Link :</strong><span>{doc.link}</span></div>
              </div>
            ))
            :
            <div className="m-b p-l text-center">
              No document queued for submit
            </div>
          }
        </div>
        </Paper>
        </div>


      </div>
    )
  }
}



export default FormUploadPolicyDocument
