import React from "react";
import StatusFloor from "../../Component/AdminPages/Statistics/ChartFloor";
import StatusBuilding from "../../Component/AdminPages/Statistics/ChartBuilding";
import ChartQuantityEmployee from "../../Component/AdminPages/Statistics/ChartQuantityEmployeeInBuilding";
const ChartContainer = () => {

    return (

                <div className=" box " >
                    <div className="container">
                    <div className="row">
                            <div className="col-md-6 mt-4 ">
                                <StatusFloor />
                            </div>
                            <div className="col-md-6 mt-4 ">
                                <StatusBuilding />
                            </div>

                    </div>

                 {/* <hr />
                    <div className="center  col-md-12   ">
                         <div className="row">
                        <ChartQuantityEmployee />
                        </div>
                    </div>*/}
                </div>
                </div>
    )
}
export default ChartContainer;