import React from "react";
import StatusFloor from "../Copmonent/Statistics/ChartFloor";
import { NavBar } from "./Navbar";
import StatusBuilding from "../Copmonent/Statistics/ChartBuilding";

const ChartContainer =()=> {

    return (
        <div>
                <div className="container  ">
                <NavBar />

                <div className="row justify-content-center box" >
               <div className="container">
               <div className="row">

                    <div className="col-md-6 mt-4 mb-4">
                        <StatusFloor />
                    </div>
                 <div className="col-md-6 mt-4">
                     <StatusBuilding />
                    </div>
             </div>
                </div>
            </div>
                </div>
        </div>
       )
}
export default ChartContainer;