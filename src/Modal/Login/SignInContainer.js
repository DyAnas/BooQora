import React from 'react';
import Logo from "../../assets/logo1.png"
import '../../Styles/LoginStyle.css';
import { useForm } from "react-hook-form";
import AuthService from '../../service/Authentication/authUser';
import { Link, TextField } from "@material-ui/core";
import validateEmail from "../../Component/Login/ValidateEmail"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import errorMessage from "../../Component/Message/ErrorMessage";
import successMessage from "../../Component/Message/SuccessMessage";
const SignInContainer = (props) => {

    const [loading, setLoading] = React.useState(false);
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    // useForm to control form
    const { register, handleSubmit, errors } = useForm();


    const goToNewBooking = () => {

        //     props.history.push("/newBooking");
        window.location.replace("/newBooking");
    }

    // handle submit form
    const onSubmit = () => {

        // check validation before call api
        if (validateEmail(email)) {
            AuthService.login(email, password).then(
                (response) => {
                    goToNewBooking();
                },
                error => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();
                    if (error.response.status === 401) {
                        errorMessage("Incorrect email or password");
                    }
                    else if (error.response.status === 404) {
                        errorMessage("Email is not registered");
                    } else if (error.response.status === 400) {
                        toast.warning(CustomToastWithLink, {
                            position: "top-center",
                            autoClose: false,
                            hideProgressBar: true,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        })

                    }
                    else {
                        errorMessage(resMessage);
                    }

                }
            );
        } else {
            errorMessage("Email must match tietoEvry");
        }//Authentication
    }
    const CustomToastWithLink = () => (
        <div>
            <p>Email is not actived:    <Link id="resendActivationLink" style={{ color: "gray", textDecoration: "underline" }} to="#" onClick={resendActivation}>Resend activation </Link></p>
        </div>
    );
    // handle if email is not active
    const resendActivation = () => {
        setLoading(true);
        AuthService.ResendActivation(email).then(
            Response => {
                setLoading(false)
                successMessage(Response.message);
                /* toast.success(Response.message, {
                     position: "top-center",
                     autoClose: 10000,
                     hideProgressBar: false,
                     closeOnClick: true,
                     pauseOnHover: true,
                     draggable: true,
                     progress: undefined,
                 })*/
            })


    }


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


                    <ToastContainer
                        position="top-center"
                    />

                </div>
                <div className="center">
                    <form style={{ width: "85%" }} onSubmit={handleSubmit(onSubmit)} id="TestForm" data-test="submit-button" >
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
                <div className="d-flex flex-column mb-5 ">
                    <Link id="forgetPassword" href="/forgotPassword" variant="body2" className="text-footer">
                        Forgot password?
                        </Link>

                    <Link id="goToSignUp" href="/signup" variant="body2" className="text-footer" style={{ marginTop: "10px" }}>
                        Don't have an account? Sign Up
                        </Link>
                </div>
            </div>
        </div>
    </div>
    );
}

export default SignInContainer;