import {urls, user, apiUrls, monthName} from '../../index';
import {signin, signout, apiCall} from '../../helper';
import {urlVisited, visitIndexRoute} from '../../visitRoutes';

describe('Test upload documents page', () => {
  it('open page open will list all templates', () => {
    signin(user.admin);
    urlVisited(urls.baseUrl + urls.home);
    cy.get('.nav > #upload_policy_documents').should('be.visible');
    cy.get('.nav > #upload_policy_documents').click();
    urlVisited(urls.baseUrl + urls.uploadPolicyDocuments);
    cy.get('#listDocs').should('be.visible');
  });
  it('submit new document on left panel form will result to add of newly added document on right side panel and delete that document', () => {
    signin(user.admin);
    urlVisited(urls.baseUrl + urls.home);
    cy.get('.nav > #upload_policy_documents').should('be.visible');
    cy.get('.nav > #upload_policy_documents').click();
    urlVisited(urls.baseUrl + urls.uploadPolicyDocuments);
    cy.get('#submitDocs').should('be.visible');
    cy.get('#docName').should('be.visible');
    cy.get('#docLink').should('be.visible');
    cy.get('#docSubmitButton').should('be.visible');
    cy.get('#docName').type('test upload');
    cy.get('#docLink').type('testlink');
    cy.get('#docSubmitButton').click();
    cy.get('.showSweetAlert').should('be.visible');
    cy.get('.sa-button-container').should('be.visible');
    cy.get('.sa-confirm-button-container').should('be.visible');
    cy.get('.sa-confirm-button-container').click();
    cy.get('.showSweetAlert').should('not.be.visible');
    cy.get('#listDocs #testupload').should('be.visible');
    cy.get('#listDocs #testupload #docIconDelete').should('be.visible');
    cy.get('#listDocs #testupload #docIconDelete').click();
    cy.get('.showSweetAlert').should('be.visible');
    cy.get('.sa-button-container').should('be.visible');
    cy.get('.sa-confirm-button-container').should('be.visible');
    cy.get('.sa-confirm-button-container').click();
    cy.get('.showSweetAlert').should('be.visible');
    cy.get('.sa-button-container').should('be.visible');
    cy.get('.sa-confirm-button-container').should('be.visible');
    cy.get('.sa-confirm-button-container').click();
  });
  // it('delete on right side panel will reuslt to delete of document', () => {
  //
  // });
});
