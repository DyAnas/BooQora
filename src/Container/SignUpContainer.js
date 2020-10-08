import React, { useState} from 'react';
import Logo from "../assets/logo1.png"
import './LoginStyle.css';
import * as Mui from '@material-ui/core';
import * as Yup from "yup";
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers';
import {ErrorMessage} from '@hookform/error-message';
import {adduser} from '../API/User'



function SignUpContainer(props) {

  // todo change validation not work correctly
    // validation scehema
    const schema = Yup.object().shape({
        firstName: Yup.string().required('Please Enter your name').min(4, "too short")
            .matches(/^[\w-.@ ]+$/, {message: "inccorect"}),
        lastName: Yup.string().required()
            .matches(/^[\w-.@ ]+$/, {message: "inccorect"}),
        password: Yup.string().required('Please Enter your password')
            //matches(
            //  /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
            //"Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character")
            .min(6, "too short").max(20, "too long"),
        passwordConfirmation: Yup.string()
            .oneOf([Yup.ref('Password'), null], 'Passwords must match')
    })

    // useform to controll form
    const {register, errors} = useForm({
        resolver: yupResolver(schema)
    });

    // validate email to match @tietoevry.com
    const ValidatEmail = () => {
        const split = email.split(/[@]+/); //splits string using RegEx on a space OR a comma
        console.log(split[1]);
        const validEmail = "tietoevry.com";
        if (split[1].trim() === validEmail.trim()) {
            return true;
        } else {
            alert("email is not valid")

            return false;

        }
    }

  // todo problem when click submit validation is not work only email work
    // handel submit form
    const onSubmit = data => {
        data.preventDefault()//blocks the postback event of the page
        const val = {firstName, lastName, email, password}

        // check vaidation befor call api
        if (ValidatEmail() === true) {

            // call adduser method to sende data to api
            adduser(val).then(() => {
                alert('success');
                props.history.push('/');
            }).catch(error => {
                alert('error object')
            });
        } else {
            alert("validation is incorrect")
        }

    }

    // create state with usestat for
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

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
                        <form onSubmit={onSubmit}>
                            <Mui.TextField
                                inputRef={register}
                                variant="filled"
                                size="small"
                                required
                                fullWidth
                                label="First name"
                                name="firstName"
                                autoComplete="firstName"
                                className="background_input"
                                autoFocus
                                value={firstName}
                                onChange={e => setFirstName(e.target.value)}
                            />
                            <div className="error-message">
                                <ErrorMessage errors={errors} name="firstName" as="span"/>
                            </div>
                            <Mui.TextField
                                inputRef={register}
                                variant="filled"
                                margin="normal"
                                required
                                size="small"
                                fullWidth
                                label="Last name"
                                name="lastName"
                                autoComplete="lastName"
                                className="background_input"
                                value={lastName}
                                onChange={e => setLastName(e.target.value)}
                            />
                            <div className="error-message">
                                <ErrorMessage errors={errors} name="lastName"/>
                            </div>
                            <Mui.TextField
                                inputRef={register}
                                variant="filled"
                                margin="normal"
                                size="small"
                                fullWidth
                                label="E-post"
                                name="email"
                                autoComplete="email"
                                className="background_input"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                            <div className="error-message">
                                <ErrorMessage errors={errors} name="Email"/>
                            </div>
                            <Mui.TextField
                                inputRef={register}
                                variant="filled"
                                margin="normal"
                                required
                                size="small"
                                fullWidth
                                className="background_input"
                                name="Password"
                                label="Password"
                                type="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                            <div className="error-message">
                                <ErrorMessage errors={errors} name="Password"/>
                            </div>
                            <Mui.TextField
                                variant="filled"
                                margin="normal"
                                required
                                size="small"
                                fullWidth
                                className="background_input"
                                name="ConfirmPassword"
                                label="Confirm password"
                                type="password"
                                value={confirmPassword} onChange={e =>
                                setConfirmPassword(e.target.value)}
                            />
                            <div className="error-message">
                                <ErrorMessage errors={errors} name="ConfirmPassword"/>
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