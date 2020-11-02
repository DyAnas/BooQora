import React from "react";
import { useForm } from "react-hook-form";
import ValidateEmail from "../Copmonent/Login/ValidateEmail";
import AuthService from "../Authentication/authUser";
import ForgotPassword from "../Copmonent/Login/ForgotPassword";
import AlertDialog from "../Copmonent/AlertDialog";
import VerifyCode from "../Copmonent/Login/VerifyCode";
import NewPassword from "../Copmonent/Login/NewPassword";
import { withRouter } from "react-router-dom";
import { css } from "@emotion/core";
import BeatLoader from "react-spinners/BeatLoader";
import {Link} from "@material-ui/core";
const override = css`
   display: flex;
    align-items: center;
    justify-content: center;
`;
const ContainerForgotPassword = (props) => {
    const [loading, setLoading]=React.useState(false);
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
          //  setShow(false)
            setLoading(false);
            // show is false after 3 seconds
        }, 3000);
      //  setShow(true);
        setLoading(true);
    }
    const GotToResetPassword = () => {
        setTimeout(() => {
            //setEmail("")

        }, 4000);
        setLoading(true);
       // handleShow();
    }
    const onSubmit = data => {
        if (ValidateEmail(email)) {

            AuthService.forgotPassword(email).then(
                Response => {
                    setMessage({
                        text: Response.message,
                        title: "Reset password"
                    })

                   // GotToResetPassword();
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
           // handleShow();
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
                message={message.text}
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
                message={message.text}

            />
        }
        {ShowRestPassword &&
            <NewPassword email={email}
                         message={message.text}
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