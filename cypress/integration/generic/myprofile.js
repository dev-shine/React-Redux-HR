import { urls, user, apiUrls } from "../../index";
import { signin, signout } from "../../helper";
import { urlVisited, visitIndexRoute } from "../../visitRoutes";

const apiData = {
  action: "login",
  username: "arun",
  password: "java@123",
  token: null
};

export const profileData = token => {
  cy.get("#my_profile").should("be.visible");
  cy.get("#my_profile").click();
  apiCall("POST", apiUrls.apiUrl, {
    action: "get_user_profile_detail",
    token: token
  });
};

describe("Test my profile", () => {
  // it('api is fired which will show personal details and bank details information, User Name will be read only', () => {
  //   cy.server();
  //   cy.route({method:'POST',url: apiUrls.apiUrl}).as('login');
  //   signin(user.user);
  //   urlVisited(urls.baseUrl+urls.monthlyAttendance);
  //   cy.get('#my_profile').should('be.visible');
  //   cy.get('#my_profile').click();
  //   urlVisited(urls.baseUrl+urls.myProfile);
  //   cy.get('#user_name').should('be.visible').and('have.attr', 'disabled');
  // });
  // it('api is fired which will show user previous salary slip details', () => {
  //   cy.server();
  //   cy.route({method:'POST',url: apiUrls.apiUrl}).as('login');
  //   signin(user.user);
  //   urlVisited(urls.baseUrl+urls.monthlyAttendance);
  //   cy.get('#salary').should('be.visible');
  //   cy.get('#salary').click();
  //   urlVisited(urls.baseUrl+urls.salary);
  //   cy.get('#salary_revisions').should('be.visible').and('have.length', 1);
  // });
  it("on UPDATE PROFILE DETAILS button click Person Details will be updated with new data", () => {
    cy.server();
    cy.route({ method: "POST", url: apiUrls.apiUrl }).as("login");
    signin(user.user);
    apiCall("POST", apiUrls.apiUrl, apiData, "loginprofile").then(data => {
      cy.get("#my_profile").should("be.visible");
      cy.get("#my_profile").click();
      apiCall("POST", apiUrls.apiUrl, {
        action: "get_user_profile_detail",
        token: data
      });
    });

    urlVisited(urls.baseUrl + urls.myProfile);
    cy
      .get("#user_Contact")
      .clear()
      .type("7838912921");
    cy.get("#profile_update").click();
  });
  it("on UPDATE PROFILE DETAILS button click Bank Details will be updated with new data", () => {});
  it("on UPDATE PASSWORD button click, alert message will be displayed", () => {});
});
