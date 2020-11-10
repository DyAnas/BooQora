import React from "react";
import StatusFloor from "../Copmonent/Statistics/Chart";
import { NavBar } from "./Navbar";
import MapComponent from "../Copmonent/Map/map";
const ChartContainer =()=> {

    return (
        <div>
                <div className="container  ">
                <NavBar />

                <div className="row justify-content-center box" >

                    <div className="col-md-6">
                        <StatusFloor />
                    </div>

                </div>
            </div>
        </div>
       )
}
export default ChartContainer;