import React from "react";
import Logo from "../../assets/logo1.png"
import { Button, TextField } from "@material-ui/core";
import { useForm } from "react-hook-form";
import AuthService from '../../Authentication/authUser';
import AlertDialog from '../../Copmonent/AlertDialog'
import { withRouter } from "react-router-dom";

const NewPassword= (props)=> {
    const [password, setPassword] = React.useState('')
    const { register,handleSubmit, watch, errors } =useForm();
    const email = props.email;
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
        }, 3000);
        setShow(true);
    }
    const SignIn = () => {
        setTimeout(() => {
            props.history.push("/");

        }, 4000);
        handleShow();


    }
    const goToSignin = () =>{
props.history.push("/");
        
    }
    const onSubmit = data => {
       
            AuthService.resetPassword(email, password).then(
                Response => {
                    setMessage({
                        text: "Reset password is successfully!",
                        title: "Reset password"
                    })
                    
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
                        title: "Errors "
                    })
                    handleShow();
                }
            );
      
    }
    return (<div className=" ipad vh-100 center background   " >
            <div className="col-md-3  box ipad2  ">
                <div>
                    <div className="center ">
                        <img src={Logo} alt="logo" />
                    </div>
                    <h1 className="text  mb-2 justify-content-center">
                        Reset password
                    </h1>
                    <div className="center">
                        <p style={{ color: "red"}}>{props.message}</p>

                    </div>
                    <div className="center">
                        <form  onSubmit={handleSubmit(onSubmit)}  id="TestForm"  data-test="submit-button" >
                            <TextField
                                name="email"
                              
                                label="Email"
                                value={props.email}
                                type="email"
                                fullWidth
                                autocompleted="false"
                                size="small"
                                variant="filled"
                                margin="normal"
                                id="input"
                                className="background_input"

                            />

                            <TextField
                                name="password"
                                id="password"
                                error={!!errors.password}
                                label="Password"
                                inputRef={register({
                                    required: "Required",
                                    pattern: {
                                        value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*[\d])(?=.*[.!@#$%^&*])[\w!@#$%^&*]{8,}$/,
                                        message: "Must Contain 8 Characters, One Lowercase, One Number and one special character"
                                    }
                                })}
                                helperText={errors.password ? errors.password.message : ""}
                                type="password"
                                fullWidth
                                onChange={e => setPassword(e.target.value)}
                                className="background_input"
                                variant="filled"
                                margin="normal"
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
                            />
                            <div className="center">
                                <Button
                                    type="submit"
                                    id="submit"
                                    className="btn-color mt-4"
                                    variant="contained"
                                >
                                    Confirm
                                </Button>

                            </div>
                            <div className="center">
                                <Button
                                    type="submit"
                                    id="submit"
                                    onClick={goToSignin}
                                    className="btn-color mt-4"
                                    variant="contained"
                                >
                                    Cancel
                                </Button>

                            </div>
                            <AlertDialog
                                open={show}
                                onHide={handleClose}
                                message={message.text}
                                Tittel={message.title}


                            />
                            <hr />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

//withRouter to enable props.history.push("/");
export default withRouter (NewPassword);