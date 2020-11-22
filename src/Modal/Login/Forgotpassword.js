import React from "react";
import { useForm } from "react-hook-form";
import validateEmail from "../../Component/Login/ValidateEmail";
import AuthService from "../../service/Authentication/authUser";
import ForgotPassword from "../../Component/Login/ForgotPassword";
import VerifyCode from "../../Component/Login/VerifyCode";
import NewPassword from "../../Component/Login/NewPassword";
import { withRouter } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Forgotpassword = (props) => {
    const { register, handleSubmit, errors } = useForm();
    const [email, setEmail] = React.useState('');
    const [confirmationCode, setconfirmationCode] = React.useState('');
    const [loading, setLoading] = React.useState(false);

    const onSubmit = data => {
        if (validateEmail(email)) {
            AuthService.forgotPassword(email).then(
                Response => {
                    toast.success(Response.message, {
                        position: "top-center",
                        autoClose: 10000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: false,
                
                    })
                    spinnerTimer();
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

                }, error => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();

                    if (error.response.status === 404) {
                        toast.error("Email is not exist!", {
                            position: "top-center",
                            autoClose: 8000,
                            hideProgressBar: true,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                          
                        })
                    }

                    // else {
                    //     toast.error(resMessage, {
                    //         position: "top-center",
                    //         autoClose: 8000,
                    //         hideProgressBar: false,
                    //         closeOnClick: true,
                    //         pauseOnHover: true,
                    //         draggable: true,
                    //         progress: undefined,
                    //     })
                    // }

                }
            );

        }
        else {
            toast.error("Email must match tietoevry", {
                position: "top-center",
                autoClose: 8000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
              
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
                    setShowVerifyCode(false);
                    setShowForgotpassord(false);
                    setShowRestPassword(true);

                } else {

                    toast.error("Incorrect Code!! or code is expired", {
                        position: "top-center",
                        autoClose: 8000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: false,
                    
                    })
                }

            }
        );
    }
    const spinnerTimer = () => {
        setTimeout(() => {

            setLoading(false);
        }, 5000);
        setLoading(true);
    }
    return (<div>
        <ToastContainer
            position="top-center"
            autoClose={8000} />
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

                loading={loading}
            />

        }
        {ShowVerifyCode &&

            <VerifyCode
                onSubmit={handleSubmit(onSubmitCode)}
                error={!!errors.confirmationCode}
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
    </div>)
}
export default withRouter(Forgotpassword);