import React from "react";
import moment from 'moment';

const SalaryBlock = ({ item, displayPage, viewSalarySummary, callDeleteUserSalary }) => {
    // console.log(moment(item.test.applicable_from).format("DD-MMMM-YYYY"));
    const total_earning = parseInt(item.Basic) + parseInt(item.HRA) + parseInt(item.Conveyance) + parseInt(item.Medical_Allowance) + parseInt(item.Special_Allowance) + parseInt(item.Arrears);
    const total_deduction = parseInt(item.EPF) + parseInt(item.Loan) + parseInt(item.Advance) + parseInt(item.Misc_Deductions) + parseInt(item.TDS);
    return (
        <div className="row salary-blocks-margin salary-row-bg" onClick={(e) => displayPage === "manage" && viewSalarySummary(e, item.test.id)}>
            <div className="col-md-12 col-sm-12 salary-col-title-padding">
                <div>
                    <span className="salary-title">Applicable From: </span> {moment(item.test.applicable_from).format("DD-MMMM-YYYY") || '--'} <span className="divider">|</span>
                    <span className="salary-title"> Applicable Till: </span> {`${item.test.applicable_month ? item.test.applicable_month + ' months' : '--'} (${moment(item.test.applicable_till).format("DD-MMMM-YYYY") || '--'})`} <span className="divider">|</span>
                    <span className="salary-title"> Increment Amount: </span> {item.Increment_Amount || '--'} <span className="divider">|</span>
                    <span className="salary-title"> Leaves Allocated: </span> {item.test.leaves_allocated || '--'} <span className="divider">|</span>
                    <span className="salary-title"> Updated On: </span> {moment(item.test.last_updated_on).format("DD-MMMM-YYYY") || '--'}
                </div>
            </div>
            <div className="col-md-12 salary-col-padding salary-details">
                <div className="col-md-1 col-sm-2 col-xs-12 salary-total-width">
                    <div className="col-sm-12 salary-total-title">Total</div>
                    <div className="col-sm-12 salary-total-value">{item.test.total_salary}</div>
                </div>
                <div className="col-md-5 col-sm-10 col-xs-12 bg-success salary-block salary-addition-width">
                    <div className="col-sm-12">
                        <div className="col-sm-12 salary-total-title">Total Earnings</div>
                        <div className="col-sm-12 salary-total-value">{total_earning}</div>
                    </div>
                    <div className="col-sm-2 col-xs-12 cell salary-basic-width">
                        <div className="col-sm-12 salary-title">Basic</div>
                        <div className="col-sm-12">{item.Basic}</div>
                    </div>
                    <div className="col-sm-2 col-xs-12 cell salary-hra-width">
                        <div className="col-sm-12 salary-title">HRA</div>
                        <div className="col-sm-12">{item.HRA}</div>
                    </div>
                    <div className="col-sm-2 col-xs-12 cell salary-conveyance-width">
                        <div className="col-sm-12 salary-title">Conveyance</div>
                        <div className="col-sm-12">{item.Conveyance}</div>
                    </div>
                    <div className="col-sm-2 col-xs-12 cell salary-medical-width">
                        <div className="col-sm-12 salary-title">Medical Allowance</div>
                        <div className="col-sm-12">{item.Medical_Allowance}</div>
                    </div>
                    <div className="col-sm-2 col-xs-12 cell salary-special-width">
                        <div className="col-sm-12 salary-title">Special Allowance</div>
                        <div className="col-sm-12">{item.Special_Allowance}</div>
                    </div>
                    <div className="col-sm-2 col-xs-12 cell salary-arrears-width">
                        <div className="col-sm-12 salary-title">Arrears</div>
                        <div className="col-sm-12">{item.Arrears}</div>
                    </div>
                </div>
                <div className="col-md-6 col-sm-12 col-xs-12 bg-danger salary-block salary-deduction-width">
                    <div className="col-sm-12">
                        <div className="col-sm-12 salary-total-title">Total Deductions</div>
                        <div className="col-sm-12 salary-total-value">{total_deduction}</div>
                    </div>
                    <div className="col-sm-2 col-xs-12 cell salary-epf-width">
                        <div className="col-sm-12 salary-title">EPF</div>
                        <div className="col-sm-12">{item.EPF}</div>
                    </div>
                    <div className="col-sm-2 col-xs-12 cell salary-loan-width">
                        <div className="col-sm-12 salary-title">Loan</div>
                        <div className="col-sm-12">{item.Loan}</div>
                    </div>
                    <div className="col-sm-2 col-xs-12 cell salary-advance-width">
                        <div className="col-sm-12 salary-title">Advance</div>
                        <div className="col-sm-12">{item.Advance}</div>
                    </div>
                    <div className="col-sm-2 col-xs-12 cell salary-miscdeductions-width">
                        <div className="col-sm-12 salary-title">Misc Deductions</div>
                        <div className="col-sm-12">{item.Misc_Deductions}</div>
                    </div>
                    <div className="col-sm-1 col-xs-12 cell salary-tds-width">
                        <div className="col-sm-12 salary-title">TDS</div>
                        <div className="col-sm-12">{item.TDS}</div>
                    </div>
                    {displayPage === "manage" ?
                        (
                            <div className="col-sm-3 col-xs-12 cell center salary-options-width">
                                <div className="text-center">
                                    <i
                                        className="material-icons delete-icon"
                                        onClick={(e) => callDeleteUserSalary(e, item.test.user_Id, item.test.id)}
                                    >
                                        delete_forever
                                </i>
                                </div>
                            </div>) :
                        (
                            <div className="col-sm-3 col-xs-12 cell">
                                <div className="col-sm-12 salary-title">Holding Amount</div>
                                <div className="col-sm-12 salary-holding-btn">
                                    <input type="text"
                                        className="col-md-6 col-sm-6"
                                    />
                                    <input type="button"
                                        className="col-md-6 col-sm-6 sm-btn md-raised info salary-add-holding"
                                        value="Add" />
                                </div>
                            </div>
                        )}
                </div>
            </div>
        </div>
    );
};

export default SalaryBlock;