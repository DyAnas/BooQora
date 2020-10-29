import React from 'react';
import Logo from "../assets/logo1.png"
import '../Styles/LoginStyle.css';
import { useForm } from "react-hook-form";
import AuthService from '../Authentication/authUser';

import { Link, Button, TextField } from "@material-ui/core";
import AlertDialog from '../Copmonent/AlertDialog'
import ValidateEmail from "../Copmonent/Login/ValidateEmail"


const SignInContainer = (props) => {

  //  const [token, setToken] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    // useform to controll form
    const { register, handleSubmit, errors } = useForm();
    // dialog handle
    const [show, setShow] = React.useState(false);
    const [message, setMessage] = React.useState({
        text: "",
        title: ""
    });
    const handleClose = () => setShow(false);
    const handleShow = () => {
        setTimeout(() => {
            setShow(false)
            // show is false after 3 seconds
        }, 3000);
        setShow(true);
    }
    const SignIn = () => {
        setTimeout(() => {
            props.history.push("/home");
        }, 4000);
        handleShow();
    }


    // handle submit form
    const onSubmit = () => {
        // check validation before call api


        if (ValidateEmail(email)) {
            AuthService.login(email, password).then(
                Response => {
                    setMessage({
                        text: "Welcome ", // todo check Response.data.message
                        title: "Success"
                    })
                    console.log(Response);
                    SignIn();
                    //  window.location.reload();
                },
                error => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();
                    setMessage({
                        text: resMessage,
                        title: "Error "
                    })
                    handleShow();
                }
            );
        } else {
            setMessage({
                text: "Email must match tietoevry",
                title: "Incorrect email or password"
            })
            handleShow();
        }//Authentication
    }
    return (<div className=" ipad vh-100 center background   " >
        <div className="col-md-3  box ipad2  ">
            <div>
                <div className="center ">
                    <img src={Logo} alt="logo" />
                </div>
                <h1 className="text  mb-2 justify-content-center">
                    Sign In
                    </h1>
                <div className="center">
                    <form onSubmit={handleSubmit(onSubmit)} id="TestForm" data-test="submit-button" >
                        <TextField
                            name="email"
                            error={!!errors.email}
                            label="Email"
                            inputRef={register({
                                required: "Required",
                                pattern: {
                                    value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9]+\.[A-Za-z]+$/,
                                    message: "Invalid email"
                                }
                            })}
                            value={email}
                            helperText={errors.email ? errors.email.message : ""}
                            type="email"
                            fullWidth
                            autocompleted="false"
                            size="small"
                            onChange={e => setEmail(e.target.value)}
                            variant="filled"
                            margin="normal"
                            id="input"
                            className="background_input"

                        />

                        <TextField
                            name="password"
                            error={!!errors.password}
                            label="Password"
                            size="small"
                            inputRef={register({
                                required: "Required",
                                pattern: {
                                    value: /^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,}$/,
                                    message: "Must Contain 8 Characters, One Lowercase, One Number and one special character"
                                }
                            })}
                            helperText={errors.password ? errors.password.message : ""}
                            type="password"
                            fullWidth
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            className="background_input"
                            variant="filled"
                            margin="normal"
                            id="password"

                        />

                        <div className="center">
                            <Button
                                type="submit"
                                id="submit"
                                className="btn-color mt-4"
                                variant="contained"
                            >
                                Sign In
                            </Button>
                        </div>
                        <hr />

                    </form>

                    {/* <DialogAlert
                        show={show}
                        onHide={handleClose}
                        message={message.text}
                        Tittel={message.title}
                    />*/}
                    <AlertDialog
                        open={show}
                        onHide={handleClose}
                        message={message.text}
                        Tittel={message.title}

                    />
                </div>
                <div className="mb-5 ">
                    <Link href="/forgotPassword" variant="body2" className="text-footer">
                        Forgot password?
                        </Link>
                    <br />
                    <Link href="/signup" variant="body2" className="text-footer">
                        Don't have an account? Sign Up
                        </Link>
                </div>
            </div>
        </div>
    </div>
    );
}

export default SignInContainer;