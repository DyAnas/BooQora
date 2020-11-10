import React from "react";
import "../Styles/navbarstyle.css";
import whiteLogo from "../assets/TietoEvry.svg.png"
import AuthService from '../Authentication/authUser'
import { faCalendarCheck, faChartLine, faHome, faList } from "@fortawesome/free-solid-svg-icons";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

export const NavBar = (props) => {
const currentUser= AuthService.getCurrentUser().roles;
console.log(currentUser.toString())

    return <nav className="navbar navbar-expand-md navbar-light bg-light " >
        <Link to="/newBooking" className="navbar-brand mr-auto"  ><img src={whiteLogo} alt="Logo" /></Link>
        <button type="button" className="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
            <span  className=" navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-between" id="navbarCollapse">
            <div className="navbar-nav">
                <Link to="/home" className="nav-item nav-link"><FontAwesomeIcon icon={faHome} /> Home</Link>
                <Link to="/newBooking" className="nav-item nav-link active"><FontAwesomeIcon icon={faCalendarCheck} /> New Booking</Link>
                <Link to="myBookings" className="nav-item nav-link"> <FontAwesomeIcon icon={faList} /> My Booking</Link>
                {currentUser[1]==="ROLE_ADMIN" || currentUser[0]==="ROLE_ADMIN" &&
                <div className="nav-item dropdown">
                    <Link to="/aboutBookora" className="nav-link dropdown-toggle" data-toggle="dropdown">Admin</Link>
                    <div className="dropdown-menu">
                        {/* Edit href */}
                        <Link to="/Statistics" className="dropdown-item"><FontAwesomeIcon icon={faChartLine} /> Statistics</Link>
                        <Link to="/zonesettings" className="dropdown-item">Zone settings</Link>
                        <Link to="/aboutBookora" className="dropdown-item">Add new Admin</Link>
                        <Link to="/StatusFloor" className="dropdown-item">Status floor</Link>
                    </div>
                </div>
                }
                <Link to="/aboutBookora" className="nav-item nav-link">About Bookora</Link>
            </div>
            {AuthService.getCurrentUser() ?

                <div className="navbar-nav">
                    <Link to="#" className="nav-item nav-link" onClick={() => {
                        AuthService.logout();
                    }}>Log out</Link>
                </div> :

                <div className="navbar-nav">
                    <Link to="#" className="nav-item nav-link">Login</Link>
                </div>}

        </div>
    </nav>


}
