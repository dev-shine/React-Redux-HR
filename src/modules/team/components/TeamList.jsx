import React from 'react';
import * as _ from 'lodash';
import Paper from 'material-ui/Paper';
import {notify} from 'src/services/notify';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import RaisedButton from 'material-ui/RaisedButton';
import Delete from 'material-ui/svg-icons/action/delete';
import {Table, TableBody, TableHeader, TableRow, TableRowColumn} from 'material-ui/Table';

class TeamList extends React.Component {
  constructor (props) {
    super(props);
    this.props.isAlreadyLogin();
    this.state = {
      openDialog:    false,
      floatingLabel: '',
      hint:          '',
      teamError:     '',
      teamName:      '',
      dialogTitle:   ''
    };
    this.openCreateTeam = this.openCreateTeam.bind(this);
    this.saveTeam = this.saveTeam.bind(this);
    this.deleteTeam = this.deleteTeam.bind(this);
    this.callSaveApi = this.callSaveApi.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  openCreateTeam () {
    this.setState({
      dialogTitle:   'Add New Team',
      openDialog:    true,
      floatingLabel: 'Team Name',
      hint:          'Enter Team Name',
      teamError:     '',
      teamName:      ''
    });
  }
  saveTeam () {
    let teamName = this.state.teamName;
    if (teamName === '') {
      this.setState({
        teamError: 'Required'
      });
    } else {
      let dataToSend = this.props.teamList.teamList && this.props.teamList.teamList.data || [];
      dataToSend.push(teamName);
      this.callSaveApi(dataToSend);
    }
  }

  deleteTeam (teamName) {
    let teams = this.props.teamList.teamList && this.props.teamList.teamList.data || [];
    let newdata = [];
    _.map(teams, (vari, i) => {
      if (vari !== teamName) {
        newdata.push(vari);
      }
    });
    this.callSaveApi(newdata);
  }
  callSaveApi (newArray) {
    this.props.requestAddTeam({newArray});
    if (this.props.teamList.teamList.isSuccess) {
      this.handleClose();
    } else {
      notify(this.props.teamList.teamList.status_message);
    }
  }
  handleClose () {
    this.setState({
      dialogTitle:   '',
      openDialog:    false,
      floatingLabel: '',
      hint:          ''
    });
  }
  render () {
    let teams;
    if (this.props.teamList.teamList && this.props.teamList.teamList.data && this.props.teamList.teamList.data.length > 0) {
      teams = this.props.teamList.teamList.data;
    } else {
      teams = [];
    }
    const actions = [
      <FlatButton
        label="Back"
        primary
        onTouchTap={this.handleClose}
        style={{marginRight: 5}}
      />,
      <RaisedButton
        label="Submit"
        primary
        onTouchTap={this.saveTeam}
      />
    ];
    return (
      <div className="app-body" id="view">
        <div className="col-xs-12 col-sm-12" style={{'float': 'right'}}>
          <Dialog
            title={this.state.dialogTitle}
            actions={actions}
            modal={false}
            open={this.state.openDialog}
            onRequestClose={this.handleClose}>
            <div>
              <TextField
                ref='value'
                floatingLabelText={this.state.floatingLabel}
                floatingLabelFixed
                hintText={this.state.hint}
                fullWidth
                errorText={this.state.teamError}
                value={this.state.teamName}
                onChange={(e) => {
                  this.setState({
                    teamName: e.target.value
                  });
                }}
                />
            </div>
          </Dialog>
          <div className="row">
            <div className="col-xs-12">
              <div className='row'>
                <div className='col-xs-12'>
                  <button
                    className="md-btn md-raised m-b-sm indigo"
                    onClick={this.openCreateTeam}>Add Team</button>
                </div>
                <div style={{'marginTop': '8%'}}>
                  <Paper zDepth={1} style={{marginBottom: '10px'}} >
                    <Table fixedHeader fixedFooter >
                      <TableHeader
                        adjustForCheckbox={false}
                        displaySelectAll={false}>
                        <TableRow>
                          <TableRowColumn colSpan="3" >
                            <h4 style={styles.teamView}>Team(s)</h4>
                          </TableRowColumn>
                        </TableRow>
                        <TableRow>
                          <TableRowColumn colSpan={1} style={{'fontWeight': 'bold'}}>Sr. no.</TableRowColumn>
                          <TableRowColumn colSpan={1} style={{'fontWeight': 'bold'}}>Teams Name</TableRowColumn>
                          <TableRowColumn colSpan={1} style={{'fontWeight': 'bold', textAlign: 'center'}}>Delete</TableRowColumn>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {_.map(teams, (vari, i) => (
                          <TableRow key={i}
                            style={{'cursor': 'pointer'}}>
                            <TableRowColumn colSpan={1} >{i + 1}</TableRowColumn>
                            <TableRowColumn colSpan={1} >{vari}</TableRowColumn>
                            <TableRowColumn colSpan={1} style={{textAlign: 'center'}}>
                              <IconButton
                                tooltip="Delete Team"
                                tooltipPosition="top-right"
                                iconStyle={{'color': '#B71C1C'}}
                                children={
                                  <Delete color='#B71C1C' />
                                }
                                onClick={(evt) => {
                                  evt.stopPropagation();
                                  this.deleteTeam(vari);
                                }
                              }
                              />
                            </TableRowColumn>
                          </TableRow>)
                        )}
                      </TableBody>
                    </Table>
                  </Paper>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
var styles = {
  teamView: {
    float:           'left',
    'marginLeft':    '-5%',
    'paddingTop':    '1%',
    'paddingBottom': '1%',
    'paddingLeft':   '5%',
    'paddingRight':  '3%',
    'fontWeight':    'bold'
  }
};
export default TeamList;
