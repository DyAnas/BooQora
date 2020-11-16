import React from "react";
import { NavBar } from "./Navbar";
import MyBookings from "../Copmonent/Booking/myBooking";
import BookingsArchives from "../Copmonent/AdminPages/Statistics/Archive";
export const MyBooking = () => {




    return (

        <div className=" box row row center" >

            <div className="col-sm-10 p-0 ">
                <MyBookings />
            </div>

        </div>




    );
}
