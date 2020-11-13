import React from "react";
import StatusFloor from "../Copmonent/AdminPages/Statistics/ChartFloor";
import { NavBar } from "./Navbar";
import StatusBuilding from "../Copmonent/AdminPages/Statistics/ChartBuilding";

const ChartContainer = () => {

    return (
        <div>
            <div className="container  ">
                <NavBar />

                <div className="row justify-content-center box" >
                    <div className="container">
                        <div className="row">

                            <div className="col-md-6 col-sm mt-4 ">
                                <StatusFloor />
                            </div>
                            <div className="col-md-6- col-sm mt-4 ">
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