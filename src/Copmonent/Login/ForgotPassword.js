import React from "react";
import Logo from "../../assets/logo1.png"
import {Link, Button, TextField} from "@material-ui/core";
import {useForm} from "react-hook-form";
import ValidateEmail from "./ValidateEmail";
import AuthService from '../../Authentication/authUser';
import AlertDialog from '../../Copmonent/AlertDialog'

const ForgotPassword = (props) => {
    const [email, setEmail] = React.useState('');
    const {register, handleSubmit, errors} = useForm();
    const [message, setMessage] = React.useState({
        text: "",
        title: ""
    });

    const [show, setShow] = React.useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => {
        setTimeout(() => {
            setShow(false)
            // show is false after 3 seconds
        }, 9000);
        setShow(true);
    }
    const SignIn = () => {
        setTimeout(() => {
            setEmail("")
        }, 4000);
        handleShow();
    }
    const onSubmit = data => {
        if (ValidateEmail(email)){

            AuthService.forgotPassword(email).then(
                Response => {
                    setMessage({
                        text: "We have sent you a link  by email. Please click " +
                            "the link to go to reset password. If you have not received the email, " +
                            "please check your spam folder or junk mail folder.",
                        title: "Reset password"
                    })
                    console.log(Response)
                    SignIn();
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
        }
        else {
            setMessage({
                text: "Email must match tietoevry",
                title: "Incorrect email or password"
            })
            handleShow();
        }//Authentication
    }
    return (<div className=" ipad vh-100 center background   ">
            <div className="col-md-3  box ipad2  ">
                <div>
                    <div className="center ">
                        <img src={Logo} alt="logo"/>
                    </div>
                    <h1 className="text  mb-2 justify-content-center">
                        Reset password
                    </h1>
                    <div className="center">
                        <form onSubmit={handleSubmit(onSubmit)} id="TestForm" data-test="submit-button">
                            <TextField
                                name="email"
                                error={!!errors.email}
                                label="Entre your email"
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
                            <div className="center">
                                <Button
                                    type="submit"
                                    id="submit"
                                    className="btn-color mt-4"
                                    variant="contained"
                                >
                                    Send email
                                </Button>

                            </div>
                            <div className="center">
                                <Button
                                    type="submit"

                                    id="submit"
                                    onClick={() => props.history.push("/")}
                                    className="btn-color mt-4"
                                    variant="contained"
                                >
                                    Cancel
                                </Button>
                                <AlertDialog
                                    open={show}
                                    onHide={handleClose}
                                    message={message.text}
                                    Tittel={message.title}

                                />
                            </div>
                            <hr/>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ForgotPassword;