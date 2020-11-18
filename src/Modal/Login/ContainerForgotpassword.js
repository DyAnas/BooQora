import React from "react";
import {useForm} from "react-hook-form";
import ValidateEmail from "../../Copmonent/Login/ValidateEmail";
import AuthService from "../../service/Authentication/authUser";
import ForgotPassword from "../../Copmonent/Login/ForgotPassword";
import VerifyCode from "../../Copmonent/Login/VerifyCode";
import NewPassword from "../../Copmonent/Login/NewPassword";
import {withRouter} from "react-router-dom";


const ContainerForgotPassword = (props) => {
    const { register, handleSubmit, errors } = useForm();
    const [email, setEmail] = React.useState('');
    const [confirmationCode, setconfirmationCode] = React.useState('');
    const [message, setMessage] = React.useState({
        text: "",
        title: ""
    });

    const [loading, setLoading] = React.useState(false);

    const onSubmit = data => {
        if (ValidateEmail(email)) {

            AuthService.forgotPassword(email).then(
                Response => {
                    setMessage({
                        text: Response.message,
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
            spinnerTimer();
        }
        else {
            
            setMessage({
                text: "Email must match tietoevry",
            })

        }//Authentication
    }
    const [ShowVerifyCode, setShowVerifyCode] = React.useState(false)
    const [ShowRestPassword, setShowRestPassword] = React.useState(false)
    const [ShowForgotpassord, setShowForgotpassord] = React.useState(true)


    const onSubmitCode = () => {
        spinnerTimer();
        AuthService.verifyCode(confirmationCode).then(
            Response => {

                if (Response.data === true) {

                    setMessage({
                        text: "",
                    })
                    setShowVerifyCode(false);
                    setShowForgotpassord(false);
                    setShowRestPassword(true);

                }else{
      
                    setMessage({
                        text: "Incorrect Code!! or code is expired",
                    })
    
                }
            
            }
        );
    }
    const spinnerTimer = () => {
        setTimeout(() => {

            setLoading(false);
        }, 6000);
        setLoading(true);
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
                loading={loading}
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
    </div>)
}
export default withRouter(ContainerForgotPassword);