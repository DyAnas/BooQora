import React from "react";
import "../Styles/navbarstyle.css";
import whiteLogo from "../assets/whiteLogo.png"
import AuthService from '../Authentication/authUser'
import { faCalendarCheck, faChartLine, faHome, faList } from "@fortawesome/free-solid-svg-icons";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export const NavBar = (props) => {


    return <nav className="navbar navbar-expand-md navbar-dark " >
        <a href="/newBooking" className="navbar-brand mr-auto"  ><img src={whiteLogo} alt="Logo" /></a>
        <button type="button" className="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
            <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-between" id="navbarCollapse">
            <div className="navbar-nav">
                <a href="/home" className="nav-item nav-link"><FontAwesomeIcon icon={faHome} /> Home</a>
                <a href="/newBooking" className="nav-item nav-link active"><FontAwesomeIcon icon={faCalendarCheck} /> New Booking</a>
                <a href="myBookings" className="nav-item nav-link"> <FontAwesomeIcon icon={faList} /> My Booking</a>

                <div className="nav-item dropdown">
                    <a href="/aboutBookora" className="nav-link dropdown-toggle" data-toggle="dropdown">Admin</a>
                    <div className="dropdown-menu">
                        {/* Edit href */}
                        <a href="/aboutBookora" className="dropdown-item"><FontAwesomeIcon icon={faChartLine} /> Statistics</a>
                        <a href="/aboutBookora" className="dropdown-item">Zone settings</a>
                        <a href="/aboutBookora" className="dropdown-item">Add new Admin</a>
                    </div>
                </div>
                <a href="/aboutBookora" className="nav-item nav-link">About Bookora</a>
            </div>
            {AuthService.getCurrentUser() ?

                <div className="navbar-nav">
                    <a href="#" className="nav-item nav-link" onClick={() => {
                        AuthService.logout();
                    }}>Log out</a>
                </div> :

                <div className="navbar-nav">
                    <a className="nav-item nav-link">Login</a>
                </div>}

        </div>
    </nav>


}
