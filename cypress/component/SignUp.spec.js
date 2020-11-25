
/// <reference types="cypress" />
import React from 'react';

import {mount} from 'cypress-react-unit-test';
import SignUpContainer from "../../src/Modal/Login/SignUpContainer";


describe("<SignUpContainer />", () => {
it("", ()=> {

    const firstName = "john";
    const lastName = "john";
    const email = 'roo@tietoevry.com';
    const password = '123456@aB';
    const role= ["user"];
   const fakeData= { firstName,  lastName, email,password, role}

    cy.intercept('POST', '/signup', (req) => {
        // set the request body to something different before it's sent to the destination
        req.body =fakeData

        req.reply((res) => {
            // 'res' represents the real destination's response
            // See "Intercepting a response" for more details and examples
            expect(res.body).to.include('success')
        })
    })
    mount(<SignUpContainer />)
    cy.get('input[name=firstName]').type(firstName);
    cy.get('input[name=lastName]').type(lastName);
    cy.get('input[name=email]').type(email);
    cy.get('input[name=password]').type(password);
    cy.get('input[name=confirmPassword]').type(password);
    cy.contains("Sign up").should("be.visible");
    cy.get('button[type=submit]').click();
})

})