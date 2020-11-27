import React from "react";
import "../../Styles/navbarstyle.css";
import whiteLogo from "../../assets/TietoEvry.svg.png"
import AuthService from '../../service/Authentication/authUser'
import {
    faCalendarCheck,
    faChartLine,
    faCog,
    faInfo,
    faList,
    faTable,
    faUserCircle,
    faUserPlus
} from "@fortawesome/free-solid-svg-icons";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";


export const NavigationBar = (props) => {

    return <nav className="navbar navbar-expand-lg navbar-light bg-light "  >
        <Link to="/newBooking" className="navbar-brand mr-auto"  ><img src={whiteLogo} alt="Logo" /></Link>
        <button type="button" className="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
            <span className=" navbar-toggler-icon"></span>
        </button>

        <div className=" navbar-collapse collapse justify-content-between" id="navbarCollapse">
            <div className="navbar-nav">
                <Link to="/newBooking" className="nav-item nav-link active"><FontAwesomeIcon icon={faCalendarCheck} /> New Booking</Link>
                <Link to="myBookings" id="myBooking" className="nav-item nav-link"> <FontAwesomeIcon icon={faList} /> My Bookings</Link>
                <Link to="/aboutBookora" className="nav-item nav-link"><FontAwesomeIcon icon={faInfo} /> About Bookora</Link>

                {(localStorage.length !== 0) && (AuthService.getCurrentUser().roles[0] === "ROLE_ADMIN"
                    || AuthService.getCurrentUser().roles[1] === "ROLE_ADMIN") ?
                    <>
                        <Link to="/statistics" id="statistics" className="nav-item nav-link"><FontAwesomeIcon
                            icon={faChartLine} /> Statistics</Link>
                        <Link to="/zonesettings" id="ZoneSetting" className="nav-item nav-link"><FontAwesomeIcon icon={faCog} id="zoneSettings" /> Zone settings</Link>
                        <Link to="/addNewAdmin" className="nav-item nav-link"><FontAwesomeIcon icon={faUserPlus} /> Add new Admin</Link>
                        <Link to="/archive" id="archive" className="nav-item nav-link"><FontAwesomeIcon icon={faTable} /> Archive</Link>
                    </>
                    : null}

            </div>
            {AuthService.getCurrentUser() ?

                <div className="row d-block text-center">
                    <div className="col" >
                        <strong><FontAwesomeIcon icon={faUserCircle} />  {AuthService.getCurrentUser().email} </strong>

                    </div>
                    <div className="col">

                        <Link to="#" className="nav-item nav-link" id="logOut" onClick={() => {
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
