import {urls, user, apiUrls} from '../../index';
import {signin, signout} from '../../helper';
import {urlVisited, visitIndexRoute} from '../../visitRoutes';

describe('Test holidays', () => {
  it('holidays list is not empty', () => {
    cy.server();
    cy.route({method: 'POST', url: apiUrls.apiUrl}).as('login');
    signin(user.admin);
    urlVisited(urls.baseUrl + urls.home);
    cy.get('#holidays').should('be.visible');
    cy.get('#holidays').click();
    urlVisited(urls.baseUrl + urls.holidays);
  });
});
