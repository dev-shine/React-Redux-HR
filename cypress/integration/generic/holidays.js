import { urls, apiUrls, visitIndexRoute, urlVisited, user, signin, signinWithWhitespace, signout } from '../../index';

describe('Test holidays', () => {
  it('holidays list is not empty', () => {
    cy.server();
    cy.route({method:'POST',url: apiUrls.apiUrl}).as('login');
    visitIndexRoute();
    cy.get('#openLogin').click();
    urlVisited(urls.baseUrl+urls.login);
    signin(user.admin);
    // cy.request('POST', apiUrls.apiUrl).should('have.property', 'status', 200);
    // cy.wait('@login');
    urlVisited(urls.baseUrl+urls.home);
    cy.get('#holidays').should('be.visible');
    cy.get('#holidays').click();
    urlVisited(urls.baseUrl+urls.holidays);
  });
});
