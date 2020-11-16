import React from "react";
import {NavBar} from "../../Container/Navbar";
import BookingsArchives from "./Statistics/Archive";
import StatusFloor from "./Statistics/ChartFloor";
import StatusBuilding from "./Statistics/ChartBuilding";
 const Archive= ()=> {

     return(

         <div className=" box row row center" >

                    <div className="col-sm-10 p-0 ">
                 <BookingsArchives />
                    </div>

         </div>



     )

}
export default Archive;