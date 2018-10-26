import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';

const UserHistoryHolding = ({ data }) => {
    let holdingHistory = _.map(data, (item, key) => {
        return (
            <tr key={key}>
                <td>Rs.{item.holding_amt}</td>
                <td>{item.holding_start_date}</td>
                <td>{item.holding_end_date}</td>
                <td>{item.reason}</td>
                <td>{item.last_updated_on}</td>
            </tr>
        )
    });
    return (
        <div>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <td>Holding Amount</td>
                        <td>Start</td>
                        <td>End</td>
                        <td>Reason</td>
                        <td>Updated on</td>
                    </tr>
                </thead>
                <tbody>
                    {holdingHistory}
                </tbody>
            </table>
        </div>
    )
}

UserHistoryHolding.PropTypes = {
    data: PropTypes.array.isRequired
}

export default UserHistoryHolding;
