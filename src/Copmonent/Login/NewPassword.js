import React from "react";
import Logo from "../../assets/logo1.png"
import { TextField } from "@material-ui/core";
import { useForm } from "react-hook-form";
import AuthService from '../../Authentication/authUser';
import { withRouter } from "react-router-dom";

const NewPassword = (props) => {
    const [password, setPassword] = React.useState('')
    const { register, handleSubmit, watch, errors } = useForm();
    const email = props.email;
    const [messages, setMessage] = React.useState({
        text: ""
    });


    const goToSignin = () => {
        props.history.push("/");

    }
    const onSubmit = data => {

        AuthService.resetPassword(email, password).then(
            Response => {

                goToSignin();
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
                })

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
                <div className="center">
                    <p style={{ color: "red" }}>{props.message || messages.text}</p>

                </div>
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
                                onClick={goToSignin}
                                className="btn btn-info  mt-4 mb-3 text-light mr-3"
                                variant="contained"
                            >
                                Cancel
                                </button>

                        </div>

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