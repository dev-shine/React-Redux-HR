import React from 'react';
import * as _ from 'lodash';
import Paper from 'material-ui/Paper';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import {CONFIG} from '../../../config/index';
import RaisedButton from 'material-ui/RaisedButton';
import Delete from 'material-ui/svg-icons/action/delete';
import {Table, TableBody, TableHeader, TableRow, TableRowColumn} from 'material-ui/Table';

class TeamList extends React.Component {
  constructor (props) {
    super(props);
    this.props.onIsAlreadyLogin();
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
  }

  componentWillReceiveProps (props) {
    window.scrollTo(0, 0);

    if (props.logged_user.logged_in == -1) {
      this.props.router.push('/logout');
    } else {
      if (props.logged_user.role == CONFIG.ADMIN) {

      } else {
        this.props.router.push('/home');
      }
    }
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
    if (teamName == '') {
      this.setState({
        teamError: 'Required'
      });
    } else {
      let dataToSend = this.props.teamList && this.props.teamList.teams || [];
      dataToSend.push(teamName);
      this.callSaveApi(dataToSend);
    }
  }

  deleteTeam (teamName) {
    let teams = this.props.teamList && this.props.teamList.teams || [];
    let newdata = [];
    _.map(teams, (vari, i) => {
      if (vari != teamName) {
        newdata.push(vari);
      }
    });
    this.callSaveApi(newdata);
  }
  callSaveApi (newArray) {
    this.props.onSaveTeam(newArray).then((data) => {
      this.handleClose();
    }).catch((error) => {
    });
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
    // console.log(this.props.teamList, this.props)
    let teams;
    if (this.props.teamList && this.props.teamList.teams && this.props.teamList.teams.length > 0) {
      teams = this.props.teamList.teams;
    } else {
      teams = [];
    }
    	// let teams = this.props.teamList.teams.length > 0?this.props.teamList.teams:[]
    	const actions = [
      <FlatButton
        label="Back"
        primary
        onTouchTap={this.handleClose.bind(this)}
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
            onRequestClose={this.handleClose.bind(this)}>
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
                    <Table
                      fixedHeader
                      fixedFooter
                      >
                      <TableHeader
                        adjustForCheckbox={false}
                        displaySelectAll={false}
                        >
                        <TableRow>
                          <TableRowColumn colSpan="3" >
                            <h4 style={{
                              float:           'left',
                              'marginLeft':    '-5%',
                              'paddingTop':    '1%',
                              'paddingBottom': '1%',
                              'paddingLeft':   '5%',
                              'paddingRight':  '3%',
                              'fontWeight':    'bold'}}>
                              Team(s)
                            </h4>
                          </TableRowColumn>
                        </TableRow>
                        <TableRow>
                          <TableRowColumn colSpan={1} style={{'fontWeight': 'bold'}}>Sr. no.</TableRowColumn>
                          <TableRowColumn colSpan={1} style={{'fontWeight': 'bold'}}>Teams Name</TableRowColumn>
                          <TableRowColumn colSpan={1} style={{'fontWeight': 'bold', textAlign: 'center'}}>Delete</TableRowColumn>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        displayRowCheckbox={false}>
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
                          </TableRow>
                      )
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

export default TeamList;
