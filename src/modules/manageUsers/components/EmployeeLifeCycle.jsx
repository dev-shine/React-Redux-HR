import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import {Table, TableBody, TableHeader, TableRow, TableRowColumn} from 'material-ui/Table';

const EmployeeLifeCycle = ({data, handleChangeSteps}) => {
  let list = data.employee_life_cycle;
  let display = _.map(list, (value, key) => {
    let steps = _.map(value.steps, (v, k) => {
      if (v.status === 1) {
        v.text = <span className="text-success">{v.text}</span>;
      } else if (v.status === 0) {
        v.text = <span className="text-danger">{v.text}</span>;
      }
      return (
        <TableRow rowNumber={v.id} key={k} style={{'cursor': 'pointer', 'height': '30px'}}>
          <TableRowColumn style={{'height': '30px', 'padding': '0px 5px', 'whiteSpace': 'normal'}} colSpan={1} >{v.text}</TableRowColumn>
        </TableRow>
      );
    });
    return (
      <div className="col-xs p-xs" key={key}>
        <div className="box-row">
          <Table onCellClick={(rowNumber) => handleChangeSteps(value.steps[rowNumber].id)}>
            <TableHeader
              adjustForCheckbox={false}
              displaySelectAll={false}>
              <TableRow style={{'height': '30px'}}>
                <TableRowColumn colSpan="2" style={{'height': '30px', 'whiteSpace': 'normal'}} ><b>{value.text}</b></TableRowColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false}>{steps}</TableBody>
          </Table>
        </div>
      </div>
    );
  });
  return (
    <div className="col-md-12">
      <h6 className="text-center" data-toggle="collapse" data-target="#collapseLink" style={{'cursor': 'pointer'}}>
        Employee Life Cycle ( Click on to change status - <span className="text-success">DONE</span> / <span className="text-danger">PENDING</span> )
      </h6>
      <div className="collapse" id="collapseLink">
        <div className="rowflex">
          {display}
        </div>
      </div>
    </div>
  );
};

export default EmployeeLifeCycle;

EmployeeLifeCycle.PropTypes = {
  data: PropTypes.shape({
    employee_life_cycle: PropTypes.object.isRequired
  }).isRequired,
  handleChangeSteps: PropTypes.func.isRequired
};
