import React from "react";
import { useForm } from "react-hook-form";
import ValidateEmail from "../Copmonent/Login/ValidateEmail";
import AuthService from "../Authentication/authUser";
import ForgotPassword from "../Copmonent/Login/ForgotPassword";
import AlertDialog from "../Copmonent/AlertDialog";
import VerifyCode from "../Copmonent/Login/VerifyCode";
import NewPassword from "../Copmonent/Login/NewPassword";
import { withRouter } from "react-router-dom";

const ContainerForgotPassword = (props) => {
    const { register, handleSubmit, errors } = useForm();
    const [email, setEmail] = React.useState('');
    const [confirmationCode, setconfirmationCode] = React.useState('');
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
    const GotToResetPassword = () => {
        setTimeout(() => {
            //setEmail("")

        }, 4000);
        handleShow();
    }
    const onSubmit = data => {
        if (ValidateEmail(email)) {

            AuthService.forgotPassword(email).then(
                Response => {
                    setMessage({
                        text: Response.message,
                        title: "Reset password"
                    })
                    GotToResetPassword();
                    if (Response.message.trim() === "This email address does not exist!") {
                        setShowVerifyCode(false);
                        setShowForgotpassord(true);
                        setShowRestPassword(false);
                    } else {
                        setShowVerifyCode(true);
                        setShowForgotpassord(false);
                        setShowRestPassword(false);
                    }

                },
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
    const [ShowVerifyCode, setShowVerifyCode] = React.useState(false)
    const [ShowRestPassword, setShowRestPassword] = React.useState(false)
    const [ShowForgotpassord, setShowForgotpassord] = React.useState(true)
    const onSubmitCode = () => {
        AuthService.verifyCode(confirmationCode).then(
            Response => {

                console.log(Response);
                if (Response.data === true) {
                    console.log(Response)
                    setMessage({
                        text: "Code is correct",
                        title: "Reset password"
                    })
                    setShowVerifyCode(false);
                    setShowForgotpassord(false);
                    setShowRestPassword(true);
                    GotToResetPassword();
                }
            }
        );
    }

    return (<div>
        {ShowForgotpassord &&
            <ForgotPassword
                onSubmit={handleSubmit(onSubmit)}
                error={errors.email}
                helperText={errors.email ? errors.email.message : ""}
                inputRef={register({
                    required: "Required",
                    pattern: {
                        value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9]+\.[A-Za-z]+$/,
                        message: "Invalid email"
                    }
                })}
                email={email}
                value={email}
                onChange={e => setEmail(e.target.value)}
                cancel={() => props.history.push("/")}
            />
        }
        {ShowVerifyCode &&
            <VerifyCode
                onSubmit={handleSubmit(onSubmitCode)}
                error={errors.confirmationCode}
                helperText={errors.confirmationCode ? errors.confirmationCode.message : ""}
                inputRef={register({
                    required: "Required",
                    pattern: {
                        value: /^[a-zA-Z0-9]+$/,
                        message: "Invalid Code"
                    }
                })}
                value={confirmationCode}
                onChange={e => setconfirmationCode(e.target.value)}
                cancel={() => props.history.push("/")}

            />
        }
        {ShowRestPassword &&
            <NewPassword email={email}
            />

        }


        <AlertDialog
            open={show}
            onHide={handleClose}
            message={message.text}
            Tittel={message.title}

        />

    </div>)
}
export default withRouter(ContainerForgotPassword);