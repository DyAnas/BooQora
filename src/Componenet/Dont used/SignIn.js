import React, {useState}from 'react';

import {makeStyles} from '@material-ui/core/styles';
import Logo from "../../assets/logo1.png"
import '../../Container/LoginStyle.css';
import * as Mui from '@material-ui/core';
import * as Yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers";
import {ErrorMessage} from "@hookform/error-message";



function SignIn(props)   {
    const   schema = Yup.object().shape({
        email: Yup.string().matches().required(),
        password: Yup.string().matches().required('Password is required'),

    })
    const { register, handleSubmit, errors} = useForm({
        resolver: yupResolver(schema)
    });
   const classes = makeStyles(theme => ({
        paper: {
            marginTop: theme.spacing(1),
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },

        form: {
            width: '100%', // Fix IE 11 issue.
            marginTop: theme.spacing(1),
        },
    }));
    const signup=()=> {
         props.history.push('signup');
     }

    const onSubmit=(e) =>{
     //   e.preventDefault()//blocks the postback event of the page
        console.log('email: '+email)
        console.log('password: '+password)
    }

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    return (
        <div className="container-fluid vh-100 " >
            <div className="row vh-100 ">
                <div className="col-md-6 center">
                    <Mui.Container  maxWidth="xs" >
            <Mui.CssBaseline/>
            <div className={classes.paper}>
                <div className="logo1  ">
                    <div className="center ">
                        <img src={Logo}/>
                    </div>
                </div>


                <Mui.Typography className="text mb-4 justify-content-center">
                    Sign in
                </Mui.Typography>


                <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
                    <Mui.TextField
                        inputRef={register}
                        variant="filled"
                        margin="normal"
                        required
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
                        autoComplete="current-password"
                        autoFocus
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        error={errors.email ? true : false}
                    />
                    <ErrorMessage errors={errors} name="email" />
                    <Mui.FormControlLabel
                        control={<Mui.Checkbox value="remember" color="primary"/>}
                        label="Remember me"
                    />
                    <br/>
                    <div className="center mt-4">
                        <Mui.Button
                            type="submit"
                            className="btn-color"
                            variant="contained"
                        >
                            Sign in
                        </Mui.Button>
                    </div>
                    <br/>
                    <hr/>
                    <Mui.Grid container>
                        <Mui.Grid item xs>
                            <Mui.Link href="#" variant="body2">
                                Forgot password?
                            </Mui.Link>
                        </Mui.Grid>
                            <Mui.Grid item>
                                <Mui.Link href="#" onClick={signup} variant="body2">
                                    Don't have an account? Sign Up
                                </Mui.Link>
                            </Mui.Grid>

                    </Mui.Grid>
                </form>
            </div>
            <Mui.Box mt={4}>

            </Mui.Box>
        </Mui.Container>
                </div>
                <div className="col-md-6  h-auto center section1 ">
                    <div className="logo2 h-auto">
                        <div className=" ">
                            <img src={Logo}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default SignIn;