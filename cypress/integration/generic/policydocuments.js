import { urls, apiUrls, visitIndexRoute, urlVisited, user, signin, signinWithWhitespace, signout } from '../../index';

describe('Test policy documents', () => {
  it('policy documents list is not empty', () => {
    cy.server();
    cy.route({method:'POST',url: apiUrls.apiUrl}).as('login');
    signin(user.admin);
    urlVisited(urls.baseUrl+urls.home);
    cy.get('#policy_documents').should('be.visible');
    cy.get('#policy_documents').click();
    urlVisited(urls.baseUrl+urls.policyDocuments);
    cy.get('#SamplePolicy1').should('be.visible');
    cy.get('#PolicyTest').should('be.visible');
    cy.get('#test').should('be.visible');
    cy.get('#testing').should('be.visible');
  });
  it('click on any document url will open a new tab, fire an api and status from red change to green or will be green if already green', () => {
    cy.server();
    cy.route({method:'POST',url: apiUrls.apiUrl}).as('login');
    signin(user.admin);
    urlVisited(urls.baseUrl+urls.home);
    cy.get('#policy_documents').should('be.visible');
    cy.get('#policy_documents').click();
    cy.get('#SamplePolicy1 a').click();
    cy.get('#policy_documents').click();
    cy.get('#PolicyTest a').click();
    cy.get('#test a').click();
    cy.get('#testing a').click();
  });
});
