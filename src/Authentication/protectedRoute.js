import React from "react";
import AuthService from '../Authentication/authUser';
import { Route, Redirect } from "react-router-dom";

export const ProtectedRoute = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={props => {

                if (AuthService.getCurrentUser()) {
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