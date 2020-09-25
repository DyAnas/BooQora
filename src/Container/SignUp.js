import React from 'react';
import SignUP from '../Componenet/SignUP/signup';

export default function signUp() {

    return (
    
    <SignUP  values={{
        name:'',
        email:'',
        password:'',
        passwordConfirmation:''

      }}/>
    
    )
}