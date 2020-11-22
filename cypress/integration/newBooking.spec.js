/// <reference types="cypress"/>

import Chance from 'chance';

const chance = new Chance();

beforeEach(() => {
    const email = 'root@tietoevry.com';
    const password = '123456aB@';
    cy.login(email, password);

})
describe("Page elements test", () => {

    it('Check map, Title, button, datapicker', () => {

        cy.get("img").should('have.attr', 'src');
        //Test Title
        cy.contains("New Booking");
        //Test paragraphe
        cy.contains("Choose a date and click on a floor to show zone.");
        // check if button floor have length 7
        cy.get(".btn-group").find("button").should(($p) => {
            expect($p).to.have.length(7)


        })
        const today= new Date();
        const date ='"'+ today.getDate()  + '-' + (today.getMonth() + 1)  + '-' + today.getFullYear()+'"';
        // FIXME datapicker not show correct date
        // check datapicker
        cy.get('.Calendar1').click();
             })


})

describe("Function Test", () => {
    it("onClickFloor", ()=> {
        cy.get(".btn-group").find("button:first").should("contain", "1").click({ multiple: true })
        cy.get("span").should(($p) => {
            expect($p).to.have.length(3)
        })

    })
    // FIXME enterarea not work with click
    it.only("enterArea", ()=> {
        cy.get(".btn-group").find("button:first").should("contain", "1").click({ multiple: true })
        cy.get(".span1").should("contain", "Zone A")
      cy.get("map").find("area:first").click({force: true})


    })

    it("book plass", ()=> {
        const today= new Date();
        const token =JSON.parse(localStorage.getItem('user')).token;
        cy.request({
            method: 'POST',
            url: 'http://localhost:8080/api/v1/bookings/book',
            failOnStatusCode: false,

            body: JSON.stringify({
                date: today,
                employeeId: 1,
                zoneId: 1 })
        }).then((response) => {
            console.log(response.status)
            expect(response.status).to.eq(415)
            expect(response).to.have.property('headers')

        });
      const obj= {
          date: today,
          employeeId: 1,
          zoneId: 1 }
        cy.spy(obj, 'confirmBooking').as('foo')
       /* cy.request({
            method: 'POST',
            url: 'http://localhost:8080/api/v1/bookings/book',
            failOnStatusCode: false,
             headers: {token},
            body: JSON.stringify({
                date: today,
                employeeId: 1,
                zoneId: 1 })
        }).then((response) => {
            console.log(response.status)
            expect(response.status).to.eq(200)
            expect(response).to.have.property('headers')

        });*/



    })


})