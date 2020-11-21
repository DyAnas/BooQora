import React from "react";
import AuthService from "../../service/Authentication/authUser";

export const About = (props) => {
    const currentUser = AuthService.getCurrentUser();


    return (

        <div className="container box">

         <h2 className="text">About Bookora</h2>
            <div className="text-center">
            <p>Bokkor is a booking system</p>
            </div>
        </div>
    );
}

