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
const today = Cypress.moment()
const tomorrow = Cypress.moment().add(1,'day').format('DD')


describe("Chart Building", () => {
    it("show Statistics", () => {
        cy.get("#statistics").click({ force: true })
        cy.get(".dateInput").eq(1).click()
        cy.get(".dateInput").eq(1).invoke('val').then((dateFromDatePicker) => {
            expect(nowTime).to.equal(dateFromDatePicker);
        })
        // click prev month

        //choose date 1
        cy.contains('10').click();
        cy.get(".dateInput").eq(1).invoke('val').then((dateFromDatePicker) => {
            expect('10').to.equal(dateFromDatePicker.substr(0,2));
        });
        cy.get(".dateInput").eq(2).click()
        cy.get(".dateInput").eq(2).invoke('val').then((dateFromDatePicker) => {
            expect(nowTime).to.equal(dateFromDatePicker);
        })


    })
})
it('to Date', () => {
    cy.get("#statistics").click({ force: true })
    cy.get(".dateInput").eq(2).click()
    cy.contains(today.add(1,'day').format('DD')).click();
    cy.get(".dateInput").eq(2).invoke('val').then((dateFromDatePicker) => {

        expect(tomorrow).to.equal(dateFromDatePicker.substr(0,2));
    })
})

//.add(1,'day').format('DD')