import React, {useState}from 'react';

import {makeStyles} from '@material-ui/core/styles';
import Logo from "../assets/logo1.png"
import '../Container/LoginStyle.css';
import * as Mui from '@material-ui/core';
import * as Yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers";
import {ErrorMessage} from "@hookform/error-message";



function SignInContainer(props)   {
    const schema = Yup.object().shape({
        Email: Yup.string().required(),
        Password: Yup.string().matches().required('Password is required'),

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

    const ValidatEmail=()=>{
        const split=   Email.split(/[@]+/); //splits string using RegEx on a space OR a comma
        console.log(split[1]);
        if (split[1]==="tietoevry.com"){
            setIsValid(true);

        }
    }
    const onSubmit=(e) =>{
        //   e.preventDefault()//blocks the postback event of the page
        console.log('email: '+Email)
        console.log('password: '+Password)
     const split=   Email.split(/[ @ ]+/); //splits string using RegEx on a space OR a comma
       console.log(split[1]);
        if(Isvalid){
            props.history.push('/home')
        }
        else {
            alert("error   "+split[1])
        }
    }

    const [Email, setEmail] = useState('')
    const [Password, setPassword] = useState('')
    const [Isvalid, setIsValid] = useState(false)


    return (<div className="row vh-100  center background ">
                 <div className="col-md-3 box">
                    <Mui.Container  maxWidth="xs" >
                        <Mui.CssBaseline/>
                        <div className={classes.paper}>
                            <div className=" ">
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
                                    size="small"
                                    fullWidth
                                    label="E-post"
                                    name="Email"
                                    autoComplete="Email"
                                    className="background_input"

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

                                    value={Password}
                                    onChange={e => setPassword(e.target.value)}

                                />
                                <ErrorMessage errors={errors} name="Password" />
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
                                        <Mui.Link href="/signup"  variant="body2">
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
            </div>



                );

}

export default SignInContainer;