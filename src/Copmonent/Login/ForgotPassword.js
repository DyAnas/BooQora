import React from "react";
import Logo from "../../assets/logo1.png"
import { Button, TextField} from "@material-ui/core";
import {useForm} from "react-hook-form";

const ForgotPassword = (props) => {
    const [email, setEmail] = React.useState('');
    const {register, handleSubmit, errors} = useForm();

    const onSubmit = data => {

        console.log(data);
    }
    return (<div className=" ipad vh-100 center background   ">
            <div className="col-md-3  box ipad2  ">
                <div className="center ">
                    <img src={Logo} alt="logo"/>
                </div>
                <h1 className="text  mb-2 justify-content-center">
                    Forgot password
                </h1>
                <div className="center">
                    <form onSubmit={handleSubmit(onSubmit)} id="TestForm" data-test="submit-button">
                        <TextField
                            name="email"
                            error={!!errors.email}
                            label="Entre your email"
                            inputRef={register({
                                required: "Required",
                                pattern: {
                                    value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9]+\.[A-Za-z]+$/,
                                    message: "Invalid email"
                                }
                            })}
                            value={email}
                            helperText={errors.email ? errors.email.message : ""}
                            type="email"
                            fullWidth
                            autocompleted="false"
                            size="small"
                            onChange={e => setEmail(e.target.value)}
                            variant="filled"
                            margin="normal"
                            id="input"
                            className="background_input"

                        />
                        <div className="center">
                            <Button
                                type="submit"
                                id="submit"
                                className="btn-color mt-4"
                                variant="contained"
                            >
                                Sende verification code
                            </Button>

                        </div>
                        <div className="center">
                            <Button
                                type="submit"
                                id="submit"
                                onClick={() => props.history.push("/")}
                                className="btn-color mt-4"
                                variant="contained"
                            >
                                Cancel
                            </Button>
                        </div>
                        <hr/>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default ForgotPassword;