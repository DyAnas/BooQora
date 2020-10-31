import React from "react";
import Logo from "../../assets/logo1.png"
import {Link, Button, TextField} from "@material-ui/core";
import {useForm} from "react-hook-form";
import ValidateEmail from "./ValidateEmail";
import AuthService from '../../Authentication/authUser';
import AlertDialog from '../../Copmonent/AlertDialog'
import SignInContainer from "../../Container/SignInContainer";

const ForgotPassword = (props) => {
    const {register, handleSubmit, errors} = useForm();
    return (<div className=" ipad vh-100 center background   ">
            <div className="col-md-3  box ipad2  ">
                <div>
                    <div className="center ">
                        <img src={Logo} alt="logo"/>
                    </div>
                    <h1 className="text  mb-2 justify-content-center">
                        Forgot password
                    </h1>
                    <div className="center">
                        <form onSubmit={props.onSubmit} id="TestForm" data-test="submit-button">
                            <TextField
                                name="email"
                               error={props.error}
                                label="Entre your email"
                                inputRef={props.inputRef}
                                value={props.email}
                                helperText={props.helperText}
                                type="email"
                                fullWidth
                                autocompleted="false"
                                size="small"
                                onChange={props.onChange}
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
                                    onClick={props.cancel}
                                    className="btn-color mt-4"
                                    variant="contained"
                                >
                                    Cancel
                                </Button>

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