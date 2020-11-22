import React from "react";
import Logo from "../../assets/logo1.png"
import {TextField} from "@material-ui/core";
import {useForm} from "react-hook-form";
import AuthService from '../../service/Authentication/authUser';
import {withRouter} from "react-router-dom";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
const NewPassword = (props) => {
    const [password, setPassword] = React.useState('')
    const { register, handleSubmit, watch, errors } = useForm();
    const [loading, setLoading] = React.useState(false)
    const email = props.email;

    const goToSignIn = () =>  {
        setTimeout(() => {
            setLoading(false)
            props.history.push("/");
        }, 5000);
        setLoading(true);
    }
    const onSubmit = () => {

        AuthService.resetPassword(email, password).then(
            Response => {
                toast.success(Response.message, {
                    position: "top-center",
                    autoClose: 10000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
                goToSignIn();
            }, error => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
                if (resMessage === "Error: Unauthorized") {
                    toast.error("Incorrect email or password", {
                        position: "top-center",
                        autoClose: 8000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    })
                } else if (resMessage === "No message available") {

                    toast.error("Email is not registered", {
                        position: "top-center",
                        autoClose: 8000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    })
                } else if (error.response.status === 400) {

                    toast.error("You can't change password to old password,", {
                        position: "top-center",
                        autoClose: 8000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    })
                } else {

                    toast.error(resMessage, {
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
        );

    }
    return (<div className=" ipad vh-100 center background   " >
        <div className="col-md-3  box ipad2  ">
            <div>
                <div className="center ">
                    <img src={Logo} alt="logo" />
                </div>
                <h1 className="text  mb-2 justify-content-center mt-2">
                    Reset password
                    </h1>
                <ToastContainer
                    position="top-center"
                    autoClose={8000}/>
                <div className="center">
                    <form onSubmit={handleSubmit(onSubmit)}  >

                        <TextField
                            name="password"
                            id="password"
                            error={!!errors.password}
                            label="Password"
                            inputRef={register({
                                required: "Required",
                                pattern: {
                                    value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*[\d])(?=.*[.!@#$%^&*])[\w!@#$%^&*]{8,}$/,
                                    message: "Must Contain 8 Characters, One Uppercase, One Number and one special character"
                                }
                            })}
                            helperText={errors.password ? errors.password.message : ""}
                            type="password"
                            fullWidth
                            onChange={e => setPassword(e.target.value)}
                            className="background_input"
                            variant="filled"
                            margin="normal"
                            autocompleted="false"
                            size="small"
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
                            className="background_input"
                            variant="filled"
                            margin="normal"
                            autocompleted="false"
                            size="small"
                        />
                        <div className="center">
                            <button
                                type="submit"
                                id="submit"
                                className="btn btn-info  mt-4 mb-3 text-light mr-3"
                                variant="contained"
                            >
                                Confirm
                                </button>

                            <button
                                type="submit"
                                id="submit"
                                onClick={goToSignIn}
                                className="btn btn-info  mt-4 mb-3 text-light mr-3"
                                variant="contained"
                            >
                                Cancel
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
            </div>
        </div>
    </div>
    )
}

//withRouter to enable props.history.push("/");
export default withRouter(NewPassword);