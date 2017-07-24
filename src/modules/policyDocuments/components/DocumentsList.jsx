import React from 'react';
import PropTypes from 'prop-types';
import {notify} from 'src/services/notify';
import _ from 'lodash';
import {Card, CardHeader} from 'material-ui/Card';
import Message from 'components/generic/Message';

const styles = {
  errorAlert: {
    'width': '100%'
  }
};

class DocumentsList extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      errClass: 'hidden',
      errMsg:   ''
    };
    this.hideError = this.hideError.bind(this);
    this.updateReadStatus = this.updateReadStatus.bind(this);
  }
  hideError (e) {
    e.preventDefault();
    this.setState({
      errClass: 'hidden',
      errMsg:   ''
    });
  }
  updateReadStatus (doc, e) {
    let updateDoc = [];
    _.map(this.props.policyDocuments.data, (document, i) => {
      if (document.read !== 0) {
        updateDoc.push(document.name);
      }
    });
    updateDoc.push(doc.name);
    this.props.onUpdateReadStatus(updateDoc);
  }
  render () {
    let documentsList = _.map(this.props.policyDocuments.data, (doc, i) => (
      <Card key={i} style={{boxShadow: 'rgba(0, 0, 0, 0.117647) 0px 0px 1px, rgba(0, 0, 0, 0.117647) 0px 0px 0px'}} >
        <CardHeader
          title={<span>{doc.name}</span>}
          subtitle={<a href={doc.link} target="_blanck" onClick={() => this.updateReadStatus(doc)}>{doc.link}</a>}
          style={{marginTop: '10px', borderLeft: doc.read ? '5px solid rgb(76, 175, 80)' : '5px solid rgb(255, 0, 0)'}}
          titleStyle={{color: doc.read ? 'rgba(12, 12, 12, 0.54)' : '#000000', fontSize: '18px'}}
        />
      </Card>
    ));
    return (
      <div className="app-body" id="view" style={{'marginTop': 10}}>
        <div className="col-xs-12 col-sm-12" style={{'float': 'right'}}>
          <div className="row" style={{margin: '0px 4px 0px'}}>
            <div className='col-xs-12' style={{paddingTop: '10px', textAlign: 'center'}}>
              <Message className={this.state.errClass} style={styles.errorAlert} message={this.state.errMsg} onClick={this.hideError} />
            </div>
            <div className="col-xs-12">
              <Card style={{boxShadow: 'rgba(0, 0, 0, 0.117647) 0px 0px 1px, rgba(0, 0, 0, 0.117647) 0px 0px 0px'}} >
                <CardHeader
                  title="Policy Documents List"
                  subtitle={<span>(Please read & accept all the policy documents to get access to this site. Incase of issues contact HR)</span>}
                  subtitleStyle={{color: 'rgba(255, 0, 0, 0.66)', fontSize: '12px', fontStyle: 'italic'}}
                  style={{marginBottom: '10px'}}
                />
              </Card>
              {documentsList}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

DocumentsList.PropTypes = {
  policyDocuments:    PropTypes.array.isRequired,
  onUpdateReadStatus: PropTypes.func.isRequired
};

export default DocumentsList;
