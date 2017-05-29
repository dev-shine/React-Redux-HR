import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import LoadingIcon from 'components/generic/LoadingIcon';
import {Card, CardHeader} from 'material-ui/Card';

const styles = {
  errorAlert: {
    "width": "100%",
    "display":"none",
  },
}

const DocumentsList = ({policyDocuments, onUpdateReadStatus}) => {
  const showError = (id, errorMsg) => {
    $('#'+id+ " span").remove();
    $('#'+id).fadeIn().append("<span>"+errorMsg+"<span>")
  }
  const hideError = (e, id) => {
    e.preventDefault();
    $('#'+id).fadeOut(0);
    $('#'+id+ " span").remove();
  }
  const updateReadStatus = (doc, e) => {
    let updateDoc = [];
    _.map(policyDocuments,(document, i)=>{
      if(document.read !== 0){
        updateDoc.push(document.name);
      }
    });
    updateDoc.push(doc.name);

    onUpdateReadStatus(updateDoc)
    .then((updated)=>{
      this.showError('updateSuccessful',updated);
    })
    .catch((err)=>{
      this.showError('updateFailed',err);
    })
  }
  let documentsList = _.map(policyDocuments, (doc, i) => (
    <Card key={i} style={{boxShadow:'rgba(0, 0, 0, 0.117647) 0px 0px 1px, rgba(0, 0, 0, 0.117647) 0px 0px 0px'}} >
      <CardHeader
        title={<span>{doc.name}</span>}
        subtitle={<a href={doc.link} target="_blanck" onClick={updateReadStatus(doc)}>{doc.link}</a>}
        style={{marginTop:'10px',borderLeft:doc.read ? '5px solid rgb(76, 175, 80)' : '5px solid rgb(255, 0, 0)'}}
        titleStyle={{color:doc.read ? 'rgba(12, 12, 12, 0.54)' : '#000000' , fontSize:'18px'}}
      />
    </Card>
  ))
  return(
    <div className="app-body" id="view" style={{'marginTop':10}}>
      <div className="col-xs-12 col-sm-12" style={{ "float":"right"}}>
         <div className="row" style={{margin:'0px 4px 0px'}}>
           <div className='col-xs-12' style={{paddingTop:'10px',textAlign:'center'}}>
             <div id="updateSuccessful" className="alert alert-success pull-left" style={styles.errorAlert}>
               <a href="#" className="close" onClick={(e)=>hideError(e, 'updateSuccessful')} aria-label="close">&times;</a>
             </div>
             <div id="updateFailed" className="alert alert-danger pull-left" style={styles.errorAlert}>
               <a href="#" className="close" onClick={(e)=>hideError(e, 'updateFailed')} aria-label="close">&times;</a>
             </div>
           </div>
           <div className="col-xs-12">
             <Card style={{boxShadow:'rgba(0, 0, 0, 0.117647) 0px 0px 1px, rgba(0, 0, 0, 0.117647) 0px 0px 0px'}} >
               <CardHeader
                 title="Policy Documents List"
                 subtitle={<span>(Please read & accept all the policy documents to get access to this site. Incase of issues contact HR)</span>}
                 subtitleStyle={{color:"rgba(255, 0, 0, 0.66)",fontSize:'12px',fontStyle:'italic'}}
                 style={{marginBottom:'10px'}}
               />
             </Card>
             {documentsList}
           </div>
         </div>
      </div>
    </div>
  )
}

DocumentsList.PropTypes = {
  policyDocuments: PropTypes.array.isRequired,
  onUpdateReadStatus: PropTypes.func.isRequired
}

export default DocumentsList;
