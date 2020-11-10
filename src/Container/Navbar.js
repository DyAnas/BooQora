import React, {useState} from "react";
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
   const [user, setUser]= useState([]);
   const currentuser= AuthService.getCurrentUser().roles;
   console.log(currentuser[0])
    /*const s=  currentuser.roles.map((role, index)=> {
           setUser(role);
       })*/

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

                {currentuser[0]==="ROLE_ADMIN" ?

                  <Link to="/StatusFloor" className="nav-item nav-link">Floor</Link>: null }
                     <Link to="/Statistics" className="nav-item nav-link"><FontAwesomeIcon icon={faChartLine} /> Statistics</Link>
                    <Link to="/aboutBookora" className="nav-item nav-link">Zone settings</Link>
                    <Link to="/aboutBookora" className="nav-item nav-link">Add new Admin</Link>


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
