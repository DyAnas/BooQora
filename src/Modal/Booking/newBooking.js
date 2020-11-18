import React from "react";
import MapComponent from "../../Copmonent/Booking/map";
import "../../Styles/newBooking.css";

export const NewBooking = () => {



    return (
        <div >

            <div className="container-sm " >

                <div className="row justify-content-center " >

                    <div className="col-6-sm" style={{ backgroundColor: "white", borderRadius: "20px", padding: "10px" }}>
                        <MapComponent />
                    </div>


                </div>
            </div>
        </div>
    );
}
