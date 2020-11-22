/// <reference types="cypress"/>

import Chance from 'chance';

const chance = new Chance();

beforeEach(() => {
    cy.visit(Cypress.config().baseUrl+'/forgotPassword')
    
})


describe('Validation', () => {

    it('Insert unregistered email', () => {

        const email = chance.first() + '@tietoevry.com';
        cy.get('input[name=email]').type(email);
        cy.get('button[type=submit]').click();
        cy.get('p').should('contain','Email is not exist !');
   
    })
   

})