import React, { useState} from 'react';
import Logo from "../assets/logo1.png"
import './LoginStyle.css';
import * as Mui from '@material-ui/core';
import * as Yup from "yup";
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers';
import {ErrorMessage} from '@hookform/error-message';
import {adduser} from '../API/User'
import Validatform from './ValidateForm'


function SignUpContainer(props) {
    // create state with usestat for
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    // useForm to control form
    const {register,handleSubmit, watch, errors} = useForm({});

    // validate email
    const [emailError, setEmailError]=useState("");
    const ValidateEmail = () => {
        const split = email.split(/[@]+/); //splits string using RegEx on a space OR a comma
        const validEmail = "gmail.com";
        if (split[1].trim() === validEmail.trim()) {
            return true;
        }
    }

    // handel submit form
    function onSubmit () {
        const IS_ENABLED   = false;
        const val = {firstName, lastName, email, password, IS_ENABLED}
        console.log(errors);
        // check validation before call api
        if (ValidateEmail() ) {


            setEmailError("")

            // call adduser method to send data to api
            adduser(val).then(() => {
                alert('success');
                props.history.push('/');

            }).catch(error => {
                alert('error object')
            });
        }
        else {
            setEmailError("Email most match tietovry")
            alert("error validation ")
        }


    }



    return (
        <div className=" ipad vh-100 center background   ">
            <div className="col-md-3  box ipad2  ">
                <div>
                    <div className="center ">
                        <img src={Logo}/>
                    </div>
                    <h1 className="text  mb-2 justify-content-center">
                        Sign Up
                    </h1>
                    <div className="center">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Mui.TextField
                                inputRef={register({
                                    required: "Required",
                                    pattern: {
                                        value: /^[a-zåøæA-ZÅØÆ]+$/i,
                                        message: "Invalid First Name"
                                    }
                                })}
                                variant="filled"
                                size="small"
                                fullWidth
                                label="First name"
                                name="firstName"
                                className="background_input"
                                value={firstName}
                                onChange={e => setFirstName(e.target.value)}
                            />
                            <div className="error-message">
                                <ErrorMessage errors={errors} name="firstName" as="span"/>
                            </div>
                            <Mui.TextField
                                inputRef={register({
                                    required: "Required",
                                    pattern: {
                                        value: /^[a-zåøæA-ZÅØÆ]+$/i,
                                        message: "Invalid Last Name"
                                    }
                                })}
                                variant="filled"
                                margin="normal"
                                size="small"
                                fullWidth
                                label="Last name"
                                name="lastName"

                                className="background_input"
                                value={lastName}
                                onChange={e => setLastName(e.target.value)}
                            />
                            <div className="error-message">
                                <ErrorMessage errors={errors} name="lastName"/>
                            </div>
                            <Mui.TextField
                                inputRef={register({
                                    required: "Required",
                                    pattern: {
                                        value: /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/,
                                        message: "Invalid email"

                                    }
                                })}
                                variant="filled"
                                margin="normal"
                                size="small"
                                fullWidth
                                label="E-post"
                                name="email"

                                className="background_input"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                            <div className="error-message">
                                {emailError}
                                <ErrorMessage errors={errors} name="email"/>
                            </div>
                            <Mui.TextField
                                inputRef={register({
                                    required: "Required",
                                    pattern: {
                                        value:  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,32}$/,
                                        message: "Must Contain 8 Characters, One Lowercase, One Number"
                                    }
                                })}
                                variant="filled"
                                margin="normal"
                                size="small"
                                fullWidth
                                className="background_input"
                                name="password"
                                label="Password"
                                type="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                            <div className="error-message">
                                <ErrorMessage errors={errors} name="password"/>
                            </div>
                            <Mui.TextField
                                inputRef={register({

                                    required: "Required",
                                    // watch is to get value of password
                                    validate: value => value === watch("password") || "Passwords don't match.",

                                })}
                                variant="filled"
                                margin="normal"
                                size="small"
                                fullWidth
                                className="background_input"
                                name="confirmPassword"
                                label="Confirm password"
                                type="password"
                                value={confirmPassword} onChange={e =>
                                setConfirmPassword(e.target.value)}
                            />
                            <div className="error-message">
                                {password}   { "   "} {confirmPassword}
                                <ErrorMessage errors={errors} name="confirmPassword"/>
                            </div>
                            <div className="center">
                                <Mui.Button
                                    type="submit"
                                    className="btn-color mt-4"
                                    variant="contained"
                                >
                                    Sign up
                                </Mui.Button>
                            </div>
                            <br/>
                            <hr/>
                            <div className="mb-5 ">
                                <Mui.Link href="/" variant="body2" className="text-footer">
                                    {"I have an account? Sign In"}
                                </Mui.Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignUpContainer;