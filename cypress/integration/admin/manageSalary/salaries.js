import {urls, user, month, year, contains, click, wait, shouldNotBeVisble, shouldBeVisible} from '../../../index';
import {signin, signout, apiCall} from '../../../helper';
import {urlVisited, visitIndexRoute} from '../../../visitRoutes';

describe('Test salaries page', () => {
  xit('empoyees list will be visible on left side panel', () => {
    signin(user.admin);
    urlVisited(urls.baseUrl + urls.home);
    cy.get('.nav > #manage_salary').should('be.visible');
    cy.get('.nav > #manage_salary').click();
    cy.get('.nav-sub #manage_salary').should('be.visible');
    cy.get('.nav-sub #manage_salary').click();
    urlVisited(urls.baseUrl + urls.manageSalary);
    cy.get('.app-body').should('be.visible');
    cy.get('.app-body .padding').should('be.visible');
  });
  xit('click on any employee will show his salary details on right side panel', () => {

  });
  xit('when new salary is added from 2nd column it will list in the first column', () => {

  });
  xit('when new holding is added from 3rd column it will list in the same column', () => {

  });
});
