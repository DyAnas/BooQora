import React from "react";
import Logo from "../../assets/logo1.png";
import {TextField} from "@material-ui/core";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
const VerifyCode = (props) => {

    return (<div className=" ipad vh-100 center background   ">
            <div className="col-md-3  box ipad2  ">
                <div>
                    <div className="center ">
                        <img src={Logo} alt="logo"/>
                    </div>
                    <h1 className="text  mb-2 justify-content-center mt-2">
                        Verify Code
                    </h1>
                    <ToastContainer
                        position="top-center"
                        autoClose={8000}/>

                    <div className="center">
                        <form onSubmit={props.onSubmit} id="TestForm" data-test="submit-button">
                            <TextField
                                name="code"
                                error={props.error}
                                label="Entre Activation code"
                                inputRef={props.inputRef}
                                value={props.code}
                                helperText={props.helperText}
                                type="text"
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
                                    className="btn btn-info  mt-4 mb-3 text-light mr-3"
                                    variant="contained"
                                >
                                    Verify Code
                                </button>
                                <button
                                    type="submit"

                                    id="submit"
                                    onClick={props.cancel}
                                    className="btn btn-info  mt-4 mb-3 text-light mr-3"
                                    variant="contained"
                                >
                                    Cancel
                                </button>

                            </div>
                            <hr/>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default VerifyCode;