import {urls} from '../index';

describe('Test forget password', () => {
  it('on forgot password page check reset button click api is fired', () => {
    cy.visit(urls.forgotPassword);
  });
});
