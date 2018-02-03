import {urlVisited, visitIndexRoute} from './visitRoutes';
import {urls} from './index';

export const signin = (user) => {
  cy.get('#openLogin').click();
  urlVisited(urls.baseUrl + urls.login);
  cy.get('#usernameInput').type(user.username);
  cy.get('#passwordInput').type(user.password);
  cy.get('#loginButton').click();
};
export const signout = () => {
  cy.get('#Logout').click();
  urlVisited(urls.baseUrl);
};

export const apiCall = (method, url, body, testcase) => {
  let token = null;
  return new Promise((reslove, reject) => {
    return cy.request(method, url, body).then((response) => {
      token = response.body.data.token;
      reslove(token);
    });
  });
  console.log(token, localStorage.getItem('token'), '================');
};
