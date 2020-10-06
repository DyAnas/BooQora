import React, {Component, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Logo from "../assets/logo1.png"
import './LoginStyle.css';
import * as Mui from '@material-ui/core';
import * as Yup from "yup";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import { ErrorMessage } from '@hookform/error-message';
import {adduser} from '../API/User'


function SignUpContainer(props){

    const schema = Yup.object().shape({
        FirstName: Yup.string().required('Please Enter your name')
            .min(8,"To short")
            . max(20,"Too long")
            . matches(/^[\w-.@ ]+$/, {message:"inccorect"}),
        LastName: Yup.string().required('Please Enter your Last name')
            .min(8,"To short")
            . max(20,"Too long")
            . matches(/^[\w-.@ ]+$/, {message:"inccorect"}),
        Email: Yup.string().matches("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$",'Please Enter your password').required(),
        Password: Yup.string().required('Please Enter your password')
        //matches(
          //  /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
            //"Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character")
            .min(6).max(20),
        passwordConfirmation: Yup.string()
            .oneOf([Yup.ref('Password'), null], 'Passwords must match')
    })

    const { register, handleSubmit, errors} = useForm({
        resolver: yupResolver(schema)
    });
    const classes = makeStyles(theme => ({
        paper: {

            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
        },
        avatar: {
            margin: theme.spacing(0),

        },
        form: {
            width: '100%', // Fix IE 11 issue.

        },
        submit: {

        },
    }));



  const onSubmit=data=>{
      //  data.preventDefault()//blocks the postback event of the page


        console.log('email: '+Email)
        console.log('password: '+Password)
        console.log('Confirm passord: '+ConfirmPassword)


        adduser(data).then (()=> {
            alert('success');
            props.history.push('/');
        }).catch(error=> {
            alert('error object')
        });


    }
    const [FirstName, setFirstName] = useState('')
    const [LastName, setLastName] = useState('')
    const [Email, setEmail] = useState('')
    const [Password, setPassword] = useState('')
    const [ConfirmPassword, setConfirmPassword] = useState('')


    return (

            <div className=" row vh-100 center background">
                <div className="col-md-3  box ">
                    <Mui.Container  maxWidth="xs"  >
                        <Mui.CssBaseline/>
                        <div className={classes.paper}>


                                <div className="center ">
                                    <img src={Logo}/>
                                </div>


                            <Mui.Typography className="text  m justify-content-center">
                                Sign Up
                            </Mui.Typography>


                            <form className={classes.form} onSubmit={handleSubmit(onSubmit)} >
                                <Mui.TextField
                                    inputRef={register}
                                    variant="filled"
                                    size="small"
                                    required
                                    fullWidth
                                    label="First name"
                                    name="FirstName"
                                    autoComplete="FirstName"
                                    className="background_input"
                                    autoFocus
                                    value={FirstName}
                                    onChange={e => setFirstName(e.target.value)}


                                />
                                <ErrorMessage errors={errors} name="name" />
                                <Mui.TextField
                                    inputRef={register}
                                    variant="filled"
                                    margin="normal"
                                    required
                                    size="small"
                                    fullWidth
                                    label="Last name"
                                    name="LastName"
                                    autoComplete="LastName"
                                    className="background_input"
                                    autoFocus
                                    value={LastName}
                                    onChange={e => setLastName(e.target.value)}

                                    error={errors.name ? true : false}
                                />
                                <ErrorMessage errors={errors} name="LastName" />

                                <Mui.TextField
                                    inputRef={register}
                                    variant="filled"
                                    margin="normal"
                                    size="small"
                                    fullWidth
                                    label="E-post"
                                    name="Email"
                                    autoComplete="Email"
                                    className="background_input"
                                    autoFocus
                                    value={Email}
                                    onChange={e => setEmail(e.target.value)}
                                    //error={errors.email ? true : false}
                                />
                                <ErrorMessage errors={errors} name="Email" />

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
                                    autoFocus
                                    value={Password}
                                    onChange={e => setPassword(e.target.value)}

                                />
                                <ErrorMessage errors={errors} name="Password" />
                                <Mui.TextField
                                    variant="filled"
                                    margin="normal"
                                    required
                                    size="small"
                                    fullWidth
                                    className="background_input"
                                    name="ConfirmPassword"
                                    label="Confirm password"
                                    type="password"
                                    autoFocus
                                    value={ConfirmPassword} onChange={e =>
                                    setConfirmPassword(e.target.value)}

                                />
                                <ErrorMessage errors={errors} name="ConfirmPassword" />
                                <br/>
                                <div className="center">
                                    <Mui.Button
                                        type="submit"
                                        className="btn-color mt-4"
                                        variant="contained"

                                    >
                                        Sign up
                                    </Mui.Button>
                                </div>
                                <br/>
                                <hr/>
                                <Mui.Grid container >
                                    <Mui.Grid item >
                                        <Mui.Link href="/" variant="body2" >
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
        </div>
    );

}

export default SignUpContainer;