import { urls, visitIndexRoute, urlVisited } from '../../index';

describe('Test attendance option', () => {
  it('cheking dropdown at attendance', () => {
    visitIndexRoute();
    cy.get('#openLogin').click();
    urlVisited(urls.baseUrl+urls.login);
    cy.get('#usernameInput').type('arun');
    cy.get('#passwordInput').type('java@123');
    cy.get('#loginButton').click().wait(3000);
    urlVisited(urls.baseUrl+urls.home);
    cy.get('.nav > #monthly_attendance').click();
    cy.get('.nav-sub #monthly_attendance').should('be.visible');
    cy.get('.nav-sub #home').should('be.visible');
    cy.get('.nav-sub #uploadAttendance').should('be.visible');
    cy.get('.nav-sub > #monthly_attendance').click();
    urlVisited(urls.baseUrl+urls.monthlyAttendance);
  });
});
