/// <reference types="cypress"/>

import { waitForElement } from '@testing-library/react';
import Chance from 'chance';

const chance = new Chance();

beforeEach(() => {
    cy.visit(Cypress.config().baseUrl + '/forgotPassword')

})


describe('Validation', () => {

    it('Insert unregistered email', () => {

        const email = chance.first() + '@tietoevry.com';
        cy.get('input[name=email]').type(email);
        cy.get('button[type=submit]').click();

        cy.get('.Toastify__toast-body[role=alert]').should('contain', 'Email is not exist!');
    })

    it('Insert email that dose not match tietoevry', () => {

        const email = chance.email();
        cy.get('input[name=email]').type(email);
        cy.get('button[type=submit]').click();

        cy.get('.Toastify__toast-body[role=alert]').should('contain', 'Email must match tietoevry');
    })


    it('Insert valid and registered email', () => {

        const email = 'root@tietoevry.com';
        cy.get('input[name=email]').type(email);
        cy.get('button[type=submit]').click();
     
        cy.get('.Toastify__toast-body[role=alert]',{ timeout: 30000 }).should('contain', 'Request to reset password received. Check your inbox.');
    })

})

describe('Verfication Code Testing', () => {
    it('Wrong Verification Code', () => {

        const email = 'root@tietoevry.com'
        cy.get('input[name=email]').type(email);
        cy.get('button[type=submit]').click();
        const randomCode ='blabla';
        cy.get('#verifyCodeInput').type(randomCode);
        cy.get('#verifyCode').click();
        cy.get('.Toastify__toast-body[role=alert]',{ timeout: 30000 }).should('contain', 'Incorrect Code!! or code is expired');
        cy.get('#cancel').click();
        cy.url('eq',Cypress.config().baseUrl+'/')
    })

})

it('click on logo to go back to sign in page', () => {

 cy.get('img[alt=logo]').click();
  
    cy.url('eq',Cypress.config().baseUrl+'/')
})

