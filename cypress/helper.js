import {urlVisited, visitIndexRoute} from './visitRoutes';
import {urls} from './index';

export const click = (id) => cy.get(id).click();
export const contains = (id, text) => cy.get(id).contains(text);
export const type = (id, text) => cy.get(id).type(text);
export const scrollTo = (position) => {
  document.body.scrollTop = document.documentElement.scrollTop = position;
}
export const wait = (time) => cy.wait(time);
export const shouldBeVisible = (id) => cy.get(id).should('be.visible');
export const shouldNotBeVisible = (id) => cy.get(id).should('not.be.visible');

export const signin = (user) => {
  visitIndexRoute();
  click('#openLogin');
  urlVisited(urls.baseUrl + urls.login);
  type('#usernameInput', user.username);
  type('#passwordInput', user.password);
  click('#loginButton');
};
export const signout = () => {
  click('#Logout')();
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
};
