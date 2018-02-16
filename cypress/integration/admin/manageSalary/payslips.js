import {urls, user, month, year, contains, click, wait, shouldNotBeVisble, shouldBeVisible} from '../../../index';
import {signin, signout, apiCall} from '../../../helper';
import {urlVisited, visitIndexRoute} from '../../../visitRoutes';

describe('Test payslips page', () => {
  it('list all employees on left panel', () => {
    visitIndexRoute();
    signin(user.admin);
    urlVisited(urls.baseUrl + urls.home);
    cy.get('.nav > #manage_salary').should('be.visible');
    cy.get('.nav > #manage_salary').click();
    cy.get('.nav-sub #manage_payslips').should('be.visible');
    cy.get('.nav-sub #manage_payslips').click();
    urlVisited(urls.baseUrl + urls.manageSalary);
  });
  if ('clicking on an employee on right panel will open his salary details on right panel which will include Generate Payslip, Employee Actual Salary and Previous Payslips', () => {

  });
  if ('create payslip button will create salary slip and will add under previous payslip', () => {

  });
});
