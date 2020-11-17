import React from 'react';
import Logo from "../../assets/logo1.png"
import '../../Styles/LoginStyle.css';
import {useForm} from "react-hook-form";
import AuthService from '../../service/Authentication/authUser';
import {Link, TextField} from "@material-ui/core";
import ValidateEmail from "../../Copmonent/Login/ValidateEmail"

const SignInContainer = (props) => {

    //  const [token, setToken] = React.useState('')
    const [loading, setLoading] = React.useState(false);
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    // useform to controll form
    const { register, handleSubmit, errors } = useForm();
    // dialog handle
    const [message, setMessage] = React.useState({
        text: "",
        title: ""
    });
    const SignIn = () => {
        setTimeout(() => {

            props.history.push("/newBooking");
        }, 2000);
        setLoading(true);
    }

    // handle submit form
    const onSubmit = () => {

        setMessage({
            text: "",

        })

        // check validation before call api
        if (ValidateEmail(email)) {

            AuthService.login(email, password).then(
                Response => {
                    if (Response.token === "Email is not activated") {
                        setMessage({
                            text: Response.token,

                        })
                        setshowConfirmation(true)
                    } else {
                        SignIn();

                    }

                },
                error => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();
                    if (resMessage === "Error: Unauthorized") {
                        setMessage({
                            text: "Incorrect email or password",
                        })
                    }
                    else if (resMessage === "No message available") {
                        setMessage({
                            text: "Email is not registered",

                        })
                    }

                    else {
                        setMessage({
                            text: resMessage,
                        })
                    }

                }
            );
        } else {
            setMessage({
                text: "Email must match tietoevry",
            })
        }//Authentication
    }
    // handle if email is not active
    const resendActivation = () => {
        setMessage({
            text: "",

        })
        setLoading(true);
        AuthService.ResendActivation(email).then(

            Response => {
                setLoading(false)
                setMessage({
                    text: Response.message,

                })
            })
        setshowConfirmation(false);

    }
    const [showConfirmation, setshowConfirmation] = React.useState(false);


    return (<div className=" ipad vh-100 center background   " >
        <div className="col-md-3  box ipad2  ">
            <div>
                <div className="center ">
                    <img src={Logo} alt="logo" />
                </div>

                <div className="mt-2">
                    <h1 className="text  mb-2 justify-content-center">
                        Sign In
                    </h1>
                </div>


                <div className="center">
                    <p style={{ color: "red" }}>{message.text}
                        {showConfirmation &&
                            <Link style={{ margin: "10px" }} to="#" onClick={resendActivation}>Resend activation </Link>
                        }
                    </p>

                </div>
                <div className="center">
                    <form style={{ width:"85%"}} onSubmit={handleSubmit(onSubmit)} id="TestForm" data-test="submit-button" >
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
                           // value={email}
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
                                    message: "Must Contain 8 Characters, One Uppercase, One Number and one special character"
                                }
                            })}
                            helperText={errors.password ? errors.password.message : ""}
                            type="password"
                            fullWidth
                            // value={password}
                            onChange={e => setPassword(e.target.value)}
                            className="background_input"
                            variant="filled"
                            margin="normal"
                            id="password"

                        />

                        <div className="center">
                            <button
                                type="submit"
                                id="submit"
                                className="btn btn-info pr-4 pl-4 mt-2 text-light "
                                variant="contained"
                            >
                                Sign In
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
                        <hr />

                    </form>
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