import React, { useState } from 'react';
import Logo from "../assets/logo1.png"
import '../Container/LoginStyle.css';
import { useForm } from "react-hook-form";
import AuthService from '../Authentication/authUser';
import DialogAlert from '../Copmonent/DialogModale'
import { Link, Button, TextField } from "@material-ui/core";
function SignInContainer(props) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    // useform to controll form
    const { register,handleSubmit, errors } = useForm({});
    // dialog handle
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState({
        text: "",
        title:""
    });
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true, ()=> {
        setTimeout(() => {
            handleShow();
            // show is true
        }, 3000);
        setShow(false) // show is false after 3 second
    });

    // validate email
    const ValidateEmail = () => {
        const split = email.split(/[@]+/); //splits string using RegEx on a space OR a comma
        const validEmailTietoEvry = "tietoevry.com";
        const validEmailEvry = "evry.com"
        if (split[1].trim() === validEmailTietoEvry.trim()
            || split[1].trim() === validEmailEvry.trim()) {
            return true;
        } else {
            setMessage({
                text: "check if you have correct email or password",
                title: " Invalid email"   })
            handleShow();
        }
    }
    // handle submit form
    const onSubmit = data =>{
        // check vaidation befor call api
        if (ValidateEmail()) {
            AuthService.login(email, password).then(
                Response => {

                    props.history.push("/home");
                    window.location.reload();
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
                        title: "Error"})
                    handleShow();
                }
            );
        } else {
            setMessage({
                text:"Email must match tietoevry",
                title: "Incorrect email or password"})
            handleShow();
        }//Authentication
    }
    return (<div className=" ipad vh-100 center background   ">
        <div className="col-md-3  box ipad2  ">
            <div>
                <div className="center ">
                    <img src={Logo} alt="logo" />
                </div>
                <h1 className="text  mb-2 justify-content-center">
                    Sign In
                    </h1>
                <div className="center">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <TextField
                            name="email"
                            error={!!errors.email}
                            label="Email"
                            inputRef={register({
                                required: "Required",
                                pattern: {
                                    value: /^[a-zA-Z0-9.-]+@[a-zA-Z0-9]+\.[A-Za-z]+$/,
                                    message: "Invalid email"
                                }
                            })}
                            //value={email}
                            helperText={errors.email ? errors.email.message : ""}
                            type="email"
                            fullWidth
                            autocompleted="false"
                            size="small"
                            onChange={e => setEmail(e.target.value)}
                            variant="filled"
                            margin="normal"
                           className="background_input"
                        />
                        <TextField
                            name="password"
                            error={!!errors.password}
                            label="Password"
                            inputRef={register({
                                required: "Required",
                                pattern: {
                                    value:  /^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,}$/,
                                    message: "Must Contain 8 Characters, One Lowercase, One Number and one special character"
                                }
                            })}
                            helperText={errors.password ? errors.password.message : ""}
                            type="password"
                            fullWidth
                          //  value={password}
                            onChange={e => setPassword(e.target.value)}
                            className="background_input"
                            variant="filled"
                            margin="normal"
                        />
                        <div className="center">
                            <Button
                                type="submit"
                                className="btn-color mt-4"
                                variant="contained"
                            >
                                Sign In
                            </Button>
                        </div>
                        <hr />
                    </form>
                    <DialogAlert
                        show={show}
                        onHide={handleClose}
                        message={message.text}
                        Tittel={message.title}
                    />
                </div>
                <div className="mb-5 ">
                    <Link href="#" variant="body2" className="text-footer">
                        Forgot password?
                        </Link>
                    <br />
                    <Link href="/signup" variant="body2" className="text-footer">
                        Don't have an account? Sign Up
                        </Link>
                </div>
            </div>
        </div>
    </div>
    );
}

export default SignInContainer;