import React, { useState } from 'react';
import Logo from "../assets/logo1.png"
import '../Container/LoginStyle.css';
import * as Mui from '@material-ui/core';
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import AuthService from '../Authentication/authUser';
// import auth from '../Authentication/auth';

function SignInContainer(props) {

    // useform to controll form
    const { register,handleSubmit, errors } = useForm({});

    // check validation
    const ValidatEmail = () => {
        const split = email.split(/[@]+/); //splits string using RegEx on a space OR a comma
        const validEmail = "tietoevry.com";
        if (split[1].trim() === validEmail.trim()) {
            return true;
        } else {
            alert("email is not valid")
            return false;

        }
    }
    // handle submit form
    function onSubmit (){
      //  data.preventDefault()//blocks the postback event of the page

        const split = email.split(/[ @ ]+/); //splits string using RegEx on a space OR a comma
        // check vaidation befor call api
        if (ValidatEmail()) {
            AuthService.login(email, password).then(
                () => {
                    props.history.push("/home");
                    window.location.reload();
        
                },
                error => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();
    
                        console.log(resMessage);
                }
            );
        } else {
            alert("error   " + split[1])
        }


        //Authentication
       


    }


    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')



    return (<div className=" ipad vh-100 center background   ">
        <div className="col-md-3  box ipad2  ">
            <div>
                <div className="center ">
                    <img src={Logo} alt="logo" />
                </div>
                <h1 className="text  mb-2 justify-content-center">
                    Sign In
                    </h1>
                <div className="center">
                    <form onSubmit={handleSubmit(onSubmit)}>
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
                            autofocus
                            autoComplete="email"
                            className="background_input"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            error={errors.email}
                        />
                        <div className="error-message">
                            <ErrorMessage errors={errors} name="email" />
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
                            autoComplete="password"
                            size="small"
                            fullWidth
                            autofocus
                            className="background_input"
                            name="password"
                            label="Password"
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                        <div className="error-message">
                            <ErrorMessage errors={errors} name="password" />
                        </div>
                        <div className="center">
                            <Mui.Button
                                type="submit"
                                className="btn-color mt-4"
                                variant="contained"
                            >
                                Sign In
                                </Mui.Button>
                        </div>
                        <br />
                        <hr />
                    </form>
                </div>
                <div className="mb-5 ">
                    <Mui.Link href="#" variant="body2" className="text-footer">
                        Forgot password?
                        </Mui.Link>
                    <br />
                    <Mui.Link href="/signup" variant="body2" className="text-footer">
                        Don't have an account? Sign Up
                        </Mui.Link>
                </div>
            </div>
        </div>
    </div>
    );
}

export default SignInContainer;