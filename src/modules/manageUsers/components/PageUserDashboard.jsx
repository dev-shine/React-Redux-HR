import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import _ from 'lodash';
import {
  HighchartsChart, Chart, XAxis, YAxis, Title, Legend, ColumnSeries, SplineSeries, PieSeries
} from 'react-jsx-highcharts';

class PageUserDashboard extends Component {
  constructor (props) {
    super(props);
    this.state = {
      teamGraphData: ''
    };
  }
  componentsWillMount (props) {
    this.setState({
      teamGraphData: this.props.team
    });
  }

  componentWillReceiveProps (props) {
    window.scrollTo(0, 0);
    this.setState({
      teamGraphData: this.props.team
    });
  }
  render () {
    let teamUser = this.state.teamGraphData;
    let UserList = _.map(teamUser, (teamData, key) => {
      let member = teamData.member;
      let noOfMonths = [];
      const pieData = [];
      let memberName = [];
      let data = teamData.name;
      let graphdata = _.map(member, (memberData, k) => {
        noOfMonths.push(memberData.number_of_months);
        memberName.push(memberData.name);
        pieData.push(memberData.name);
        return (
          <XAxis key={k} id="x" categories={memberName} />
        );
      });

      return (
        <div key={teamData.count_members} className="p-t p-m">
          {teamData.name !== ''
        ? <HighchartsChart>
          <Chart />
          <Title>{teamData.name}</Title>
          <Legend />
          {graphdata}
          <YAxis id="number">
            <ColumnSeries id="employee" name="Employees" data={noOfMonths} />
            <PieSeries key={key} id="total-consumption"
              name="Total consumption"
              data={pieData}
              center={[100, 80]}
              size={100}
              showInLegend={false} />
          </YAxis>
        </HighchartsChart>
        : null
      }
        </div>
      );
    });
    return (
      <div>
        {UserList}
      </div>
    );
  }
}

export default PageUserDashboard;
