/// <reference types="cypress"/>

beforeEach(() => {
    cy.visit(Cypress.config().baseUrl)
    const email = 'root@tietoevry.com';
    const password = '123456aB@';
    cy.get('input[name=email]').type(email);
    cy.get('input[name=password]').type(password);
    cy.get('button[type=submit]').should('contain', 'Sign In').click();
    cy.url().should('include', '/newBooking')

})
const nowTime = Cypress.moment().format('DD-MM-yyyy')

describe("Chart Building", () => {
    it("show Statistics", ()=> {
        cy.get("#statistics").click({force: true})
        cy.get("#dateFrom").click()
        cy.get("#dateFrom").invoke('val').then((text) => {
            expect(nowTime).to.equal(text);
        })
        // click prev month

        //choose date 1
        cy.contains('10').click();
        cy.get("#dateFrom").invoke('val').then((text) => {
            expect('10-11-2020').to.equal(text);
        });
        cy.get("#dateTo").click()
        cy.get("#dateTo").invoke('val').then((text) => {
            expect(nowTime).to.equal(text);
        })

        cy.get("#dateTo").click()
        cy.contains('25').click();
        cy.get("#dateTo").invoke('val').then((text) => {
            expect('25-11-2020').to.equal(text);
        });
    })
})