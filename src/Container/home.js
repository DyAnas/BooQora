import React from "react";
import AuthService from "../Authentication/authUser";
import {NavBar} from "./Navbar";
import "../Container/navbartyle.css";


export const Home = (props) => {
    const currentUser = AuthService.getCurrentUser();


    return (

        <div className="container">
            <NavBar />
         

        </div>
    );
}

