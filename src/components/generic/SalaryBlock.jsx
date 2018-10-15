import React from "react";

const SalaryBlock = ({ item, displayPage, viewSalarySummary, callDeleteUserSalary }) => {
    console.log(item);

    return (
        <div className="row salary-blocks-margin" onClick={() => displayPage === "manage" && viewSalarySummary(item.test.id)  }>
            <div className="col-md-12 col-sm-12 salary-col-title-padding">
                <div>
                    <span className="salary-title">Applicable From: </span> {item.test.applicable_from} |
                    <span className="salary-title"> Leaves Allocated: </span> {item.test.leaves_allocated} |
                    <span className="salary-title"> Updated On: </span> {item.test.last_updated_on}
                </div>
            </div>
            <div className="col-md-12 salary-col-padding">
                <div className="col-md-1 col-sm-2 salary-total-width">
                    <div className="col-sm-12 salary-total-title">Total</div>
                    <div className="col-sm-12 salary-total-value">{item.test.total_salary}</div>
                </div>
                <div className="col-md-5 col-sm-10 bg-success salary-block salary-addition-width">
                    <div className="col-sm-2 salary-basic-width">
                        <div className="col-sm-12 salary-title">Basic</div>
                        <div className="col-sm-12">{item.Basic}</div>
                    </div>
                    <div className="col-sm-2 salary-hra-width">
                        <div className="col-sm-12 salary-title">HRA</div>
                        <div className="col-sm-12">{item.HRA}</div>
                    </div>
                    <div className="col-sm-2 salary-conveyance-width">
                        <div className="col-sm-12 salary-title">Conveyance</div>
                        <div className="col-sm-12">{item.Conveyance}</div>
                    </div>
                    <div className="col-sm-2 salary-medical-width">
                        <div className="col-sm-12 salary-title">Medical Allowance</div>
                        <div className="col-sm-12">{item.Medical_Allowance}</div>
                    </div>
                    <div className="col-sm-2 salary-special-width">
                        <div className="col-sm-12 salary-title">Special Allowance</div>
                        <div className="col-sm-12">{item.Special_Allowance}</div>
                    </div>
                    <div className="col-sm-2 salary-arrears-width">
                        <div className="col-sm-12 salary-title">Arrears</div>
                        <div className="col-sm-12">{item.Arrears}</div>
                    </div>
                </div>
                <div className="col-md-6 col-sm-12 bg-danger salary-block salary-deduction-width">
                    <div className="col-sm-2 salary-epf-width">
                        <div className="col-sm-12 salary-title">EPF</div>
                        <div className="col-sm-12">{item.EPF}</div>
                    </div>
                    <div className="col-sm-2 salary-loan-width">
                        <div className="col-sm-12 salary-title">Loan</div>
                        <div className="col-sm-12">{item.Loan}</div>
                    </div>
                    <div className="col-sm-2 salary-advance-width">
                        <div className="col-sm-12 salary-title">Advance</div>
                        <div className="col-sm-12">{item.Advance}</div>
                    </div>
                    <div className="col-sm-2 salary-miscdeductions-width">
                        <div className="col-sm-12 salary-title">Misc Deductions</div>
                        <div className="col-sm-12">{item.Misc_Deductions}</div>
                    </div>
                    <div className="col-sm-1 salary-tds-width">
                        <div className="col-sm-12 salary-title">TDS</div>
                        <div className="col-sm-12">{item.TDS}</div>
                    </div>
                    <div className="col-sm-3 salary-options-width">
                        {displayPage === "manage" ?
                            (
                                <div className="text-center">
                                    <i
                                        className="material-icons"
                                        onClick={() => callDeleteUserSalary(item.test.user_Id, item.test.id)}
                                    >
                                        delete
                                    </i>
                                </div>) :
                            (
                                <div>
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
        </div>
    );
};

export default SalaryBlock;