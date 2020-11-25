import React from "react";
import MapComponent from "../../Component/Booking/newBooking";
import "../../Styles/newBooking.css";

export const NewBooking = () => {
    return (
        <div className="mt-4 "style={{ backgroundColor: "white", borderRadius: "20px", boxShadow: "1px 1px 1px 1px #E1E8EF"}}>
            <MapComponent />
        </div>
    );
}
