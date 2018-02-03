import {urls, user, apiUrls} from '../../../index';
import {signin, signout, apiCall} from '../../../helper';
import {urlVisited, visitIndexRoute} from '../../../visitRoutes';

describe('Test attendance upload page', () => {
  it('page load successfully', () => {
    visitIndexRoute();
    signin(user.admin);
    urlVisited(urls.baseUrl + urls.home);
    cy.get('.nav > #monthly_attendance').should('be.visible');
    cy.get('.nav > #monthly_attendance').click();
    cy.get('.nav-sub #uploadAttendance').should('be.visible');
    cy.get('.nav-sub #uploadAttendance').click();
    urlVisited(urls.baseUrl + urls.uploadAttendance);
  });
});
