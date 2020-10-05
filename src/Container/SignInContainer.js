import React, {Component, useState} from 'react';

import '../Componenet/SignUP/LoginStyle.css';

import axios from 'axios';

import SignInForm from '../Componenet/SignIN/SignInForm';

class SignInContainer extends Component{
    constructor(props) {
        super(props);
        this.state ={
            errors: {},
            user: {
                email:"",
                password:"",
            }
        }
    }
    handleChenge =(event)=> {
        const field= event.target.name;
        const user=this.state.user;
        user[field]=event.target.value;
        this.setState({
            user
        });
    }
    SubmitSignUp=(user)=>{
        user.preventDefault()//blocks the postback event of the page

        const val ={ email:user.email, password:user.password}

        axios
            .get('http://localhost:8080/Check')
            .then(res => {
                if (res.data.success === true) {
                    localStorage.token = res.data.token;
                    localStorage.isAuthenticated = true;
                    window.location.reload();
                } else {
                    this.setState({
                        errors: { message: res.data.message }
                    });
                }
            })
            .catch(err => {
                console.log("Sign up data submit error: ", err);
            });
    }
    validatForm=(event)=>{

    }
    render(){
        return (
            <SignInForm
                onSubmit={this.validatForm}
                onChenge={this.handleChenge}
                errors={this.state.errors}
                user={this.state.user}

            />



        )
    };

}
export default SignInContainer;