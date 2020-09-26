import React, {Component}from 'react';

import {makeStyles} from '@material-ui/core/styles';
import Logo from "../../assets/logo1.png"
import './StyleSignIn.css';
import * as Mui from '@material-ui/core';




 class SignIn extends Component  {

    classes = makeStyles(theme => ({
        paper: {
            marginTop: theme.spacing(1),
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
        avatar: {
            margin: theme.spacing(1),
            backgroundColor: theme.palette.secondary.main,
        },
        form: {
            width: '100%', // Fix IE 11 issue.
            marginTop: theme.spacing(1),
        },
        submit: {
            margin: theme.spacing(3, 0, 2),
        },


    }));
     signup=()=> {
         this.props.history.push('signup');
     }

     render (){

    return (
        <Mui.Container component="main" maxWidth="xs" className="">
            <Mui.CssBaseline/>
            <div className={this.classes.paper}>
                <div>
                    <img src={Logo}/>
                </div>
                <Mui.Typography className="text">
                    Sign in
                </Mui.Typography>
                <form className={this.classes.form} noValidate>
                    <Mui.TextField
                        variant="filled"
                        margin="normal"
                        required
                        fullWidth
                        label="E-post"
                        name="email"
                        autoComplete="email"
                        className="background_input"
                        autoFocus
                    />

                    <Mui.TextField
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
                    />
                    <Mui.FormControlLabel
                        control={<Mui.Checkbox value="remember" color="primary"/>}
                        label="Remember me"
                    />
                    <br/>
                    <Mui.Button
                        type="submit"
                        variant="contained"
                        className="btn-submit"
                    >
                        Sign In
                    </Mui.Button>
                    <br/>
                    <hr/>
                    <Mui.Grid container>
                        <Mui.Grid item xs>
                            <Mui.Link href="#" variant="body2">
                                Forgot password?
                            </Mui.Link>
                        </Mui.Grid>
                            <Mui.Grid item>
                                <Mui.Link href="#" onClick={this.signup} variant="body2">
                                    Don't have an account? Sign Up
                                </Mui.Link>
                            </Mui.Grid>

                    </Mui.Grid>
                </form>
            </div>
            <Mui.Box mt={4}>

            </Mui.Box>
        </Mui.Container>
    );
}
}

export default SignIn;