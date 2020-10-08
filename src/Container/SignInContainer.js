import React, {useState} from 'react';
import Logo from "../assets/logo1.png"
import '../Container/LoginStyle.css';
import * as Mui from '@material-ui/core';
import * as Yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers";
import {ErrorMessage} from "@hookform/error-message";


function SignInContainer(props) {

    // validation scehema
    // todo change validation not work correctly
    const schema = Yup.object().shape({
        email: Yup.string().required(),
        password: Yup.string().matches().required('Password is required'),
    })
    // useform to controll form
    const {register, errors} = useForm({
        resolver: yupResolver(schema)
    });

    // check validation
    const ValidatEmail = () => {
        const split = email.split(/[@]+/); //splits string using RegEx on a space OR a comma
        const validEmail = "tietoevry.com";
        if (split[1].trim() === validEmail.trim()) {
            return true;
        } else {
            alert("email is not valid")
            return false;

        }
    }
    // handle submit form
    const onSubmit = (data) => {
        data.preventDefault()//blocks the postback event of the page

        const split = email.split(/[ @ ]+/); //splits string using RegEx on a space OR a comma
        // check vaidation befor call api
        if (ValidatEmail()) {
            props.history.push('/home')
        } else {
            alert("error   " + split[1])
        }
    }

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')



    return (<div className=" ipad vh-100 center background   ">
            <div className="col-md-3  box ipad2  ">
                <div>
                    <div className="center ">
                        <img src={Logo}/>
                    </div>
                    <h1 className="text  mb-2 justify-content-center">
                        Sign In
                    </h1>
                    <div className="center">
                        <form onSubmit={onSubmit}>
                            <Mui.TextField
                                inputRef={register}
                                variant="filled"
                                margin="normal"
                                size="small"
                                fullWidth
                                label="E-post"
                                name="email"
                                autoComplete="email"
                                className="background_input"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                error={errors.email}
                            />
                            <div className="error-message">
                                <ErrorMessage errors={errors} name="Email"/>
                            </div>
                            <Mui.TextField
                                inputRef={register}
                                variant="filled"
                                margin="normal"
                                required
                                size="small"
                                fullWidth
                                className="background_input"
                                name="Password"
                                label="Password"
                                type="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                            <div className="error-message">
                                <ErrorMessage errors={errors} name="Password"/>
                            </div>
                            <div className="center">
                                <Mui.Button
                                    type="submit"
                                    className="btn-color mt-4"
                                    variant="contained"
                                >
                                    Sign In
                                </Mui.Button>
                            </div>
                            <br/>
                            <hr/>
                        </form>
                    </div>
                    <div className="mb-5 ">
                        <Mui.Link href="#" variant="body2" className="text-footer">
                            Forgot password?
                        </Mui.Link>
                        <br/>
                        <Mui.Link href="/signup" variant="body2" className="text-footer">
                            Don't have an account? Sign Up
                        </Mui.Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignInContainer;