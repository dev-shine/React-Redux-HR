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
      //console.log('this.state',this.state);
    	return(
        <div className="app-body" id="view" style={{'marginTop':10}}>
          <div className="row">
            <div className="col-12">
              <LoadingIcon {...this.props}/>
            </div>
          </div>
          <div className='col-xs-12' style={{paddingTop:'10px',paddingRight:'0px',textAlign:'center'}}>
            <div id="updateSuccessful" className="alert alert-success pull-left" style={styles.errorAlert}>
              <a href="#" className="close" onClick={(e)=>this.hideError(e, 'updateSuccessful')} aria-label="close">&times;</a>
            </div>
            <div id="updateFailed" className="alert alert-danger pull-left" style={styles.errorAlert}>
              <a href="#" className="close" onClick={(e)=>this.hideError(e, 'updateFailed')} aria-label="close">&times;</a>
            </div>
          </div>
					<div className="col-xs-12 col-sm-12" style={{ "float":"right"}}>
             <div className="row" style={{margin:'0px 4px 0px'}}>
               <div className="col-xs-12">
                 <Card>
                   <CardHeader
                     title="Policy Documents List"
                     subtitle={<span>(Please read all the policy documents to get access to this site)</span>}
                     subtitleStyle={{color:"rgba(255, 0, 0, 0.66)",fontSize:'12px',fontStyle:'italic'}}
                     style={{marginBottom:'10px'}}
                   />
                 </Card>
                 <Paper zDepth={2}>
                 {_.map(this.state.policyDocuments, (doc, i) => (
                   <Card key={i}>
                     <CardHeader
                       title={<span>{doc.name}<sup className="badge" style={{color:'red', background:'#FFF',border:'1px solid gray',fontWeight: '400'}} >{doc.read ? "" : "unread"}</sup></span>}
                       subtitle={<a href={doc.link} target="_blanck" onClick={()=>{this.updateReadStatus(doc)}}>{doc.link}</a>}
                       style={{marginTop:'0px',background: 'linear-gradient(rgb(253, 253, 253),rgb(90, 199, 228)250%)'}}
                       titleStyle={{color:doc.read ? 'rgba(12, 12, 12, 0.54)' : '#000000' , fontSize:'18px'}}
                     />
                   </Card>
                 ))
                 }
                 </Paper>
               </div>
             </div>
          </div>
    	</div>
    )
  }
}



export default DocumentsList
