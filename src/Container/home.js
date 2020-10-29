import React from "react";
import AuthService from "../Authentication/authUser";
import {NavBar} from "./Navbar";



export const Home = (props) => {
    const currentUser = AuthService.getCurrentUser();


    return (

        <div className="container">
            {currentUser ? <NavBar /> : null
        }
            
         

        </div>
    );
}

