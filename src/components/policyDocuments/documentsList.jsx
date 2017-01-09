import React from 'react';
import { connect } from 'react-redux'
import { Router, browserHistory, Link, withRouter } from 'react-router'

import * as _ from 'lodash'
import Menu from '../../components/generic/Menu'
import LoadingIcon from '../../components/generic/LoadingIcon'
import Paper from 'material-ui/Paper';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';

const styles = {
  errorAlert: {
    "width": "100%",
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
        this.showError = this.showError.bind(this);
        this.hideError = this.hideError.bind(this);
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
    	return(
        <div className="app-body" id="view" style={{'marginTop':10}}>
          <div className="row">
            <div className="col-12">
              <LoadingIcon {...this.props}/>
            </div>
          </div>

					<div className="col-xs-12 col-sm-12" style={{ "float":"right"}}>
             <div className="row" style={{margin:'0px 4px 0px'}}>

               <div className='col-xs-12' style={{paddingTop:'10px',textAlign:'center'}}>
                 <div id="updateSuccessful" className="alert alert-success pull-left" style={styles.errorAlert}>
                   <a href="#" className="close" onClick={(e)=>this.hideError(e, 'updateSuccessful')} aria-label="close">&times;</a>
                 </div>
                 <div id="updateFailed" className="alert alert-danger pull-left" style={styles.errorAlert}>
                   <a href="#" className="close" onClick={(e)=>this.hideError(e, 'updateFailed')} aria-label="close">&times;</a>
                 </div>
               </div>

               <div className="col-xs-12">
                 <Card
                   style={{boxShadow:'rgba(0, 0, 0, 0.117647) 0px 0px 1px, rgba(0, 0, 0, 0.117647) 0px 0px 0px'}}
                   >
                   <CardHeader
                     title="Policy Documents List"
                     subtitle={<span>(Please read & accept all the policy documents to get access to this site. Incase of issues contact HR)</span>}
                     subtitleStyle={{color:"rgba(255, 0, 0, 0.66)",fontSize:'12px',fontStyle:'italic'}}
                     style={{marginBottom:'10px'}}
                   />
                 </Card>
                 {_.map(this.state.policyDocuments, (doc, i) => (
                   <Card key={i}
                     style={{boxShadow:'rgba(0, 0, 0, 0.117647) 0px 0px 1px, rgba(0, 0, 0, 0.117647) 0px 0px 0px'}}
                     >
                     <CardHeader
                       title={<span>{doc.name}</span>}
                       subtitle={<a href={doc.link} target="_blanck" onClick={()=>{this.updateReadStatus(doc)}}>{doc.link}</a>}
                       style={{marginTop:'10px',borderLeft:doc.read ? '5px solid rgb(76, 175, 80)' : '5px solid rgb(255, 0, 0)'}}
                       titleStyle={{color:doc.read ? 'rgba(12, 12, 12, 0.54)' : '#000000' , fontSize:'18px'}}
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
