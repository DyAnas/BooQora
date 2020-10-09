import React from "react";
import auth from '../Authentication/auth';
import { Route, Redirect } from "react-router-dom";

export const ProtectedRoute = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={props => {

                if (auth.isAuthenticated()) {
                    return <Component {...props} />
                }
                else {
                    console.log("token not valid")
                    alert("token not valid");
                    return <Redirect to={
                        {
                            pathname: "/",
                            state: {
                                from: props.location
                            }
                        }
                    } />
                }
            }}
        />
    );
}; 