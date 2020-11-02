import React from "react";
import { NavBar } from "./Navbar";
import { MapComponent } from "../Copmonent/Map/map";
import "../Styles/newBooking.css";

export const NewBooking = () => {




    return (
        <div>
            <div className="container newbookingCont ">
                <NavBar />

                <div className="row  justify-content-center newbookingRow" >

                    <div className="col-6-sm">
                        <MapComponent />
                    </div>
                
                </div>
            </div>



        </div>
    );
}
