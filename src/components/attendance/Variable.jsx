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

const styles = {
  block: {
    maxWidth: 250,
  },
  lable:{
    fontWeight:'normal',
    fontSize:15
  },
  container: {
    position: 'relative',
    textAlign:'center',
    paddingTop:'200px'
  },
  formInput:{
    "marginLeft": "5%",
    "marginRight": "5%",
    "width": "60%"
  },
};

class Variables extends React.Component {
     constructor( props ){
        super( props );
        this.props.onIsAlreadyLogin()
        this.state = {
            paper:'show',
            openDialog:false,
            dialogTitle:'',
            variableCode:'',
            floatingLabelCode:'',
            hintCode:'',
            varCodeError:'',
            variableValue:'',
            floatingLabelValue:'',
            hintValue:'',
            varValError:'',
            varId:''
        }
        this.openCreateVariable = this.openCreateVariable.bind(this)
        this.saveVariable = this.saveVariable.bind(this)
        this.deleteVariable = this.deleteVariable.bind(this);
    }
    componentWillMount(){
      /*this.setState({
          paper:'hidden'
        })
        this.props.onFetchVariables().then( (data) => {
        this.setState({
          paper:'show'
        })
      }).catch( (error) => {
        this.setState({
          paper:'show'
        })
      })*/
    }
    componentWillReceiveProps( props ){

      window.scrollTo(0, 0);

      if( props.logged_user.logged_in == -1 ){
            this.props.router.push('/logout');
        }else{
            if( props.logged_user.role == 'Admin' || props.logged_user.role == 'HR'){
                
            }else{
                this.props.router.push('/home');    
            }
        }
    }
    componentDidUpdate(){
    }
    openCreateVariable(){
      
        this.setState({
            variableCode:'',
            varCodeError:'',
            variableValue:'',
            varValError:'',
            openDialog:true,
            varId:'',
            dialogTitle:"Create Variable",
            floatingLabelCode:'Variable Code',
            hintCode:'Enter Variable Code',
            floatingLabelValue:'Variable Value',
            hintValue:'Enter Varaible Value'
        })
    }
    gotoVariablePage(){
        this.setState({
            variableCode:'',
            varCodeError:'',
            variableValue:'',
            varValError:'',
            openDialog:false,
            dialogTitle:'',
            hintValue:''
        })
    }
    saveVariable() {
      let varCode = this.state.variableCode.replace(/^\s+|\s+$/gm,'')
      let varVal = this.state.variableValue.replace(/^\s+|\s+$/gm,'')
      let id = this.state.varId
      if(varCode!=''){
        this.setState({varCodeError:''})
      }else{
        this.setState({varCodeError:'Required'})
      }
      if(varVal!=''){
        this.setState({varValError:''})
      }else{
        this.setState({varValError:'Required'})
      }
      if(varCode!='' && varVal!=''){
        varCode = varCode.toLowerCase()
        if(_.trim(varCode)[0]=="#"){

        }else{
           varCode = "#"+varCode
        }
        let variable={
              varCode:varCode,
              varValue:varVal
            }
        this.props.onSaveVariable(id,variable).then( (data) => {
          this.setState({
            variableCode:'',
            variableValue:'',
            varId:''
          })
        this.gotoVariablePage()
      }).catch( (error) => {
        this.setState({
          variableCode:'',
          variableValue:'',
        })
      })
      }
    }
    editVariable(data){
        this.setState({
            variableCode:data.name,
            varCodeError:'',
            variableValue:data.value,
            varValError:'',
            openDialog:true,
            varId:data.id,
            dialogTitle:"Edit Variable",
            floatingLabelCode:'Variable Code',
            hintCode:'',
            floatingLabelValue:'Variable Value',
            hintCode:'',
        })
    }
    deleteVariable(vari){
    this.props.onDeleteVariable(vari.id).then( () => {
      }).catch( (error) => {
      })
    }
    render(){
        const actions = [
      <FlatButton
              label="BACK"
              primary={true}
              onTouchTap={this.gotoVariablePage.bind(this)}
              style={{marginRight:5}}
            />,
            <RaisedButton
              label="SAVE"
              primary={true}
              onClick={this.saveVariable}
            />,
    ];
    	
    	return(
    		  
				<div className="app-body" id="view" style={{'marginTop':10}}>
        <div className="row">
                    <div className="col-12">
                      <LoadingIcon {...this.props}/>
                    </div>
                  </div>
						<div className="col-xs-12 col-sm-12" style={{ "float":"right"}}>

                        <Dialog
              title={this.state.dialogTitle}
              actions={actions}
              modal={false}
              open={this.state.openDialog}
              onRequestClose={this.gotoVariablePage.bind(this)}
              autoScrollBodyContent={true}
            >
            <div>
              <form className="form-inline">
              <div className="form-group" style={styles.formInput}>
              <TextField
                    ref='value'
                    floatingLabelText={this.state.floatingLabelCode}
                    floatingLabelFixed={true}
                    hintText={this.state.hintCode}
                    fullWidth={true}
                    errorText={this.state.varCodeError}
                    value={this.state.variableCode}
                    onChange={(e)=>{
                      this.setState({
                          variableCode: e.target.value,
                      });
                    }}
              />
              </div>
              <div className="form-group" style={styles.formInput}>
              <TextField
                    ref='Name'
                    floatingLabelText={this.state.floatingLabelValue}
                    floatingLabelFixed={true}
                    hintText={this.state.hintValue}
                    fullWidth={true}
                    errorText={this.state.varValError}
                    value={this.state.variableValue}
                    onChange={(e)=>{
                      this.setState({
                          variableValue: e.target.value,
                      });
                    }}
              />
              </div>
              </form>
            </div>
            </Dialog>


                         <div className="row" style={{margin:'0px 4px 0px'}}>
                           <div className="col-xs-12">
                             <div className='row'>
                              <div className='col-xs-12' style={{paddingTop:'10px',paddingRight:'0px'}}>
                              <button 
                               className="md-btn md-raised m-b-sm indigo"
                               onClick={this.openCreateVariable}
                              >Add New Variable</button>
                              </div>
                              <div className={this.state.paper} style={{"marginTop":"8%"}}>
                        <Paper  zDepth={1} >
                        <Table
                         fixedHeader={true}
                         fixedFooter={true}
                         onRowSelection={
                            (rowNumber) => {
                              if(rowNumber.length == 1){
                                this.editVariable(this.props.variable.variable[rowNumber])
                              }
                            }
                         }
                        >
                        <TableHeader
                         adjustForCheckbox={false}
                         displaySelectAll={false}
                        >
                        <TableRow>
                        <TableRowColumn colSpan="3" >
                           <h4 style={{float: 'left', "marginLeft":"-5%","paddingTop":"1%","paddingBottom":"1%","paddingLeft":"5%","paddingRight":"3%","fontWeight": "bold"}}>Variable(s)</h4>
                        </TableRowColumn>
                        </TableRow>
                        <TableRow>
                         <TableRowColumn colSpan={1} tooltip="Variable code" style={{"fontWeight": "bold"}}>Variable code</TableRowColumn>
                         <TableRowColumn colSpan={1} tooltip="Variable value" style={{"fontWeight": "bold"}}>Variable value</TableRowColumn>
                         <TableRowColumn colSpan={1} tooltip="Delete" style={{"fontWeight": "bold",textAlign:'center'}}>Delete</TableRowColumn>
                        </TableRow>
                        </TableHeader>
                        <TableBody
                         displayRowCheckbox={false}
                        >
                        {_.map(this.props.variable.variable, (vari) => (
                          <TableRow key={vari.id}
                            onChange={ (evt) => {
                            }}
                            style={{'cursor':'pointer'}}
                          >
                          <TableRowColumn colSpan={1} >{vari.name}</TableRowColumn>
                          <TableRowColumn colSpan={1} >{vari.value}</TableRowColumn>
                          <TableRowColumn colSpan={1} style={{textAlign:'center'}}>
                          <IconButton
                          tooltip="Delete Variable"
                          tooltipPosition="right"
                          iconStyle={{"color":"#B71C1C"}}
                          children={
                            <Delete color='#B71C1C'/>
                          }
                        onClick= {
                         (evt) => {
                           evt.stopPropagation();
                           this.deleteVariable(vari)
                         }
                       }
                       />
                          </TableRowColumn>
                          </TableRow>
                          ))}
                        </TableBody>
                        </Table>
                        </Paper>
                      </div>
                             </div>
                           </div>
                         </div>
                        </div>
    		  </div>
    		)
    }
}



export default Variables