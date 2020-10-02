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
        name: Yup.string().required('Please Enter your name')
            .min(8,"To short")
            . max(20,"Too long")
            . matches(/^[\w-.@ ]+$/, {message:"inccorect"}),
        email: Yup.string().matches("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$").required(),
        password: Yup.string().required('Please Enter your password').matches(
            /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
            "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
        ).min(6).max(20),
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


    const onSubmit = (e) => {
      //  e.preventDefault()//blocks the postback event of the page

        console.log('name: '+name)
        console.log('email: '+email)
        console.log('password: '+password)
        console.log('Confirm passord: '+confirm_password)

    }
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirm_password, setConfirm_password] = useState('')


        return (
            <div className="root" >
                <div className="row ">
                    <div className="col-md-6  center ">
                        <Mui.Container  maxWidth="xs" className="">
                            <Mui.CssBaseline/>
                            <div className={classes.paper}>
                                <div className="logo1 ">
                                <div >
                                    <img src={Logo}/>
                                </div>
                                </div>

                                    <Mui.Typography className="text mt-5 mb-4 justify-content-center">
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
                                        value={name}
                                        onChange={e => setName(e.target.value)}

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
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
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
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
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
                                        value={confirm_password} onChange={e =>
                                        setConfirm_password(e.target.value)}
                                        error={errors.passwordConfirmation ? true : false}
                                    />
                                    <ErrorMessage errors={errors} name="confirm_password" />
                                    <br/>
                                    <div className="center mt-5">
                                    <Mui.Button
                                        type="submit"
                                        className="btn-color"
                                        variant="contained"

                                    >
                                        Sign up
                                    </Mui.Button>
                                    </div>
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
                    <div className="col-md-6 section1 ">
                          <div className="logo2">
                            <div className=" ">
                                <img src={Logo}/>
                            </div>
                          </div>
                    </div>
                </div>
            </div>
        );

}

export default SignUp;