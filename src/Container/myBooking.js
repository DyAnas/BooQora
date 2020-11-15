import React from "react";
import { NavBar } from "./Navbar";
import MyBookings from "../Copmonent/Booking/myBooking";
export const MyBooking = () => {




    return (
            <div className="container">
                <div className="box ">
                 <div className="container ">
                    <div className=" row center">
                        <div className=" col-sm-6">
                        <h2 className="  title">My booking</h2>


                    </div>
                    <div className="col-md-8 d-sm-inline-block  ">
                    <MyBookings />
                    </div>
                    </div>
                </div>
                </div>
            </div>

    );
}
