import React from "react";
import WeeklyStatistics from "../Copmonent/Statistics/Weekly";
import {NavBar} from "./Navbar";
import MyBookings from "../Copmonent/Booking/myBooking";

 const Statistics= ()=> {

     return(
         <div className="container">
             <NavBar />
             <div className="box ">
                 <div className="container ">
                     <div className=" row center">
                         <div className=" col-sm-6">
                             <h2 className="  title">My booking</h2>
                             <br/>
                             <p className=" ml-3">Here is a weekly booking</p>

                         </div>
                         <div className="col-md-8 d-sm-inline-block  ">
                             <WeeklyStatistics />
                         </div>
                     </div>
                 </div>
             </div>
         </div>

     )

}
export default Statistics;