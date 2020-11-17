import React from "react";
import AuthService from './authUser';
import {Redirect, Route} from "react-router-dom";

export const ProtectedRoute = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={props => {

                if (AuthService.getCurrentUser()) {
                    return <Component {...props} />
                }
                else {
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