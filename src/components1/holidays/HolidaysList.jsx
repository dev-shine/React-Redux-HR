import React from 'react';

const HolidaysList = ({holidays}) => {
  let holidaysList = _.map(holidays, (holiday, key) => {
    return (
      <tr key={key}>
        <td>{holiday.month}</td>
        <td>{holiday.date}</td>
        <td>{holiday.name}</td>
      </tr>
    )
  });
  return (
    <div className="row">
      <div className="col-12">
        <div className="box">
          <div className="box">
            <div className="box-divider m-a-0"></div>
            <table className="table">
              <thead>
                <tr>
                  <th>Month</th>
                  <th>Date</th>
                  <th>Holiday</th>
                </tr>
              </thead>
              <tbody>
                {holidaysList}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HolidaysList;
