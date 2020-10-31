import React from "react";
import {useForm} from "react-hook-form";
import ValidateEmail from "../Copmonent/Login/ValidateEmail";
import AuthService from "../Authentication/authUser";
import ForgotPassword from "../Copmonent/Login/ForgotPassword";
import AlertDialog from "../Copmonent/AlertDialog";
import {TextField} from "@material-ui/core";
import VerifyCode from "../Copmonent/Login/VerifyCode";
import NewPassword from "../Copmonent/Login/NewPassword";

const ContainerForgotPassword= (props)=> {
    const {register, handleSubmit, errors} = useForm();
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
                        text: Response.message,
                        title: "Reset password"
                    })
                    console.log("response"+Response)
                    SignIn();
                    if(Response.message.trim()==="This email address does not exist!"){
                        setShowVerifyCode(false);
                    } else {
                        setShowVerifyCode(true);
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
    const [ShowVerifyCode, setShowVerifyCode] =React.useState(false)
    const [ShowRestPassword, setShowRestPassword] =React.useState(false)
    const onSubmitCode= ()=> {
        AuthService.verifyCode(confirmationCode).then(
            Response => {
                setMessage({
                    text: Response.message,
                    title: "Verify Code"
                })
                console.log("responses"+Response)
                SignIn();
                setShowRestPassword(true);

            },
        );
    }
    return (<div>
        {ShowVerifyCode ?
        <ForgotPassword
            onSubmit = {handleSubmit(onSubmit)}
            error={errors.email}
            helperText={ errors.email ? errors.email.message : ""}
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
            cancel={ ()=> props.history.push("/")}
        />
        :
        <VerifyCode
            onSubmit = {handleSubmit(onSubmitCode)}
            error={errors.code}
            helperText={ errors.code ? errors.code.message : ""}
            inputRef={register({
                required: "Required",
                pattern: {
                    value: /^[a-zA-Z0-9]+$/,
                    message: "Invalid Code"
                }
            })}
            value={confirmationCode}
            onChange={e => setconfirmationCode(e.target.value)}
            cancel={ ()=> props.history.push("/")}

        />
        }
        {ShowRestPassword &&
            <NewPassword

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
export default ContainerForgotPassword;