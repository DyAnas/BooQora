import React from "react";
import { NavBar } from "./Navbar";
import MapComponent from "../Copmonent/Map/map";
import "../Styles/newBooking.css";
export const NewBooking = () => {



    return (
        <div >

            <div className="container-sm " >
                <NavBar />
                <div className="row justify-content-center " >

                    <div className="col-6-sm" style={{ backgroundColor: "white", borderRadius: "20px", padding: "10px" }}>
                        <MapComponent />
                    </div>


                </div>
            </div>
        </div>
    );
}
