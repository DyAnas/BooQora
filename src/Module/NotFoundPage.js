import React from "react";
import logo from "../assets/logo1.png";


export const NotFoundPage = (props) => {
    return (<div style={{ padding: "50px" }} className="container  mx-auto">
        <div className="row text-center my-5 mx-auto mainRow " >

            <div className=" col pb-5" >
                <div className="col">
                    <img src={logo} style={{ maxWidth: "70%" }} alt="logo" />
                </div>
                <div className="col mt-5">
                    <h3 className="text-secondary"> <strong>404 Page Not Found! </strong></h3>
                    <button className="btn btn-light mt-4"
                        onClick={() => {
                            props.history.push("/");
                        }}
                    >Main Page</button>
                </div>
            </div>

        </div>

    </div>
    );
}

