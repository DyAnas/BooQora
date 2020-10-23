import React from "react";
import Logo from "../../assets/logo1.png"
import { Link, Button, TextField } from "@material-ui/core";
import { useForm } from "react-hook-form";

const Verification= (props)=> {
    const [activeCode, setActiveCode] = React.useState('');
    const { register,handleSubmit, errors } =useForm();


    const onSubmit = data => {


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
                    <form onSubmit={handleSubmit(onSubmit)} id="TestForm"  data-test="submit-button" >
                        <TextField
                            name="activeCode"
                            error={!!errors.activeCode}
                            label="Entre your active Code"
                            inputRef={register({
                                required: "Required",
                                pattern: {
                                    value: /^[a-zA-Z0-9]+$/,
                                    message: "Invalid activeCode"
                                }
                            })}
                            value={activeCode}
                            helperText={errors.activeCode ? errors.activeCode.message : ""}
                            type="activeCode"
                            fullWidth
                            autocompleted="false"
                            size="small"
                            onChange={e => setActiveCode(e.target.value)}
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
                                Verify code
                            </Button>

                        </div>
                        <div className="center">
                            <Button
                                type="submit"
                                id="submit"
                                onClick={onSubmit}
                                className="btn-color mt-4"
                                variant="contained"
                            >
                               Send new code
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
export default Verification;