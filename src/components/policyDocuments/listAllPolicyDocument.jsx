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
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';


class ListAllPolicyDocument extends React.Component {
     constructor( props ){
        super( props );
        this.state = {
          policyDocuments:[],
        };
        this.deleteDocument = this.deleteDocument.bind(this);
    }
    componentWillMount(){

    }
    componentWillReceiveProps( props ){
      this.setState({
        policyDocuments:props.policyDocuments,
      });
    }
    componentDidUpdate(){

    }
    deleteDocument(delDoc){
      let newList = [];
      _.map(this.state.policyDocuments, (doc,i)=>{
        if(doc.name !== delDoc.name){
          newList.push(doc);
        }
      })
      this.props.submitNewListofDocs(newList);
    }
    render(){
    	return(
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
                   subtitle={<span>{doc.link}</span>}
                   children={
                     <IconButton
                     tooltip="Delete Document"
                     tooltipPosition="top-center"
                     style={{float:'right'}}
                     iconStyle={{"color":"#B71C1C"}}
                     children={
                       <Delete color='#B71C1C'/>
                     }
                   onClick= {
                    (evt) => {
                      evt.stopPropagation();
                      this.deleteDocument(doc)
                    }
                  }
                  />
                   }
                   textStyle={{width:'310px',paddingRight:'0px'}}
                   containerStyle={{marginLeft:'1px'}}
                   style={{marginTop:'10px'}}
                   titleStyle={{color:'#000000' , fontSize:'18px'}}
                   subtitleStyle={{fontSize:'12px',fontStyle:'italic',overflow:'hidden',textOverflow:'ellipsis'}}
                 />
               </Card>
               ))
             }
           </div>
         </div>
       )
  }
}



export default ListAllPolicyDocument
