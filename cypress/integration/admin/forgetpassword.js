import {urls, user, month, year, contains, click, wait, shouldNotBeVisble, shouldBeVisible} from '../../index';
import {signin, signout} from '../../helper';
import {urlVisited, visitIndexRoute} from '../../visitRoutes';

describe('Testing forget password', () => {
  it('testing forget password button while clicking', () => {
    visitIndexRoute();
    cy.get('#openLogin').click();
    urlVisited(urls.baseUrl + urls.login);
    cy.get('#forgetPassword').click();
    urlVisited(urls.baseUrl + urls.forgotPassword);
    cy.get('#forgotPasswordInput').type('arun');
  });
});
