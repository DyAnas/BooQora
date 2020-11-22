import React from 'react';
import '../../Styles/LoginStyle.css';
import {useForm} from 'react-hook-form';
import AuthService from '../../service/Authentication/authUser'
import {Link, TextField} from "@material-ui/core";
import validateEmail from "../../Component/Login/ValidateEmail"
import Logo from "../../assets/logo1.png"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUpContainer = (props) => {
    // create state with useStat for
    const [loading, setLoading] = React.useState(false);
    const [firstName, setFirstName] = React.useState('')
    const [lastName, setLastName] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')

    // useForm to control form
    const {register, handleSubmit, watch, errors} = useForm();

    // to show message and go to sign in
    const goToSignIn = () => {
        setTimeout(() => {
            setLoading(false)
            props.history.push("/");
        }, 5000);
        setLoading(true);

    }


    // handle submit form
    const onSubmit = data => {
        // check validation before call api
        if (validateEmail(email)) {
            // call register method to send data to api
            const roles = ["user"];
            setLoading(true);
            AuthService.register(firstName, lastName, email, password, roles)
                .then(Response => {
                    toast.success(Response.message, {
                        position: "top-center",
                        autoClose: 10000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    })
                        goToSignIn(); // to show message and go to sign in
                    }, error => {
                        const resMessage =
                            (error.response &&
                                error.response.data &&
                                error.response.data.message) ||
                            error.message ||
                            error.toString();
                    toast.error(resMessage, {
                        position: "top-center",
                        autoClose: 8000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    })

                   goToSignIn();
                    }
                );
        } else {
            toast.error("Email must match tietoevry", {
                position: "top-center",
                autoClose: 8000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
        }

    }

    return (
        <div className=" ipad vh-100 center  ">
            <div className="col-md-3  box ipad2  ">
                <div>
                    <div className="center logo ">
                        <img src={Logo} alt="logo"/>
                    </div>
                    <h1 className="text  mb-1 justify-content-center">
                        Sign Up
                    </h1>
                    <ToastContainer
                        position="top-center"
                        autoClose={8000}/>

                    <div className="center">
                        <form style={{width: "85%"}} onSubmit={handleSubmit(onSubmit)}>
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
                                        message: "Must Contain 8 Characters, One UpperCase, One Number and one special character"
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
                                <button
                                    type="submit"
                                    className="btn btn-info pr-4 pl-4 mt-2 text-light"
                                    variant="contained"

                                >
                                    Sign up
                                </button>
                            </div>
                            {loading ?
                                <div className="mt-2">
                                    <div className="spinner-grow spinner-grow-sm text-info ml-1" role="status">
                                    </div>
                                    <div className="spinner-grow spinner-grow-sm text-info ml-1" role="status">
                                    </div>
                                    <div className="spinner-grow spinner-grow-sm text-info ml-1" role="status">
                                    </div>
                                </div>
                                : null}
                            <hr/>
                            <div className="mb-1 ">
                                <Link id="goToSignIn" href="/" variant="body2" className="text-footer">
                                    {"I have an account? Sign In"}
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignUpContainer;