import React from "react";
import "../Styles/navbarstyle.css";
import whiteLogo from "../assets/TietoEvry.svg.png"
import AuthService from '../Authentication/authUser'
import { faCalendarCheck, faChartLine, faCog, faInfo, faList,
     faTable, faUserCircle, faUserPlus, faUserShield } from "@fortawesome/free-solid-svg-icons";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";


export const NavBar = (props) => {
    const currentUser = AuthService.getCurrentUser().roles;
    console.log(currentUser.toString())

    return <nav className="navbar navbar-expand-md navbar-light bg-light " >
        <Link to="/newBooking" className="navbar-brand mr-auto"  ><img src={whiteLogo} alt="Logo" /></Link>
        <button type="button" className="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
            <span className=" navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-between" id="navbarCollapse">
            <div className="navbar-nav">
                <Link to="/newBooking" className="nav-item nav-link active"><FontAwesomeIcon icon={faCalendarCheck} /> New Booking</Link>
                <Link to="myBookings" className="nav-item nav-link"> <FontAwesomeIcon icon={faList} /> My Bookings</Link>
                <Link to="/aboutBookora" className="nav-item nav-link"><FontAwesomeIcon icon={faInfo} /> About Bookora</Link>
                {currentUser[1] === "ROLE_ADMIN" || currentUser[0] === "ROLE_ADMIN" ?
                    <div className="nav-item dropdown">
                        <Link to="/aboutBookora" className="nav-link dropdown-toggle" data-toggle="dropdown"><FontAwesomeIcon icon={faUserShield} /> Admin</Link>
                        <div className="dropdown-menu">
                            <Link to="/statistics" className="dropdown-item"><FontAwesomeIcon icon={faChartLine} /> Statistics</Link>
                            <Link to="/zonesettings" className="dropdown-item"><FontAwesomeIcon icon={faCog} /> Zone settings</Link>
                            <Link to="/addNewAdmin" className="dropdown-item"><FontAwesomeIcon icon={faUserPlus} /> Add new Admin</Link>
                            <Link to="/archive" className="dropdown-item"><FontAwesomeIcon icon={faTable} /> Archive</Link>
                        </div>
                    </div>
                    : null}
            </div>
            {AuthService.getCurrentUser() ?

                <div className="row d-block text-center">
                    <div className="col" >
                        <strong><FontAwesomeIcon icon={faUserCircle} />  {AuthService.getCurrentUser().email} </strong>

                    </div>
                    <div className="col">

                        <Link to="#" className="nav-item nav-link" onClick={() => {
                            AuthService.logout();
                        }}>Log out</Link>
                    </div>

                </div> :

                <div className="navbar-nav">
                    <Link to="#" className="nav-item nav-link">Login</Link>
                </div>}

        </div>
    </nav>


}
