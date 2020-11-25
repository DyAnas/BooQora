import React from "react";


export const About = (props) => {



    return (

        <div className="container box">
            <div className=" mt-4 mb-4 center ">
                    <h2 className="title">About Bookora</h2>
            </div>
            <div className="container w-50">
            <p className="text-justify" style={{Width: "50px"}}>Bookora is a booking system for Tietoevry.
                It aims to help both leaders and employees to
                plan their working days in advance by providing
                information about  how many people are in the different
                sections and how many of them are planning to come in the coming days.
                It can also help leaders to decide how many places they have
                to rent from Telenor, based on the statistisk about the usage
                of the building.</p>
            </div>
        </div>
    );
}

