import React from "react";
import StatusFloor from "../../Copmonent/AdminPages/Statistics/ChartFloor";
import StatusBuilding from "../../Copmonent/AdminPages/Statistics/ChartBuilding";

const ChartContainer = () => {

    return (

                <div className=" box row" >
                            <div className="col-md-6 mt-4 ">
                                <StatusFloor />
                            </div>
                            <div className="col-md-6 mt-4 ">
                                <StatusBuilding />
                            </div>

                </div>

    )
}
export default ChartContainer;