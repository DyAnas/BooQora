import React from 'react';
import Logo from "../../assets/logo1.png"
import '../../Styles/LoginStyle.css';
import { useForm } from "react-hook-form";
import AuthService from '../../service/Authentication/authUser';
import { Link, TextField } from "@material-ui/core";
import validateEmail from "./ValidateEmail"
import { ToastContainer } from "react-toastify";
import successMessage from "../Message/SuccessMessage";
import errorMessage from "../Message/ErrorMessage";

const ResendConfirm = (props) => {

    const [loading, setLoading] = React.useState(false);
    const [email, setEmail] = React.useState('')

    // useForm to controll form
    const { register, handleSubmit, errors } = useForm();
    // dialog handle
    const [message, setMessage] = React.useState({
        text: "",
        title: ""
    });
    const goToSignIn = () => {
        setTimeout(() => {
            props.history.push("/");
        }, 2000);
        setLoading(true);
    }

    // handle if email is not active
    const resendActivation = () => {
        setMessage({
            text: "",

        })
        if (validateEmail(email)) {
            setLoading(true);
            AuthService.ResendActivation(email).then(
                Response => {
                    setLoading(false)

                    successMessage(Response.message)
                    goToSignIn();
                }, (error) => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();
                    errorMessage(resMessage)



                })
        } else {
            errorMessage("Email must match tietoevry")
        }
    }



    return (<div className=" ipad vh-100 center background   " >
        <div className="col-md-3  box ipad2  ">
            <div>
                <div className="center ">
                    <img src={Logo} alt="logo" />
                </div>

                <div className="mt-2">
                    <h1 className="text  mb-2 justify-content-center">
                        Resend confirm
                        </h1>
                </div>


                <ToastContainer
                    position="top-center"
                />

                <div className="center">
                    <form onSubmit={handleSubmit(resendActivation)} id="TestForm" data-test="submit-button" >
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
                        <div className="center">
                            <button
                                type="submit"
                                id="submit"
                                className="btn btn-info pr-4 pl-4 mt-2 text-light "
                                variant="contained"
                            >
                                Resend confirm
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
export default ResendConfirm;
