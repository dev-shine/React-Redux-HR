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
    deleteDocument(position){
      let newList = _.pullAt(this.state.policyDocuments, [position]);
      this.props.onSubmitDocs(newList).then(()=>{
        alert("deleted");
        this.setState({
          docs:[],
        });
      })
      .catch(()=>{
        alert("delete faild");
      });
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
                   subtitle={<a href={doc.link} target="_blanck" onClick={(e)=>{this.updateReadStatus(doc.id, e)}}>{doc.link}</a>}
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
                      this.deleteDocument(i)
                    }
                  }
                  />
                   }
                   style={{marginTop:'10px'}}
                   titleStyle={{color:doc.unread ? '#000' : '#ccc', fontSize:'18px'}}
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
