import { urls, apiCall, apiUrls, visitIndexRoute, urlVisited, user, signin, signinWithWhitespace, signout } from '../../index';

export const salaryPaySlipsRevision = (token) => {
  urlVisited(urls.baseUrl+urls.home);
  cy.get('#salary').should('be.visible');
  cy.get('#salary').click();
  apiCall('POST',apiUrls.apiUrl,{action: "get_user_salary_info", token: token});
};

describe('Test policy documents', () => {
  it('api is fired which will show salary details, salary revision, previous payslips', () => {
    signin(user.admin);
    apiCall('POST',apiUrls.apiUrl, {action: "login", username: "arun", password: "java@123", token: null}, 'loginPolicy');
    urlVisited(urls.baseUrl+urls.salary);
    cy.get('#salaryDetail').should('be.visible');
    cy.get('#salaryRevision').should('be.visible');
    cy.get('#payslips').should('be.visible');
  });
  it('if no salary details, no salary revision, no previous payslips are there then it should be empty', () => {

  });
});
