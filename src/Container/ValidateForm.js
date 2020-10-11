import React, {useState} from 'react';
const validator = require("validator");
// validate email to match @tietoevry.com

function Validatform (props){
    const errors ={};
 let IsFormValid=true;

    // validat first name

     if(props.firstName!== "string" || props.firstName.trime().length===0){
         IsFormValid=false;
        props.firstName.errors= "Please provide a first name" ;
     }
    // validat last name
    if(props.firstName!== "string" || props.firstName.trime().length===0){
        IsFormValid=false;
       props.firstName.errors= "Please provide a first name" ;
    }



    // validate email

    const split = props.email.split(/[@]+/); //splits string using RegEx on a space OR a comma
    console.log(split[1]);
    const validEmail = "gmail.com";
    if (split[1].trim() !== validEmail.trim()) {
        errors.props.email= "Please provide a email";
        alert("email is not valid")

        IsFormValid=false;

    }

// validate passowrd and confirm password

     if (props.password !=="string" || props.password.trim().length < 8){
         errors.props.password= "Password must have at least 8 characters.";
         IsFormValid=false;
     }
     if (props.confirmPassword.trim() !== props.confirmPassword.trim()){
         errors.props.confirmPassword= "Password confirmation doesn't match.";
         IsFormValid=false;
     }


    return {
        success: IsFormValid,
        errors
    };

}
export default Validatform;