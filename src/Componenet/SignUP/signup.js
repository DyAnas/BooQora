import React, {Component, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Logo from "../../assets/logo1.png"
import './StyleSignUp.css';
import * as Mui from '@material-ui/core';
import * as Yup from "yup";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import { ErrorMessage } from '@hookform/error-message';



function SignUp(props){

     const   schema = Yup.object().shape({
        name: Yup.string().required()
            .min(8,"To short")
            . max(20,"Too long")
            . matches(/^[\w-.@ ]+$/, {message:"inccorect"}),
        email: Yup.string().matches().required(),
        password: Yup.string().matches().required('Password is required').min(8).max(20),
        passwordConfirmation: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
    })
    function handleSuccess() {
        alert("User was created");
    }
    const { register, handleSubmit, errors} = useForm({
        resolver: yupResolver(schema)
    });
   const classes = makeStyles(theme => ({
        paper: {
            marginTop: theme.spacing(0),
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
        },
        avatar: {
            margin: theme.spacing(0),

        },
        form: {
            width: '100%', // Fix IE 11 issue.
            marginTop: theme.spacing(1),
        },
        submit: {
            margin: theme.spacing(0, 0, 0),
        },
    }));
   const signin = () => {
        props.history.push('/');
    }
    const onSubmit = (values) => {
        console.log(values);


        fetch('http://localhost:8000/api/v1/users/login/', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            // mode: 'cors',
            body: JSON.stringify({'email': values.email, 'password': values.password})
        }).then(res => {
            console.log(res);
        }).catch(err => {
            console.log(err);
        })
    }


        return (
            <div className="ibox-content ">
                <div className="row">
                    <div className="col-md-6">
                        <Mui.Container component="main" maxWidth="xs" className="">
                            <Mui.CssBaseline/>
                            <div className={classes.paper}>
                                <div className="item1">
                                    <img src={Logo}/>
                                </div>

                                    <Mui.Typography className="text mt-5  justify-content-center">
                                        Sign in
                                    </Mui.Typography>


                                <form className={classes.form} onSubmit={handleSubmit(onSubmit)} >
                                    <Mui.TextField
                                        inputRef={register}
                                        variant="filled"
                                        margin="normal"
                                        required
                                        fullWidth
                                        label="User name"
                                        name="name"
                                        autoComplete="name"
                                        className="background_input"
                                        autoFocus

                                        error={errors.name ? true : false}
                                    />
                                    <ErrorMessage errors={errors} name="name" />

                                    <Mui.TextField
                                        inputRef={register}
                                        variant="filled"
                                        margin="normal"
                                        fullWidth
                                        label="E-post"
                                        name="email"
                                        autoComplete="email"
                                        className="background_input"
                                        autoFocus
                                        error={errors.email ? true : false}
                                    />
                                    <ErrorMessage errors={errors} name="email" />

                                    <Mui.TextField
                                        inputRef={register}
                                        variant="filled"
                                        margin="normal"
                                        required
                                        fullWidth
                                        className="background_input"
                                        name="password"
                                        label="Password"
                                        type="password"
                                        autoFocus
                                        error={errors.password ? true : false}
                                    />
                                    <ErrorMessage errors={errors} name="password" />
                                    <Mui.TextField
                                        variant="filled"
                                        margin="normal"
                                        required
                                        fullWidth
                                        className="background_input"
                                        name="confirm_password"
                                        label="Confirm password"
                                        type="password"
                                        autoFocus
                                        error={errors.passwordConfirmation ? true : false}
                                    />
                                    <ErrorMessage errors={errors} name="confirm_password" />
                                    <br/>
                                    <Mui.Button
                                        type="submit"

                                        variant="contained"

                                        className="btn-submit mt-3"
                                    >
                                        Sign up
                                    </Mui.Button>
                                    <br/>
                                    <hr/>
                                    <Mui.Grid container>
                                        <Mui.Grid item>
                                            <Mui.Link onClick={signin} variant="body2">
                                                {"I have an account? Sign In"}
                                            </Mui.Link>
                                        </Mui.Grid>
                                    </Mui.Grid>
                                </form>

                            </div>
                            <Mui.Box mt={2}>

                            </Mui.Box>
                        </Mui.Container>

                    </div>
                    <div className="col-md-6 item2 ">
                        <div className="mt-5 p-5">
                            <div className="  align-self-center mt-5">
                                <img src={Logo}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );

}

export default SignUp;