import React from "react";
import {NavBar} from "../../Container/Navbar";
import BookingsArchives from "./Statistics/Archive";
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

                         </div>
                         <div className="col-md-8 d-sm-inline-block  ">
                             <BookingsArchives />
                         </div>
                     </div>
                 </div>
             </div>
         </div>

     )

}
export default Archive;