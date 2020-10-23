import React from "react";
import Logo from "../../assets/logo1.png"
import { Link, Button, TextField } from "@material-ui/core";
import { useForm } from "react-hook-form";

const NewPassword= (props)=> {
    const [password, setPassword] = React.useState('')
    const { register,handleSubmit, watch, errors } =useForm();

    const onSubmit = data => {

        console.log(data);
    }
    return (<div className=" ipad vh-100 center background   " >
            <div className="col-md-3  box ipad2  ">
                <div className="center ">
                    <img src={Logo} alt="logo" />
                </div>
                <h1 className="text  mb-2 justify-content-center">
                    Forgot password
                </h1>
                <div className="center">
                    <form  onSubmit={handleSubmit(onSubmit)}  id="TestForm"  data-test="submit-button" >
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
                                onClick={()=> props.history.push("/")}
                                className="btn-color mt-4"
                                variant="contained"
                            >
                                Cancel
                            </Button>
                        </div>
                        <hr />
                    </form>
                </div>
            </div>
        </div>
    )
}
export default NewPassword;