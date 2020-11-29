/// <reference types="cypress"/>




const nowTime = Cypress.moment().format('DD-MM-yyyy')
beforeEach(() => {
   
    cy.visit(Cypress.config().baseUrl)
    const email = 'root@tietoevry.com';
    const password = '123456aB@';
    cy.get('input[name=email]').type(email);
    cy.get('input[name=password]').type(password);
    cy.get('button[type=submit]').should('contain', 'Sign In').click();
    cy.url().should('include', '/newBooking')

})
describe("Archive test", () => {
    it("show table", () => {
        cy.get("#myBooking").click({ force: true })
        cy.get("table").should('be.visible');
    })

    it("select date to show all booking", () => {
        cy.get("#archive").click({ force: true })
       
        cy.get(".dateInput").first().click()
        cy.get(".dateInput").first().invoke('val').then((text) => {
            expect(nowTime).to.equal(text);
        })
        cy.contains('Prev').click();
        //choose date 1
        cy.contains('1').click();
        cy.get(".dateInput").first().invoke('val').then((text) => {
            expect('01-10-2020').to.equal(text);
        });

        cy.get(".dateInput").last().click()
        cy.get(".dateInput").last().invoke('val').then((text) => {
            expect(nowTime).to.equal(text);
        })
        // to click datapicker and choose next month
        cy.contains('Next').click();
        //choose date 24
        cy.contains('24').click();
        cy.get(".dateInput").last().invoke('val').then((text) => {
            expect('24-12-2020').to.equal(text);
        });




    })
})