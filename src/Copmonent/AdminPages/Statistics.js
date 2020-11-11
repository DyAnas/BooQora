import React from "react";
import WeeklyStatistics from "../AdminPages/Statistics/Weekly";
import {NavBar} from "../../Container/Navbar";
 const Archive= ()=> {

     return(
         <div className="container ">
             <NavBar />
             <div className="box ">
                 <div className="container ">
                     <div className=" row center">
                         <div className=" col-sm-6">
                             <h2 className="  title">All Booking</h2>
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
export default Archive;