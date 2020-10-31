import React, { useState} from 'react';
import Logo from "../assets/logo1.png"
import '../Styles/LoginStyle.css';
import {useForm} from 'react-hook-form';
import AuthService from '../Authentication/authUser'
import {Link, Button, TextField} from "@material-ui/core";
//import DialogAlert from '../Copmonent/DialogModale'
import ValidateEmail from "../Copmonent/Login/ValidateEmail"
import AlertDialog from "../Copmonent/AlertDialog";

const SignUpContainer=(props ) => {
    // create state with usestat for
    const [firstName, setFirstName] = React.useState('')
    const [lastName, setLastName] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')

  // const [confirmPassword, setConfirmPassword] = useState('')
    // useForm to control form
    const {register, handleSubmit, watch, errors} = useForm();
    // dialog handle
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState({
        text: "",
        title:""
    });


    const handleClose = () => setShow(false);
    const handleDialogShow = () => {
        setTimeout(() => {
        setShow(false)
        // show is false after 3 seconds
    }, 4000);
        setShow(true);
    }
    // to show message and go to sign in
    const SignIn = ()=> {
        setShow(true);
       setTimeout( ()=>{
           props.history.push("/");
       }, 4000 );
        handleDialogShow();
    }


    // handle submit form
    const onSubmit = data => {
        // check validation before call api
        if (ValidateEmail(email)) {
            // call register method to send data to api
            const roles = ["user"];
            AuthService.register(firstName, lastName, email, password, roles)
                .then(Response => {
                    setMessage({
                        text: Response.data.message,
                        title: "Success"})

                       SignIn(); // to show message and go to sign in

                    }, error => {
                        const resMessage =
                            (error.response &&
                                error.response.data &&
                                error.response.data.message) ||
                            error.message ||
                            error.toString();

                        setMessage({
                            text: resMessage,
                             title: "Error"})
                        console.log("res.message", resMessage);
                        handleDialogShow();
                    }
                );
        } else {
            setMessage({
                text:"Email must match tietoevry",
                 title: "Incorrect email or password"})
                 handleDialogShow();
        }

    }

    return (
        <div className=" ipad vh-100 center background ">
            <div className="col-md-3  box ipad2  ">
                <div>
                    <div className="center ">
                        <img src={Logo} alt="logo"/>
                    </div>
                    <h1 className="text  mb-1 justify-content-center">
                        Sign Up
                    </h1>
                    <div className="center">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <TextField
                                name="firstName"
                                id="firstName"
                                error={!!errors.firstName}
                                label="FirstName"
                                inputRef={register({
                                    required: "Required",
                                    pattern: {
                                        value: /^[a-zåøæA-ZÅØÆ]+$/i,
                                        message: "Invalid First Name"
                                    }
                                })}
                                value={firstName}
                                helperText={errors.firstName ? errors.firstName.message : ""}
                                type="text"
                                fullWidth
                                size="small"
                                onChange={e => setFirstName(e.target.value)}
                                variant="filled"
                                margin="normal"
                                className="background_input"
                            />
                            <TextField
                                name="lastName"
                                id="lastName"
                                error={!!errors.lastName}
                                label="LastName"
                                inputRef={register({
                                    required: "Required",
                                    pattern: {
                                        value: /^[a-zåøæA-ZÅØÆ]+$/i,
                                        message: "Invalid Last Name"
                                    }
                                })}
                                helperText={errors.lastName ? errors.lastName.message : ""}
                                type="text"
                                fullWidth
                                size="small"
                                onChange={e => setLastName(e.target.value)}
                                variant="filled"
                                margin="normal"
                                className="background_input"
                            />

                            <TextField
                                name="email"
                                id="email"
                                error={!!errors.email}
                                label="Email"
                                inputRef={register({
                                    required: "Required",
                                    pattern: {
                                        value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9]+\.[A-Za-z]+$/,
                                        message: "Invalid email"

                                    }
                                })}
                                helperText={errors.email ? errors.email.message : ""}
                                type="email"
                                fullWidth
                                size="small"
                                onChange={e => setEmail(e.target.value)}
                                variant="filled"
                                margin="normal"
                                className="background_input"
                            />
                            <TextField
                                name="password"
                                id="password"
                                error={!!errors.password}
                                label="Password"
                                inputRef={register({
                                    required: "Required",
                                    pattern: {
                                        value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*[\d])(?=.*[.!@#$%^&*])[\w!@#$%^&*]{8,}$/,
                                        message: "Must Contain 8 Characters, One Lowercase, One Number and one special character"
                                    }
                                })}
                                helperText={errors.password ? errors.password.message : ""}
                                type="password"
                                fullWidth
                                size="small"
                                onChange={e => setPassword(e.target.value)}
                                className="background_input"
                                variant="filled"
                                margin="normal"
                            />
                            <TextField
                                name="confirmPassword"
                                id="confirmPassword"
                                error={!!errors.confirmPassword}
                                label="Confirm Password"
                                inputRef={register({
                                    required: "Required",
                                    // watch is to get value of password
                                    validate: value => value === watch("password") || "Passwords don't match.",

                                })}
                                helperText={errors.confirmPassword ? errors.confirmPassword.message : ""}
                                type="password"
                                fullWidth
                                size="small"
                                className="background_input"
                                variant="filled"
                                margin="normal"
                            />
                            <div className="center">
                                <Button
                                    type="submit"
                                    className="btn-color mt-2"
                                    variant="contained"
                                >
                                    Sign up
                                </Button>
                            </div>
                            <br/>
                            <hr/>
                            <div className="mb-1 ">
                                <Link href="/" variant="body2" className="text-footer">
                                    {"I have an account? Sign In"}
                                </Link>
                            </div>
                        </form>
                      {/*  <DialogAlert
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
                </div>
            </div>
        </div>
    );
}

export default SignUpContainer;