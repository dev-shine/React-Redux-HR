import { urls } from './index';

export const urlVisited = (url) => {
  cy.url().should('eq',url);
};

export const visitIndexRoute = () => {
  cy.visit(urls.baseUrl);
};
