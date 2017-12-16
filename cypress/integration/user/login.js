import { urls, visitIndexRoute, urlVisited, user, signin, signinWithWhitespace, signout } from '../../index';

describe('User login', () => {
  it('user should able to login and redirected to home page', () => {
    signin(user.user);
    urlVisited(urls.baseUrl+urls.policyDocuments);
  });
  it('trim email, so there is no space at the end', () => {
      signin(user.userWhiteSpace);
      urlVisited(urls.baseUrl+urls.policyDocuments);
  });
  it('user should get promoted for worng password', () => {
      signin(user.userWrongPassword);
      cy.get('.sweet-alert').should('be.visible');
      cy.get('.confirm').click();
  });
  it('user should get promoted for worng username with error msg', () => {
      signin(user.userWrongPassword);
      cy.get('.sweet-alert').should('be.visible');
      cy.get('.confirm').click();
  });
});
