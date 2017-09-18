import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import _ from 'lodash';
import {
  HighchartsChart, Chart, XAxis, YAxis, Title, Legend, ColumnSeries, SplineSeries, PieSeries
} from 'react-jsx-highcharts';
import userDashboard from 'components/manageUser/userDashboard';

class PageEmployeeLifeCycle extends Component {
  constructor (props) {
    super(props);
  }
  componentsWillMount (props) {
  }

  componentWillReceiveProps (props) {
    window.scrollTo(0, 0);
  }
  render () {
    return (
      <div>
        <div className="team">
        <HighchartsChart>
          <Chart />
          <Title>{'Employee Life Cycle'}</Title>
          <Legend />
          <XAxis id="x" categories={['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']} />
          <YAxis id="number">
            <ColumnSeries id="jane" name="emp1" data={[3, 2, 1, 3, 1]} />
            <ColumnSeries id="john" name="emp2" data={[2, 3, 5, 7, 6]} />
            <SplineSeries id="average" name="Average" data={[3, 2.67, 3, 6.33, 3.33]} />
            <PieSeries id="total-consumption" name="Total consumption" data={pieData} center={[100, 80]} size={100} showInLegend={false} />
          </YAxis>
        </HighchartsChart>
      </div>
    </div>
    );
  }
}

export default PageEmployeeLifeCycle;
