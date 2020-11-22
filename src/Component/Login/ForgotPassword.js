import React from "react";
import Logo from "../../assets/logo1.png"
import {TextField} from "@material-ui/core";
import {withRouter} from "react-router-dom";
import {ToastContainer} from "react-toastify";


const ForgotPassword = (props) => {

    return (<div className=" ipad vh-100 center background   ">
        <div className="col-md-3  box ipad2  ">
            <div>
                <div className="center ">
                    <img src={Logo} alt="logo" style={{cursor:"pointer"}} onClick={()=>{
                        props.history.push("/");
                    }}/>
                </div>
                <h1 className="text  mb-2 justify-content-center mt-3">
                    Forgot password
                    </h1>
                <ToastContainer
                    position="top-center"
                    autoClose={8000}/>
                <div className="center">
                    <form style={{ width:"80%"}} onSubmit={props.onSubmit}>
                        <TextField
                            name="email"
                            error={props.error}
                            label="Entre your email"
                            inputRef={props.inputRef}
                            // value={props.email}
                            helperText={props.helperText}
                            type="email"
                            fullWidth
                            autocompleted="false"
                            size="small"
                            onChange={props.onChange}
                            variant="filled"
                            margin="normal"
                            id="input"
                            className="background_input"

                        />
                        <div className="center">
                            <button
                                type="submit"
                                id="submit"
                                className="btn btn-info  mt-4 mb-3 text-light"
                                variant="contained"
                            >
                                Send email
                                </button>
                        </div>
                        {props.loading ?
                        <div className=" ">
                            <div className="spinner-grow spinner-grow-sm text-info ml-1 " role="status">                    
                      </div>
                      <div className="spinner-grow spinner-grow-sm text-info ml-1" role="status">                    
                      </div>
                      <div className="spinner-grow spinner-grow-sm text-info ml-1" role="status">                    
                      </div>
                        </div>
                       : null}
                        <hr />
                    </form>
                </div>
            </div>
        </div>
    </div>
    )
}
export default withRouter (ForgotPassword);