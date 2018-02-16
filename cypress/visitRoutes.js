import {urls, click} from './index';

export const urlVisited = (url) => {
  cy.url().should('eq', url);
};

export const visitIndexRoute = () => {
  cy.visit(urls.baseUrl);
};

// Manage Hours
export const visitOfficeHours = () => {
  cy.get('.nav > #manage_working_hours').should('be.visible');
  click('.nav > #manage_working_hours');
  cy.get('.nav-sub #manage_working_hours').should('be.visible');
  click('.nav-sub #manage_working_hours');
}
