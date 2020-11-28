import React from "react";


export const About = (props) => {



    return (
        <div className="container box" style={{}}>
            <div className="row d-flex flex-column text-center pt-3 mb-3">
                <div className="col-sm mb-2">
                    <h2 className="title ">About Bookora</h2>
                </div>
                <div className="col-sm mb-3 p-5 center">
                    <p className="text-justify  " style={{ fontFamily: "Gilroy,sans-serif", width: "80%" }}>Bookora is a booking system for Tietoevry.
                    It aims to help both leaders and employees to
                    plan their working days in advance by providing
                    information about  how many people are in the different
                    sections and how many of them are planning to come in the coming days.
                    It can also help leaders to decide how many places they have
                    to rent from Telenor, based on the statistisk about the usage
                of the building.</p>
                </div>

            </div>
        </div>

    );
}

